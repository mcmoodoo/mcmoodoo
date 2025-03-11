const blogPosts = [
	{
		title: "GenLayer Intelligent Contracts",
		slug: "genlayer-intelligent-contracts",
		description:
			"How GenLayer is redefining smart contracts with automation and AI integration.",
	},
	{
		title: "Understanding Layer 2 Scaling",
		slug: "understanding-layer2",
		description:
			"A deep dive into Ethereum Layer 2 solutions and their impact on scalability.",
	},
];

export default function BlogHome() {
	return (
		<div className="py-10">
			<h1 className="text-2xl font-semibold mb-6">Posts</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{blogPosts.map((post) => (
					<a
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="border border-gray-300 p-4 rounded-lg hover:bg-gray-100 transition"
					>
						<h2 className="text-lg font-semibold">{post.title}</h2>
						<p className="text-sm text-gray-600 mt-1">{post.description}</p>
					</a>
				))}
			</div>
		</div>
	);
}
