import type { Category } from './categories';

export type Movie = {
	id: number;
	title: string;
	year: number;
	poster: string;
	genre: string[];
	rating: number;
	overview: string;
};

export const movies: Movie[] = [
	{
		id: 1,
		title: 'The Dark Knight',
		year: 2008,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Action', 'Thriller'],
		rating: 9.0,
		overview:
			'Batman menghadapi ancaman baru dari Joker, seorang penjahat psikopat yang ingin menghancurkan Gotham.'
	},
	{
		id: 2,
		title: 'Interstellar',
		year: 2014,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Sci-Fi', 'Drama'],
		rating: 8.7,
		overview:
			'Sekelompok astronot menjelajahi lubang cacing untuk mencari rumah baru bagi umat manusia.'
	},
	{
		id: 3,
		title: 'Parasite',
		year: 2019,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Thriller', 'Drama'],
		rating: 8.5,
		overview:
			'Keluarga miskin menyusup ke rumah keluarga kaya, memicu rangkaian kejadian tak terduga.'
	},
	{
		id: 4,
		title: 'Spirited Away',
		year: 2001,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Animasi', 'Drama'],
		rating: 8.6,
		overview:
			'Seorang gadis kecil terjebak di dunia roh dan harus bekerja di pemandian milik penyihir.'
	},
	{
		id: 5,
		title: 'The Shawshank Redemption',
		year: 1994,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Drama'],
		rating: 9.3,
		overview:
			'Seorang bankir dipenjara atas kejahatan yang tidak ia lakukan dan menemukan harapan di tempat paling gelap.'
	},
	{
		id: 6,
		title: 'Mad Max: Fury Road',
		year: 2015,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Action', 'Sci-Fi'],
		rating: 8.1,
		overview:
			'Di dunia pasca-apokaliptik, Max bergabung dengan Furiosa untuk melarikan diri dari tirani Immortan Joe.'
	},
	{
		id: 7,
		title: 'The Conjuring',
		year: 2013,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Horror', 'Thriller'],
		rating: 7.5,
		overview:
			'Pasangan investigasi paranormal membantu keluarga yang diteror oleh kekuatan jahat di rumah mereka.'
	},
	{
		id: 8,
		title: 'Your Name',
		year: 2016,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Animasi', 'Romance'],
		rating: 8.4,
		overview:
			'Dua remaja yang tidak saling kenal mengalami pertukaran tubuh secara misterius dan saling terhubung.'
	},
	{
		id: 9,
		title: 'Inception',
		year: 2010,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Action', 'Sci-Fi', 'Thriller'],
		rating: 8.8,
		overview:
			'Seorang pencuri spesialis mencuri rahasia melalui mimpi dan ditawari misi mustahil: menanam ide.'
	},
	{
		id: 10,
		title: 'The Grand Budapest Hotel',
		year: 2014,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Komedi', 'Drama'],
		rating: 8.1,
		overview:
			'Petualangan seorang petugas hotel legendaris di sebuah hotel mewah Eropa antara dua perang dunia.'
	},
	{
		id: 11,
		title: 'John Wick',
		year: 2014,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Action', 'Thriller'],
		rating: 7.4,
		overview:
			'Mantan pembunuh bayaran kembali ke dunia kriminal setelah anjingnya dibunuh dan mobilnya dicuri.'
	},
	{
		id: 12,
		title: 'Get Out',
		year: 2017,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Horror', 'Thriller'],
		rating: 7.7,
		overview:
			'Seorang priam kulit hitam mengunjungi keluarga pacarnya yang berkulit putih, menemukan rahasia mengerikan.'
	},
	{
		id: 13,
		title: 'Everything Everywhere All at Once',
		year: 2022,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Action', 'Komedi', 'Sci-Fi'],
		rating: 8.0,
		overview:
			'Seorang imigran China terseret ke dalam petualangan multiverse yang gila untuk menyelamatkan dunia.'
	},
	{
		id: 14,
		title: 'A Quiet Place',
		year: 2018,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Horror', 'Thriller'],
		rating: 7.5,
		overview:
			'Sebuah keluarga harus hidup dalam keheningan total untuk bertahan dari makhluk pemburu suara.'
	},
	{
		id: 15,
		title: 'La La Land',
		year: 2016,
		poster: 'https://dummyimage.com/600x400/ffffff/000000.jpg',
		genre: ['Romance', 'Komedi'],
		rating: 8.0,
		overview:
			'Seorang musisi jazz dan seorang aktris berjuang mengejar mimpi di Los Angeles sambil jatuh cinta.'
	}
];

export function getMoviesByCategory(category: string): Movie[] {
	if (category === 'Trending') return movies;
	return movies.filter(m => m.genre.some(g => g.toLowerCase() === category.toLowerCase()));
}

export function searchMovies(query: string): Movie[] {
	const q = query.toLowerCase();
	return movies.filter(
		m => m.title.toLowerCase().includes(q) || m.genre.some(g => g.toLowerCase().includes(q))
	);
}
