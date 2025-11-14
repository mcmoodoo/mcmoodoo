---
title: "My Software Development Journey: From CS Student to Web3 Builder"
date: "2024-11-13"
tags:
  ["Software Engineering", "Career", "Web3", "Personal Journey", "Programming"]
excerpt: "A reflection on my journey through software engineering—from immigrating to the US and fast-tracking through college, to working at Palo Alto Networks, and eventually diving deep into Web3 development and winning hackathons."
---

In my view, a polyglot has more breadth but less depth — not absolutely shallow, just less than someone who’s mastered a single language.

I see myself as a polyglot. I’ve never aimed to master a single language, but instead eager to explore the frontiers. I value breadth and systems thinking—crafting components that do one thing well and work together. That's why I was drawn to cloud infrastructure—monolithic apps on a single EC2 never felt elegant or cost-effective.

But I’m getting ahead of myself. Let’s keep things chronological—for your sanity and mine. I care about clarity, both in my own thinking and in how others understand it.

# Losing My Virginity to Pascal

Year 2003. Eighth grade middle school. My first brush with Pascal. Weird blue-screen IDEs glowing on bulky CRT monitors wired to beige plastic computers powered by Pentium IIs. Those retro beasts ran some ancient version of Windows—probably still booting from a floppy disk.

I was tasked with the Hello World program:

```pascal
program HelloWorld;

begin
  writeln('Hello, world!');
end.
```

Clumsily clicking and pecking one key at a time, I managed to change it to “Hello Rashid.” Measurable progress.

Over the next few months, my knowledge base has expanded to something like this:

```pascal
program LearningPascal;

{ Variables and Data Types - declaring and assigning values }
var
  age: integer;
  name: string;
  nums: array[1..3] of integer;
  f: text;

{ Functions - reusable blocks of code that return a value }
function Square(x: integer): integer;
begin
  Square := x * x;  { math finally useful }
end;

begin
  { Variables and assignment }
  age := 13;
  name := 'Rashid';

  { Operators - doing math with variables }
  writeln(age + 1);  { output: 14 }

  { Input / Output - getting data from user and displaying it }
  readln(name);
  writeln('Hello, ', name);

  { Conditionals - making decisions }
  if age >= 18 then
    writeln('Adult')
  else
    writeln('Not yet');

  { Loops - repeating actions }
  for i := 1 to 5 do
    writeln('Counting: ', i);

  { Arrays - storing multiple values }
  nums[1] := 1;
  nums[2] := 2;
  nums[3] := 3;

  { File Handling - reading from and writing to files }
  assign(f, 'data.txt');
  rewrite(f);
  writeln(f, 'Saved!');
  close(f);

  { Using functions }
  writeln('Square of 5 is: ', Square(5));
end.
```

By then, I could read, write, loop, and curse at the compiler like a pro!

## The Terminal Moment

I still remember my first real programming class at the University of Nevada—CS135. A small room, a whiteboard, and a humming projector. This time it was C++.

I fell in love with it—the loops, the classes, the satisfying verbosity. Maybe it was the font on the professor’s screen, or maybe the moment he compiled code not with a button, but with a command in a mysterious window called the terminal. I was hooked.

For months, it was all `C++`, `vim`, and compiling from the terminal with make at the Linux Lab. That's where I learned to exit out of `vim` (Ha! p.s. `Esc` + `:q` + enter for those who are still stuck...)

No code completion, no syntax highlighting, no LSPs—just me, brute-forcing my way through the compiler.

Later came Python, Perl, Java, even OpenGL shaders in Computer Graphics. But the foundations I built—while cursing at C++—became the pillars that helped me grasp everything else in computer science.

## Conquering the Colony of Memory Leaks

My first job. Cold Wisconsin fall. A printing press factory turning out thick magazines, banners, and flyers. They used a legacy scheduling tool from the ’90s—written in C++. I guess they hired me for my “love of pointers” (ha), since no one else wanted to touch code as old as I was. Memory leaks crawled through that codebase like cockroaches. My mission: hunt them down.

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

Then came Chicago, where I joined a small startup serving the ready-mix industry by delivering telemetry and operational data to concrete companies nationwide.
It was surprisingly fun—I even rode along with drivers to see how concrete was loaded, transported, and poured on-site.

Every truck had an Android tablet running our app, which handled ticketing and real-time telemetry so drivers always knew their assigned jobs and customers could track their concrete en route.
There was hardware involved too, though my world was the software.

We ran two systems: a large legacy platform built with raw JavaScript, C#, and MS SQL Server, and a new platform with a React frontend and MongoDB.
That also meant I was back on Windows. For a stretch, I was solely responsible for all software and infrastructure, which was stressful but transformative.

I deployed, configured, and monitored AWS resources constantly. When traffic spikes overwhelmed our MSSQL instances, I scaled them vertically until we built more robust solutions.
I set up deployment pipelines from GitHub to EC2, handled new domains in Route 53, and generally put out fires while keeping the systems alive.
I leveled up fast here—both technically and operationally.

### GE — Vibrations, C++, and High-Stakes Engineering

