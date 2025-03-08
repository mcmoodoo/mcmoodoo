"use client";

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ExperienceSection from "@/components/Experience";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Content data as a JSON object
const pageContent = {
	profile: {
		name: "Rashid McMoodoo",
		image: "/rashid-profile.jpg",
		title: "Software Engineer | Technical Writer | Web3 Builder",
		location: "📍 Austin, Texas, United States",
		bio: "Full-stack Engineer & Technical Writer. Web3 Builder, EthGlobal prize winner. Led API docs at Palo Alto Networks. Expertise in cloud infrastructure, full-stack dev, and tech documentation.",
	},
	skills: {
		blockchain: {
			title: "Blockchain & Web3",
			items: [
				"Solidity on Etherem, Base, Arbitrum",
				"Cairo on Starknet",
				"Rust on Arbitrum Stylus",
			],
		},
		fullstack: {
			title: "Full Stack",
			items: [
				"Backend: Rust, C++, Python, C#",
				"Frontend: React",
				"Scripting: Bash, Python, jq",
			],
		},
	},
	workExperience: [
		{
			title: "Web3 Builder",
			period: "September 2023 - Present",
			items: [
				"Building DeFi and Web3 solutions at hackathons around the globe",
				"EthGlobal 2024 Hackathon Prize Winner. Project: CollaSwitch (Automated Collateral Swapper)",
			],
		},
		{
			title: "Senior Technical Writer",
			company: "Palo Alto Networks",
			period: "2022 - 2023",
			items: [
				"Maintained API reference documentation for 40+ unique APIs",
				"Transitioned the API reference site to pan.dev with enhanced UI",
				"Implemented docs-as-code workflow through CI/CD pipelines",
			],
		},
		{
			title: "Tech Copywriter",
			company: "RashidMa.com",
			period: "2019 - 2022",
			items: [
				"Created concise and compelling copy for SaaS companies",
				"Developed technical documentation and marketing content",
			],
		},
		{
			title: "Senior Software Engineering Roles",
			company: "",
			period: "2010 - 2018",
			items: [
				"Senior Software Engineer at Baker Hughes (2018)",
				"Senior Solutions Architect at Digital Fleet (2016-2017)",
				"Software Engineering positions at leadPops, Adicio, PACCAR, NSHE (2010-2016)",
			],
		},
	],
	education: [
		{
			institution: "University of Nevada, Reno",
			period: "2008 - 2012",
			degree: "B.S. in Computer Science & Engineering",
		},
		{
			institution: "National School of Physics & Math (FIZMAT)",
			period: "2003 - 2006",
			focus: "Focus: Math & Computer Science",
		},
	],
};

export default function Home() {
	return (
		<main className="min-h-screen p-8 pt-16 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
			<div className="max-w-4xl mx-auto">
				{/* Profile Section */}
				<Card className="mb-8 border-gray-200 shadow-md transition-transform hover:scale-105">
					<CardHeader className="flex flex-col items-center text-center space-y-2">
						<Avatar className="w-32 h-32 mb-3 shadow-lg rounded-full">
							<AvatarImage
								src={pageContent.profile.image || "/rashid-profile.jpg"}
								alt={pageContent.profile.name}
							/>
							<AvatarFallback className="text-xl font-medium bg-gray-300">
								{pageContent.profile.name?.split(" ")[0] || "User"}
							</AvatarFallback>
						</Avatar>
						<CardTitle className="text-2xl font-bold text-gray-800">
							{pageContent.profile.name}
						</CardTitle>
						<CardDescription className="text-lg text-gray-600">
							{pageContent.profile.title}
						</CardDescription>
						{pageContent.profile.location && (
							<p className="text-gray-500 mt-1">
								{pageContent.profile.location}
							</p>
						)}
					</CardHeader>
					<CardContent className="text-center px-6 pb-6">
						<p className="text-gray-700 leading-relaxed line-clamp-6">
							{pageContent.profile.bio || "No bio available."}
						</p>
						<a
							href="https://mcmoodoo.s3.us-east-1.amazonaws.com/Rashid_McMoodoo_Resume.pdf"
							download
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button className="mt-4" variant="default">
								<Download className="w-4 h-4 mr-2" />
								Resume
							</Button>
						</a>
					</CardContent>
				</Card>

				{/* Skills Section */}
				<section id="skills">
					<Card className="mb-8 border border-gray-300 shadow-md rounded-lg">
						<CardHeader className="bg-gray-100 rounded-t-lg px-6 py-4">
							<CardTitle className="text-2xl font-bold text-gray-800">
								Technical Skills
							</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
							{/* Blockchain Skills */}
							<div>
								<h3 className="font-semibold text-lg text-gray-700 mb-3">
									{pageContent.skills.blockchain.title}
								</h3>
								<ul className="space-y-2">
									{pageContent.skills.blockchain.items.map((item, index) => (
										<li key={index} className="flex items-center text-gray-600">
											<svg
												className="w-4 h-4 text-blue-600 mr-2"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M10 2a8 8 0 100 16 8 8 0 000-16zM7.707 10.293a1 1 0 011.414 0L10 11.172l1.879-1.879a1 1 0 111.414 1.414l-2.586 2.586a1 1 0 01-1.414 0l-2.586-2.586a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
											{item}
										</li>
									))}
								</ul>
							</div>

							{/* Programming Skills */}
							<div>
								<h3 className="font-semibold text-lg text-gray-700 mb-3">
									{pageContent.skills.fullstack.title}
								</h3>
								<ul className="space-y-2">
									{pageContent.skills.fullstack.items.map((item, index) => (
										<li key={index} className="flex items-center text-gray-600">
											<svg
												className="w-4 h-4 text-green-600 mr-2"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M10 2a8 8 0 100 16 8 8 0 000-16zM7.707 10.293a1 1 0 011.414 0L10 11.172l1.879-1.879a1 1 0 111.414 1.414l-2.586 2.586a1 1 0 01-1.414 0l-2.586-2.586a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
											{item}
										</li>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>
				</section>

				{/* Education Section */}
				<section id="education">
					<Card className="mt-4 mb-8 border-gray-200 shadow-sm">
						<CardHeader>
							<CardTitle className="text-xl font-bold">Education</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{pageContent.education.map((edu, index) => (
								<div key={index}>
									<h3 className="font-semibold text-gray-700">
										{edu.institution} ({edu.period})
									</h3>
									<p className="text-gray-600">{edu.degree || edu.focus}</p>
								</div>
							))}
						</CardContent>
					</Card>
				</section>

				{/* Experience Section */}
				<section id="experience">
					<ExperienceSection />
				</section>
			</div>
		</main>
	);
}
