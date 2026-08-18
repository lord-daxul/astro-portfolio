export interface PostMedia {
	sourceUrl: string;
	altText?: string;
	width?: number;
	height?: number;
}

export interface Post {
	id: string;
	databaseId?: number;
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	date: string;
	modified?: string;
	featuredImage?: PostMedia;
	categories: string[];
	tags: string[];
}
