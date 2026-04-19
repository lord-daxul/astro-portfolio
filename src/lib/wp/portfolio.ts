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

const DEFAULT_WORDPRESS_SITE_URL = 'https://davidsanchez.website';

function normalizeUrl(value: string | null | undefined): string {
	return value?.trim().replace(/\/$/, '') ?? '';
}

function getGraphQLEndpoint(): string | null {
	// Vite inyecta .env en import.meta.env (dev/local). En CI suele estar en process.env.
	const fromVite = normalizeUrl(import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL);
	const fromNode =
		typeof process !== 'undefined'
			? normalizeUrl(process.env.PUBLIC_WORDPRESS_GRAPHQL_URL)
			: '';
	const siteFromVite = normalizeUrl(import.meta.env.PUBLIC_WORDPRESS_SITE_URL);
	const siteFromNode =
		typeof process !== 'undefined' ? normalizeUrl(process.env.PUBLIC_WORDPRESS_SITE_URL) : '';
	const derivedFromSite = siteFromVite || siteFromNode;
	const fallback = `${DEFAULT_WORDPRESS_SITE_URL}/graphql`;
	const url = fromVite || fromNode || (derivedFromSite ? `${derivedFromSite}/graphql` : '') || fallback;

	if (!fromVite && !fromNode) {
		console.warn(`[wp] Usando endpoint GraphQL fallback: ${url}`);
	}

	return url || null;
}

export async function fetchPortfolioList(first = 10): Promise<PortfolioItem[]> {
	const endpoint = getGraphQLEndpoint();
	if (!endpoint) return [];

	const res = await fetch(endpoint, {
		method: 'POST',
		cache: 'no-store',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query: PORTFOLIO_LIST_QUERY, variables: { first } }),
	});

	if (!res.ok) {
		throw new Error(`GraphQL HTTP ${res.status}: ${res.statusText}`);
	}

	const json = (await res.json()) as GraphQLPortfolioListResponse;
	if (json.errors?.length) {
		throw new Error(json.errors.map((e) => e.message).join('; '));
	}

	return json.data?.portfolioItems?.nodes?.filter(Boolean) ?? [];
}

export async function fetchPostsList(first = 10): Promise<PortfolioItem[]> {
	const endpoint = getGraphQLEndpoint();
	if (!endpoint) return [];

	const res = await fetch(endpoint, {
		method: 'POST',
		cache: 'no-store',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query: POSTS_LIST_QUERY, variables: { first } }),
	});

	if (!res.ok) {
		throw new Error(`GraphQL HTTP ${res.status}: ${res.statusText}`);
	}

	const json = (await res.json()) as GraphQLPortfolioListResponse;
	if (json.errors?.length) {
		throw new Error(json.errors.map((e) => e.message).join('; '));
	}

	return json.data?.posts?.nodes?.filter(Boolean) ?? [];
}

export async function fetchPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
	const endpoint = getGraphQLEndpoint();
	if (!endpoint) return null;

	const res = await fetch(endpoint, {
		method: 'POST',
		cache: 'no-store',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query: PORTFOLIO_BY_SLUG_QUERY, variables: { slug } }),
	});

	if (!res.ok) {
		throw new Error(`GraphQL HTTP ${res.status}: ${res.statusText}`);
	}

	const json = (await res.json()) as GraphQLPortfolioBySlugResponse;
	if (json.errors?.length) {
		throw new Error(json.errors.map((e) => e.message).join('; '));
	}

	return json.data?.portfolioItem ?? null;
}

export async function fetchPostBySlug(slug: string): Promise<PortfolioItem | null> {
	const endpoint = getGraphQLEndpoint();
	if (!endpoint) return null;

	const res = await fetch(endpoint, {
		method: 'POST',
		cache: 'no-store',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query: POST_BY_SLUG_QUERY, variables: { slug } }),
	});

	if (!res.ok) {
		throw new Error(`GraphQL HTTP ${res.status}: ${res.statusText}`);
	}

	const json = (await res.json()) as GraphQLPortfolioBySlugResponse;
	if (json.errors?.length) {
		throw new Error(json.errors.map((e) => e.message).join('; '));
	}

	return json.data?.post ?? null;
}

export function stripHtml(html: string | null | undefined): string {
	if (!html) return '';
	return html.replace(/<[^>]*>/g, '').trim();
}

/** Cuántos ítems pedir al generar rutas estáticas y el listado completo */
export const PORTFOLIO_LIST_FOR_PATHS = 100;
