import React from "react";
import Head from "next/head";

const GenLayerIntelligentContracts: React.FC = () => {
	return (
		<>
			<Head>
				<title>
					Lido Dual Governance – Empowering stETH Holders and Balancing DAO
					Power
				</title>
				<meta
					name="description"
					content="Discover how Lido Dual Governance protects stETH holders by enabling veto power, dynamic time locks, and exit guarantees, ensuring fairer DAO decision-making and user security."
				/>
				<meta
					name="keywords"
					content="Lido, Dual Governance, stETH, LDO, DAO, Blockchain, Ethereum, DeFi, Governance, Veto Power"
				/>
				<meta name="author" content="Lido DAO" />

				{/* Open Graph / Facebook */}
				<meta
					property="og:title"
					content="Lido Dual Governance – Empowering stETH Holders and Balancing DAO Power"
				/>
				<meta
					property="og:description"
					content="Learn how Lido's Dual Governance introduces veto power, exit guarantees, and dynamic time locks to protect stETH holders from governance risks."
				/>
				<meta
					property="og:url"
					content="https://www.mcmoodoo.com/blog/lido-dual-governance"
				/>
				<meta property="og:type" content="article" />

				{/* Twitter Card */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Lido Dual Governance – Empowering stETH Holders and Balancing DAO Power"
				/>
				<meta
					name="twitter:description"
					content="Lido's Dual Governance shifts power to stETH holders with veto rights, dynamic time locks, and exit options."
				/>
				{/* <meta */}
				{/* 	name="twitter:image" */}
				{/* 	content="https://lido.fi/images/dual-governance-banner.jpg" */}
				{/* /> */}
				<meta name="twitter:site" content="@LidoDualGovernance" />

				{/* Canonical URL */}
				<link
					rel="canonical"
					href="https://www.mcmoodoo.com/blog/lido-dual-governance"
				/>

				{/* Favicon */}
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="max-w-3xl mx-auto p-6">
				<h1 className="text-3xl font-bold mb-6">
					Lido Dual Governance: Your Staked ETH, Your Say!
				</h1>
			</div>
		</>
	);
};

export default GenLayerIntelligentContracts;
