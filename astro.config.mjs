// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	// workerd (Miniflare) no hereda bien las env del build; Node sí lee process.env de Pages.
	// Importante: no usar vite.define con '' cuando falte la URL en el momento de cargar la config;
	// eso sustituía import.meta.env por cadena vacía en el bundle y rompía el prerender en CI.
	adapter: cloudflare({ prerenderEnvironment: 'node' }),
});
