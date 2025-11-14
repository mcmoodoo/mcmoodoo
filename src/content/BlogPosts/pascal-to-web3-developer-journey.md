---
title: "The Polyglot Path: 20 Years Across Languages, Industries, and Continents"
date: "2024-11-13"
tags:
  ["Software Engineering", "Career", "Web3", "Personal Journey", "Programming"]
excerpt: "From debugging Pascal in 2003 to winning Web3 hackathons in 2023—a 20-year journey through 10+ languages, 6 cities, and industries spanning concrete trucks, classified ads, and blockchain. This is the story of choosing breadth over depth, and why that matters."
---

# Losing My Virginity to Pascal

Year 2003. Eighth grade middle school. My first brush with Pascal. Weird blue-screen IDEs glowing on bulky CRT monitors wired to beige plastic computers powered by Pentium IIs. Those retro beasts ran some ancient version of Windows—probably still booting from a floppy disk.

I was tasked with the Hello World program:

```pascal
program HelloWorld;

begin
  writeln('Hello, world!');
end.
```

Clumsily clicking and pecking one key at a time, I changed it to “Hello Rashid.” Measurable progress.

That moment—changing one string in a program I didn't fully understand—planted a seed. I could have gone deep into Pascal, mastered every corner of the language, become the world's foremost Pascal expert. Instead, I got curious about what else was out there.

That curiosity defined the next twenty years. I became what you'd call a polyglot—someone with more breadth than depth. Not shallow, but not a master of any single language either. I've always been eager to explore frontiers rather than perfect one territory. I value systems thinking: crafting components that do one thing well and compose elegantly. That's why cloud infrastructure clicked for me—monolithic apps on a single EC2 never felt right.

But I'm getting ahead of myself. Let's keep things chronological—for your sanity and mine.


Over the next few months, my knowledge base has expanded to something like this:

```pascal
program LearningPascal;

var
  age: integer;
  name: string;

function Square(x: integer): integer;
begin
  Square := x * x;  { math finally useful }
end;

begin
  age := 13;
  name := 'Rashid';
  
  if age >= 18 then
    writeln('Adult')
  else
    writeln('Not yet');
    
  for i := 1 to 5 do
    writeln('Counting: ', i);
    
  writeln('Square of 5 is: ', Square(5));
end.
```

By then, I could read, write, loop, and curse at the compiler like a pro!

## The Terminal That Changed Everything

Seven years and an ocean later, I walked into my first real programming class at the University of Nevada—CS135. A small room, a whiteboard, and a humming projector. This time it was C++.

I fell in love with it—the loops, the classes, the satisfying verbosity. Maybe it was the font on the professor’s screen, or maybe the moment he compiled code not with a button, but with a command in a mysterious window called the terminal. I was hooked.

For months, it was all `C++`, `vim`, and compiling from the terminal with make at the Linux Lab. That's where I learned to exit out of `vim` (Ha! p.s. `Esc` + `:q` + enter for those who are still stuck...)

No code completion, no syntax highlighting, no LSPs—just me, brute-forcing my way through the compiler.

Later came Python, Perl, Java, even OpenGL shaders in Computer Graphics. But the foundations I built—while cursing at C++—became the pillars that helped me grasp everything else in computer science. The polyglot path was already forming: learn the fundamentals deeply, then let curiosity guide you to the next language.

## Conquering the Colony of Memory Leaks

My first job. Cold Wisconsin fall. A printing press factory turning out thick magazines, banners, and flyers. They used a legacy scheduling tool from the ’90s—written in C++. They hired me for my “love of pointers” (ha), since no one else wanted to touch code as old as I was. Memory leaks crawled through that codebase like cockroaches. My mission: hunt them down.

I ended up rewriting the core arrange logic, boosting performance by 2000%. Sure, the rewrite was the senior dev’s idea, but I was the one rolling up my sleeves and doing the C++ magic—this time on Windows (sad face).

## From Assembly Lines to Concrete Lines

My desire to travel always nudged me to look for a new city, state, country.

### Ohio — Assembly Lines and Real-Time Data

When I started working at the Kenworth Plant in Ohio—where a brand-new semi came off the line every eight minutes—I noticed how much time workers lost just trying to get updates from other stations.
I pulled raw PLC data into MS SQL Server, cleaned and parsed it with stored procedures, functions, and views, then built a pure-JavaScript app that refreshed via XHR without full page reloads.
We pushed the live metrics—timing, station status, and overall line health—to big screens along the mainline so workers could simply look up and know exactly what was happening across the line.

