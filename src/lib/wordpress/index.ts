import { fetchGraphQL, isMissingFieldGraphQL } from './client';
import {
	GET_PROJECTS_QUERY,
	GET_PORTFOLIO_ITEMS_FALLBACK_QUERY,
	GET_PROJECT_BY_SLUG_QUERY,
	GET_PORTFOLIO_BY_SLUG_FALLBACK_QUERY,
	GET_EXPERIENCES_QUERY,
	GET_POSTS_QUERY,
	GET_POST_BY_SLUG_QUERY,
} from './queries';
import {
	mapWPProjectToDomain,
	mapWPExperienceToDomain,
	mapWPPostToDomain,
	stripHtml,
} from './mappers';
import type { Project, Project as PortfolioItem } from '../../types/project';
import type { Experience } from '../../types/experience';
import type { Post } from '../../types/post';
import type { WPProjectRaw, WPExperienceRaw, WPPostRaw } from './types';

export { stripHtml };
export type { PortfolioItem };

export async function getProjects(first = 50): Promise<Project[]> {
	// 1. Try querying `projects` CPT
	const primaryRes = await fetchGraphQL<{ projects?: { nodes?: WPProjectRaw[] } }>(
		GET_PROJECTS_QUERY,
		{ first },
	);

	if (primaryRes.data?.projects?.nodes?.length) {
		return primaryRes.data.projects.nodes.map(mapWPProjectToDomain);
	}

	// 2. Fallback to `portfolioItems` CPT if `projects` is not registered
	if (isMissingFieldGraphQL(primaryRes.errors, 'projects') || !primaryRes.data?.projects) {
		const fallbackRes = await fetchGraphQL<{ portfolioItems?: { nodes?: WPProjectRaw[] } }>(
			GET_PORTFOLIO_ITEMS_FALLBACK_QUERY,
			{ first },
		);
		if (fallbackRes.data?.portfolioItems?.nodes?.length) {
			return fallbackRes.data.portfolioItems.nodes.map(mapWPProjectToDomain);
		}
	}

	return [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
	// 1. Try querying `project` by slug
	const primaryRes = await fetchGraphQL<{ project?: WPProjectRaw | null }>(
		GET_PROJECT_BY_SLUG_QUERY,
		{ slug },
	);

	if (primaryRes.data?.project) {
		return mapWPProjectToDomain(primaryRes.data.project);
	}

	// 2. Fallback to `portfolioItem` if `project` is not registered
	if (isMissingFieldGraphQL(primaryRes.errors, 'project') || !primaryRes.data?.project) {
		const fallbackRes = await fetchGraphQL<{ portfolioItem?: WPProjectRaw | null }>(
			GET_PORTFOLIO_BY_SLUG_FALLBACK_QUERY,
			{ slug },
		);
		if (fallbackRes.data?.portfolioItem) {
			return mapWPProjectToDomain(fallbackRes.data.portfolioItem);
		}
	}

	return null;
}

export async function getExperiences(first = 50): Promise<Experience[]> {
	const res = await fetchGraphQL<{ experiences?: { nodes?: WPExperienceRaw[] } }>(
		GET_EXPERIENCES_QUERY,
		{ first },
	);

	if (res.data?.experiences?.nodes?.length) {
		return res.data.experiences.nodes.map(mapWPExperienceToDomain);
	}

	return [];
}

export async function getPosts(first = 20): Promise<Post[]> {
	const res = await fetchGraphQL<{ posts?: { nodes?: WPPostRaw[] } }>(
		GET_POSTS_QUERY,
		{ first },
	);

	if (res.data?.posts?.nodes?.length) {
		return res.data.posts.nodes.map(mapWPPostToDomain);
	}

	return [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	const res = await fetchGraphQL<{ post?: WPPostRaw | null }>(
		GET_POST_BY_SLUG_QUERY,
		{ slug },
	);

	if (res.data?.post) {
		return mapWPPostToDomain(res.data.post);
	}

	return null;
}
