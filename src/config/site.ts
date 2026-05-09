export const siteConfig = {
  name: 'FilmGueh.',
  description:
    'Track every movie you watch — and the ones you plan to. Search, save, and organize your personal movie collection.',
  tagline: 'Track every movie you watch — and the ones you plan to.',
  subtitle:
    'Search movies, build your personal collection, and keep your watchlist organized.',
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  author: 'FilmGueh',
};

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Movies', href: '/movies' },
  { label: 'Search', href: '/search' },
  { label: 'About', href: '/about' },
];

export type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

export const features: FeatureItem[] = [
  {
    title: 'Database Lengkap',
    icon: 'search',
    description:
      'Akses ke jutaan film dari TMDB dan OMDb. Cari berdasarkan judul, lihat sinopsis, poster, genre, dan rating.',
  },
  {
    title: 'Koleksi Pribadi',
    icon: 'bookmark',
    description:
      'Simpan film ke koleksi pribadi. Tandai sebagai Sudah Ditonton, Akan Ditonton, atau Berhenti.',
  },
  {
    title: 'Statistik Menarik',
    icon: 'chart',
    description:
      'Lihat ringkasan koleksi: total film, per kategori, genre favorit, dan rating tertinggi.',
  },
  {
    title: 'Lainnya',
    icon: 'star',
    description:
      'Rating 1-5, catatan pribadi, filter dan sorting, pencarian di koleksi, dan masih banyak lagi.',
  },
];
