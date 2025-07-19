# 📌 To-Do List - Aplikasi Forum Diskusi

## ✅ Kriteria Utama 1: Fungsionalitas Aplikasi

- [x] **Authentication**
  - [x] Membuat fitur pendaftaran akun.
  - [x] Membuat fitur login akun.

- [x] **Thread Management**
  - [x] Menampilkan daftar thread.
  - [x] Menampilkan detail thread beserta komentar.
  - [x] Pengguna dapat membuat thread.
  - [x] Pengguna dapat menambahkan komentar dalam thread.

- [x] **UI/UX**
  - [x] Menampilkan loading bar saat memuat data dari API.

- [x] **Informasi pada Halaman Daftar Thread**
  - [x] Judul dari thread.
  - [x] Potongan dari body thread (opsional).
  - [x] Waktu pembuatan thread.
  - [x] Jumlah komentar.
  - [x] Informasi pembuat thread (Nama & Avatar opsional).

- [x] **Informasi pada Halaman Detail Thread**
  - [x] Judul dari thread.
  - [x] Body dari thread.
  - [x] Waktu pembuatan thread.
  - [x] Informasi pembuat thread (Nama & Avatar).
  - [x] Komentar dalam thread (Konten, Waktu, Nama, Avatar opsional).

---

## ✅ Kriteria Utama 2: Bugs Highlighting

- [x] Menggunakan **ESLint** dalam proyek.
- [x] Menerapkan **Code Convention**:
  - [x] Dicoding Academy JavaScript Style Guide.
- [ ] Tidak ada **error** yang ditampilkan oleh ESLint.
- [x] Menggunakan **React Strict Mode**.

---

## ✅ Kriteria Utama 3: Arsitektur Aplikasi

- [x] **State Management**
  - [x] Seluruh state aplikasi yang bersumber dari API disimpan pada Redux Store.
  - [x] Form input / controlled component boleh mengelola state-nya sendiri.

- [x] **Code Structure**
  - [x] Tidak ada pemanggilan REST API di dalam lifecycle atau efek komponen.
  - [x] Memisahkan kode **UI** dengan **State** dalam folder yang terpisah.
  - [x] React component bersifat **modular** dan **reusable**.

---

## 🌟 Fitur Tambahan untuk Nilai Lebih!

### 🔹 Saran 1: Fitur Votes pada Thread & Komentar

- [x] Menambahkan tombol **vote** pada thread dan komentar.
- [x] Menampilkan indikasi jika pengguna telah melakukan **up-vote/down-vote**.
- [x] Menerapkan **Optimistically Apply Actions** untuk meningkatkan UX.
- [x] Menampilkan jumlah votes pada thread dan komentar.

### 🔹 Saran 2: Menampilkan Leaderboard

- [x] Membuat halaman **Leaderboard**.
- [x] Menampilkan informasi:
  - [x] Nama pengguna.
  - [x] Avatar pengguna.
  - [x] Score.

### 🔹 Saran 3: Filter Daftar Thread Berdasarkan Kategori

- [ ] Menambahkan fitur **filter** berdasarkan kategori thread.
- [ ] Implementasi filter dilakukan **di Front-End** dengan memanipulasi state aplikasi.

---

💡 **Tips**:  
✔️ Prioritaskan kriteria utama terlebih dahulu.  
✔️ Gunakan Redux Toolkit untuk state management yang lebih clean.  
✔️ Pastikan UX tetap smooth dengan loading states & optimasi UI.

🚀 **Good luck! Semangat membangun aplikasi terbaik!** 🚀
