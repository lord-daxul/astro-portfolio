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
	data?: { portfolioItems?: { nodes?: PortfolioItem[] | null } | null };
	errors?: readonly { message: string }[];
}

interface GraphQLPortfolioBySlugResponse {
	data?: { portfolioItem?: PortfolioItem | null };
	errors?: readonly { message: string }[];
}

function getGraphQLEndpoint(): string {
	// Vite inyecta .env en import.meta.env (dev/local). En CI (p. ej. Cloudflare Pages) suele estar solo en process.env.
	const fromVite = import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL?.trim();
	const fromNode =
		typeof process !== 'undefined'
			? process.env.PUBLIC_WORDPRESS_GRAPHQL_URL?.trim()
			: '';
	const url = fromVite || fromNode || '';
	if (!url) {
		throw new Error(
			'Define PUBLIC_WORDPRESS_GRAPHQL_URL en .env local o en el panel de CI (p. ej. Cloudflare → Variables).',
		);
	}
	return url.replace(/\/$/, '');
}

export async function fetchPortfolioList(first = 10): Promise<PortfolioItem[]> {
	const endpoint = getGraphQLEndpoint();
	const res = await fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: PORTFOLIO_LIST_QUERY,
			variables: { first },
		}),
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

export async function fetchPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
	const endpoint = getGraphQLEndpoint();
	const res = await fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: PORTFOLIO_BY_SLUG_QUERY,
			variables: { slug },
		}),
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

export function stripHtml(html: string | null | undefined): string {
	if (!html) return '';
	return html.replace(/<[^>]*>/g, '').trim();
}

/** Cuántos ítems pedir al generar rutas estáticas y el listado completo */
export const PORTFOLIO_LIST_FOR_PATHS = 100;
