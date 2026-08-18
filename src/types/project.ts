export interface ProjectMedia {
	sourceUrl: string;
	altText?: string;
	width?: number;
	height?: number;
}

export interface Project {
	id: string;
	databaseId?: number;
	title: string;
	slug: string;
	excerpt: string;
	content?: string;
	featuredImage?: ProjectMedia;
	gallery?: ProjectMedia[];
	projectDate?: string;
	client?: string;
	role?: string;
	technologies: string[];
	categories: string[];
	projectUrl?: string;
	repositoryUrl?: string;
	isFeatured: boolean;
	status?: string;
}
