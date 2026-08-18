export const prerender = false;

import type { APIRoute } from 'astro';
import { getPosts } from '../lib/wordpress';

export const GET: APIRoute = async () => {
	const posts = await getPosts(50).catch(() => []);
	const siteUrl = 'https://rauldavid.com';

	const itemsXml = posts
		.map((post) => {
			const postUrl = `${siteUrl}/blog/${post.slug}/`;
			const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
			return `
		<item>
			<title><![CDATA[${post.title}]]></title>
			<link>${postUrl}</link>
			<guid isPermaLink="true">${postUrl}</guid>
			<description><![CDATA[${post.excerpt || post.title}]]></description>
			<pubDate>${pubDate}</pubDate>
		</item>`;
		})
		.join('\n');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Raúl David Sánchez — Blog</title>
		<link>${siteUrl}/blog/</link>
		<description>Artículos sobre desarrollo web, WordPress Headless, Astro y rendimiento.</description>
		<language>es</language>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
		${itemsXml}
	</channel>
</rss>`;

	return new Response(rss.trim(), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};
