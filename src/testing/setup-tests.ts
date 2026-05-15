import '@testing-library/jest-dom/vitest';

beforeAll(() => {
	vi.mock('next/navigation', async () => {
		const actual = await vi.importActual('next/navigation');
		return {
			...actual,
			useRouter: () => ({
				push: vi.fn(),
				replace: vi.fn()
			}),
			usePathname: () => '/',
			useSearchParams: () => ({
				get: vi.fn()
			})
		};
	});
});

afterEach(() => {
	vi.restoreAllMocks();
});
