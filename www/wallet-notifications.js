// ===== WALLET NOTIFICATIONS MODULE =====
// Fitur: Notifikasi real-time ketika ada aktivitas (transaksi) di wallet yang dipantau

class WalletNotificationManager {
  constructor() {
    this.monitoredWallets = load("monitoredWallets", {});
    this.notificationHistory = load("notificationHistory", []);
    this.isMonitoring = false;
    this.monitorIntervals = {};
    this.lastCheckedTimestamps = load("lastCheckedTimestamps", {});
  }

  // Tambah wallet ke daftar pantauan
  addMonitoredWallet(party_id, label, groupName) {
    if (!this.monitoredWallets[party_id]) {
      this.monitoredWallets[party_id] = { label, groupName, enabled: true, addedAt: new Date().toISOString() };
      this.lastCheckedTimestamps[party_id] = new Date().toISOString();
      this.persistMonitoredWallets();
      return true;
    }
    return false;
  }

  // Hapus wallet dari pantauan
  removeMonitoredWallet(party_id) {
    if (this.monitoredWallets[party_id]) {
      delete this.monitoredWallets[party_id];
      delete this.lastCheckedTimestamps[party_id];
      this.persistMonitoredWallets();
      return true;
    }
    return false;
  }

  // Toggle enable/disable notifikasi untuk wallet
  toggleMonitoredWallet(party_id) {
    if (this.monitoredWallets[party_id]) {
      this.monitoredWallets[party_id].enabled = !this.monitoredWallets[party_id].enabled;
      this.persistMonitoredWallets();
      return this.monitoredWallets[party_id].enabled;
    }
    return false;
  }

  // Simpan ke localStorage
  persistMonitoredWallets() {
    save("monitoredWallets", this.monitoredWallets);
    save("lastCheckedTimestamps", this.lastCheckedTimestamps);
  }

