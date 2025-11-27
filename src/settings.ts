export const profile = {
	fullName: 'Rashid McMoodoo',
	title: 'Software Engineer | Technical Writer',
	institute: '',
	author_name: 'Rashid McMoodoo', // Author name to be highlighted in the papers section
	sidebar_title: 'Rashid', // Title/name displayed in the sidebar
	research_areas: [
		// { title: 'Physics', description: 'Brief description of the research interest', field: 'physics' },
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	email: '',
	linkedin: 'https://www.linkedin.com/in/mcmoodoo',
	x: 'https://x.com/mcmoodoo',
	github: 'https://github.com/mcmoodoo',
	medium: 'https://medium.com/@mcmoodoo',
	gitlab: '',
	scholar: '',
	inspire: '',
	arxiv: '',
	orcid: '',
}

export const template = {
	website_url: import.meta.env.SITE || 'https://localhost:4321', // Astro needs to know your site’s deployed URL to generate a sitemap. It must start with http:// or https://
	menu_left: false,
	transitions: true,
	lightTheme: 'light', // Select one of the Daisy UI Themes or create your own
	darkTheme: 'dark', // Select one of the Daisy UI Themes or create your own
	excerptLength: 200,
	postPerPage: 5,
    base: '' // Repository name starting with /
}

export const seo = {
    default_title: 'Rashid McMoodoo',
    default_description: 'Software Engineer and Technical Writer.',
    default_image: '/images/rashidma-website-snapshot.png',
}
