---
title: "Building a Threshold-Based Token Sweeper with Mimic Protocol"
date: "2025-12-29"
excerpt: "Learn how to build an automated token sweeper that transfers ERC20 tokens when wallet balances exceed a specified USD threshold using Mimic Protocol."
tags: ["Mimic", "ERC20", "Token Sweeper", "Web3", "Automation", "TypeScript"]
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/x3L7-2rbpmM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Managing token balances across wallets can be tedious. Sending funds manually is error-prone and time-consuming. Luckily, <a href="https://mimic.fi" target="_blank" rel="noopener noreferrer">Mimic Protocol</a> lets you automate token transfers with a Token Sweeper, moving funds automatically when a balance threshold is reached.

In this post, I'll walk through how to set up a Token Sweeper using Mimic in TypeScript / AssemblyScript.

## 1. Install the Mimic CLI

First, install the Mimic CLI globally:

```bash
yarn global add @mimicprotocol/cli
```

Verify the installation:

```bash
mimic
```

## 2. Initialize a New Project

Create a new Mimic project for your Token Sweeper:

```bash
mimic init -d token-sweeper
cd token-sweeper
ll
```

This generates a TypeScript project with:

- `package.json`
- `src/` folder for core logic
- `manifest.yaml` with task metadata and configurable inputs

## 3. Edit the Manifest

Update `manifest.yaml` to reflect the Token Sweeper logic:

```yaml
version: 1.0.15
name: Transfer based on USD threshold
description: Automated task to execute parameterized transfers based on balance threshold in USD
inputs:
  - chainId: uint32
  - token: address
  # - amount: string # e.g., '10.2' = 10.2 of the given token
  - recipient: address
  - maxFee: string # e.g., '0.01' = 0.01 of the given token
  - thresholdUsd: string # e.g., '30.5' = 30.5 USD
abis:
  - ERC20: ./abis/ERC20.json
```

Delete any unnecessary inputs (like `amount`) and create the `abis` folder:

```bash
mkdir -p abis
wget "https://216358192-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F2K6E4Us9xYRIC0Tt0SIZ%2Fuploads%2FLzvR464ArklTLEA67qfw%2FERC20.json?alt=media&token=163296d8-8fd0-4376-a649-4c7c07f8b321" -O ./abis/ERC20.json
```

## 4. Generate Typed Code

Run:

```bash
mimic codegen
```

This generates:

- `src/types/ERC20.ts` → typed wrapper for ERC20 contracts
- `src/types/index.ts` → typed access to task inputs

Typed code allows safe, clean interaction with contracts and inputs.

## 5. Write the Task Logic

Tasks are written in AssemblyScript, a strongly-typed subset of TypeScript that compiles to WebAssembly:

```typescript
import {
  ERC20Token,
  environment,
  log,
  TokenAmount,
  TransferBuilder,
  DenominationToken,
  USD,
} from "@mimicprotocol/lib-ts";
import { ERC20 } from "./types/ERC20";
import { inputs } from "./types";

export default function main(): void {
  const token = ERC20Token.fromAddress(inputs.token, inputs.chainId);
  const threshold = USD.fromStringDecimal(inputs.thresholdUsd);
  const wallet = environment.getContext().user;
  const balance = new ERC20(inputs.token, inputs.chainId).balanceOf(
    wallet,
  ).value;
  const balanceUsd = TokenAmount.fromBigInt(token, balance).toUsd();

  if (balanceUsd.isError) throw new Error(balanceUsd.error);

  log.info(`Source wallet balance: ${balance}`);
  log.info(`Source wallet balance in USD: ${balanceUsd.value}`);

  if (balanceUsd.value.gt(threshold)) {
    TransferBuilder.forChain(inputs.chainId)
      .addTransferFromBigInt(token, balance, inputs.recipient)
      .addMaxFee(
        TokenAmount.fromStringDecimal(DenominationToken.USD(), inputs.maxFee),
      )
      .build()
      .send();
  }
}
```

This task monitors wallet balances and automatically transfers tokens if the USD threshold is exceeded.

## 6. Compile and Deploy

Compile the task and manifest:

```bash
mimic compile
```

This produces:

- `build/task.wasm` → WebAssembly binary
- `build/manifest.json` → processed manifest

Generate an API key at <a href="https://protocol.mimic.fi/api-key" target="_blank" rel="noopener noreferrer">Mimic API</a> and deploy:

```bash
mimic deploy --key $MIMIC_API_KEY
```

Your task template is now live! Verify via IPFS:

```
https://ipfs.io/ipfs/<CID>
```

## 7. Configure & Test

1. Configure the task in <a href="https://protocol.mimic.fi" target="_blank" rel="noopener noreferrer">Mimic's web UI</a>
2. Sign & send the task
3. Fund the wallet with USDC
4. Watch Mimic automatically sweep the tokens when the threshold is reached

## 8. Beyond Token Sweeping

Mimic isn't just for wallet automation. You can use it for:

- **Dollar-cost averaging (DCA)**
- **Token rebalancing**
- **Fee collection**
- **Refund automation**
- **Chained workflows** like bridging assets or investing in Aave

## Resources

- <a href="https://mimic.fi" target="_blank" rel="noopener noreferrer">Mimic Protocol</a>
- <a href="https://216358192-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F2K6E4Us9xYRIC0Tt0SIZ%2Fuploads%2FLzvR464ArklTLEA67qfw%2FERC20.json?alt=media&token=163296d8-8fd0-4376-a649-4c7c07f8b321" target="_blank" rel="noopener noreferrer">ERC20 ABI</a>
- Code for this tutorial: <a href="https://github.com/mcmoodoo/mimic-token-sweeper" target="_blank" rel="noopener noreferrer">mcmoodoo/mimic-token-sweeper</a>

## Conclusion

Automating token transfers with Mimic saves time, reduces errors, and opens up possibilities for advanced workflows. This Token Sweeper is a simple example of what's possible—explore further and see what else you can automate!

_Follow <a href="https://x.com/mimicfi?s=20" target="_blank" rel="noopener noreferrer">@mimicfi</a> on X for updates_
