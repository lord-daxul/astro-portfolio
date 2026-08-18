import type { APIRoute } from 'astro';
import { getProjects, getPosts } from '../lib/wordpress';

export const prerender = false;

interface PageEntry {
	url: string;
	lastmod?: string;
	changefreq: string;
	priority: number;
}

export const GET: APIRoute = async ({ site }) => {
	const siteUrl = (site?.toString() ?? 'https://rauldavid.com').replace(/\/$/, '');

	// Static routes
	const staticPages: PageEntry[] = [
		{ url: `${siteUrl}/`, changefreq: 'weekly', priority: 1.0 },
		{ url: `${siteUrl}/home2/`, changefreq: 'weekly', priority: 0.9 },
		{ url: `${siteUrl}/projects/`, changefreq: 'daily', priority: 0.9 },
		{ url: `${siteUrl}/experience/`, changefreq: 'monthly', priority: 0.8 },
		{ url: `${siteUrl}/cv/`, changefreq: 'monthly', priority: 0.9 },
		{ url: `${siteUrl}/about/`, changefreq: 'monthly', priority: 0.8 },
		{ url: `${siteUrl}/blog/`, changefreq: 'daily', priority: 0.8 },
		{ url: `${siteUrl}/contacto/`, changefreq: 'yearly', priority: 0.7 },
	];

	// Fetch dynamic projects and posts
	const [projects, posts] = await Promise.all([
		getProjects(100).catch(() => []),
		getPosts(100).catch(() => []),
	]);

	const projectPages: PageEntry[] = projects.map((p) => ({
		url: `${siteUrl}/projects/${p.slug}/`,
		lastmod: p.projectDate ? p.projectDate : undefined,
		changefreq: 'monthly',
		priority: 0.8,
	}));

	const postPages: PageEntry[] = posts.map((p) => ({
		url: `${siteUrl}/blog/${p.slug}/`,
		lastmod: p.date ? new Date(p.date).toISOString().split('T')[0] : undefined,
		changefreq: 'monthly',
		priority: 0.7,
	}));

	const allPages: PageEntry[] = [...staticPages, ...projectPages, ...postPages];

	const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `  <url>
    <loc>${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemapXml.trim(), {
		status: 200,
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400',
		},
	});
};
