"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Experience {
	title: string;
	company: string;
	duration: string;
	location: string;
	description: string;
	skills: string[];
}

const experiences: Experience[] = [
	{
		title: "Web3 Builder",
		company: "UnPin",
		duration: "Sep 2023 - Present",
		location: "Worldwide | Remote",
		description:
			"Actively participated in Web3 hackathons, including ETHGlobal, Starknet Winter Hackathon, dAGI, Lambda, EthOnline, and easyA. 🏆 ETHGlobal 2024 Prize Winner for CollaSwitch — an automated collateral swapper.",
		skills: [
			"Solidity",
			"Foundry",
			"Rust",
			"EVM",
			"Blockchain",
			"Ethereum",
			"SNARK",
		],
	},
	{
		title: "Hybrid Senior Technical Writer / Engineer",
		company: "Palo Alto Networks",
		duration: "Sep 2022 - Sep 2023 (1 yr 1 mo)",
		location: "Santa Clara, California | Remote",
		description:
			"Led docs-as-code transition and single-handedly migrated legacy API docs to a new domain. Improved accuracy and DX through CI/CD engineering in 30+ codebases. Collaborated with engineering teams to clearly expose backend systems via APIs. Wrote SDK code snippets in Go, Python, Java, and Node. Owned and maintained API reference docs.",
		skills: [
			"Python",
			"OpenAPI Specification",
			"Markdown",
			"Technical Writing",
			"Git",
			"Swagger API",
			"Technical Documentation",
			"jq",
		],
	},
	// {
	// 	title: "Tech Copywriter",
	// 	company: "RashidMa.com",
	// 	duration: "Jan 2019 - Aug 2022 (3 yrs 8 mos)",
	// 	location: "Remote",
	// 	description:
	// 		"Created concise and compelling copy for SaaS companies. Client acquisition through prospecting, cold emails, and LinkedIn outreach.",
	// 	skills: [
	// 		"Markdown",
	// 		"Technical Writing",
	// 		"Technical Documentation",
	// 		"Writing",
	// 		"Sales Prospecting",
	// 	],
	// },
	{
		title: "Senior Software Engineer",
		company: "Baker Hughes",
		duration: "Feb 2018 - Dec 2018 (11 mos)",
		location: "Minden, NV",
		description:
			"Contributed to the development of Scout portable devices for machine condition monitoring using C++, HTML5, Angular, and CSS. Also built a comprehensive testing framework in C# to validate system performance and reliability.",
		skills: [
			"HTML5",
			"JavaScript",
			"Markdown",
			"C++",
			"AngularJS",
			"CI/CD",
			"Git",
			"C#",
			"Software Development",
			"CSS",
			"Technical Documentation",
			"SQL",
		],
	},
	{
		title: "Senior Solutions Architect",
		company: "Digital Fleet, LLC.",
		duration: "Sep 2016 - Jun 2017 (10 mos)",
		location: "Greater Chicago Area",
		description:
			"Provisioned and managed AWS cloud infrastructure; rebuilt a legacy web app using Angular, Node, and MongoDB; created technical documentation and user manuals; mentored junior software engineers.",
		skills: [
			"HTML5",
			"JavaScript",
			"AngularJS",
			"AWS",
			"CI/CD",
			"Git",
			"Docker",
			"Node.js",
			"MongoDB",
			"CSS",
			"Technical Documentation",
		],
	},
	{
		title: "Senior Software Engineer",
		company: "leadPops, Inc.",
		duration: "Nov 2015 - Jun 2016 (8 mos)",
		location: "Greater San Diego Area",
		description:
			"Led development of a marketing automation platform and end-to-end lead generation and conversion optimization suite using Angular, PHP7, and Zend Framework—empowering service-based businesses to capture, engage, and convert more leads.",
		skills: [
			"PHP",
			"MySQL",
			"HTML5",
			"React.js",
			"JavaScript",
			"AWS",
			"CI/CD",
			"Git",
			"CSS",
			"Linux",
			"Python",
			"SQL",
			"Zend Framework",
		],
	},
	{
		title: "Software Engineer",
		company: "Adicio",
		duration: "Jan 2015 - Nov 2015 (11 mos)",
		location: "Carlsbad, California",
		description:
			"Enhanced an existing web app with new features, worked with product owners to prioritize the backlog, wrote Bash and Python automation scripts.",
		skills: [
			"PHP",
			"MySQL",
			"HTML5",
			"JavaScript",
			"CI/CD",
			"Git",
			"Symfony Framework",
			"CSS",
			"Linux",
			"Python",
			"Bash",
			"SQL",
		],
	},
	{
		title: "Software Engineer",
		company: "PACCAR",
		duration: "Apr 2013 - May 2014 (1 yr 2 mos)",
		location: "Chillicothe, OH",
		description:
			"Launched a new ASP.NET responsive web app for mobile and desktop use, independently developed and released a dashboard application that aggregated data from multiple systems.",
		skills: [
			"HTML5",
			"JavaScript",
			"Git",
			"C#",
			"VB.NET",
			"CSS",
			"ASP.NET",
			"SQL",
		],
	},
	{
		title: "Software Developer",
		company: "Quad/Graphics",
		duration: "Sep 2012 - Apr 2013 (8 mos)",
		location: "Sussex, WI",
		description:
			"Iteratively optimized and enhanced a Windows application, built integrations with other apps via APIs.",
		skills: ["WCF", "C++", "Git", "C#", "ASP.NET", "SQL", "Subversion"],
	},
	{
		title: "Software Developer / Research Assistant",
		company: "Nevada System of Higher Education",
		duration: "Sep 2010 - Jun 2011 (10 mos)",
		location: "University of Nevada, Reno – Brain Computation Lab",
		description:
			"Assisted in deploying deep neural network models, performed Linux system administration, provided programming support for researchers by modifying Perl, Python, and Bash scripts.",
		skills: [
			"MySQL",
			"Java",
			"C++",
			"Git",
			"Perl",
			"Apache ActiveMQ",
			"Python",
			"Bash",
			"Subversion",
		],
	},
];

