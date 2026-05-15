# 🧩 Product Definition

| Field               | Description                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Product Name**    | FilmGueh                                                                                                                           |
| **Objective**       | Membantu user mencatat, mengelola, dan memfilter film yang sudah atau ingin ditonton                                               |
| **Target User**     | Individual user                                                                                                                    |
| **Platform**        | Web                                                                                                                                |
| **Core Problem**    | User sulit melacak film yang sudah ditonton atau ingin ditonton secara terstruktur                                                 |
| **Solution**        | Website yang memungkinkan user mencari film dari API dan menyimpannya dengan kategori & genre                                      |
| **Key Features**    | Search film (API), Add to tracker, Categorization, Filtering, Local storage persistence                                            |
| **Data Source**     | External Movie API (misalnya TMDB)                                                                                                 |
| **Storage**         | Browser LocalStorage                                                                                                               |
| **Success Metrics** | - User bisa menambahkan & melihat film dengan cepat (<2 detik)- Data tersimpan konsisten di localStorage- Filtering bekerja akurat |
| **Constraints**     | - No backend- Single user only- Bergantung pada availability API eksternal                                                         |

## 📊 Requirements (MoSCoW)

| Priority        | Feature                  | Description                                        |
| --------------- | ------------------------ | -------------------------------------------------- |
| **Must Have**   | Search Film              | User bisa mencari film dari API eksternal          |
|                 | Add Film                 | User bisa menambahkan film ke tracker              |
|                 | Film Metadata            | Menyimpan title, poster, genre, id dari API        |
|                 | Category Assignment      | Film bisa dikategorikan (Watched / Plan / Dropped) |
|                 | LocalStorage Persistence | Data tetap tersimpan setelah refresh               |
|                 | View Film List           | Menampilkan semua film yang sudah disimpan         |
|                 | Filter by Category       | Filter berdasarkan status film                     |
|                 | Filter by Genre          | Filter berdasarkan genre                           |
| **Should Have** | Edit Film Entry          | User bisa edit category, rating, notes             |
|                 | Delete Film              | User bisa menghapus film dari tracker              |
|                 | Prevent Duplicate        | Tidak bisa menambahkan film yang sama dua kali     |
|                 | Sorting                  | Sort berdasarkan title, rating, atau tanggal       |
|                 | Basic Stats              | Menampilkan jumlah film per category/genre         |
| **Could Have**  | Search in Collection     | Search film dalam list yang sudah disimpan         |
|                 | Custom Tags              | User bisa menambahkan tag sendiri                  |
| **Won't Have**  | Authentication           | Tidak ada login/user management                    |
|                 | Backend Database         | Tidak ada server/database eksternal                |
|                 | Social Features          | Tidak ada sharing, comment, dll                    |
