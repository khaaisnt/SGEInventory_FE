# SGEInventory FE

Frontend aplikasi inventaris SGE untuk mengelola barang, peminjaman, dan penitipan barang. Aplikasi menyediakan halaman untuk pengguna dan administrator, yang terhubung ke backend melalui REST API.

## Fitur

### Pengguna

- Melihat katalog barang.
- Mengajukan peminjaman barang dan penitipan barang.
- Melihat status dan riwayat pengajuan.
- Mengajukan pengembalian barang dengan mengunggah foto.

### Administrator

- Melihat ringkasan jumlah pengajuan peminjaman dan penitipan.
- Mengelola data barang.
- Meninjau, menyetujui, atau menolak pengajuan peminjaman dan penitipan.
- Meninjau dan memproses pengajuan pengembalian barang.

## Teknologi

- Next.js 16 dengan App Router
- React 19 dan TypeScript
- Tailwind CSS 4
- TanStack Query untuk pengelolaan data server
- Axios untuk request ke backend
- React Hook Form dan Yup untuk formulir dan validasi
- Iconify untuk ikon

## Persyaratan

- Node.js 20.9 atau yang lebih baru
- npm
- Backend SGEInventory yang dapat diakses dari lingkungan frontend

## Menjalankan secara lokal

1. Install dependency:

   ```bash
   npm ci
   ```

2. Salin template environment:

   ```powershell
   Copy-Item env.example .env.local
   ```

3. Isi variabel environment di `.env.local`:

   | Variabel | Keterangan |
   | --- | --- |
   | `NEXT_PUBLIC_BASE_URL` | URL dasar API backend yang digunakan frontend. |
   | `CHIPER_KEY` | Secret untuk proses JWT di aplikasi. Gunakan nilai rahasia yang sesuai untuk lingkungan lokal/deployment. |

   Jangan commit `.env.local` atau membagikan nilai secret.

4. Jalankan development server:

   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3001](http://localhost:3001).

## Perintah npm

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan development server pada port `3001`. |
| `npm run lint` | Menjalankan ESLint. |
| `npm run build` | Membuat production build. |
| `npm start` | Menjalankan production build pada port `3001`. Jalankan `npm run build` terlebih dahulu. |

## Struktur direktori

```text
app/
  administrator/   Halaman dashboard dan pengelolaan untuk administrator
  user/            Halaman katalog, pengajuan, dashboard, dan riwayat pengguna
components/
  atoms/           Komponen UI dasar
  layout/          Komponen layout dan navigasi
  molecules/       Komponen UI gabungan
hooks/             Custom React hooks
lib/               Konfigurasi dan utilitas, termasuk Axios
types/             Tipe TypeScript bersama
```

## API dan gambar

Request API menggunakan `NEXT_PUBLIC_BASE_URL` sebagai base URL. Gambar eksternal dari `res.cloudinary.com` diizinkan melalui konfigurasi `next/image` pada `next.config.ts`.
