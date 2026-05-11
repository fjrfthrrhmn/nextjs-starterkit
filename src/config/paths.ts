export const paths = {
  home: {
    getHref: () => '/',
  },
  movies: {
    getHref: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return `/movies${qs}`;
    },
  },
  search: {
    getHref: (query: string) => `/search?q=${encodeURIComponent(query)}`,
  },
  about: {
    getHref: () => '/about',
  },
} as const;
