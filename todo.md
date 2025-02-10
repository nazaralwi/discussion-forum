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

- [ ] **UI/UX**

  - [ ] Menampilkan loading bar saat memuat data dari API.

- [ ] **Informasi pada Halaman Daftar Thread**

  - [x] Judul dari thread.
  - [x] Potongan dari body thread (opsional).
  - [x] Waktu pembuatan thread.
  - [x] Jumlah komentar.
  - [ ] Informasi pembuat thread (Nama & Avatar opsional).

- [ ] **Informasi pada Halaman Detail Thread**
  - [x] Judul dari thread.
  - [x] Body dari thread.
  - [x] Waktu pembuatan thread.
  - [x] Informasi pembuat thread (Nama & Avatar).
  - [x] Komentar dalam thread (Konten, Waktu, Nama, Avatar opsional).

---

## ✅ Kriteria Utama 2: Bugs Highlighting

- [ ] Menggunakan **ESLint** dalam proyek.
- [ ] Menerapkan **Code Convention**:
  - [ ] Dicoding Academy JavaScript Style Guide.
  - [ ] AirBnB JavaScript Style Guide.
  - [ ] Google JavaScript Style Guide.
  - [ ] StandardJS Style Guide.
- [ ] Tidak ada **error** yang ditampilkan oleh ESLint.
- [x] Menggunakan **React Strict Mode**.

---

## ✅ Kriteria Utama 3: Arsitektur Aplikasi

- [ ] **State Management**

  - [ ] Seluruh stcoate aplikasi yang bersumber dari API disimpan pada Redux Store.
  - [ ] Form input / controlled mponent boleh mengelola state-nya sendiri.

- [ ] **Code Structure**
  - [ ] Tidak ada pemanggilan REST API di dalam lifecycle atau efek komponen.
  - [ ] Memisahkan kode **UI** dengan **State** dalam folder yang terpisah.
  - [ ] React component bersifat **modular** dan **reusable**.

---

## 🌟 Fitur Tambahan untuk Nilai Lebih!

### 🔹 Saran 1: Fitur Votes pada Thread & Komentar

- [x] Menambahkan tombol **vote** pada thread dan komentar.
- [x] Menampilkan indikasi jika pengguna telah melakukan **up-vote/down-vote**.
- [ ] Menerapkan **Optimistically Apply Actions** untuk meningkatkan UX.
- [x] Menampilkan jumlah votes pada thread dan komentar.

### 🔹 Saran 2: Menampilkan Leaderboard

- [x] Membuat halaman **Leaderboard**.
- [ ] Menampilkan informasi:
  - [x] Nama pengguna.
  - [ ] Avatar pengguna.
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
