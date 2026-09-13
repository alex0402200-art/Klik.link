# Klik.link — Setup Full dari HP (Tanpa Laptop, Tanpa CLI)

## 1. Bikin repo GitHub

1. Buka github.com lewat browser HP, login
2. Bikin repo baru (misal nama `klik-link`)
3. Upload semua file/folder di project ini ke repo itu
   (bisa lewat tombol "Add file" > "Upload files" di web GitHub)
4. Pastikan strukturnya tetap:
   ```
   public/index.html
   functions/api/shorten.js
   functions/[slug].js
   schema.sql
   ```

## 2. Bikin database D1 (lewat dashboard, gak perlu CLI)

1. Buka dash.cloudflare.com > **Workers & Pages** > tab **D1**
2. Klik **Create database**, kasih nama misal `klik-link-db`
3. Setelah dibuat, klik databasenya > tab **Console**
4. Copy isi file `schema.sql` (yang ada di project ini), paste ke Console, jalankan

## 3. Bikin project Pages dari GitHub

1. Di dashboard Cloudflare > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
2. Pilih repo `klik-link` yang tadi
3. Build settings: kosongkan build command, isi **Output directory** dengan `public`
4. Klik **Save and Deploy**

## 4. Hubungkan D1 ke project Pages

1. Buka project Pages yang baru dibuat > **Settings** > **Functions**
2. Scroll ke **D1 database bindings** > **Add binding**
3. Variable name: `DB` (harus persis ini, sesuai kode)
4. Pilih database `klik-link-db`
5. Save, lalu klik **Retry deployment** biar binding-nya aktif

## 5. Selesai!

Buka URL project Pages kamu (format `klik-link.pages.dev`), langsung bisa
dipakai bikin shortlink dari HP.

## Kalau mau edit tampilan/kode nanti

Tinggal buka file-nya langsung di GitHub (web, ada tombol edit pensil ✏️),
edit, commit — Cloudflare otomatis re-deploy dalam beberapa detik.

## Kalau mau custom domain nanti

Project Pages > **Custom domains** > tambahkan domain yang sudah aktif di
akun Cloudflare kamu.
