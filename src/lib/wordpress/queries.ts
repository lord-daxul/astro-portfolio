export const GET_PROJECTS_QUERY = /* GraphQL */ `
	query GetProjects($first: Int = 50) {
		projects(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
			nodes {
				id
				databaseId
				title
				slug
				excerpt
				content
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
				projectCategories {
					nodes {
						name
						slug
					}
				}
				projectDetails {
					projectDate
					client
					role
					projectUrl
					repositoryUrl
					isFeatured
					status
					technologies
				}
			}
		}
	}
`;

export const GET_PORTFOLIO_ITEMS_FALLBACK_QUERY = /* GraphQL */ `
	query GetPortfolioItemsFallback($first: Int = 50) {
		portfolioItems(first: $first) {
			nodes {
				id
				databaseId
				title
				slug
				excerpt
				content
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
				techs {
					nodes {
						name
						slug
					}
				}
			}
		}
	}
`;

export const GET_PROJECT_BY_SLUG_QUERY = /* GraphQL */ `
	query GetProjectBySlug($slug: ID!) {
		project(id: $slug, idType: SLUG) {
			id
			databaseId
			title
			slug
			excerpt
			content(format: RENDERED)
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
			projectCategories {
				nodes {
					name
					slug
				}
			}
			projectDetails {
				projectDate
				client
				role
				projectUrl
				repositoryUrl
				isFeatured
				status
				technologies
			}
		}
	}
`;

export const GET_PORTFOLIO_BY_SLUG_FALLBACK_QUERY = /* GraphQL */ `
	query GetPortfolioBySlugFallback($slug: ID!) {
		portfolioItem(id: $slug, idType: SLUG) {
			id
			databaseId
			title
			slug
			excerpt
			content(format: RENDERED)
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
			techs {
				nodes {
					name
					slug
				}
			}
		}
	}
`;

export const GET_EXPERIENCES_QUERY = /* GraphQL */ `
	query GetExperiences($first: Int = 50) {
		experiences(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
			nodes {
				id
				databaseId
				title
				content
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
				experienceDetails {
					position
					company
					location
					startDate
					endDate
					isCurrent
					technologies
					companyUrl
				}
			}
		}
	}
`;

export const GET_POSTS_QUERY = /* GraphQL */ `
	query GetPosts($first: Int = 20) {
		posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
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
				categories {
					nodes {
						name
						slug
					}
				}
				tags {
					nodes {
						name
						slug
					}
				}
			}
		}
	}
`;

export const GET_POST_BY_SLUG_QUERY = /* GraphQL */ `
	query GetPostBySlug($slug: ID!) {
		post(id: $slug, idType: SLUG) {
			id
			databaseId
			title
			slug
			excerpt
			content(format: RENDERED)
			date
			modified
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
			categories {
				nodes {
					name
					slug
				}
			}
			tags {
				nodes {
					name
					slug
				}
			}
		}
	}
`;
