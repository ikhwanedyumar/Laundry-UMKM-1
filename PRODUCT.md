# Daftar Fitur dan Produk — LaundryCalc (Laundry UMKM)

Dokumen ini merangkum fitur dari PRD v1.1 (3 November 2026), urutan pengerjaan, ketergantungan antarfitur, serta keputusan atas hal yang sebelumnya ambigu atau belum diatur di PRD.

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | - | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | - | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-01, FT-02, FT-03, FT-04, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | - | Ditunda |

## Hal Ambigu dan Keputusan Terkonfirmasi

1. **Identitas & Nomor WhatsApp Toko (`store_info`)**
   - *Masalah di PRD*: Nomor WhatsApp masih tertulis placeholder `628xxxxxxxxxx` dan nama toko tertulis `Laundry UMKM`.
   - *Keputusan pengguna*: Menggunakan nama toko **Laundry UMKM** dengan nomor contoh `6281234567890` di konfigurasi aplikasi.

2. **Format Penulisan Rupiah**
   - *Masalah di PRD*: Bagian rumus BL-02 menulis tanpa spasi (`Rp45.000`), sedangkan bagian katalog, acceptance criteria, dan template WhatsApp menulis dengan spasi (`Rp 6.000`).
   - *Keputusan pengguna*: Menyeragamkan format **Rp dengan spasi** di seluruh aplikasi dan pesan WhatsApp (contoh: `Rp 6.000`).

3. **Nilai Awal Kolom Berat & Validasi Desimal**
   - *Masalah di PRD*: PRD mewajibkan langkah `0,1` kg dan batas minimal `0,1` kg, namun belum mengatur nilai awal saat halaman dibuka serta aturan jika pengguna mengetik lebih dari satu angka desimal.
   - *Keputusan pengguna*: Kolom berat dimulai dalam kondisi **kosong**, menerima koma maupun titik, dan divalidasi sebagai **kelipatan 0,1 kg** (minimal `0,1` kg).

4. **Status FT-07**
   - *Keputusan pengguna*: Fitur **FT-07 (Info Jam Operasional Toko)** ditandai **Ditunda** dan tidak dibangun pada tahap ini.
