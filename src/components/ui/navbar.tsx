"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
	label: string;
	href: string;
};

const navItems: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Experience", href: "#experience" },
	{ label: "Skills", href: "#skills" },
	{ label: "Education", href: "#education" },
];

export function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm shadow-sm">
			<nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo/Brand */}
					<div className="flex-shrink-0">
						<Link
							href="/"
							className="text-xl font-bold text-gray-800 transition-colors hover:text-blue-600"
						>
							Rashid McMoodoo
						</Link>
					</div>

					{/* Desktop Nav Links */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-center space-x-4">
							{navItems.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button
							type="button"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
							aria-expanded={isMenuOpen}
						>
							<span className="sr-only">
								{isMenuOpen ? "Close main menu" : "Open main menu"}
							</span>
							{isMenuOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile Menu, show/hide based on menu state */}
			<div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg bg-white">
					{navItems.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							className="text-gray-600 hover:text-blue-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							{item.label}
						</Link>
					))}
				</div>
			</div>
		</header>
	);
}
