
# 🧶 e3a-Crochet

e3a-Crochet adalah aplikasi mobile berbasis Expo React Native untuk toko online produk rajutan. Aplikasi ini menyediakan fitur katalog produk, kategori, keranjang belanja, favorit, dan autentikasi pengguna.

## Fitur Utama

- Browsing produk rajutan berdasarkan kategori
- Detail produk lengkap
- Keranjang belanja
- Daftar produk favorit
- Registrasi, login, dan reset password
- Profil pengguna

## Struktur Proyek

- `app/` — Halaman dan routing utama
  - `(auth)/` — Layar autentikasi (Login, Register, OTP, Reset Password)
  - `(tabs)/` — Navigasi tab (Kategori, Favorit, Profil)
  - `category/` — Detail kategori
  - `product/` — Detail produk
- `components/` — Komponen UI (Card, Button, Input, dsb)
- `context/` — Context API untuk Auth, Cart, dan Favorites
- `lib/` — API dan utilitas
- `styles/` — Konfigurasi warna dan style
- `assets/` — Gambar dan aset statis

## Instalasi & Menjalankan

1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan aplikasi:
   ```bash
   npx expo start
   ```

Aplikasi dapat dijalankan di emulator Android/iOS, Expo Go, atau development build.

## Konfigurasi

- Pastikan Node.js dan npm sudah terinstall
- Untuk pengembangan, edit file di folder `app/` dan `components/`

## API

Project ini menggunakan API berikut:
- [https://69023f38b208b24affe599f8.mockapi.io/api](https://69023f38b208b24affe599f8.mockapi.io/api)

### Cara Penggunaan API

Contoh request untuk mendapatkan daftar produk:

```js
fetch('https://69023f38b208b24affe599f8.mockapi.io/api/products')
   .then(response => response.json())
   .then(data => {
      console.log(data);
   });
```

Contoh request untuk menambah produk ke keranjang:

```js
fetch('https://69023f38b208b24affe599f8.mockapi.io/api/cart', {
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
   },
   body: JSON.stringify({ productId: '1', quantity: 2 })
})
   .then(response => response.json())
   .then(data => {
      console.log(data);
   });
```

## Kontribusi

Pull request dan issue sangat diterima untuk pengembangan fitur baru atau perbaikan bug.

## Lisensi

MIT
