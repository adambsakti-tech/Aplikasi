// Default wallet data - all wallets ever shared
const DEFAULT_WALLETS = {
  "Supanova x Silvana": [
    { label: "adi",           party_id: "supa1::12209090d34f5fb7e169fb19ad59d4917f234877bedf0ea41cd8a3b899a9d873ede2" },
    { label: "udin kusumono", party_id: "supa1::1220bc8fada92777cc57f3fcde125696eeb9bf73d4ec8275322f23756ab7585cd3df" },
    { label: "tio irvan",     party_id: "supa1::12201621bcb3420e7f9cf95bc9637395d53fef88a3fb369ab056d881654ed807c4e4" },
    { label: "infinix",       party_id: "supa1::12201ddd750d3c0e61525ecfc9b29b900b84c649521ed48e9dd709172f29f7e782f1" },
    { label: "ask",           party_id: "supa1::122036b71b9d2d71f413717b67404824714904d92e40632d47760b34c931fe13328b" },
    { label: "tkji",          party_id: "supa1::12203565d74a1bc07aa771753d26402f153e5727472da8b3b26a2f48216a69fa641c" },
    { label: "2906",          party_id: "supa1::1220de5570cf765158db76f171adb47bff7e5d6c343de366d20e80d7e948482fb1fb" },
    { label: "fudin",         party_id: "supa1::1220c47b72414644ed9eb873ea2021e1c58df092dcd96354cd5c911241fc738ccf49" },
    { label: "latep",         party_id: "supa1::12208d11f9ae60a04d1107b0bbbd157448fad685eefa2d63f4b4993e6f50417b1c67" },
    { label: "robani",        party_id: "supa1::122066e1a224cf9acf6fca64b949b6c96a71987cc7c20c81d3a2b55d2a7610e7e793" },
    { label: "huda",          party_id: "supa1::12209be3236f26de57e5b9a4ec513a0b445b154985de21b79539d936a31d1cedb94d" }
  ],
  "Supanova x Hecto": [
    { label: "hecto-01", party_id: "supa1::1220b2d38610b32268b6a435ed912f8982c2195396fa757b92324300d439d7df5200" },
    { label: "hecto-02", party_id: "supa1::12206345182c3703339111e41f2d9f017245bef22a2f36e9b3f5bfdcc0501d809328" },
    { label: "hecto-03", party_id: "supa1::1220841a1ee597324db37724acae13357b1332c381c19b5410f848a6956b5a52e8ac" },
    { label: "hecto-04", party_id: "supa1::12201b27f0ae1b501e6ffac1e36cbf09b5accef9dbde065cfd549c5eb4c36f63de38" },
    { label: "hecto-05", party_id: "supa1::12209090d34f5fb7e169fb19ad59d4917f234877bedf0ea41cd8a3b899a9d873ede2" },
    { label: "hecto-06", party_id: "supa1::12207a6fcb9960f485d4570d8d8430e8b80c20834f9b9585a9ebc201df44e142f7fa" },
    { label: "hecto-07", party_id: "supa1::1220659b0bf44155971d99b66d7a7d8deb48cf16e86188955a486aa21faaf3d9a26f" },
    { label: "hecto-08", party_id: "supa1::12208d11f9ae60a04d1107b0bbbd157448fad685eefa2d63f4b4993e6f50417b1c67" },
    { label: "hecto-09", party_id: "supa1::122019466f8eb135bf548ece2b6c8890342119cf9d727f0119205e9bcf4c59112671" },
    { label: "hecto-10", party_id: "supa1::12202a0bbdaa955be290d73750f1a35f1a8f5c385c10db094c3c1b28165f9cb55b1d" }
  ]
};

const LIGHTHOUSE_BASE = "https://lighthouse.cantonloop.com/api";
const ORDERBOOK_FEE = "orderbook-fee::1220cecc6fe68a8bb19cc35e098b1211f77b32708aeeda06d6050346b539c3d0ca47";
const HECTO_POOL = "supa-hecto-pool-1::12205c9e7df3ce671bc5e285120cb6e4dfae5ee3029c04fa82f1cd828c5e7197d882";

// ===== STORAGE (localStorage) =====
function load(key, fb) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

