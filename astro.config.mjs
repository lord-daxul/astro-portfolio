// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { loadEnv } from 'vite';

// https://astro.build/config
export default defineConfig(({ mode }) => {
	const fromFile = loadEnv(mode, process.cwd(), 'PUBLIC_');
	const graphqlUrl =
		fromFile.PUBLIC_WORDPRESS_GRAPHQL_URL ||
		process.env.PUBLIC_WORDPRESS_GRAPHQL_URL ||
		'';
	const siteUrl =
		fromFile.PUBLIC_WORDPRESS_SITE_URL ||
		process.env.PUBLIC_WORDPRESS_SITE_URL ||
		'';

	return {
		adapter: cloudflare(),
		vite: {
			// Cloudflare Pages inyecta variables en process.env; el prerender (Miniflare) necesita
			// que PUBLIC_* queden resueltas en el bundle.
			define: {
				'import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL': JSON.stringify(graphqlUrl),
				'import.meta.env.PUBLIC_WORDPRESS_SITE_URL': JSON.stringify(siteUrl),
			},
		},
	};
});
