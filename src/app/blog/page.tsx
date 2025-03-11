const blogPosts = [
	{
		title: "GenLayer's Intelligent Contracts",
		slug: "genlayer-intelligent-contracts",
		description:
			"GenLayer's Intelligent Contracts represent an evolution beyond traditional smart contracts, integrating LLMs, real-time web data, and stateful execution to enable natural language processing, dynamic decision-making, and subjective reasoning, while its Optimistic Democracy consensus ensures secure validation of non-deterministic operations, unlocking new possibilities for prediction markets and trustless oracle solutions.",
	},
	{
		title: "Lido Dual Governance",
		slug: "lido-dual-governance",
		description:
			"Lido Dual Governance empowers stETH holders to veto DAO decisions via a dynamic time lock, enabling either negotiated reversals or orderly exits, thereby counterbalancing LDO token holders’ dominance, preventing governance attacks, and ensuring user protection without burdening them with governance duties.",
	},
];

export default function BlogHome() {
	return (
		<div className="py-10">
			<h1 className="text-2xl font-semibold mb-6 text-center">Posts</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{blogPosts.map((post) => (
					<a
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="border border-gray-300 p-4 rounded-lg hover:bg-gray-100 transition"
					>
						<h2 className="text-lg font-semibold">{post.title}</h2>
						<p className="text-sm text-gray-600 mt-1">
							{post.description.length > 150
								? post.description.slice(0, 150) + "..."
								: post.description}
						</p>
					</a>
				))}
			</div>
		</div>
	);
}
