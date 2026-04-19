export const PORTFOLIO_LIST_QUERY = /* GraphQL */ `
	query PortfolioList($first: Int = 10) {
		portfolioItems(first: $first) {
			nodes {
				id
				databaseId
				title
				slug
				excerpt
				date
				featuredImage {
					node {
						sourceUrl
						altText
						mediaDetails {
							width
							height
						}
					}
				}
				portfolioCategories {
					nodes {
						name
						slug
					}
				}
			}
		}
	}
`;

export const PORTFOLIO_BY_SLUG_QUERY = /* GraphQL */ `
	query PortfolioBySlug($slug: ID!) {
		portfolioItem(id: $slug, idType: SLUG) {
			id
			databaseId
			title
			slug
			excerpt
			date
			content(format: RENDERED)
			featuredImage {
				node {
					sourceUrl
					altText
					mediaDetails {
						width
						height
					}
				}
			}
			portfolioCategories {
				nodes {
					name
					slug
				}
			}
		}
	}
`;

export const POSTS_LIST_QUERY = /* GraphQL */ `
	query PostsList($first: Int = 10) {
		posts(first: $first) {
			nodes {
				id
				databaseId
				title
				slug
				excerpt
				date
				featuredImage {
					node {
						sourceUrl
						altText
						mediaDetails {
							width
							height
						}
					}
				}
				portfolioCategories: categories {
					nodes {
						name
						slug
					}
				}
			}
		}
	}
`;

export const POST_BY_SLUG_QUERY = /* GraphQL */ `
	query PostBySlug($slug: ID!) {
		post(id: $slug, idType: SLUG) {
			id
			databaseId
			title
			slug
			excerpt
			date
			content(format: RENDERED)
			featuredImage {
				node {
					sourceUrl
					altText
					mediaDetails {
						width
						height
					}
				}
			}
			portfolioCategories: categories {
				nodes {
					name
					slug
				}
			}
		}
	}
`;

export interface PortfolioCategoryNode {
	name?: string | null;
	slug?: string | null;
}

export interface PortfolioItem {
	id: string;
	databaseId?: number | null;
	title?: string | null;
	slug?: string | null;
	excerpt?: string | null;
	date?: string | null;
	content?: string | null;
	featuredImage?: {
		node?: {
			sourceUrl?: string | null;
			altText?: string | null;
			mediaDetails?: { width?: number | null; height?: number | null } | null;
		} | null;
	} | null;
	portfolioCategories?: { nodes?: PortfolioCategoryNode[] | null } | null;
}

interface GraphQLPortfolioListResponse {
	data?: {
		portfolioItems?: { nodes?: PortfolioItem[] | null } | null;
		posts?: { nodes?: PortfolioItem[] | null } | null;
	};
	errors?: readonly { message: string }[];
}

interface GraphQLPortfolioBySlugResponse {
	data?: { portfolioItem?: PortfolioItem | null; post?: PortfolioItem | null };
	errors?: readonly { message: string }[];
}

function getGraphQLEndpoint(): string | null {
	// Vite inyecta .env en import.meta.env (dev/local). En CI (p. ej. Cloudflare Pages) suele estar solo en process.env.
	const fromVite = import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL?.trim();
	const fromNode =
		typeof process !== 'undefined'
			? process.env.PUBLIC_WORDPRESS_GRAPHQL_URL?.trim()
			: '';
	const url = fromVite || fromNode || '';
	if (!url) {
		console.warn(
			'[wp] PUBLIC_WORDPRESS_GRAPHQL_URL no está definida. Se usará un portfolio vacío durante el build.',
		);
		return null;
	}
	return url.replace(/\/$/, '');
}

export async function fetchPortfolioList(first = 10): Promise<PortfolioItem[]> {
	const endpoint = getGraphQLEndpoint();
	if (!endpoint) return [];

	const request = async (query: string) => {
		const res = await fetch(endpoint, {
			method: 'POST',
			cache: 'no-store',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query, variables: { first } }),
		});

		if (!res.ok) {
			throw new Error(`GraphQL HTTP ${res.status}: ${res.statusText}`);
		}

		return (await res.json()) as GraphQLPortfolioListResponse;
	};

	const portfolioJson = await request(PORTFOLIO_LIST_QUERY);
	if (!portfolioJson.errors?.length) {
		const items = portfolioJson.data?.portfolioItems?.nodes?.filter(Boolean) ?? [];
		if (items.length > 0) return items;
	}

	const postsJson = await request(POSTS_LIST_QUERY);
	if (postsJson.errors?.length) {
		throw new Error(postsJson.errors.map((e) => e.message).join('; '));
	}

	return postsJson.data?.posts?.nodes?.filter(Boolean) ?? [];
}

export async function fetchPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
	const endpoint = getGraphQLEndpoint();
	if (!endpoint) return null;

	const request = async (query: string) => {
		const res = await fetch(endpoint, {
			method: 'POST',
			cache: 'no-store',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query, variables: { slug } }),
		});

		if (!res.ok) {
			throw new Error(`GraphQL HTTP ${res.status}: ${res.statusText}`);
		}

		return (await res.json()) as GraphQLPortfolioBySlugResponse;
	};

	const portfolioJson = await request(PORTFOLIO_BY_SLUG_QUERY);
	if (!portfolioJson.errors?.length && portfolioJson.data?.portfolioItem) {
		return portfolioJson.data.portfolioItem;
	}

	const postJson = await request(POST_BY_SLUG_QUERY);
	if (postJson.errors?.length) {
		throw new Error(postJson.errors.map((e) => e.message).join('; '));
	}

	return postJson.data?.post ?? null;
}

export function stripHtml(html: string | null | undefined): string {
	if (!html) return '';
	return html.replace(/<[^>]*>/g, '').trim();
}

/** Cuántos ítems pedir al generar rutas estáticas y el listado completo */
export const PORTFOLIO_LIST_FOR_PATHS = 100;
