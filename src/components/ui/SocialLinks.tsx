"use client";

import { Github, Linkedin, MessageSquare, Twitter } from "lucide-react";
import Link from "next/link";

export type SocialLink = {
	icon: React.ElementType;
	href: string;
	label: string;
};

export const defaultSocialLinks: SocialLink[] = [
	{
		icon: Linkedin,
		href: "https://www.linkedin.com/in/mcmoodoo",
		label: "LinkedIn",
	},
	{ icon: Twitter, href: "https://x.com/mcmoodoo", label: "X" },
	{
		icon: MessageSquare,
		href: "https://medium.com/@mcmoodoo",
		label: "Medium",
	},
	{ icon: Github, href: "https://github.com/mcmoodoo", label: "GitHub" },
];

interface SocialLinksProps {
	links?: SocialLink[];
	className?: string;
	iconSize?: number;
	onClick?: () => void;
}

export function SocialLinks({
	links = defaultSocialLinks,
	className = "",
	iconSize = 5,
	onClick,
}: SocialLinksProps) {
	return (
		<div className={`flex items-center space-x-3 ${className}`}>
			{links.map((item) => (
				<Link
					key={item.label}
					href={item.href}
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 hover:text-blue-600 transition-colors"
					aria-label={item.label}
					onClick={onClick}
				>
					<item.icon className={`h-${iconSize} w-${iconSize}`} />
				</Link>
			))}
		</div>
	);
}
