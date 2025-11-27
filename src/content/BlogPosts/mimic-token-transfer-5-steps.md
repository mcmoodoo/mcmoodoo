---
title: "How I Built a Token Transfer Task with Mimic in 5 Steps"
date: "2025-11-25"
excerpt: "A hands‑on walkthrough building a Mimic task that automates a USD‑threshold token transfer—from setup and manifest to logic, compile, and deploy."
tags: ["DeFi", "Mimic", "Automation", "Tutorial", "Web3"]
---

<a href="https://mimic.fi" target="_blank" rel="noopener noreferrer">Mimic</a>, a cross-chain DeFi automation layer, first landed on my radar through an unexpected chain of events at <a href="https://devconnect.org/" target="_blank" rel="noopener noreferrer">DevConnect</a> BA 2025.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Getting settled at the <a href="https://twitter.com/hashtag/uniswapcup?src=hash&amp;ref_src=twsrc%5Etfw">#uniswapcup</a><br><br>Will be playing on the notorious Atrium Academy’s team <a href="https://t.co/PwXW9AZdY3">pic.twitter.com/PwXW9AZdY3</a></p>&mdash; Rashid McMoodoo (@mcmoodoo) <a href="https://twitter.com/mcmoodoo/status/1990065023050240306?ref_src=twsrc%5Etfw">November 16, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I’d joined the Uniswap Hooks Incubator run by <a href="https://atrium.academy/" target="_blank" rel="noopener noreferrer">Atrium Academy</a>, which earned me a spot on their Uniswap Cup team. That got me dropped into a chaotic Telegram group where players debated everything from cleat length to ball size. Since I was trying to get the attention of top DeFi teams, I fired off a deliberately bold message to shake things up:

![the notorious Telegram message](/images/notorious-tg-message.png)

Entertained by my punchy message, <a href="https://x.com/panditdhamdhere?s=20" target="_blank" rel="noopener noreferrer">Pandit</a> followed up and pointed me to <a href="https://x.com/stoczek_eth?s=20" target="_blank" rel="noopener noreferrer">Lukasz</a> from <a href="https://mimic.fi" target="_blank" rel="noopener noreferrer">Mimic</a>, who quickly gave me a rundown of their three-layer architecture. It clicked right away, given my three-year DeFi journey. Smart contract development and deployment tooling is, to put it mildly, not very friendly to an average developer coming from a conventional Web2 background like me.

So after a 40-minute crash course given to me by Lukasz, I figured: why not try it myself? Mimic sounded like the kind of abstraction layer that could dramatically speed up “time-to-chain” for common on-chain workflows.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Thanks to <a href="https://twitter.com/panditdhamdhere?ref_src=twsrc%5Etfw">@panditdhamdhere</a> for introducing me to <a href="https://twitter.com/stoczek_eth?ref_src=twsrc%5Etfw">@stoczek_eth</a>. Had a chance to learn about <a href="https://twitter.com/mimicfi?ref_src=twsrc%5Etfw">@mimicfi</a>&#39;s approach to automating <a href="https://twitter.com/hashtag/DeFi?src=hash&amp;ref_src=twsrc%5Etfw">#DeFi</a> and reducing &quot;time-to-chain&quot;<br><br>Got connected with <a href="https://twitter.com/facuspagnuolo?ref_src=twsrc%5Etfw">@facuspagnuolo</a> who walked me through the technical details first-hand.<br><br>I wrote up the full… <a href="https://t.co/4aC6SxVrNY">pic.twitter.com/4aC6SxVrNY</a></p>&mdash; Rashid McMoodoo (@mcmoodoo) <a href="https://twitter.com/mcmoodoo/status/1994075230264873039?ref_src=twsrc%5Etfw">November 27, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I started by building a simple task—the core unit you define in Mimic—and decided to automate a USD-threshold-based token transfer to see how the whole flow works end-to-end. The tooling is pleasantly straightforward, powered by the `@mimicprotocol/cli` package and built with oclif for a clean developer experience.

