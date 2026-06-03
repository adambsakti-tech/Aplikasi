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
    { label: "hecto-10", party_id: "supa1::12202a0bbdaa955be290d73750f1a35f1a8f5c385c10db094c3c1b28165f9cb55b1d" },
    { label: "hecto-11", party_id: "supa1::122066e1a224cf9acf6fca64b949b6c96a71987cc7c20c81d3a2b55d2a7610e7e793" },
    { label: "hecto-12", party_id: "supa1::12201621bcb3420e7f9cf95bc9637395d53fef88a3fb369ab056d881654ed807c4e4" },
    { label: "hecto-13", party_id: "supa1::12209444c643c99a12ea276fcec587d1f706262c6bda1a955a7088c5ce1fe0178ea7" },
    { label: "hecto-14", party_id: "supa1::12201ddd750d3c0e61525ecfc9b29b900b84c649521ed48e9dd709172f29f7e782f1" },
    { label: "hecto-15", party_id: "supa1::122036b71b9d2d71f413717b67404824714904d92e40632d47760b34c931fe13328b" },
    { label: "hecto-16", party_id: "supa1::12203565d74a1bc07aa771753d26402f153e5727472da8b3b26a2f48216a69fa641c" },
    { label: "hecto-17", party_id: "supa1::1220298919e41a080297256dcee717237289d7dada2fe25c8da851ebf6a0ecc23b71" },
    { label: "hecto-18", party_id: "supa1::12201c148e74394636c70dd1f8f6bd36c1cac43ccd9af8247d84e48a759edb95008e" },
    { label: "hecto-19", party_id: "supa1::1220613d199a3298decb727f902d16bc8ac055cdd62882d7b21aeda97f363b37b26c" },
    { label: "hecto-20", party_id: "supa1::1220e64845baebff7d77ce4c87dc4488ff0834058dd0b9f28b8e0f31aee0658fee59" },
    { label: "hecto-21", party_id: "supa1::1220c47b72414644ed9eb873ea2021e1c58df092dcd96354cd5c911241fc738ccf49" },
    { label: "hecto-22", party_id: "supa1::1220acaecc7d9ee8cdebd1d80bd018f53223d4a6693ebc103a8cba3d293093dc0760" },
    { label: "hecto-23", party_id: "supa1::1220ab1f4ce1641288edc322dd94ec7b9eddfdae08f863fbe8d248e4498c8b072a59" },
    { label: "hecto-24", party_id: "supa1::1220c81f392727e754edef3d97a4205e9aa0a19fb2d17d5381e9e33852f34c42ed36" },
    { label: "hecto-25", party_id: "supa1::1220d01865c91b2b848ec9e5264977681d6f3600ca49645e7cd802f0040201bff19d" },
    { label: "hecto-26", party_id: "supa1::12203a710ec53007fdd634b45e3a8e605b35aee9cc5f406ff2eb342cc1ed14dce02f" },
    { label: "hecto-27", party_id: "supa1::12202c26a9ece0a77226cfb961ce1ece8c0e9bceabbd95b300a3cc616931dfe65ab5" },
    { label: "hecto-28", party_id: "supa1::12208ad88ad97804ef0a8009fb5b2ba2b875d6a664ed4c425b573f76d7126f0d8c97" },
    { label: "hecto-29", party_id: "supa1::1220433b9c74f7c7e71dba959a01bc6eee219fed32873c252746b4484d921a90f651" },
    { label: "hecto-30", party_id: "supa1::122098b343ec67d8262537230ae77583b7f7b7ea997618d276967b1f7015c032adb4" },
    { label: "hecto-31", party_id: "supa1::122017cedf6726025e84451f58cc623b5325537a43eaf0271ec57b79b68aeccac694" },
    { label: "hecto-32", party_id: "supa1::1220c7c49846f4bc0aeed93f93af9fadd127b109ee1cce8b22bcd4b277a222ddf9db" },
    { label: "hecto-33", party_id: "supa1::122095bd76098fd851b255c0e7897ef56e065f61de02cdd9d8ab0f2f065ad117c186" },
    { label: "hecto-34", party_id: "supa1::12201a6b1a36a40d9b7adf1cd4a71589f02a56c11ace4ff51d37749200a7ff8bb33a" },
    { label: "hecto-35", party_id: "supa1::1220c248048ed081f35c41e6f9aa4202e7d30c829139c477084981b97669afe637ec" },
    { label: "hecto-36", party_id: "supa1::1220df903e3cc06946986749a09133d7c9a809a98084999cae6816068b0ace92c660" },
    { label: "hecto-37", party_id: "supa1::122083eea5651b5a09103ca35e2d6fb56c735dfb9435eea61b5c684b53d7dc19a36b" },
    { label: "hecto-38", party_id: "supa1::122033f8398b4ff65804235d208555e9db673ab60cc53858ee98a21f0c5f5721ed09" },
    { label: "hecto-39", party_id: "supa1::12207502824fa11cedccf334db4720c513973d6bf406d5a08dccf09f5c00ca0e9f78" },
    { label: "hecto-40", party_id: "supa1::12200789c6c5933c4f08d952099332d6788d5e33134c07fc7f970256d3ace45b37d1" },
    { label: "hecto-41", party_id: "supa1::1220598deeec1c8469108c5bab5c6bff61a24743a37e4db3b84eabbe21011f03fa7c" },
    { label: "hecto-42", party_id: "supa1::12208ad88ad97804ef0a8009fb5b2ba2b875d6a664ed4c425b573f76d7126f0d8c97" },
    { label: "hecto-43", party_id: "supa1::122082e27f4903433c96d116522bf70717e1851dc911d7edffd64dd62edfd33b8148" },
    { label: "hecto-44", party_id: "supa1::12208787d2858aef7069d68e26f2389835ef719f1c5f799c8b4de83eb35a2b02c137" },
    { label: "hecto-45", party_id: "supa1::12201ef49824a7a7b6e58902656c3dca5a587396e9fe36d549763ba11d781813e1eb" },
    { label: "hecto-46", party_id: "supa1::1220e0f66293f9a09f5183e40e692dc4348cd70db937c2f209691e6580f352840011" },
    { label: "hecto-47", party_id: "supa1::1220dd408efeb8b7bdc9fa272f901a2ca81838f96a30d58c77c77eb356e2404a3dcb" },
    { label: "hecto-48", party_id: "supa1::1220de5570cf765158db76f171adb47bff7e5d6c343de366d20e80d7e948482fb1fb" },
    { label: "hecto-49", party_id: "supa1::12204e34816949be72bfa1bb7013e54d116376b97ce51372b6fc4f9b399eef03d3a1" },
    { label: "hecto-50", party_id: "supa1::12203618022af64d7840781f8e250def972565eefff7f2705822227465d74afcffd0" },
    { label: "hecto-51", party_id: "supa1::12209ad5ef7e4184e88c59e3205619b0dfbce8233b59842488162bdf6865824b3f65" },
    { label: "hecto-52", party_id: "supa1::12201920e1f70606cbcd0f8c79cc47f12552086cb75aa23cdd22e88a20fddedc8a1d" },
    { label: "hecto-53", party_id: "supa1::12209be3236f26de57e5b9a4ec513a0b445b154985de21b79539d936a31d1cedb94d" },
    { label: "hecto-54", party_id: "supa1::122082e27f4903433c96d116522bf70717e1851dc911d7edffd64dd62edfd33b8148" },
    { label: "hecto-55", party_id: "supa1::122066ee1fc29adeaff030b7cfe0aa6c71daa89f6d769d569e048ec3ef916c6be131" }
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
    html += `<div class="grp"><div class="gh"><b>${groupName}</b><span class="gt">fee ${gFeeTx}× −${gFee.toFixed(2)}${gPool?` · pool +${gPool.toFixed(2)}`:``}</span><span class="bd">${wallets[groupName].length}</span></div>${rows}</div>`;
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
  // bind remove wallet
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

// ===== TABS + INIT =====
function showTab(name) {
  ["harian", "range", "wallet"].forEach(t => {
    $("tab-" + t).style.display = t === name ? "block" : "none";
    $("btn-" + t).classList.toggle("active", t === name);
  });
  if (name === "wallet") renderWalletAdmin();
}
document.addEventListener("DOMContentLoaded", () => {
  $("rEnd").value = new Date().toISOString().slice(0, 10);
  $("rStart").value = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  renderHarian();
  $("scanBtn").addEventListener("click", scanAll);
  $("exportBtn").addEventListener("click", exportTxt);
  $("rBtn").addEventListener("click", runRange);
  $("addWalletBtn").addEventListener("click", addWallet);
  $("addGroupBtn").addEventListener("click", addGroup);
  $("resetBtn").addEventListener("click", resetWallets);
  $("copyExportBtn").addEventListener("click", copyExport);
  $("dlExportBtn").addEventListener("click", downloadExport);
  $("closeModalBtn").addEventListener("click", () => $("exportModal").style.display = "none");
  $("btn-harian").addEventListener("click", () => showTab("harian"));
  $("btn-range").addEventListener("click", () => showTab("range"));
  $("btn-wallet").addEventListener("click", () => showTab("wallet"));
});
