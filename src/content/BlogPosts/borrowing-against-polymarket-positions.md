---
title: "Borrowing Against Polymarket Positions using Morpho Markets through Vaults V2"
date: "2025-11-19"
tags:
  [
    "DeFi",
    "Morpho",
    "Prediction Markets",
    "Leverage",
    "Web3",
    "Polymarket",
    "Vault V2",
    "Borrowing Strategies",
  ]
excerpt: "Currently, leveraged Polymarket positions are built manually through Morpho Markets. Here's how Morpho Vaults V2's adapter architecture will enable automatic borrowing loops—transforming manual loops into protocol-level strategies."
---

_How a chance encounter at Sky Connect during DevConnect Week sparked the idea of looping collateral through Morpho Vaults V2_

---

## A Night at Sky Connect

The Sky (MakerDAO) event during DevConnect Week was the kind of place where you'd casually bump into OGs from the lending/borrowing world. Under the clear night sky, I ended up chatting with Merlin, one of Morpho's co-founders.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ran into <a href="https://twitter.com/MerlinEgalite?ref_src=twsrc%5Etfw">@MerlinEgalite</a> at the Sky Connect by <a href="https://twitter.com/SkyEcosystem?ref_src=twsrc%5Etfw">@SkyEcosystem</a> (ex-<a href="https://twitter.com/MakerDAO?ref_src=twsrc%5Etfw">@MakerDAO</a>) in Buenos Aires during DevConnect week and were later joined by <a href="https://twitter.com/martinkrung?ref_src=twsrc%5Etfw">@martinkrung</a> from <a href="https://twitter.com/CurveFinance?ref_src=twsrc%5Etfw">@CurveFinance</a>.<br><br>We chatted about <a href="https://twitter.com/Morpho?ref_src=twsrc%5Etfw">@Morpho</a> V2 vaults, and that&#39;s when it clicked 💡<br><br>Back in June at <a href="https://twitter.com/Permissionless?ref_src=twsrc%5Etfw">@Permissionless</a> in… <a href="https://t.co/BWVTWCqf9M">pic.twitter.com/BWVTWCqf9M</a></p>&mdash; Rashid McMoodoo (@mcmoodoo) <a href="https://twitter.com/mcmoodoo/status/1991439567845577094?ref_src=twsrc%5Etfw">November 20, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

We talked about Morpho V2, and I asked about fixed rates—when they were coming. Merlin said that now V2 vaults are live, the team is pushing to release the full V2 rollout, including fixed rates, in Q1 2025.

Then Martin Krung (@martinkrung) from Curve joined us. I introduced myself and mentioned I was in the Uniswap Hooks Cohort with the Uniswap Foundation and Atrium Academy, so I'd been neck-deep in v4 hooks. Martin immediately brought up Curve's pool design and shifted the discussion toward concentrated liquidity. After a minute, I joked that it was a bit heavy for such a relaxed night, we laughed, and drifted back to Morpho V2.

As Merlin explained the shift from Vault V1 to V2, something clicked: instead of depositing wrapped Polymarket shares directly into Morpho Blue, I should be depositing into the V2 vault, which then routes those shares across destinations (Morpho Markets, V1 vaults, etc.).

Bottom line: the adapter-based architecture is the core innovation—it enables vault share composability and collateral use. Additional features like liquidity controls, safety guarantees, and cross-protocol allocation handle risk and capital deployment in the leverage loop.

## The Foundation: Current Leveraged Prediction Positions

Back in June 2025 at Permissionless NYC, I teamed up with Arsenii to build a DeFi layer for borrowing against Polymarket positions. The plan was to stay on Polygon to integrate natively with Polymarket, but the hackathon's sponsor constraints pushed us to bring the liquidity to BNB—so we added a cross-chain component. The core logic was simple:

Wrap Polymarket tokens (ERC1155 → ERC20)

Let traders borrow stablecoins against those wrapped positions through Morpho Markets (around 77% LTV). This is the current implementation—leverage is available, but borrowing loops must be managed manually.

If you want to see the exact architecture that inspired this post, the original implementation lives in the open-source repo [leveraged-prediction-positions](https://github.com/mcmoodoo/leveraged-prediction-positions); the blog walks through how Vaults V2 extends the concepts in that codebase into a full borrowing loop strategy.

We knew degens would push it to the edge, so looping was possible, but had to be done manually. It became a prediction-markets × DeFi-lending POC, and it worked: users could take leveraged positions on prediction outcomes using their wrapped tokens as collateral.

A single-chain version of the leveraged prediction positions is [here](https://github.com/mcmoodoo/leveraged-prediction-positions). It focuses on Morpho as the custom lending/borrowing layer.

**Currently, borrowing loops are manual**—each user has to manage leverage themselves:

Wrap their prediction tokens

Supply them to Morpho Markets

Borrow USDC

Buy more prediction tokens

Repeat manually

Monitor health and liquidation risk

This works, but it's manual, risky, and requires constant monitoring. With Vault V2, we can move all of this to the protocol layer—with automation and additional safeguards baked in.

## The Vision: Automatic Borrowing Loops with Vaults V2

Now that I was looking at Morpho Vaults V2, I thought: why not enable automatic leverage?

Instead of each user manually managing leverage, they would deposit wrapped prediction tokens into a Vault V2. The vault strategy would handle the borrowing loop automatically:

### The Flow

1. **Vault receives wrapped prediction tokens** from depositors
2. **Supplies collateral** to Morpho Blue (the wrapped token)
3. **Borrows USDC** against that collateral
4. **Acquires more prediction tokens** (via secondary markets or mint/split flow)
5. **Wraps the new tokens** and re-deposits them as collateral
6. **Repeats automatically** until target LTV/health factor is reached

Depositors just hold vault shares, but under the hood, the strategy loops collateral to create leveraged exposure with defined parameters (max leverage, borrow cost, oracle sanity checks, etc.).

---

## What's Next

Considering that Vaults V2 work with any protocol via adapters, it's quite possible to include other destinations for fund reallocation, diversifying yield and risk.

I'm exploring how to implement this borrowing adapter for prediction markets. The foundation is there: Morpho Blue for lending, Vault V2 for strategy abstraction, and the prediction market infrastructure already in place.

The next phase is building the custom adapter, testing the leverage loops, and ensuring the risk parameters are properly configured.

And when Morpho's fixed-rate feature launches in Q1 2025? That opens up even more possibilities for predictable, hedged leverage strategies.

---

_If you're also exploring borrowing against prediction market positions, let's [connect](https://x.com/mcmoodoo)._
