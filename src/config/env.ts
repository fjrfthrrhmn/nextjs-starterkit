import 'dotenv/config';

import * as z from 'zod';

const createEnv = () => {
	const EnvSchema = z.object({
		API_URL: z.string(),
		APP_URL: z.string().optional().default('http://localhost:3000'),
		NEXT_PUBLIC_TMDB_ACCESS_TOKEN: z.string().optional(),
		NEXT_PUBLIC_OMDB_API_KEY: z.string().optional()
	});

	const envVars = {
		API_URL: process.env.NEXT_PUBLIC_API_URL,
		APP_URL: process.env.NEXT_PUBLIC_URL,
		NEXT_PUBLIC_TMDB_ACCESS_TOKEN: process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN,
		NEXT_PUBLIC_OMDB_API_KEY: process.env.NEXT_PUBLIC_OMDB_API_KEY
	};

	const parsedEnv = EnvSchema.safeParse(envVars);

	if (!parsedEnv.success) {
		throw new Error(
			`Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
		.map(([k, v]) => `- ${k}: ${v}`)
		.join('\n')}
  `
		);
	}

	return parsedEnv.data ?? {};
};

export const env = createEnv();
