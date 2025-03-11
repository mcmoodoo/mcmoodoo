import React from "react";
import Head from "next/head";

const GenLayerIntelligentContracts: React.FC = () => {
	return (
		<>
			<Head>
				<title>
					GenLayer's Intelligent Contracts – The Cognitive Evolution of Smart
					Contracts
				</title>
				<meta
					name="description"
					content="Discover GenLayer's Intelligent Contracts, an evolution beyond smart contracts. Leverage LLMs, real-time data retrieval, and native web connectivity for more adaptive, stateful, and intelligent blockchain applications."
				/>
				<meta
					name="keywords"
					content="GenLayer, Intelligent Contracts, Smart Contracts, Blockchain, LLMs, Web3, AI, Ethereum, Optimistic Democracy"
				/>
				<meta name="author" content="GenLayer" />

				{/* Open Graph / Facebook */}
				<meta
					property="og:title"
					content="GenLayer's Intelligent Contracts – The Cognitive Evolution of Smart Contracts"
				/>
				<meta
					property="og:description"
					content="Explore how Intelligent Contracts surpass traditional smart contracts by enabling natural language processing, real-time web data retrieval, and more."
				/>
				<meta
					property="og:url"
					content="https://www.mcmoodoo.com/blog/genlayer-intelligent-contracts"
				/>
				<meta property="og:type" content="article" />

				{/* Twitter Card */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="GenLayer's Intelligent Contracts – The Cognitive Evolution of Smart Contracts"
				/>
				<meta
					name="twitter:description"
					content="Unleash the power of Intelligent Contracts with LLMs, web connectivity, and enhanced statefulness."
				/>
				{/* <meta */}
				{/* 	name="twitter:image" */}
				{/* 	content="https://genlayer.com/images/intelligent-contracts-banner.jpg" */}
				{/* /> */}
				<meta name="twitter:site" content="@GenLayer" />

				{/* Canonical URL */}
				<link
					rel="canonical"
					href="https://www.mcmoodoo.com/blog/genlayer-intelligent-contracts"
				/>

				{/* Favicon */}
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="max-w-3xl mx-auto p-6">
				<h1 className="text-3xl font-bold mb-6">
					GenLayer's Intelligent Contracts – The Cognitive Evolution of Smart
					Contracts
				</h1>

				<p className="mb-4">
					Conventional smart contracts deployed on traditional blockchains are
					forced to operate in a restricted, rigid, isolated, and deterministic
					way. It's great for security but it is very limiting.
				</p>

				<p className="mb-4">
					What if we could empower them to access the web, understand natural
					language, crunch unstructured data, and make subjective decisions all
					by themselves? These "super-contract" abilities make them so smart,
					that we could rightfully call them Intelligent.
				</p>

				<h2 className="text-2xl font-bold mt-8 mb-4">
					Beyond Smart Contracts: The Rise of Intelligent Contracts
				</h2>

				<p className="mb-4">
					GenLayer's{" "}
					<a
						href="https://docs.genlayer.com/developers/intelligent-contracts/introduction"
						className="text-blue-600 hover:underline"
					>
						Intelligent Contracts
					</a>{" "}
					is a natural next step in the evolution of blockchains. Unlike Smart
					Contracts which only speak code and require precise programming for
					exact rules and conditions, Intelligent Contracts leverage LLMs for
					real-time data retrieval and natural language processing. To
					summarize, Intelligent Contracts offer:
				</p>

				<ol className="list-decimal pl-8 mb-6 space-y-2">
					<li>
						<strong>Natural Language Fluency:</strong> process natural language,
						enabling more flexible interactions and accessibility to a wider
						range of builders
					</li>
					<li>
						<strong>Native Web Connection:</strong> directly fetch off-chain
						data via APIs or web scraping for flexible and dynamic
						decision-making, all while avoiding third-party oracles
					</li>
					<li>
						<strong>Stateful Execution:</strong> maintain state and memory,
						allowing them to evolve over time based on historical context
					</li>
					<li>
						<strong>Ability to perform complex computations</strong> like
						floating-point operations
					</li>
					<li>
						<strong>Familiar and powerful tools of Python's eco system</strong>
					</li>
				</ol>

				<p className="mb-4">
					Intelligent contracts can fetch live data (e.g. prices, weather
					updates, product details) directly from web APIs without
					intermediaries, making subjective decisions while enhancing
					adaptability and context awareness. They can also search and retrieve
					real-time information, like breaking news or sports scores, enabling
					dapps to make decisions on insurance payouts and game outcomes.
				</p>

				<p className="mb-6">
					Learn about{" "}
					<a
						href="https://docs.genlayer.com/developers/intelligent-contracts/introduction"
						className="text-blue-600 hover:underline"
					>
						Intelligent Contracts
					</a>{" "}
					or try deploying your own in{" "}
					<a
						href="https://studio.genlayer.com"
						className="text-blue-600 hover:underline"
					>
						GenLayer Studio
					</a>
					.
				</p>

				<h2 className="text-2xl font-bold mt-8 mb-4">
					Optimistic Democracy: A New Era of Consensus
				</h2>

				<p className="mb-4">
					<a
						href="https://docs.genlayer.com/understand-genlayer-protocol/optimistic-democracy-how-genlayer-works"
						className="text-blue-600 hover:underline"
					>
						Optimistic Democracy
					</a>{" "}
					is GenLayer's consensus mechanism for non-deterministic operations,
					such as those involving LLM inference and real-time web data.
				</p>

				<p className="mb-4">
					In Ethereum and other L1 chains, validators only need to agree on
					transaction ordering, because re-executing a transaction will always
					yield the same result. In GenLayer, however, the consensus operates on
					the transaction level because each transaction can produce a different
					response. Thus, instead of agreeing on the order of transactions, the
					GenLayer validators have to first agree on the non-deterministic LLM
					responses and web search results.
				</p>

				<p className="mb-4">
					But how exactly do the LLM-powered validators agree on the transaction
					output?
				</p>

				<h3 className="text-xl font-bold mt-6 mb-3">Equivalence Principle</h3>

				<p className="mb-4">
					Each transaction consists of deterministic and non-deterministic
					parts. The former could be easily re-executed by each validator to
					verify valid state change. But the latter will yield different
					results. That's where validators employ the Equivalence Principle to
					evaluate whether the leader-proposed output is valid.
				</p>

				<h3 className="text-xl font-bold mt-6 mb-3">Optimistic Validation</h3>

				<p className="mb-4">
					To minimize LLM inference costs, GenLayer allocates a subset of
					validators with a random leader to each transaction. The chances of
					being selected into the subset are proportional to the validator's
					total stake. Users can ensure single-round finality by paying for more
					validators, while developers can set method-specific minimums.
				</p>

				<p className="mb-4">
					A leader proposes the output for non-deterministic calls, while others
					attest its quality using the Equivalence Principle. Here's how it
					works:
				</p>

				<ul className="list-disc pl-8 mb-6 space-y-2">
					<li>
						The lead validator records its execution trace in the{" "}
						<strong>transaction receipt.</strong> That includes
						non-deterministic inputs and outputs.
					</li>
					<li>
						Validators perform <strong>two runs</strong>.
					</li>
					<li>
						<strong>On the first run</strong>, the deterministic part is easily
						re-executed by the validators. The non-deterministic part is
						replaced with the leader's proposed outputs.
					</li>
					<li>
						<strong>On the second run</strong>, the validators execute the
						entire transaction. The outputs for non-deterministic parts are
						compared with the ones produced by the leader using the Equivalence
						Principle specified for each call. If every output passes, the
						validator successfully validates the leader's response. The
						equivalence checks are parallelized for performance.
					</li>
				</ul>

				<h3 className="text-xl font-bold mt-6 mb-3">Appeals</h3>

				<p className="mb-6">
					For cases when validators fail to reach consensus, an external
					validator can submit an appeal request during the finality window.
					This doubles the validator set and picks a new leader. The process can
					go for several rounds until the full finality is reached.
				</p>

				<p className="mb-4">
					Read more on Optimistic Democracy in GenLayer's{" "}
					<a
						href="https://www.genlayer.com/whitepaper"
						className="text-blue-600 hover:underline"
					>
						Whitepaper
					</a>
					.
				</p>

				<h2 className="text-2xl font-bold mt-8 mb-4">
					Transforming Prediction Markets
				</h2>

				<p className="mb-4">
					As an example use case, let's take prediction markets, which depend on
					accurate, timely data.
				</p>

				<p className="mb-4">
					Current prediction markets operate by consuming oracle-provided
					real-time data to enable smart contracts to make deterministic
					decisions about specific outcomes. That means for each event, poll, or
					sports game, a new rigid oracle infrastructure has to be configured.
					Another drawback is dispute resolutions lasting up to 98 hours.
				</p>

				<p className="mb-4">
					GenLayer's core capabilities, such as native internet connectivity and
					ability to understand natural language, avoid using oracles altogether
					while offering the same or better level of security. The recent
					implementation of{" "}
					<a
						href="https://www.genlayer.com/post/the-intelligent-oracle-real-time-data-access-for-the-next-generation-of-dapps"
						className="text-blue-600 hover:underline"
					>
						Intelligent Oracle
					</a>
					, which is based on Intelligent Contracts, brings any web data
					on-chain. Other advantages include:
				</p>

				<ul className="list-disc pl-8 mb-6 space-y-2">
					<li>Short finality, usually under an hour</li>
					<li>
						Prediction markets could be resolved for the fraction of the cost of
						current oracle-based solutions
					</li>
					<li>
						Instant event resolutions via autonomous web scraping for relevant
						real-time data
					</li>
				</ul>

				<p className="mb-6">
					Other use cases requiring more flexible oracle solutions that need to
					bring data on chain in a trustless way could benefit from utilizing{" "}
					<a
						href="https://www.genlayer.com/post/the-intelligent-oracle-real-time-data-access-for-the-next-generation-of-dapps"
						className="text-blue-600 hover:underline"
					>
						Intelligent Oracle
					</a>
					.
				</p>

				<h2 className="text-xl font-bold mt-8 mb-2 text-center">Sources</h2>
				<div className="flex flex-wrap gap-4 justify-center">
					<a
						href="https://blog.genlayer.com/"
						className="text-blue-600 hover:underline"
					>
						GenLayer Blog
					</a>{" "}
					|
					<a
						href="https://docs.genlayer.com/"
						className="text-blue-600 hover:underline"
					>
						GenLayer Docs
					</a>{" "}
					|
					<a
						href="https://www.genlayer.com/whitepaper"
						className="text-blue-600 hover:underline"
					>
						GenLayer Whitepaper
					</a>
				</div>
			</div>
		</>
	);
};

export default GenLayerIntelligentContracts;
