# Keputusan Desain — LaundryCalc (Laundry UMKM)

Dokumen ini mencatat pilihan desain yang disetujui pada rencana implementasi serta token visual yang dipakai di seluruh komponen.

## Keputusan Desain

| Keputusan | Pilihan Dipakai |
| :--- | :--- |
| Kesan visual | Ramah dan hangat (`Plus Jakarta Sans`, ketebalan 400, 500, 600) |
| Warna aksen | Hijau (`emerald`: tombol `bg-emerald-700`, hover `bg-emerald-800`, terpilih `bg-emerald-50` & `border-emerald-700`, teks aksen `text-emerald-700`) |
| Sapaan pengguna | Anda |
| Susunan halaman | Satu halaman bergulir (satu kolom di ponsel, dua kolom proporsional di layar desktop) |
| Posisi aksi utama | Bar yang menempel di bawah layar (*sticky bottom bar*) pada ponsel, panel ringkasan menempel di sisi kanan pada layar desktop |
| Gambar | Tanpa gambar |

## Token Visual & Aturan Tampilan

- **Permukaan**: Latar halaman `bg-neutral-50`, kartu dan panel `bg-white`, garis tepi `border-neutral-200` khusus untuk input, daftar/tabel, dan pemisah (tanpa kartu di dalam kartu).
- **Sudut**: Kartu dan panel `rounded-2xl`, tombol dan input `rounded-xl`.
- **Bayangan**: Hanya untuk bar ringkasan melayang (`shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`).
- **Teks**: Utama `text-neutral-900`, pendukung `text-neutral-600`, placeholder `text-neutral-500`. Angka memakai `tabular-nums`.
- **Status**: Pasangan warna `-800` dan `-50` dengan label teks dan ikon (amber untuk info *minimum charge* 3 kg, merah untuk validasi error).
- **Aksesibilitas**: Dirancang mulai lebar `360 px`, aksi utama terlihat tanpa menggulir pada `360 × 740 px`, tinggi bar bawah pada ponsel dijaga ringkas (di bawah 15% tinggi layar), area sentuh minimal `44 × 44 px`, teks input minimal `16 px`, dan cincin fokus `focus-visible` 2 px warna aksen.
