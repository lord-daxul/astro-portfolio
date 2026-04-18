/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_WORDPRESS_GRAPHQL_URL: string;
	/** Opcional: URL pública de WordPress para enlazar al single en WP (headless suele usar rutas en Astro). */
	readonly PUBLIC_WORDPRESS_SITE_URL?: string;
}
