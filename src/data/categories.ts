export const categories = [
  'Action',
  'Drama',
  'Komedi',
  'Horror',
  'Thriller',
  'Animasi',
  'Sci-Fi',
  'Romance',
] as const;

export type Category = (typeof categories)[number];