let wallets = load("wallets", null) || JSON.parse(JSON.stringify(DEFAULT_WALLETS));
let cachedData = load("cachedData", {}) || {};
save("wallets", wallets);

// ===== HELPERS =====
function pad(x) { return String(x).padStart(2, "0"); }
function utcDayStartIso() {
  const n = new Date();
  return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), 0, 0, 0)).toISOString();
}
function fmtUtc(d) { return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`; }
function cssId(s) { return String(s).replace(/[^a-zA-Z0-9_-]/g, "_"); }
function $(id) { return document.getElementById(id); }
function status(msg) { const el = $("statusText"); if (el) el.textContent = msg; }

function todayStats(data) {
  const cut = utcDayStartIso();
  const today = (data.transfers || []).filter(t => (t.timestamp || "") >= cut)
    .sort((a, b) => (b.timestamp || "").localeCompare(a.timestamp || ""));
  const out = today.filter(t => t.isOut);
  const spent = out.reduce((s, t) => s + t.amount, 0);
  const received = today.filter(t => !t.isOut).reduce((s, t) => s + t.amount, 0);
  const fee = out.filter(t => (t.to || "").includes(ORDERBOOK_FEE));
  const feeSpent = fee.reduce((s, t) => s + t.amount, 0);
  const poolIn = today.filter(t => !t.isOut && (t.from || "").includes(HECTO_POOL));
  const poolReceived = poolIn.reduce((s, t) => s + t.amount, 0);
  return { txAll: today.length, spent, received, today, feeTx: fee.length, feeSpent, poolTx: poolIn.length, poolReceived };
}

// ===== FETCH (Capacitor patches window.fetch -> native, no CORS) =====
async function fetchJSON(path) {
  const resp = await fetch(`${LIGHTHOUSE_BASE}${path}`, { headers: { "Accept": "application/json" } });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return await resp.json();
}
async function fetchTransfersUntil(party_id, label, cutoffIso) {
  const all = [];
  const PAGE = 500, MAX_PAGES = 10;
  let lastSig = null;
  for (let p = 0; p < MAX_PAGES; p++) {
    if (p > 0) status(`Scan ${label}... (page ${p + 1})`);
    const txData = await fetchJSON(`/parties/${encodeURIComponent(party_id)}/transfers?limit=${PAGE}&offset=${p * PAGE}`);
    const list = txData.transfers || txData.data || (Array.isArray(txData) ? txData : []);
    if (!list.length) break;
    const sig = `${list[0].created_at || list[0].timestamp || ""}_${list[0].amount || ""}`;
    if (sig === lastSig) break;
    lastSig = sig;
    all.push(...list);
    const oldest = list[list.length - 1];
    const oTs = oldest.created_at || oldest.timestamp || "";
    if (oTs && oTs < cutoffIso) break;
    if (list.length < PAGE) break;
  }
  return all;
}
async function getBalance(party_id) {
  const balData = await fetchJSON(`/parties/${encodeURIComponent(party_id)}/balance`);
  const coin = balData.balance || balData.data || balData || {};
  const u = parseFloat(coin.total_unlocked_coin ?? coin.unlocked ?? 0) || 0;
  const l = parseFloat(coin.total_locked_coin ?? coin.locked ?? 0) || 0;
  return { balance: u + l, unlocked: u, locked: l };
}
function mapTransfers(raw, party_id) {
  return raw.map(t => {
    const sender = t.sender_address || t.sender || t.from || "";
    const receiver = t.receiver_address || t.receiver || t.to || "";
    return {
      amount: parseFloat(t.amount ?? t.value ?? 0) || 0,
      timestamp: t.created_at || t.timestamp || "",
      from: sender, to: receiver, isOut: sender.includes(party_id)
    };
  });
}

// ===== SCAN HARIAN =====
async function scanAll() {
  const btn = $("scanBtn"); btn.disabled = true;
  cachedData = {};
  const cut = utcDayStartIso();
  let totalTx = 0, totalFeeTx = 0, totalFee = 0, totalPool = 0, done = 0, totalW = 0;
  Object.keys(wallets).forEach(g => totalW += wallets[g].length);
  for (const groupName of Object.keys(wallets)) {
    for (const w of wallets[groupName]) {
      status(`Scan ${w.label}... ${++done}/${totalW}`);
      try {
        const bal = await getBalance(w.party_id);
        const raw = await fetchTransfersUntil(w.party_id, w.label, cut);
        const transfers = mapTransfers(raw, w.party_id);
        const result = { label: w.label, party_id: w.party_id, ...bal, txCount: transfers.length, transfers };
        if (!cachedData[groupName]) cachedData[groupName] = {};
        cachedData[groupName][w.label] = result;
        const s = todayStats(result);
        totalTx += s.txAll; totalFeeTx += s.feeTx; totalFee += s.feeSpent; totalPool += s.poolReceived;
      } catch (e) {
        if (!cachedData[groupName]) cachedData[groupName] = {};
        cachedData[groupName][w.label] = { label: w.label, party_id: w.party_id, balance: 0, txCount: 0, transfers: [], error: e.message };
      }
      renderHarian();
    }
  }
  save("cachedData", cachedData);
  renderHarian();
  status(`✅ Hari ini: ${totalTx} tx · fee ${totalFeeTx}× −${totalFee.toFixed(2)} · pool +${totalPool.toFixed(2)} CC`);
  btn.disabled = false;
}

function renderHarian() {
  const c = $("harianGroups");
  const start = new Date(utcDayStartIso());
  $("dayBar").textContent = `Hari ini (UTC): ${start.getUTCFullYear()}-${pad(start.getUTCMonth()+1)}-${pad(start.getUTCDate())} 00:00 → ${fmtUtc(new Date())}`;
  let html = "";
  for (const groupName of Object.keys(wallets)) {
    let gTx = 0, gFeeTx = 0, gFee = 0, gPool = 0;
    let rows = "";
    for (const w of wallets[groupName]) {
      const data = (cachedData[groupName] && cachedData[groupName][w.label]) || null;
      if (!data) { rows += `<div class="wi"><span class="nm">${w.label}</span><span class="td">—</span></div>`; continue; }
      if (data.error) { rows += `<div class="wi"><span class="nm">${w.label}</span><span class="td err">ERR</span></div>`; continue; }
      const s = todayStats(data);
      gTx += s.txAll; gFeeTx += s.feeTx; gFee += s.feeSpent; gPool += s.poolReceived;
      rows += `<div class="wi">
        <span class="nm">${w.label}</span>
        <span class="td">
          <span class="l1"><b>${s.txAll}</b> tx · <span class="sp">−${s.spent.toFixed(2)}</span></span>
          <span class="fee">fee ${s.feeTx}× −${s.feeSpent.toFixed(2)}</span>
          ${s.poolTx ? `<span class="pool">pool +${s.poolReceived.toFixed(2)} (${s.poolTx}×)</span>` : ``}
          <span class="bal">saldo ${(data.balance||0).toFixed(2)}</span>
        </span></div>`;
    }
    html += `<div class="grp"><div class="gh"><b>${groupName}</b><span class="gt">fee ${gFeeTx}× −${gFee.toFixed(2)}${gPool?` · pool +${gPool.toFixed(2)}`:``}</span><span class="bd">${wallets[groupName].length}</span></div><div class="wallets">${rows}</div></div>`;
  }
  c.innerHTML = html || `<p class="muted">Belum ada wallet. Tambah di tab Wallet.</p>`;
}

// ===== RANGE FEE -> ORDERBOOK (maks 30 hari) + SALDO =====
async function runRange() {
  const sVal = $("rStart").value, eVal = $("rEnd").value;
  if (!sVal || !eVal) { status("❌ Pilih tanggal"); return; }
  const startIso = `${sVal}T00:00:00.000Z`, endIso = `${eVal}T23:59:59.999Z`;
  if (startIso > endIso) { status("❌ Mulai > akhir"); return; }
  const days = Math.round((Date.parse(eVal) - Date.parse(sVal)) / 86400000) + 1;
  if (days > 30) { status(`❌ ${days} hari — maks 30`); return; }
  const btn = $("rBtn"); btn.disabled = true;
  $("rangeResult").innerHTML = `<p class="muted">Menghitung...</p>`;
  let totalW = 0; Object.keys(wallets).forEach(g => totalW += wallets[g].length);
  let done = 0, grandTx = 0, grandFee = 0, blocks = [];
  for (const groupName of Object.keys(wallets)) {
    let rows = [], grpTx = 0, grpFee = 0;
    for (const w of wallets[groupName]) {
      status(`Range ${w.label}... ${++done}/${totalW}`);
      let feeTx = 0, feeTot = 0, balance = 0, err = null;
      try {
        balance = (await getBalance(w.party_id)).balance;
        const raw = await fetchTransfersUntil(w.party_id, w.label, startIso);
        for (const t of raw) {
          const sender = t.sender_address || t.sender || t.from || "";
          const receiver = t.receiver_address || t.receiver || t.to || "";
          const ts = t.created_at || t.timestamp || "";
          if (sender.includes(w.party_id) && receiver.includes(ORDERBOOK_FEE) && ts >= startIso && ts <= endIso) {
            feeTx++; feeTot += parseFloat(t.amount ?? t.value ?? 0) || 0;
          }
        }
      } catch (e) { err = e.message; }
      grpTx += feeTx; grpFee += feeTot;
      rows.push({ label: w.label, feeTx, feeTot, balance, err });
    }
    grandTx += grpTx; grandFee += grpFee;
    blocks.push({ groupName, rows, grpTx, grpFee });
  }
  let html = `<table><thead><tr><th>Wallet</th><th>Fee</th><th>Total CC</th><th>Saldo</th></tr></thead><tbody>`;
  for (const b of blocks) {
    html += `<tr class="grp"><td colspan="4">${b.groupName} — fee ${b.grpTx}× / ${b.grpFee.toFixed(2)} CC</td></tr>`;
    for (const r of b.rows) {
      html += r.err
        ? `<tr><td>${r.label}</td><td colspan="3" class="err" style="text-align:left">ERR ${r.err}</td></tr>`
        : `<tr><td>${r.label}</td><td>${r.feeTx}×</td><td class="feec">${r.feeTot.toFixed(4)}</td><td class="balc">${r.balance.toFixed(2)}</td></tr>`;
    }
  }
  html += `<tr class="tot"><td>TOTAL</td><td>${grandTx}×</td><td>${grandFee.toFixed(4)}</td><td>—</td></tr></tbody></table>
    <p class="muted">Rentang ${sVal} → ${eVal} (${days} hari, UTC). Saldo = saat ini.</p>`;
  $("rangeResult").innerHTML = html;
  btn.disabled = false;
  status(`✅ Range: fee ${grandTx}× · ${grandFee.toFixed(2)} CC`);
}

// ===== WALLET CRUD (in-app) =====
function renderWalletAdmin() {
  const sel = $("wGroup");
  sel.innerHTML = Object.keys(wallets).map(g => `<option>${g}</option>`).join("");
  let html = "";
  for (const groupName of Object.keys(wallets)) {
    let tags = wallets[groupName].map((w, i) =>
      `<span class="tag" title="${w.party_id}">${w.label}<b data-g="${cssId(groupName)}" data-i="${i}" class="rm">✕</b></span>`).join("");
    html += `<div class="adm-grp"><div class="adm-h"><b>${groupName}</b> <span class="bd">${wallets[groupName].length}</span>
      <button class="delg" data-g="${cssId(groupName)}">🗑 grup</button></div><div class="tags">${tags||'<span class="muted">kosong</span>'}</div></div>`;
  }
  $("walletAdmin").innerHTML = html;
  document.querySelectorAll("#walletAdmin .rm").forEach(el => el.addEventListener("click", () => {
    const gid = el.getAttribute("data-g"), i = +el.getAttribute("data-i");
    const groupName = Object.keys(wallets).find(g => cssId(g) === gid);
    if (groupName && confirm(`Hapus ${wallets[groupName][i].label}?`)) {
      wallets[groupName].splice(i, 1); persistWallets();
    }
  }));
  document.querySelectorAll("#walletAdmin .delg").forEach(el => el.addEventListener("click", () => {
    const gid = el.getAttribute("data-g");
    const groupName = Object.keys(wallets).find(g => cssId(g) === gid);
    if (groupName && confirm(`Hapus grup "${groupName}" (${wallets[groupName].length} wallet)?`)) {
      delete wallets[groupName]; persistWallets();
    }
  }));
}
function persistWallets() { save("wallets", wallets); renderWalletAdmin(); renderHarian(); status("✅ Wallet tersimpan"); }
function addWallet() {
  const g = $("wGroup").value, label = $("wLabel").value.trim(), pid = $("wPid").value.trim();
  if (!g || !label || !pid) { status("❌ Grup, label, party_id wajib"); return; }
  if (!wallets[g]) { status("❌ Grup tak ada"); return; }
  if (wallets[g].some(w => w.label === label)) { status(`❌ "${label}" sudah ada di ${g}`); return; }
  wallets[g].push({ label, party_id: pid });
  $("wLabel").value = ""; $("wPid").value = "";
  persistWallets();
}
function addGroup() {
  const name = $("wNewGroup").value.trim();
  if (!name) { status("❌ Nama grup wajib"); return; }
  if (wallets[name]) { status("❌ Grup sudah ada"); return; }
  wallets[name] = []; $("wNewGroup").value = "";
  persistWallets();
}
function resetWallets() {
  if (!confirm("Reset wallet ke default?")) return;
  wallets = JSON.parse(JSON.stringify(DEFAULT_WALLETS)); persistWallets();
}

// ===== EXPORT TXT (hari ini) =====
function buildTodayExport() {
  const cut = utcDayStartIso(), now = new Date(), L = [];
  L.push("CANTON DAILY — LAPORAN HARI INI (UTC)");
  L.push(`Generated: ${now.toISOString()}`);
  L.push(`Window   : ${cut} -> ${now.toISOString()} (reset 00:00 UTC)`);
  L.push(`fee=keluar ke orderbook-fee | pool=masuk dari supa-hecto-pool-1`);
  L.push("=".repeat(60));
  let gTx = 0, gFee = 0, gPool = 0;
  for (const groupName of Object.keys(cachedData)) {
    L.push(`\n#### ${groupName} ####`);
    let sTx = 0, sFee = 0, sPool = 0;
    for (const label of Object.keys(cachedData[groupName])) {
      const d = cachedData[groupName][label];
      if (d.error) { L.push(`- ${label}: ERROR ${d.error}`); continue; }
      const s = todayStats(d);
      sTx += s.txAll; sFee += s.feeSpent; sPool += s.poolReceived;
      L.push(`- ${label}: ${s.txAll} tx | habis ${s.spent.toFixed(4)} | fee ${s.feeTx}x/${s.feeSpent.toFixed(4)} | pool +${s.poolReceived.toFixed(4)} | saldo ${(d.balance||0).toFixed(4)} CC`);
      for (const t of s.today) {
        const tag = (t.isOut && (t.to||"").includes(ORDERBOOK_FEE)) ? " [FEE]" : (!t.isOut && (t.from||"").includes(HECTO_POOL)) ? " [POOL]" : "";
        L.push(`    ${(t.timestamp||"").slice(11,19)} ${t.isOut?"OUT":"IN "} ${t.amount.toFixed(6)}${tag}  ${t.from} -> ${t.to}`);
      }
    }
    L.push(`  >> Subtotal: ${sTx} tx | fee ${sFee.toFixed(4)} | pool +${sPool.toFixed(4)} CC`);
    gTx += sTx; gFee += sFee; gPool += sPool;
  }
  L.push("\n" + "=".repeat(60));
  L.push(`TOTAL: ${gTx} tx | fee ${gFee.toFixed(4)} | pool +${gPool.toFixed(4)} CC`);
  return L.join("\n");
}
function exportTxt() {
  if (!Object.keys(cachedData).length) { status("❌ Scan dulu"); return; }
  const text = buildTodayExport();
  $("exportText").value = text;
  $("exportModal").style.display = "flex";
}
function copyExport() {
  const ta = $("exportText");
  ta.select();
  try { navigator.clipboard.writeText(ta.value); status("✅ Tersalin"); }
  catch { document.execCommand("copy"); status("✅ Tersalin"); }
}
function downloadExport() {
  const blob = new Blob([$("exportText").value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const d = new Date();
  a.href = url; a.download = `canton-today-${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}-${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}utc.txt`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

// ===== NOTIFIKASI INTEGRATION =====
function updateNotificationUI() {
  const stats = walletNotifications.getNotificationStats();
  const statsEl = $("notifStats");
  if (statsEl) {
    statsEl.innerHTML = `
      <span class="stats-badge">📢 Total: ${stats.total}</span>
      <span class="stats-badge">📅 Hari ini: ${stats.today}</span>
      <span class="stats-badge">👁️ Dipantau: ${stats.wallets}</span>
      <span class="stats-badge">${stats.monitoring ? '🟢 Aktif' : '🔴 Berhenti'}</span>
    `;
  }
  walletNotifications.renderMonitoredWallets();
  walletNotifications.renderNotificationHistory();
}

function populateMonitorSelectFromWallets() {
  const sel = $("addMonitorSelect");
  if (!sel) return;
  let opts = `<option value="">Pilih wallet dari daftar...</option>`;
  for (const groupName of Object.keys(wallets)) {
    for (const w of wallets[groupName]) {
      opts += `<option value="${w.party_id}|${w.label}|${groupName}">${groupName} - ${w.label}</option>`;
    }
  }
  sel.innerHTML = opts;
}

// ===== TABS + INIT =====
function showTab(name) {
  ["harian", "range", "notifikasi", "wallet"].forEach(t => {
    const tab = $("tab-" + t);
    const btn = $("btn-" + t);
    if (tab) tab.style.display = t === name ? "block" : "none";
    if (btn) btn.classList.toggle("active", t === name);
  });
  if (name === "wallet") renderWalletAdmin();
  if (name === "notifikasi") {
    populateMonitorSelectFromWallets();
    updateNotificationUI();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  $("rEnd").value = new Date().toISOString().slice(0, 10);
  $("rStart").value = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  renderHarian();
  populateMonitorSelectFromWallets();

  // Scan & Export
  $("scanBtn").addEventListener("click", scanAll);
  $("exportBtn").addEventListener("click", exportTxt);
  $("rBtn").addEventListener("click", runRange);

  // Wallet Management
  $("addWalletBtn").addEventListener("click", addWallet);
  $("addGroupBtn").addEventListener("click", addGroup);
  $("resetBtn").addEventListener("click", resetWallets);
  $("copyExportBtn").addEventListener("click", copyExport);
  $("dlExportBtn").addEventListener("click", downloadExport);
  $("closeModalBtn").addEventListener("click", () => $("exportModal").style.display = "none");

  // Notification Controls
  $("reqPermBtn").addEventListener("click", async () => {
    const granted = await walletNotifications.requestNotificationPermission();
    status(granted ? "✅ Izin notifikasi diberikan" : "❌ Izin ditolak");
  });

  $("startMonitorBtn").addEventListener("click", () => {
    walletNotifications.startMonitoring(30000); // Cek setiap 30 detik
    status("✅ Pantau dimulai");
    updateNotificationUI();
  });

  $("stopMonitorBtn").addEventListener("click", () => {
    walletNotifications.stopMonitoring();
    status("⏹ Pantau dihentikan");
    updateNotificationUI();
  });

  $("addMonitorBtn").addEventListener("click", () => {
    const sel = $("addMonitorSelect");
    const val = sel.value;
    if (!val) { status("❌ Pilih wallet"); return; }
    const [party_id, label, groupName] = val.split("|");
    if (walletNotifications.addMonitoredWallet(party_id, label, groupName)) {
      status(`✅ ${label} ditambah ke pantauan`);
      sel.value = "";
      updateNotificationUI();
    } else {
      status(`❌ ${label} sudah dipantau`);
    }
  });

  // Tabs
  $("btn-harian").addEventListener("click", () => showTab("harian"));
  $("btn-range").addEventListener("click", () => showTab("range"));
  $("btn-notifikasi").addEventListener("click", () => showTab("notifikasi"));
  $("btn-wallet").addEventListener("click", () => showTab("wallet"));

  // Initial UI update
  updateNotificationUI();
});
