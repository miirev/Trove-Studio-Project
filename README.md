Trove Studio Project (minishop2)

Trove Studio adalah aplikasi web toko online modern yang dirancang ringan, responsif, dan mudah digunakan. Proyek ini dibangun untuk memberikan pengalaman berbelanja *online* yang cepat dan intuitif.

##  Fitur Utama

* **Katalog Produk Interaktif**: Menampilkan daftar produk lengkap dengan gambar, harga, dan deskripsi ringkas.
* **Manajemen Keranjang Belanja**: Menambah, mengubah jumlah, dan menghapus item produk secara *real-time*.
* **Kalkulasi Total Otomatis**: Perhitungan otomatis untuk subtotal dan total belanjaan.
* **Desain Responsif**: Tampilan antarmuka yang menyesuaikan secara optimal di perangkat desktop, tablet, maupun *smartphone*.
* **Deployment Otomatis**: Terintegrasi langsung dengan Vercel untuk CI/CD yang cepat.

## Cara Instalasi
1. Pastikan aplikasi **Node.js** sudah terpasang di komputer Anda.
2. Buka folder proyek aplikasi yang sudah diunduh atau diekstrak.
3. Buka aplikasi terminal atau aplikasi pengolah kode (seperti VS Code) di folder tersebut.
4. Pasang seluruh pustaka dan modul aplikasi dengan perintah pemasangan bawaan (`npm install`).
5. Jalankan server lokal aplikasi (`npm run dev`).
6. Buka peramban (browser) dan buka alamat lokal yang ditunjukkan untuk melihat tampilan aplikasi.

## Struktur Folder Proyek
## 📁 Struktur Folder Proyek

```text
minishop2/
├── public/              # Aset statis (favicon, gambar umum, dll.)
├── src/                 # Kode sumber utama aplikasi
│   ├── assets/          # Aset gambar, ikon, dan media proyek
│   ├── components/      # Komponen UI modular (Navbar, Card, Footer, dll.)
│   ├── pages/           # Halaman utama aplikasi (Home, Cart, Checkout)
│   ├── styles/          # File styling/CSS global
│   ├── App.jsx          # Komponen utama aplikasi
│   └── main.jsx         # Entry point aplikasi React / Vite
├── .gitignore           # Daftar file/folder yang diabaikan oleh Git
├── index.html           # File HTML utama
├── package.json         # Manifest proyek dan daftar dependensi
├── vite.config.js       # Konfigurasi bundler Vite
└── README.md            # Dokumentasi proyek
```