### San Diego — Linux, Vim, and Finding My Pace

Then came San Diego. I joined a small online classifieds company where most of the stack ran on PHP and Symfony. What I loved most was the Linux-heavy culture—my workstation was a Mac, but I had full SSH access to the Linux server racks and my own workspace there.
That setup pushed me to sharpen my Vim workflow and get genuinely fluent with Linux.

The pace forced me to level up fast: understanding what PMs needed, translating it quickly into code, and turning around features without friction. PHP wasn’t my favorite language, but its dynamic, scripting nature with some OOP made it workable.
The only real curveball was the source control system—Perforce—strange at first, but I eventually got into the rhythm.

I also learned Puppet, a configuration management tool that lets you define your server state once and enforce it consistently across environments. And I discovered how MySQL master–slave replication worked (yes, the slaves were read-only), which opened my eyes to scaling the data layer.
Nginx handled our load balancing, and that was the first time I got to work closely with strong DevOps engineers—a huge influence on how I think about infrastructure today.

### Chicago — Concrete, Telemetry, and Carrying the Pager

Then came Chicago, where I joined a small startup serving the ready-mix industry by delivering telemetry and operational data to concrete companies nationwide. Surprisingly fun—I even rode along with drivers to see how concrete was loaded, transported, and poured on-site.

Every truck had an Android tablet running our app, which handled ticketing and real-time telemetry. Drivers always knew their assigned jobs, and customers could track their concrete en route.

We ran two systems: a large legacy platform built with raw JavaScript, C#, and MS SQL Server, and a new platform with a React frontend and MongoDB. For a stretch, I was solely responsible for all software and infrastructure—stressful but transformative.

I deployed, configured, and monitored AWS resources constantly. When traffic spikes overwhelmed our MSSQL instances, I scaled them vertically until we built more robust solutions.
I set up deployment pipelines from GitHub to EC2, handled new domains in Route 53, and generally put out fires while keeping the systems alive.
I leveled up fast here—both technically and operationally.

### GE — Vibrations, C++, and High-Stakes Engineering

Then I joined GE, working on a small four-person team building a portable condition-monitoring device for on-site engineers.
It measured vibration in rotating machinery—turbines, compressors, pumps, motors—to detect mechanical issues before they turned into failures worth tens of millions. The stakes were different here: a missed bug could cost someone their job or worse.

I was back to C++, writing the small, fast computations that powered the device: Fourier transforms, time- and spatial-domain analyses, and other signal-processing routines running directly on Android hardware.
We used C# strictly for testing—mostly owned by QA, though I wrote a fair share of tests myself. And thankfully, the source control was back to Git.

What I learned: precision matters more than speed when lives are on the line. Code review became sacred. Testing wasn’t optional—it was the product.

## Copywriting

Then I did something that baffled everyone who knew me: I became a copywriter.

As a kid, I loved writing—engaging stories, sharp essays, pieces teachers read aloud to the class. I wrote poems, even songs. But somewhere along the way, I set that craft aside and went all-in on math, eventually landing in a math-physics–specialized high school.

Years later, I wanted more than just building features for someone else. I'd become fluent in programming languages—now I wanted fluency in human persuasion. I figured I could help SaaS companies by writing copy for products I genuinely understood from the technical side. I started with website copy and technical content, and it quickly snowballed into a full marketing gig centered on inbound promotion.

I took the craft seriously: I read books on writing, copywriting, and advertising (yes—Ogilvy), and joined a community of successful copywriters in the space. Most of them came from marketing backgrounds, but I soaked up everything and learned a ton from them.

I built a full roster of SaaS clients and wrote constantly. This was before LLMs existed, so everything was manual. I leaned on my 100+ WPM typing speed, the Hemingway app for clarity, and countless late nights polishing drafts until they felt like masterpieces—or at least I convinced myself they were. Writing at that volume was exhausting, but it sharpened my thinking and my ability to communicate technical ideas with precision.

Then an opportunity emerged that combined everything: engineering depth, writing clarity, and systems thinking.

## Palo Alto Networks: When Docs Become Product

I walked into Palo Alto Networks and discovered API reference docs being assembled manually—tasks humans were never meant to do. These docs should have been generated automatically from OpenAPI and Swagger specs through CI/CD, especially with more than 30 repositories owned by different teams. Instead, everything was stitched together by hand.

