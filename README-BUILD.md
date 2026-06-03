# Canton Daily — Build APK dari HP (tanpa PC)

Compile dilakukan di server GitHub (gratis). Kamu cuma upload kode lewat browser HP,
tunggu beberapa menit, lalu download APK-nya. Tidak perlu Android Studio / PC.

## Langkah

1. Buat akun di github.com (kalau belum), login dari browser HP.
2. Klik **+** (kanan atas) → **New repository**.
   - Nama bebas, mis. `canton-daily`. Set **Private** kalau mau. Klik **Create**.
3. Di halaman repo kosong → **uploading an existing file** (atau Add file → Upload files).
   - Upload SEMUA isi folder ini:
     `package.json`, `capacitor.config.json`, folder `www/`, folder `.github/`,
     dan README ini.
   - Catatan: di GitHub mobile web, masuk ke tiap folder lewat "Add file → Create new file"
     dengan path lengkap (mis. ketik `www/app.js` sebagai nama file lalu tempel isinya),
     atau pakai GitHub Desktop/laptop teman sekali saja. Cara paling gampang dari HP:
     buka github.com versi desktop di Chrome → Upload files → drag folder.
   - Commit changes.
4. Begitu file ke-push, tab **Actions** otomatis jalan ("Build Android APK").
   Kalau tidak jalan: tab **Actions** → pilih workflow → **Run workflow**.
5. Tunggu sampai centang hijau (~3–6 menit). Buka run tersebut → bagian **Artifacts** →
   download **canton-daily-apk** (berisi `app-debug.apk`).
6. Install di HP: buka file APK → kalau diminta, izinkan **Install unknown apps**
   untuk browser/file manager → Install.

## Update aplikasi nanti
Edit file (mis. `www/app.js`) langsung di GitHub → commit → Actions build ulang →
download APK baru.

## Catatan teknis
- CORS aman: `CapacitorHttp` (enabled di capacitor.config.json) mem-patch `fetch`
  jadi request native, jadi tidak kena blokir CORS seperti di browser biasa.
- APK ini build **debug** (belum ditandatangani untuk Play Store, tapi bisa diinstall
  langsung). Untuk rilis Play Store butuh signing — bisa ditambah nanti.
- Data wallet & hasil scan disimpan lokal di HP (localStorage app).
