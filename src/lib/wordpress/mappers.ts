import type { Project, ProjectMedia } from '../../types/project';
import type { Experience } from '../../types/experience';
import type { Post, PostMedia } from '../../types/post';
import type { WPProjectRaw, WPExperienceRaw, WPPostRaw, WPImageNode } from './types';

export function stripHtml(html: string | null | undefined): string {
	if (!html) return '';
	return html.replace(/<[^>]*>/g, '').trim();
}

export function mapWPImage(node?: WPImageNode | null): ProjectMedia | undefined {
	if (!node?.sourceUrl) return undefined;
	return {
		sourceUrl: node.sourceUrl,
		altText: node.altText ?? undefined,
		width: node.mediaDetails?.width ?? undefined,
		height: node.mediaDetails?.height ?? undefined,
	};
}

export function mapWPProjectToDomain(raw: WPProjectRaw): Project {
	const acf = raw.projectDetails || raw.acf || {};
	const cats = [
		...(raw.projectCategories?.nodes ?? []),
		...(raw.portfolioCategories?.nodes ?? []),
	]
		.map((c) => c?.name ?? c?.slug ?? '')
		.filter(Boolean);

	const taxonomyTechs = (raw.techs?.nodes ?? [])
		.map((t) => t?.name ?? t?.slug ?? '')
		.filter(Boolean);

	let technologies: string[] = [];
	if (Array.isArray(acf.technologies)) {
		technologies = acf.technologies.filter(Boolean) as string[];
	} else if (typeof acf.technologies === 'string') {
		technologies = acf.technologies.split(',').map((t) => t.trim()).filter(Boolean);
	}

	if (technologies.length === 0 && taxonomyTechs.length > 0) {
		technologies = taxonomyTechs;
	}

	return {
		id: raw.id,
		databaseId: raw.databaseId ?? undefined,
		title: raw.title ?? 'Sin título',
		slug: raw.slug ?? '',
		excerpt: stripHtml(raw.excerpt),
		content: raw.content ?? undefined,
		featuredImage: mapWPImage(raw.featuredImage?.node),
		projectDate: acf.projectDate ?? (raw.date ? new Date(raw.date).getFullYear().toString() : undefined),
		client: acf.client ?? undefined,
		role: acf.role ?? undefined,
		technologies: technologies.length > 0 ? technologies : cats,
		categories: cats,
		projectUrl: acf.projectUrl ?? undefined,
		repositoryUrl: acf.repositoryUrl ?? undefined,
		isFeatured: Boolean(acf.isFeatured),
		status: acf.status ?? undefined,
	};
}

export function mapWPExperienceToDomain(raw: WPExperienceRaw): Experience {
	const acf = raw.experienceDetails || raw.acf || {};
	let technologies: string[] = [];
	if (Array.isArray(acf.technologies)) {
		technologies = acf.technologies.filter(Boolean) as string[];
	} else if (typeof acf.technologies === 'string') {
		technologies = acf.technologies.split(',').map((t) => t.trim()).filter(Boolean);
	}

	return {
		id: raw.id,
		title: raw.title ?? 'Posición',
		role: acf.position || raw.title || 'Desarrollador',
		company: acf.company || raw.title || '',
		location: acf.location ?? undefined,
		startDate: acf.startDate || '',
		endDate: acf.endDate ?? undefined,
		isCurrent: Boolean(acf.isCurrent),
		description: raw.content ? stripHtml(raw.content) : '',
		technologies,
		companyUrl: acf.companyUrl ?? undefined,
		logo: raw.featuredImage?.node?.sourceUrl
			? {
					sourceUrl: raw.featuredImage.node.sourceUrl,
					altText: raw.featuredImage.node.altText ?? undefined,
				}
			: undefined,
	};
}

export function mapWPPostToDomain(raw: WPPostRaw): Post {
	const cats = (raw.categories?.nodes ?? [])
		.map((c) => c?.name ?? c?.slug ?? '')
		.filter(Boolean);

	const tags = (raw.tags?.nodes ?? [])
		.map((t) => t?.name ?? t?.slug ?? '')
		.filter(Boolean);

	const imgNode = raw.featuredImage?.node;
	const featuredImage: PostMedia | undefined = imgNode?.sourceUrl
		? {
				sourceUrl: imgNode.sourceUrl,
				altText: imgNode.altText ?? undefined,
				width: imgNode.mediaDetails?.width ?? undefined,
				height: imgNode.mediaDetails?.height ?? undefined,
			}
		: undefined;

	return {
		id: raw.id,
		databaseId: raw.databaseId ?? undefined,
		title: raw.title ?? 'Sin título',
		slug: raw.slug ?? '',
		excerpt: stripHtml(raw.excerpt),
		content: raw.content ?? '',
		date: raw.date ?? '',
		modified: raw.modified ?? undefined,
		featuredImage,
		categories: cats,
		tags,
	};
}