Then I joined GE, working on a small four-person team building a portable condition-monitoring device for on-site engineers.
It measured vibration in rotating machinery—turbines, compressors, pumps, motors—to detect mechanical issues before they turned into failures worth tens of millions. The value of the product was enormous.

I was back to C++, writing the small, fast computations that powered the device: Fourier transforms, time- and spatial-domain analyses, and other signal-processing routines running directly on Android hardware.
We used C# strictly for testing—mostly owned by QA, though I wrote a fair share of tests myself. And thankfully, the source control was back to Git.

## Copywriting

Then came copywriting. As a kid, I loved writing—engaging stories, sharp essays, pieces teachers read aloud to the class. I wrote poems, even songs. But somewhere along the way, I set that craft aside and went all-in on math, eventually landing in a math-physics–specialized high school.

Years later, wanting to build my own business, I figured I could help SaaS companies by writing copy for products I genuinely understood from the technical side. I started with website copy and technical content, and it quickly snowballed into a full marketing gig centered on inbound promotion.

I took the craft seriously: I read books on writing, copywriting, and advertising (yes—Ogilvy), and joined a community of successful copywriters in the space. Most of them came from marketing backgrounds, but I soaked up everything and learned a ton from them.

I built a full roster of SaaS clients and wrote constantly. This was before LLMs existed, so everything was manual. I leaned on my 100+ WPM typing speed, the Hemingway app for clarity, and countless late nights polishing drafts until they felt like masterpieces—or at least I convinced myself they were. Writing at that volume was exhausting, but it sharpened my thinking and my ability to communicate technical ideas with precision.

## The unexpected return to writing

I walked in to find API reference docs being assembled manually—tasks humans were never meant to do. These docs should have been generated automatically from OpenAPI and Swagger specs through CI/CD, especially with more than 30 repositories owned by different teams. Instead, everything was stitched together by hand.

I was hired as a Senior Technical Writer with an engineering background. The team was made up of writers, but they needed someone who could own API documentation end-to-end, streamline spec generation, and raise the quality of user guides, tutorials, and code samples so they actually spoke to developers. The docs were missing authority and clarity, and the company needed someone who understood both engineering and writing. My blend of software experience and copywriting made me an unusual—but perfect—fit.

Once onboarded, I quickly learned the real issue: most of the docs were outdated (as happens everywhere), and the OpenAPI/Swagger files didn’t reflect the actual deployed software. That meant the API reference was… politely put, inaccurate. Customers trying to integrate programmatically were furious. Their auto-generated SDKs never worked out of the box. Routes were broken, parameters were wrong, endpoints were missing, and the response descriptions were often misleading or incomplete.

There was a lot to fix. This is where my background across languages, systems, and frameworks became invaluable. I dove into the engineering repos—reading code, tracing logic, and updating annotations so the generated specs matched reality. I proposed generating OpenAPI files as part of each team’s CI/CD pipeline. At first it was optional, purely informational. Eventually, we enforced it: the build failed if the spec didn’t generate cleanly. Engineers hated it, and it was painful for everyone—but that pain spared our customers from far worse.

As the specs stabilized, I turned my attention to migrating the reference docs to a new platform already used by DevRel. Other doc teams had begun moving there, but their migrations were smaller in scope. I asked for approval to move our much larger doc set, and after two weeks of discussion, got the green light.

It took two weeks to prepare the entire migration and another two to wait for the scheduled cutover. We moved everything to Docusaurus v2 and launched the new site at pan.dev, retiring the old one within a month.

I wasn’t just writing docs—I was deep in the code, shaping pipelines, and making documentation an engineering asset instead of an afterthought. And the customer calls with teams like Goldman Sachs and Morgan Stanley drove it home: clarity isn’t a luxury. It determines whether a product gets adopted or abandoned.

## The Pivot: Diving into Web3

In 2023, I quit my job, packed a backpack, and started hopping between Web3 hackathons and conferences—EthCC, DevCon, SmartCon, Consensus—anything that would let me learn, build, and meet other obsessed engineers.

My first win came in Brussels, where I paired up with an Italian developer I’d only met on Discord. We took third place and $3K, and that tiny victory flipped a switch in me.

Later that year in Bangkok, I teamed up with two DeFi enthusiasts at EthGlobal and won bounties from CowSwap, Euler, Pyth, and Brevis—nearly $9K in total.

But the moment I’m most proud of was EthGlobal NYC. It was a 36-hour hackathon, and I spent the first 24 pivoting—throwing out idea after idea until nothing felt right. Then one of the Uniswap Foundation judges mentioned an angle involving rebasing tokens, and it clicked: an ETH/stETH rebasing pool built on v4 hooks.

I sketched the design, hacked together a quick prototype to prove it could work, and then built the entire project solo in the final 10 hours. Chaotic, exhausting, and somehow exactly the kind of challenge I love. The project ended up winning 3rd place from the Uniswap Foundation, and it’s still the build I’m most proud of.

_What's your software development journey? I'd love to hear about the turning points and lessons that shaped your path. Feel free to reach out on [Twitter](https://x.com/mcmoodoo) or connect on [LinkedIn](https://linkedin.com/in/yourprofile)._
