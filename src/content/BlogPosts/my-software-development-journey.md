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

Over the next few months, I learned the essentials—one bug at a time.

### Variables and Data Types

```pascal
var age: integer;
age := 13;
```

### Operators

```pascal
writeln(age + 1);  { math finally useful }
```

### Input / Output

```pascal
readln(name);
writeln('Hello, ', name);
```

### Conditionals

```pascal
if age >= 18 then writeln('Adult') else writeln('Not yet');
```

### Loops

```pascal
for i := 1 to 5 do writeln('Counting: ', i);
```

### Procedures and Functions

```pascal
function Square(x: integer): integer;
begin
  Square := x * x;
end;
```

### Arrays

```pascal
var nums: array[1..3] of integer = (1, 2, 3);
```

### File Handling

```pascal
assign(f, 'data.txt');
rewrite(f);
writeln(f, 'Saved!');
close(f);
```

By then, I could read, write, loop, and curse at the compiler like a pro!

## The Terminal Moment

I still remember my first real programming class at the University of Nevada—CS135. A small room, a whiteboard, and a humming projector. This time it was C++. I fell in love with it—the loops, the classes, the satisfying verbosity. Maybe it was the font on the professor’s screen, or maybe the moment he compiled code not with a button, but with a command in a mysterious window called the terminal. I was hooked.

For months, it was all C++—coding in vim at the Linux Lab, then compiling from the terminal with make. That's where I learned to exit out of `vim` (Ha!)

No code completion, no syntax highlighting, no LSPs—just me, brute-forcing my way through the compiler.

Later came Python, Perl, Java, even OpenGL shaders in Computer Graphics. But the foundations I built—while cursing at C++—became the pillars that helped me grasp everything else in computer science.

## Conquering the Colony of Memory Leaks

My first job. Cold Wisconsin fall. A printing press factory turning out thick magazines, banners, and flyers. They used a legacy scheduling tool from the ’90s—written in C++. I guess they hired me for my “love of pointers” (ha), since no one else wanted to touch code as old as I was. Memory leaks crawled through that codebase like cockroaches. My mission: hunt them down.

I ended up rewriting the core arrange logic, boosting performance by 2000%. Sure, the rewrite was the senior dev’s idea, but I was the one rolling up my sleeves and doing the C++ magic—this time on Windows (sad face).

## The next few years

My desire to travel always nudged me to look for a new city, state, country.

First Ohio where I ended up writing

Ohio
San Diego: career cast PHP, MySQL, terminal, vim.
Chicago: C# codebase back end hosted on AWS.

## Copywriting

I started writing content and website copy for SaaS companies, leaning on my software engineering background. I quickly built a full roster of clients. Writing so much became exhausting—back then, LLMs didn’t exist. I relied on my 100+ WPM typing speed, the Hemingway app for clarity, and countless hours polishing drafts until they felt like masterpieces (or at least I thought so, ha!).

## From coding to technical writing

I walked in to find API reference docs being assembled manually—things humans really weren’t meant to do. These docs should have been generated automatically from OpenAPI and Swagger specs via CI/CD, across more than 30 repositories, each owned by a different team.

I wasn’t just writing docs — I was deep in the code. I pulled from dozens of repositories, built projects locally, and wired CI/CD pipelines that generated OpenAPI specs straight into our documentation. Somewhere along the way, “writing” started to feel a lot like engineering.

But what really shaped me were the customer calls. Sitting with teams from Goldman Sachs or Morgan Stanley, walking them through APIs I’d documented, I saw how clarity could make or break adoption. It taught me that great software isn’t just about elegant code — it’s about making complexity understandable.

## The Pivot: Diving into Web3

In 2023, I quit my job to roam the world and hack at every possible Web3 hackathon, while attending conferences like EthCC, DevCon, SmartCon, and Consensus.

My first win came in Brussels, teaming up with an Italian developer I met on Discord—we took third place and $3k. I was hooked.

Later that year, at EthGlobal Bangkok, I teamed up with two DeFi enthusiasts and won bounties from CowSwap, Euler, Pyth, and Brevis, totaling nearly $9k.

But my proudest win was EthGlobal NYC, building solo in the Uniswap Foundation v4 hooks track. I created a custom pool for rebasing tokens—ETH/stETH—pivoting constantly over 72 hours and iterating even while working alone. The rebasing idea came from a UF judge, and I started it just twenty hours before submission.

_What's your software development journey? I'd love to hear about the turning points and lessons that shaped your path. Feel free to reach out on [Twitter](https://x.com/mcmoodoo) or connect on [LinkedIn](https://linkedin.com/in/yourprofile)._
