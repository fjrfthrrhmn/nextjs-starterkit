import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FeatureCards } from '@/features/landing/components/feature-cards';

import { HeroSection } from '../hero-section';

describe('HeroSection', () => {
	it('renders headline in Bahasa Indonesia', () => {
		render(<HeroSection />);
		expect(screen.getByText('Cari & Simpan Film Favoritmu')).toBeInTheDocument();
	});

	it('renders subheadline', () => {
		render(<HeroSection />);
		expect(screen.getByText(/Temukan ribuan film/)).toBeInTheDocument();
	});

	it('renders search input with placeholder', () => {
		render(<HeroSection />);
		const input = screen.getByPlaceholderText('Cari film, genre, atau aktor...');
		expect(input).toBeInTheDocument();
	});

	it('renders quick category tags', () => {
		render(<HeroSection />);
		expect(screen.getByText('Action')).toBeInTheDocument();
		expect(screen.getByText('Komedi')).toBeInTheDocument();
		expect(screen.getByText('Horror')).toBeInTheDocument();
	});

	it('search input has accessible label', () => {
		render(<HeroSection />);
		expect(screen.getByLabelText('Cari film')).toBeInTheDocument();
	});
});

describe('FeatureCards', () => {
	it('renders all feature cards', () => {
		render(<FeatureCards />);
		expect(screen.getByText('Database Lengkap')).toBeInTheDocument();
		expect(screen.getByText('Koleksi Pribadi')).toBeInTheDocument();
		expect(screen.getByText('Statistik Menarik')).toBeInTheDocument();
		expect(screen.getByText('Lainnya')).toBeInTheDocument();
	});
});