I was hired as a Senior Technical Writer with an engineering background. The team was made up of writers, but they needed someone who could own API documentation end-to-end, streamline spec generation, and raise the quality of user guides, tutorials, and code samples so they actually spoke to developers. The docs were missing authority and clarity, and the company needed someone who understood both engineering and writing. My blend of software experience and copywriting made me an unusual—but perfect—fit.

Once onboarded, I quickly learned the real issue: most of the docs were outdated (as happens everywhere), and the OpenAPI/Swagger files didn’t reflect the actual deployed software. That meant the API reference was… inaccurate. Customers trying to integrate programmatically were furious. Their auto-generated SDKs never worked out of the box. Routes were broken, parameters were wrong, endpoints were missing, and the response descriptions were often misleading or incomplete.

There was a lot to fix. This is where my background across languages, systems, and frameworks became invaluable. I dove into the engineering repos—reading code, tracing logic, and updating annotations so the generated specs matched reality. I proposed generating OpenAPI files as part of each team’s CI/CD pipeline. At first it was optional, purely informational. Eventually, we enforced it: the build failed if the spec didn’t generate cleanly. Engineers hated it, and it was painful for everyone—but that pain spared our customers from far worse.

As the specs stabilized, I turned my attention to migrating the reference docs to a new platform already used by DevRel. Other doc teams had begun moving there, but their migrations were smaller in scope. I asked for approval to move our much larger doc set, and after two weeks of discussion, got the green light.

It took two weeks to prepare the entire migration and another two to wait for the scheduled cutover. We moved everything to Docusaurus v2 and launched the new site at pan.dev, retiring the old one within a month.

I wasn’t just writing docs—I was deep in the code, shaping pipelines, and making documentation an engineering asset instead of an afterthought. And the customer calls with teams like Goldman Sachs and Morgan Stanley drove it home: clarity isn’t a luxury. It determines whether a product gets adopted or abandoned.

## The Pivot: Diving into Web3

In 2023, I made a bet on myself. I quit my job, packed a backpack, and started hopping between Web3 hackathons and conferences—EthCC in Paris, DevCon in Istanbul, SmartCon in Barcelona, Consensus in Austin—anywhere I could learn, build, and meet other obsessed engineers.

I was searching for something I hadn’t found in traditional software: a community building infrastructure that felt genuinely novel, where smart contracts could encode trust and coordination in ways that weren’t possible before. The polyglot in me loved that Web3 demanded fluency across so many domains—cryptography, economics, distributed systems, game theory.

My first win came in Brussels, where I paired up with an Italian developer I’d only met on Discord. We took third place and $3K, and that tiny victory flipped a switch in me. I wasn’t just exploring anymore—I was competitive.

Later that year in Bangkok, I teamed up with two DeFi enthusiasts at EthGlobal and won bounties from CowSwap, Euler, Pyth, and Brevis—nearly $9K in total. Each project pushed me deeper into the ecosystem: oracle integrations, zero-knowledge proofs, MEV protection strategies.

But the moment I’m most proud of was EthGlobal NYC. It was a 36-hour hackathon, and I spent the first 24 pivoting—throwing out idea after idea until nothing felt right. Then one of the Uniswap Foundation judges mentioned an angle involving rebasing tokens, and it clicked: an ETH/stETH rebasing pool built on Uniswap v4 hooks.

The technical challenge was elegant: handle rebasing tokens (whose balance changes automatically) in an AMM pool without breaking the constant product formula. I sketched the architecture, hacked together a quick prototype to prove the math worked, and then built the entire project solo in the final 10 hours—smart contracts in Solidity, the v4 hook logic, tests, and a minimal frontend.

Chaotic, exhausting, and somehow exactly the kind of challenge I live for. The project won 3rd place from the Uniswap Foundation, and it’s still the build I’m most proud of. It synthesized everything: systems thinking from my infrastructure days, precision from documentation work, and the raw building energy I’d first felt debugging Pascal twenty years earlier.

That eighth-grader changing "Hello, world!" to "Hello Rashid" had no idea where curiosity would lead. But here’s what I’ve learned: mastery is overrated. Breadth gives you options. Systems thinking lets you connect dots others miss. And staying curious—always asking "what else is out there?"—is the best career strategy I never planned.

_What’s your software development journey? I’d love to hear about the turning points and lessons that shaped your path. Feel free to reach out on [Twitter](https://x.com/mcmoodoo) or connect on [LinkedIn](https://linkedin.com/in/mcmoodoo)._