So I just installed it globally for convenience:

```bash
yarn global add @mimicprotocol/cli
```

```bash
❯ mimic --version
@mimicprotocol/cli/0.0.1-rc.27 linux-x64 node-v24.11.0
```

![Mimic demo](/images/mimic.gif)

## How We’ll Tackle This

- [Initialize the project](#spinning-up-the-workspace)
- [Edit the manifest (inputs, ABIs, metadata)](#defining-the-rules-manifest)
- [Implement the task logic](#teaching-the-task-what-to-do)
- [Build to validate, generate artifacts, and compile](#turning-code-into-artifacts)
- [Deploy the output to the task registry for relayers](#putting-it-on-the-map-deploy)
- [A Few Friendly Suggestions for Mimic](#a-few-friendly-suggestions-for-mimic)

> Follow along in the companion walkthrough repo: <a href="https://github.com/mcmoodoo/token-transfer-with-mimic" target="_blank" rel="noopener noreferrer">mcmoodoo/token-transfer-with-mimic</a>

## Spinning Up the Workspace

I started by creating a new working directory with:

```bash
mimic init -d token-transfer
```

![Mimic demo](/images/creating-mimic-task.gif)

That generates a simple `manifest.yaml` inside the directory:

```yaml
version: 1.0.0
name: Example Task
description: Autogenerated example task
inputs:
  - chainId: uint32
  - token: address
  - amount: uint256
  - recipient: address
  - maxFee: uint256
```

The manifest file is the task’s blueprint—a declarative spec defining its name, inputs, and contract dependencies. Mimic treats it as the source of truth, using it to type-check the logic, generate bindings, and package the task. You describe the desired state; Mimic materializes it.

This mindset reminds me of why I moved from Arch to NixOS: fewer surprises, less drift, and instant rollbacks when things break. Anyway—

## Defining the Rules (Manifest)

The task I’m building checks an account’s USD-denominated balance for a specific ERC-20 token and triggers a token transfer if that balance falls below a threshold. To extend the base config, I added a `thresholdUsd` input and switched numeric fields like `amount` and `maxFee` to strings so they support human-readable decimals. With those changes, the task can evaluate USD value and execute the transfer only when the threshold is breached.

```diff
 version: 1.0.0
-name: Example Task
-description: Autogenerated example task
+name: Transfer based on USD threshold
+description: Automated task to execute parameterized transfers based on balance threshold in USD
 inputs:
   - chainId: uint32
   - token: address
-  - amount: string          # e.g., '20.5' = 20.5 of the given token
+  - amount: string # e.g., '10.2' = 10.2 of the given token
   - recipient: address
-  - maxFee: string          # e.g., '0.01' = 0.01 of the given token
+  - maxFee: string # e.g., '0.01' = 0.01 of the given token
+  - thresholdUsd: string # e.g., '30.5' = 30.5 USD
+abis:
+  - ERC20: ./abis/ERC20.json
```

I had to provide an <a href="https://216358192-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F2K6E4Us9xYRIC0Tt0SIZ%2Fuploads%2FLzvR464ArklTLEA67qfw%2FERC20.json?alt=media&token=163296d8-8fd0-4376-a649-4c7c07f8b321" target="_blank" rel="noopener noreferrer">ERC‑20 ABI</a> in `./abis/ERC20.json`.

Now, to validate my manifest changes, I could run:

```bash
mimic codegen
```

It just generates corresponding code to access the declared inputs and the contract object for the declared ABIs:

```
❯ tree src/types/
src/types/
├── ERC20.ts
└── index.ts

1 directory, 2 files
```

Those are included in the `.gitignore`.

## Teaching the Task What to Do

The task logic lives in AssemblyScript and must export two things: the generated input type and a main function that receives those inputs. This all comes together in the `./src/task.ts` file—where the actual task is defined.

So I grabbed example code from <a href="https://docs.mimic.fi/examples/build-a-simple-task" target="_blank" rel="noopener noreferrer">Mimic’s tutorial</a> and implemented it in `src/task.ts`:

```diff
+import {
+  log,
+  TokenAmount,
+  USD,
+} from "@mimicprotocol/lib-ts";

+import { ERC20 } from "./types/ERC20";

 export default function main(): void {
-  const amount = BigInt.fromStringDecimal(inputs.amount, token.decimals)
-  const maxFee = BigInt.fromStringDecimal(inputs.maxFee, token.decimals)
-  Transfer.create(token, amount, inputs.recipient, maxFee).send()
+  const tokenContract = new ERC20(inputs.token, inputs.chainId);
+  const balance = tokenContract.balanceOf(inputs.recipient);
+
+  const balanceInUsd = TokenAmount.fromBigInt(token, balance).toUsd();
+  const thresholdUsd = USD.fromStringDecimal(inputs.thresholdUsd);
+  log.info(`Balance in USD: ${balanceInUsd}`);
+
+  if (balanceInUsd.lt(thresholdUsd)) {
+    const amount = BigInt.fromStringDecimal(inputs.amount, token.decimals);
+    const maxFee = BigInt.fromStringDecimal(inputs.maxFee, token.decimals);
+    Transfer.create(token, amount, inputs.recipient, maxFee).send();
+  }
 }
```

## Turning Code into Artifacts

Let's compile to convert my task logic and manifest into deployable artifacts:

```bash
mimic compile
```

![Compiling](/images/mimic-compile.gif)

The result:

```
build/
├── task.wasm         # Compiled WASM binary
├── manifest.json     # Validated manifest
```

## Putting It on the Map (Deploy)

Apparently I can upload my task artifacts to the network (Mimic Registry) so others can discover them, but I will need a `DEPLOYMENT_KEY`. So, I rushed to <a href="https://protocol.mimic.fi/api-key" target="_blank" rel="noopener noreferrer">explorer app ↗</a>

![Trying to get the deployment key from the explorer app](/images/generating-deployment-key.png)
to get a `DEPLOYMENT_KEY`, which I saved as a local environment variable `$MIMIC_API_KEY`. After a quick login with my wallet, I was dropped into my dashboard with an API key already generated for me:

![Mimic dashboard](/images/mimic-dashboard.png)

I could have skipped the build via `--skip-compile` flag, because I've already compiled and generated the artifacts in the previous step, but I just regenerated it all:

```bash
mimic deploy --key $MIMIC_API_KEY
```

![Deploying artifacts](/images/mimic-deploy.gif)

It deployed and saved the artifacts to IPFS with the `CID` <a href="https://ipfs.io/ipfs/QmSTBXXP2CjzRkxSYew9YPKU2m2qcUbvdyveUiqvQvoLZX/" target="_blank" rel="noopener noreferrer">QmSTBXXP2CjzRkxSYew9YPKU2m2qcUbvdyveUiqvQvoLZX ↗</a>

![Artifacts stored on IPFS](/images/mimic-deployment-ipfs.png)

### Dialing In the Settings

After deploying the task, I could have jumped into the explorer UI to set up my config—the place where you plug in the parameters from your manifest.yaml and sign everything with your wallet. I didn’t actually do that this time, but the flow is simple: open the explorer, find your task under Tasks, edit the fields, hit sign, done.

What’s cool is that you never have to redeploy the task just to change something. If you want to tweak the config later, you just sign a new version in the explorer and relayers immediately switch to it.

## A Few Friendly Suggestions for Mimic

- Ship shell completions in the Mimic CLI (tab‑complete commands and flags).
- Make northeast‑arrow links open in a new tab to prevent context loss.
  ![Misleading northeast arrow next to a link](/images/misleading-northeast-arrow.png)
- Add more visuals in docs (diagrams and short clips where helpful).
- Publish a short video walkthrough to prime new users.
- Tighten copy in guides: front‑load the “how,” trim repetition.

_Follow <a href="https://x.com/mimicfi?s=20" target="_blank" rel="noopener noreferrer">@mimicfi</a> on X_
