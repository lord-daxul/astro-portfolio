// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://rauldavid.com',
	// Render dinámico en Cloudflare Workers para que el contenido de WordPress aparezca de inmediato.
	output: 'server',
	build: {
		inlineStylesheets: 'always',
	},
	adapter: cloudflare({ prerenderEnvironment: 'node' }),
	vite: {
		plugins: [tailwindcss()],
	},
});
