---
title: "Two EthGlobal Wins: CollaSwitch and a Uniswap v4 Rebasing Pool"
date: "2025-11-17"
tags: ["EthGlobal", "Hackathons", "Web3", "DeFi", "Uniswap", "Ethereum"]
excerpt: "How CollaSwitch and a Uniswap v4 rebasing pool project turned late-night hacking into two EthGlobal wins."
---

## Two Wins, Same Obsession: Building in Public at EthGlobal

EthGlobal hackathons became the place where my polyglot background, copywriting chops, and love for DeFi all collided. This post is a quick walkthrough of two builds that mattered most to me: **CollaSwitch** and an **ETH/stETH rebasing pool on Uniswap v4 hooks**.

Neither of these projects was "perfect". Both were hacked together under brutal time pressure. But they each solved a real problem, and both ended up winning at EthGlobal.

---

## Win #1 – CollaSwitch: Automatic Collateral Swaps

At a high level, **CollaSwitch** solves a simple but painful problem: if your collateral ratio is drifting in a volatile market, you should not be manually juggling swaps and repayments while staring at liquidation thresholds.

CollaSwitch automates that dance:

- **Monitors** your collateralization levels.
- **Swaps** collateral when you cross predefined thresholds.
- **Keeps** you away from liquidation without you baby-sitting dashboards.

You can explore it here:

- EthGlobal showcase: [CollaSwitch on EthGlobal](https://ethglobal.com/showcase/collaswitch-ahx66)
- Code: [auto-collateral-swapper on GitHub](https://github.com/junta/auto-collateral-swapper)

Under the hood, the project leans on the same instincts I’ve built over the years:

- Systems thinking from infrastructure work.
- Clear mental models from writing API docs and long-form technical content.
- A bias toward building **practical** tools that reduce cognitive overhead for people actually using DeFi.

---

## Win #2 – An ETH/stETH Rebasing Pool on Uniswap v4 Hooks

The second EthGlobal win came from wrestling with a deceptively tricky question:

> How do you support **rebasing tokens** (like stETH) inside an AMM pool **without** breaking the constant-product assumptions?

The answer turned into an **ETH/stETH rebasing pool built on Uniswap v4 hooks**:

- The pool handles balances that change automatically due to rebasing.
- The hook logic keeps pricing and accounting coherent, even as balances shift.
- The end result is a cleaner way to plug rebasing assets into Uniswap v4.

This project won **3rd place from the Uniswap Foundation at EthGlobal NYC**, and it’s still one of my favorite builds. It combined:

- Low-level reasoning from my C++ and signal-processing days.
- Architecture thinking from years of backend and infra work.
- The storytelling discipline I picked up from copywriting and technical writing.

---

## Why These Wins Matter More Than the Prizes

The best part of these EthGlobal wins isn’t the prize money or the badges—it’s the compounding effect:

- Each project expanded my DeFi intuition.
- Each hackathon forced me to move from **idea** → **spec** → **working prototype** fast.
- Each build sharpened the way I communicate complex systems to other humans.

If you want more context on how I got here—from Pascal on CRT monitors to Web3 hackathons—you can read the longer story in [The Polyglot Path: 20 Years Across Languages, Industries, and Continents](/pascal-to-web3-developer-journey).
