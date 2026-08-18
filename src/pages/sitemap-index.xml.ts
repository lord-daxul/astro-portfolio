import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
	const siteUrl = (site?.toString() ?? 'https://rauldavid.com').replace(/\/$/, '');

	const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap.xml</loc>
  </sitemap>
</sitemapindex>`;

	return new Response(sitemapIndexXml.trim(), {
		status: 200,
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400',
		},
	});
};