  // Tampilkan notifikasi browser
  async showNotification(title, options = {}) {
    // Coba gunakan Notification API (web)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%237c7cf0"/><text x="50" y="60" font-size="50" text-anchor="middle" fill="white">💰</text></svg>',
        tag: 'wallet-alert',
        requireInteraction: false,
        ...options
      });
    } else if ('vibrate' in navigator) {
      // Fallback: getaran untuk mobile
      navigator.vibrate([200, 100, 200]);
    }

    // Tampilkan alert di dalam app
    this.showInAppNotification(title, options.body);
  }

  // Toast notifikasi di dalam aplikasi
  showInAppNotification(title, message) {
    const notification = {
      id: Date.now(),
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    this.notificationHistory.unshift(notification);
    if (this.notificationHistory.length > 100) this.notificationHistory.pop();
    save("notificationHistory", this.notificationHistory);

    // Tampilkan toast visual
    this.showToast(`${title}\n${message || ''}`);
  }

  // Toast element
  showToast(message) {
    let toast = document.getElementById("notificationToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "notificationToast";
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2a8a2a;
        color: #fff;
        padding: 14px 18px;
        border-radius: 8px;
        font-size: 13px;
        z-index: 1000;
        max-width: 280px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        animation: slideIn 0.3s ease;
        white-space: pre-wrap;
        word-wrap: break-word;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = "block";

    clearTimeout(toast.hideTimeout);
    toast.hideTimeout = setTimeout(() => {
      toast.style.display = "none";
    }, 4000);
  }

  // Minta izin notifikasi
  async requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      const perm = await Notification.requestPermission();
      return perm === 'granted';
    }
    return Notification.permission === 'granted';
  }

  // Periksa transaksi baru untuk wallet
  async checkWalletActivity(party_id, label) {
    try {
      const lastCheck = this.lastCheckedTimestamps[party_id] || new Date(Date.now() - 60000).toISOString();
      const transfers = await fetchTransfersUntil(party_id, label, lastCheck);

      if (!transfers || transfers.length === 0) return null;

      const newest = transfers[0];
      const sender = newest.sender_address || newest.sender || newest.from || "";
      const receiver = newest.receiver_address || newest.receiver || newest.to || "";
      const isOut = sender.includes(party_id);
      const amount = parseFloat(newest.amount ?? newest.value ?? 0) || 0;
      const timestamp = newest.created_at || newest.timestamp || "";

      // Update last checked
      this.lastCheckedTimestamps[party_id] = new Date().toISOString();
      save("lastCheckedTimestamps", this.lastCheckedTimestamps);

      return {
        label,
        amount,
        isOut,
        from: sender,
        to: receiver,
        timestamp,
        type: isOut ? "KELUAR" : "MASUK"
      };
    } catch (e) {
      console.error(`Notifikasi cek ${label} gagal:`, e.message);
      return null;
    }
  }

  // Mulai monitoring semua wallet
  startMonitoring(intervalMs = 30000) {
    if (this.isMonitoring) return;
    this.isMonitoring = true;

    const runCheck = async () => {
      for (const party_id of Object.keys(this.monitoredWallets)) {
        const wallet = this.monitoredWallets[party_id];
        if (!wallet.enabled) continue;

        const activity = await this.checkWalletActivity(party_id, wallet.label);
        if (activity) {
          const dirIcon = activity.isOut ? "📤" : "📥";
          const dirText = activity.isOut ? "KELUAR" : "MASUK";
          const title = `${dirIcon} ${wallet.label}`;
          const body = `${dirText} ${activity.amount.toFixed(4)} CC\n${activity.timestamp.slice(11, 19)}`;
          await this.showNotification(title, { body });
        }
      }
    };

    // Jalankan langsung + interval
    runCheck();
    this.monitorIntervals.main = setInterval(runCheck, intervalMs);
  }

  // Stop monitoring
  stopMonitoring() {
    if (this.monitorIntervals.main) {
      clearInterval(this.monitorIntervals.main);
      delete this.monitorIntervals.main;
    }
    this.isMonitoring = false;
  }

  // Render daftar wallet yang dipantau
  renderMonitoredWallets() {
    const container = document.getElementById("monitoredWalletsContainer");
    if (!container) return;

    let html = "";
    const wallets = Object.keys(this.monitoredWallets);

    if (wallets.length === 0) {
      html = `<p class="muted">Belum ada wallet di pantauan. Tambah dari tab Wallet.</p>`;
    } else {
      html = `<div style="margin-bottom: 12px;"><b>Wallet Dipantau (${wallets.length}):</b></div>`;
      for (const party_id of wallets) {
        const w = this.monitoredWallets[party_id];
        const statusClass = w.enabled ? "enabled" : "disabled";
        const statusText = w.enabled ? "✓ Aktif" : "✗ Nonaktif";
        html += `<div class="monitored-wallet ${statusClass}">
          <span class="mw-label">${w.label}</span>
          <span class="mw-status">${statusText}</span>
          <button class="mw-toggle" data-pid="${party_id}">
            ${w.enabled ? "Matikan" : "Aktifkan"}
          </button>
          <button class="mw-remove" data-pid="${party_id}">Hapus</button>
        </div>`;
      }
    }

    container.innerHTML = html;

    // Bind events
    document.querySelectorAll(".mw-toggle").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const pid = e.target.getAttribute("data-pid");
        const newState = this.toggleMonitoredWallet(pid);
        status(`Notifikasi ${this.monitoredWallets[pid].label}: ${newState ? "✓ Aktif" : "✗ Nonaktif"}`);
        this.renderMonitoredWallets();
      });
    });

    document.querySelectorAll(".mw-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const pid = e.target.getAttribute("data-pid");
        const label = this.monitoredWallets[pid].label;
        if (confirm(`Hapus ${label} dari pantauan?`)) {
          this.removeMonitoredWallet(pid);
          status(`${label} dihapus dari pantauan`);
          this.renderMonitoredWallets();
        }
      });
    });
  }

  // Render history notifikasi
  renderNotificationHistory() {
    const container = document.getElementById("notificationHistoryContainer");
    if (!container) return;

    let html = "";
    if (this.notificationHistory.length === 0) {
      html = `<p class="muted">Belum ada notifikasi.</p>`;
    } else {
      html = `<div style="font-size: 11px; color: #8080a0; margin-bottom: 8px;">Total: ${this.notificationHistory.length}</div>`;
      for (const notif of this.notificationHistory.slice(0, 20)) {
        const time = new Date(notif.timestamp).toLocaleTimeString('id-ID');
        html += `<div class="notif-item">
          <div class="notif-time">${time}</div>
          <div class="notif-title"><b>${notif.title}</b></div>
          <div class="notif-msg">${notif.message || ''}</div>
        </div>`;
      }
    }

    container.innerHTML = html;
  }

  // Get ringkasan statistik
  getNotificationStats() {
    const total = this.notificationHistory.length;
    const today = this.notificationHistory.filter(n => {
      const d1 = new Date(n.timestamp);
      const d2 = new Date();
      return d1.toDateString() === d2.toDateString();
    }).length;
    return { total, today, monitoring: this.isMonitoring, wallets: Object.keys(this.monitoredWallets).length };
  }
}

// Inisialisasi global
const walletNotifications = new WalletNotificationManager();
