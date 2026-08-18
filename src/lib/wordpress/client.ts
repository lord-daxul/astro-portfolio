import type { GraphQLResponse } from './types';

const DEFAULT_GRAPHQL_ENDPOINT = 'https://backend.rauldavid.com/graphql';

function normalizeUrl(value: string | null | undefined): string {
	return value?.trim().replace(/\/$/, '') ?? '';
}

export function getGraphQLEndpoint(): string {
	const fromVite = normalizeUrl(import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL);
	const fromNode =
		typeof process !== 'undefined'
			? normalizeUrl(process.env.PUBLIC_WORDPRESS_GRAPHQL_URL)
			: '';
	const siteFromVite = normalizeUrl(import.meta.env.PUBLIC_WORDPRESS_SITE_URL);
	const siteFromNode =
		typeof process !== 'undefined' ? normalizeUrl(process.env.PUBLIC_WORDPRESS_SITE_URL) : '';
	const derivedFromSite = siteFromVite || siteFromNode;

	const endpoint =
		fromVite ||
		fromNode ||
		(derivedFromSite ? `${derivedFromSite}/graphql` : '') ||
		DEFAULT_GRAPHQL_ENDPOINT;

	return endpoint;
}

export function isMissingFieldGraphQL(
	errors: readonly { message: string }[] | undefined,
	fieldName: string,
): boolean {
	if (!errors?.length) return false;
	const needle = `Cannot query field "${fieldName}"`;
	return errors.some((e) => e.message?.includes(needle));
}

export async function fetchGraphQL<T>(
	query: string,
	variables: Record<string, unknown> = {},
	timeoutMs = 6000,
): Promise<{ data: T | null; errors?: readonly { message: string }[] }> {
	const endpoint = getGraphQLEndpoint();
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({ query, variables }),
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			console.warn(`[WPGraphQL] HTTP Error ${response.status}: ${response.statusText}`);
			return { data: null, errors: [{ message: `HTTP ${response.status}` }] };
		}

		const json = (await response.json()) as GraphQLResponse<T>;

		if (json.errors?.length) {
			return { data: json.data ?? null, errors: json.errors };
		}

		return { data: json.data ?? null };
	} catch (error) {
		clearTimeout(timeoutId);
		const message = error instanceof Error ? error.message : String(error);
		console.warn(`[WPGraphQL] Fetch exception: ${message}`);
		return { data: null, errors: [{ message }] };
	}
}
