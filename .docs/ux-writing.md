# UX Writing — FilmGueh

> Tone: Simple, clear, helpful. Indonesian and English UI strings. No jargon. Every message should tell the user what happened and what they can do next.

---

## 1. Writing Principles

| Principle                  | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| **Be concise**             | Users scan, don't read. Cut every unnecessary word.     |
| **Be specific**            | "No movies matching 'Inception'" not "No results found" |
| **Show the way forward**   | Every error/empty state needs a CTA or suggestion       |
| **No blame**               | "Something went wrong" not "You broke it"               |
| **Consistent terminology** | "Collection" not "library" then "list". Pick one.       |

---

## 2. Navigation & UI Labels

### App Bar / Header

| Context         | EN          | ID        |
| --------------- | ----------- | --------- |
| App name        | FilmGueh    | FilmGueh  |
| Nav: collection | My Movies   | Film Saya |
| Nav: search     | Search      | Cari      |
| CTA: main       | Get Started | Mulai     |

### Buttons

| Context        | EN                | ID           |
| -------------- | ----------------- | ------------ |
| Add movie      | Add to Collection | Tambahkan    |
| Save changes   | Save              | Simpan       |
| Cancel         | Cancel            | Batal        |
| Delete entry   | Remove            | Hapus        |
| Confirm delete | Yes, Remove       | Ya, Hapus    |
| Close modal    | Close             | Tutup        |
| Retry          | Try Again         | Coba Lagi    |
| Clear filters  | Clear Filters     | Hapus Filter |
| Reset app data | Reset Data        | Reset Data   |

---

## 3. Search State Copy

### Initial (empty input)

```
EN: Find movies to add to your collection. Start typing above.
ID: Cari film untuk ditambahkan ke koleksi. Mulai ketik di atas.
```

### Loading

```
EN: Searching for "{query}"...
ID: Mencari "{query}"...
```

### Results found

```
EN: {count} results for "{query}"
ID: {count} hasil untuk "{query}"
```

### No results

```
EN: No movies found for "{query}".
    Check the spelling or try a different title.
ID: Tidak ada film untuk "{query}".
    Periksa ejaan atau coba judul lain.
```

### API error

```
EN: Could not search right now. Please try again.
ID: Gagal mencari saat ini. Silakan coba lagi.
```

### Duplicate detected (on search result card)

```
EN: Already in your collection
ID: Sudah di koleksi
```

---

## 4. Collection State Copy

### Empty collection (first-time user)

```
EN: Your collection is empty.
    Search movies and start building your watchlist.
ID: Koleksi Anda masih kosong.
    Cari film dan mulai buat daftar tontonan Anda.
```

### Populated — no filter match

```
EN: No movies match "{filter}".
    Try a different category or genre.
ID: Tidak ada film yang cocok dengan "{filter}".
    Coba kategori atau genre lain.
```

### Populated — search in collection yields nothing

```
EN: No movies matching "{query}" in your collection.
ID: Tidak ada film "{query}" di koleksi Anda.
```

### Corrupt data

```
EN: Something went wrong loading your collection.
    You can reset the data and start fresh.
ID: Terjadi kesalahan saat memuat koleksi.
    Anda bisa reset data dan mulai dari awal.
```

---

## 5. Add to Tracker Copy

### Add confirmation

```
EN: "{title}" added to your collection.
ID: "{title}" ditambahkan ke koleksi.
```

### Duplicate (when user tries to add already-existing movie)

```
EN: "{title}" is already in your collection.
ID: "{title}" sudah ada di koleksi Anda.
```

### Choose category prompt (in add/edit flow)

```
EN: Add to...
    ○ Watched
    ○ Plan to Watch
    ○ Dropped
ID: Tambahkan ke...
    ○ Sudah Ditonton
    ○ Akan Ditonton
    ○ Berhenti
```

### Save success

```
EN: Changes saved.
ID: Perubahan tersimpan.
```

### Delete confirmation

```
EN: Remove "{title}" from your collection?
    This cannot be undone.
ID: Hapus "{title}" dari koleksi?
    Tindakan ini tidak bisa dibatalkan.
```

### Delete success

```
EN: "{title}" removed from your collection.
ID: "{title}" dihapus dari koleksi.
```

---

## 6. Filter & Category Copy

### Filter labels

| Context           | EN             | ID               |
| ----------------- | -------------- | ---------------- |
| Category: all     | All Categories | Semua Kategori   |
| Category: watched | Watched        | Sudah Ditonton   |
| Category: plan    | Plan to Watch  | Akan Ditonton    |
| Category: dropped | Dropped        | Berhenti         |
| Sort: title A-Z   | Title A-Z      | Judul A-Z        |
| Sort: title Z-A   | Title Z-A      | Judul Z-A        |
| Sort: rating high | Highest Rated  | Rating Tertinggi |
| Sort: rating low  | Lowest Rated   | Rating Terendah  |
| Sort: newest      | Recently Added | Terbaru          |
| Sort: oldest      | Oldest First   | Terlama          |

### Filter state indicators

```
Active filter badge: "Watched · Action · A-Z" (compact)
Clear all link: "Clear all filters"
```

### Stats line

```
EN: {total} movies · {watched} watched · {plan} plan to watch · {dropped} dropped
ID: {total} film · {watched} ditonton · {plan} akan ditonton · {dropped} berhenti
```

---

## 7. Offline & Fallback State

### TMDB API unreachable

```
EN: Can't search right now — TMDB is unavailable.
    Please check your connection and try again.
ID: Tidak bisa mencari saat ini — TMDB tidak tersedia.
    Periksa koneksi Anda dan coba lagi.
```

### OMDb fallback active (shown subtly, not alarming)

```
EN: Using alternative source. Search results may vary.
ID: Menggunakan sumber alternatif. Hasil mungkin berbeda.
```

### No connection (detected browser offline)

```
EN: You're offline. Your collection is still accessible.
ID: Anda sedang offline. Koleksi Anda masih bisa diakses.
```

---

## 8. Rating Copy

| Value     | Label           |
| --------- | --------------- |
| Not rated | Rate this movie |
| 1         | Terrible        |
| 2         | Bad             |
| 3         | Okay            |
| 4         | Good            |
| 5         | Excellent       |

```
EN: Your rating: {value}/5
ID: Rating Anda: {value}/5
```

---

## 9. Empty States — Quick Reference

| Context                 | EN                                              | ID                                                 |
| ----------------------- | ----------------------------------------------- | -------------------------------------------------- |
| Empty collection        | Your collection is empty. Search movies to add. | Koleksi masih kosong. Cari film untuk ditambahkan. |
| Filter empty            | No movies match this filter.                    | Tidak ada film yang cocok.                         |
| Search collection empty | No movies matching "{q}" in your collection.    | Tidak ada film "{q}" di koleksi.                   |
| Search API empty        | No movies found for "{q}".                      | Tidak ada film untuk "{q}".                        |
| API error               | Could not search right now. Try again.          | Gagal mencari. Coba lagi.                          |
| Offline                 | You're offline. Collection is accessible.       | Anda offline. Koleksi masih bisa diakses.          |

---

## 10. Implementation Notes

- All UI copy lives as constants, not hardcoded in JSX
- Start with EN only for MVP, ID strings as reference for future i18n
- Toast/notification duration: success 2.5s, error persistent (manual dismiss)
- Delete requires explicit confirmation dialog (irreversible action)
- Progress/loading states should show on the action button itself, not as a separate toast
