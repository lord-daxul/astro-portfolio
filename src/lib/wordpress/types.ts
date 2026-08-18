export type { Project as PortfolioItem } from '../../types/project';

export interface WPImageNode {
	sourceUrl?: string | null;
	altText?: string | null;
	mediaDetails?: {
		width?: number | null;
		height?: number | null;
	} | null;
}

export interface WPTaxonomyNode {
	name?: string | null;
	slug?: string | null;
}

export interface WPProjectACF {
	projectDate?: string | null;
	client?: string | null;
	role?: string | null;
	projectUrl?: string | null;
	repositoryUrl?: string | null;
	isFeatured?: boolean | null;
	status?: string | null;
	technologies?: string[] | string | null;
}

export interface WPProjectRaw {
	id: string;
	databaseId?: number | null;
	title?: string | null;
	slug?: string | null;
	excerpt?: string | null;
	content?: string | null;
	date?: string | null;
	featuredImage?: {
		node?: WPImageNode | null;
	} | null;
	projectCategories?: {
		nodes?: WPTaxonomyNode[] | null;
	} | null;
	portfolioCategories?: {
		nodes?: WPTaxonomyNode[] | null;
	} | null;
	techs?: {
		nodes?: WPTaxonomyNode[] | null;
	} | null;
	projectDetails?: WPProjectACF | null;
	acf?: WPProjectACF | null;
}

export interface WPExperienceACF {
	position?: string | null;
	company?: string | null;
	location?: string | null;
	startDate?: string | null;
	endDate?: string | null;
	isCurrent?: boolean | null;
	technologies?: string[] | string | null;
	companyUrl?: string | null;
}

export interface WPExperienceRaw {
	id: string;
	databaseId?: number | null;
	title?: string | null;
	content?: string | null;
	featuredImage?: {
		node?: WPImageNode | null;
	} | null;
	experienceDetails?: WPExperienceACF | null;
	acf?: WPExperienceACF | null;
}

export interface WPPostRaw {
	id: string;
	databaseId?: number | null;
	title?: string | null;
	slug?: string | null;
	excerpt?: string | null;
	content?: string | null;
	date?: string | null;
	modified?: string | null;
	featuredImage?: {
		node?: WPImageNode | null;
	} | null;
	categories?: {
		nodes?: WPTaxonomyNode[] | null;
	} | null;
	tags?: {
		nodes?: WPTaxonomyNode[] | null;
	} | null;
}

export interface GraphQLResponse<T> {
	data?: T;
	errors?: readonly { message: string }[];
}
