# Tamu & Ucapan

Di sini kamu bisa melihat setiap tamu yang sudah merespons undanganmu, melacak RSVP, dan membaca ucapan yang mereka kirimkan.

Buka dari **Dashboard → Tamu & Ucapan** di sidebar.

---

## Ringkasan Statistik

Di bagian atas halaman kamu akan melihat ringkasan cepat:

| Statistik             | Yang ditampilkan                                             |
| --------------------- | ------------------------------------------------------------ |
| **Total Tamu**        | Jumlah total entri tamu (yang ditambahkan + yang merespons). |
| **Hadir**             | Jumlah tamu yang mengkonfirmasi kehadiran.                   |
| **Tidak Hadir**       | Jumlah tamu yang menyatakan tidak bisa hadir.                |
| **Mungkin**           | Tamu yang merespons tapi belum yakin.                        |
| **Menunggu**          | Tamu yang sudah ditambahkan tapi belum merespons.            |
| **Total Jumlah Tamu** | Jumlah total kursi/orang dari semua respons RSVP yang masuk. |

---

## Status Kehadiran

RSVP setiap tamu menampilkan salah satu dari empat status:

| Status          | Arti                                                               |
| --------------- | ------------------------------------------------------------------ |
| **Menunggu**    | Tamu sudah ditambahkan tapi belum membuka undangan atau merespons. |
| **Hadir**       | Tamu mengkonfirmasi akan hadir.                                    |
| **Mungkin**     | Tamu membuka undangan dan merespons, tapi belum yakin.             |
| **Tidak Hadir** | Tamu mengkonfirmasi tidak bisa hadir.                              |

---

## Menambahkan Tamu Lebih Awal

Kamu bisa menambahkan daftar tamu **sebelum** hari pernikahan. Ini berguna agar kamu bisa membuat link undangan personal yang sudah menyertakan nama setiap tamu.

::: info
Kamu bisa menambahkan hingga **500 tamu** per undangan.
:::

Ada dua cara menambahkan tamu:

### Tempel Daftar

Ketik atau tempel semua nama tamu ke kolom teks — satu nama per baris. Cocok jika kamu sudah punya daftar di spreadsheet atau dokumen.

```
Budi Santoso
Ani Rahayu
Pak Hasan
```

### Tambah Satu per Satu

Tambahkan tamu satu per satu menggunakan kolom input. Cocok untuk kelompok kecil atau saat kamu ingin memeriksa setiap nama.

### Deteksi Duplikat

Saat menambahkan tamu, sistem secara otomatis memeriksa duplikat. Jika sebuah nama sudah ada di daftar tamumu, atau muncul lebih dari sekali dalam batch yang kamu input, nama tersebut akan ditandai sebelum disimpan. Kamu bisa meninjau dan menghapus duplikat sebelum mengkonfirmasi.

---

## Generator Pesan WhatsApp

Di samping setiap tamu di tabel terdapat dua tombol salin:

- **Salin Pesan WhatsApp** — Menyalin pesan WhatsApp siap kirim ke clipboard, termasuk sapaan hangat, ringkasan acara, dan link undangan personal. Jika kamu sudah mengatur template WA kustom untuk undangan tersebut, template itu yang digunakan; jika tidak, pesan default yang dikirim.
- **Salin Link** — Menyalin hanya link undangan personal (misalnya `alwaninvite.my.id/invite/slug-kamu?to=NamaTamu`) ke clipboard, tanpa teks pesan tambahan.

Tinggal buka WhatsApp, tempel pesan di chat tamu tersebut, dan kirim. Link undangan sudah menyertakan nama mereka, sehingga saat dibuka mereka langsung melihat sapaan personal.

---

## Template Pesan WhatsApp

Kamu bisa menyesuaikan pesan undangan WhatsApp default untuk setiap undangan. Klik tombol **"Atur Template WA"** (ikon pengaturan di header halaman) untuk membuka editor template.

**Variabel yang tersedia:**

| Variabel  | Diganti dengan         |
| --------- | ---------------------- |
| `[guest]` | Nama tamu              |
| `[link]`  | Link undangan personal |

Editor ini dilengkapi:

- **Pratinjau langsung** yang menampilkan persis seperti apa pesan untuk tamu contoh.
- **Template siap pakai** dalam Bahasa Indonesia dan Inggris (formal, semi-formal, dan kasual) yang bisa diterapkan dengan sekali klik.
- Tombol **Sisipkan Variabel** untuk menambahkan `[guest]` atau `[link]` di posisi kursor.
- Tombol **Reset ke Default** untuk memulihkan template awal.

Template kustom disimpan per undangan. Jika kamu punya beberapa undangan, masing-masing bisa memiliki template sendiri.

---

## Filter, Pencarian & Pengurutan

Gunakan filter di bagian atas tabel tamu untuk menyaring daftar:

| Filter                          | Fungsinya                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| **Cari berdasarkan nama**       | Temukan tamu tertentu dengan mengetik namanya (juga mencari pesan ucapan).                    |
| **Filter berdasarkan status**   | Tampilkan hanya tamu dengan status kehadiran tertentu (Hadir, Tidak Hadir, dll).              |
| **Filter berdasarkan undangan** | Jika kamu punya beberapa undangan, filter tamu berdasarkan undangan mana yang mereka respons. |

Kamu juga bisa **mengurutkan** tabel dengan mengklik header kolom mana saja (Tanggal, Nama Tamu, Kehadiran, atau Jumlah Tamu). Klik header lagi untuk membalik urutan.

---

## Ekspor ke CSV

Klik **"Ekspor"** untuk mengunduh semua data tamu dan RSVP sebagai file spreadsheet (.csv).

File yang diekspor mencakup:

- Tanggal respons
- Nama tamu
- Status kehadiran
- Jumlah tamu yang dibawa
- Pesan ucapan mereka
- Undangan mana yang mereka respons

File diberi nama `wishes-[tanggal hari ini].csv`. Bisa dibuka di Excel, Google Sheets, atau aplikasi spreadsheet apapun. Berguna untuk mencetak denah tempat duduk atau dibagikan ke wedding organizer.

---

## Hapus Massal

Kamu bisa memilih beberapa tamu sekaligus dan menghapus semuanya sekaligus. Gunakan kotak centang di setiap baris, lalu klik **"Hapus yang Dipilih"**.

::: warning
Menghapus data tamu secara massal bersifat permanen dan tidak bisa dibatalkan.
:::

---

**Sebelumnya:** [← Mengelola Undangan](./managing-invitations) | **Selanjutnya:** [Perpustakaan Media →](./media-library)
