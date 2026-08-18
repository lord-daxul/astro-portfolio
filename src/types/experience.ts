export interface Experience {
	id: string;
	title: string;
	role: string;
	company: string;
	location?: string;
	startDate: string;
	endDate?: string;
	isCurrent: boolean;
	description: string;
	responsibilities?: string[];
	technologies: string[];
	companyUrl?: string;
	logo?: {
		sourceUrl: string;
		altText?: string;
	};
}
