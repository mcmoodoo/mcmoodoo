export default function BlogLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-gray-50 text-gray-900">
			<main className="max-w-3xl mx-auto p-6">{children}</main>
		</div>
	);
}