const ExperienceCard: React.FC<Experience> = ({
	title,
	company,
	duration,
	location,
	description,
	skills,
}) => (
	<div className="flex w-full justify-end">
		<motion.div
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			layout
			className="w-[85%] md:w-[90%] ml-auto"
		>
			<Card className="p-4 shadow-md rounded-xl bg-white border border-gray-100">
				<CardContent className="p-0">
					<h3 className="text-lg font-semibold">{title}</h3>
					<p className="text-gray-500">
						{company} • {duration}
					</p>
					<p className="text-sm text-gray-400">{location}</p>
					<p className="mt-2 text-gray-700">{description}</p>
					<div className="mt-3 flex flex-wrap gap-2">
						{skills.map((skill, index) => (
							<Badge
								key={index}
								className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs"
							>
								{skill}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	</div>
);

const TimelineNode: React.FC = () => (
	<div className="absolute top-0 left-[5%] md:left-[5%] transform -translate-x-1/2 h-full flex flex-col items-center">
		<div className="w-1 h-full bg-blue-400 rounded-full"></div>
	</div>
);

const TimelineDot: React.FC = () => (
	<div className="absolute left-[5%] md:left-[5%] transform -translate-x-1/2 flex items-center justify-center">
		<div className="w-5 h-5 bg-blue-500 rounded-full z-10 shadow-md"></div>
	</div>
);

const ExperienceSection: React.FC = () => (
	<div className="container mx-auto py-10">
		<h2 className="text-2xl font-bold mb-10 text-center">Experience</h2>
		<div className="relative">
			{/* Timeline vertical line */}
			<TimelineNode />

			<div className="flex flex-col gap-6">
				{experiences.map((exp, index) => (
					<div key={index} className="relative">
						{/* Timeline dot for each experience */}
						<TimelineDot />
						<ExperienceCard {...exp} />
					</div>
				))}
			</div>
		</div>
	</div>
);

export default ExperienceSection;
