## Mainline Downtime

It all started with the need to measure how long the mainline was down at the Kenworth Truck factory somewhere in Ohio. The factory was rolling out over 200 trucks per day. That's ~ one truck every 5 minutes. So a slight delay measured in just seconds could cost the plant a whole truck that could have rolled out that day but didn't!

So, pausing any of the assembly lines, let alone the mainline, was the last resort. The production shouldn't be paused and things should be kept moving all the time. But it's life and things happen, and the workers had no choice but to pause the mainline. One delay somewhere could cause a mainline pause. When it stopped, the whole floor felt it—and nobody had a single place to see for how long.

## I was approached and asked to create a tool to monitor the mainline status and adjacent critical data that could cause a pause.

I was approached by Terry, one of the production managers. He said something like: "We need one place to look—is it moving, how long's it been down, how many we've pushed out today." In so many words, he and the other managers needed a way to see (in a single place) the status of the mainline, the critical metrics such as how many chassis are loaded on it, how many already flipped, whether it's paused or moving and at which speed, how long it was paused for in total today, how many trucks had already been rolled out, and all that live data along with recent historical aggregation for analytics.

I was not fresh out of college at that time, but I definitely didn't have the experience of putting together a system by myself. And this time around I was almost by myself with intermittent help from our DB administrator. Obviously, I had all the plant managers at my disposal who had domain expertise and the desire for such a system, but absolutely no time to help out with implementing the solution. There was no budget for new tools or contractors—just me and whatever we already had in the plant. So I took on the challenge.

## Starting the work

I asked Terry where I could grab the data to work with. What was going to be the source? He pointed me toward PLC data that provides everything needed, but it had to be sourced, processed, aggregated, and stored for efficient retrieval. I didn't know a whole lot about databases back then, but again, I had Daemon—our DB administrator. So we chose the stack: MS SQL Server as our relational database solution. We needed a place to store structured events, link them to types and codes, and run queries and aggregations—so a relational model fit. We modeled the schema with several database tables. Obviously I can't remember it now, 13 years later. But I do remember that there were several spec tables (things like event type and alarm code) that held the reference data, and a few event tables that held the actual rows we were receiving—sensor readings, digital states, timers, counters, setpoints, state-machine flags, interlocks, alarms, error codes, etc. We normalized it so we didn't repeat strings everywhere; events pointed at the spec tables via foreign keys. We avoided one big flat table so we could query by type and time without duplication.

The problem with the PLC data was that it was not very consistent and it was ephemeral. It lived in memory and once the machine rebooted or turned off, it was gone. So if we didn't capture it on time, it was gone. A small service polled the PLC at a fixed interval and wrote raw readings into staging tables; from there the rest of the pipeline could catch up. At that time I didn't even know that I was implementing an ETL pipeline with live data feeding into our DB.

My solution was straightforward. Plug into as many of those PLC data sources as possible, grab the data, process it right there on the MS SQL Server with T-SQL stored procedures and functions, and then store it in the DB schema we had created. The procedures did the real work: validate and classify incoming rows, resolve codes against the spec tables, and aggregate by shift or hour for the dashboard. We kept that logic in the database on purpose—one place to fix, right next to the data. Debugging meant tracing live data through several procedures; writing windowed aggregates in T-SQL was painful but it was what we had.

Little did I know then how complicated it would become rather quickly. Writing T-SQL was a nightmare; testing was impossible (except with live data—smiley face) or I just didn't know how. I did not enjoy writing so much SQL. For weeks, it was non-stop editing, adding, and complicating it further, hitting performance bottlenecks and then tearing it down, optimizing and rewriting. At one point a single stored procedure got so heavy that it slowed everything down during peak—it was doing row-by-row work that locked the table. I had to rip it apart and rewrite it with set-based logic before we could move on.

Time had slowed down and also that was supposed to be my side project, because I was also working on our main project "Trailer Tracking" that was just a month away from release. So the dashboard lived in the margins—evenings and weekends, and a lot of tired mornings.

## Fast forward

After becoming a SQL wizard and wrangling data like a trained bull maestro professional (whoever that guy with a red blanket tricking bulls...), I had to display that data in a meaningful way so that we could show something useful on those huge screens on the production floor so that the managers and other interested parties could see in real time all the critical metrics. With the amount and diversity of data that I was collecting, I could show them a lot more! I thought to myself, I could surprise them with a lot more useful data.

So I started doing frequent trips to the production floor, interviewing managers, even the assembly line workers. I started gathering intel—what do they need, what do they want, what would make them happy. One supervisor asked for a simple rule: "If the line's been down more than five minutes, make that number red." That kind of ask—small, concrete—started to shape what the dashboard became. This part of my job I had never done before, but it was fun and I got hands-on looks at the actual production.

## Displaying the data in a meaningful way

What started as a simple mainline downtime reporting quickly turned into a full-fledged analytics / live dashboard app. I was thinking to myself, if I am collecting all this data anyway, why not display it and make it useful.

But how? The data was sitting neatly packed in a relational database. I was limited to the .NET tech stack because all the servers at the plant were running MS Windows Server. Ok, so the choice was between C# and VB.NET. I chose the former, although I already had some exposure to the latter; but me being a forward thinker, I thought that whoever comes after me to maintain it is more likely to have C# knowledge than VB.NET.

The web app was a simple ASP.NET app but that immediately caused a problem on the front end: even if I only needed to update a single value on the front end, I'd have to do a full page refresh! That would suck and also cause delays, because back in 2013 full page refreshes still sucked!

I started browsing Stack Overflow for solutions and stumbled on Angular, which at the time sounded so complicated to me. And in fact, considering that my app did not need much user interaction, Angular seemed like overkill in my case. I could, however, use a simple XMLHttpRequest for my case. I could make HTTP requests to my ASP.NET backend behind the scenes without doing full page refreshes. I thought that was the solution! Little did I know about the callback hell it was going to create!

Working with JavaScript's native API felt like doing so much repetitive work. But the results were astonishing (to my colleagues and managers seeing the first data popping up on the screens). I iterated quickly and gave them access from the start so I could see the first feedback coming my way.

## Shipping

Three months, ten thousand lines of pure JavaScript code, and hours of headache later, the Mainline Dashboard was beautifully displayed on tens of large screens across the plant floor. I still remember the first time I walked the floor and saw a manager glance at one of those screens before making a call—no more running to the control room to check. Never did I feel so proud of my creation being used daily, helping roll out that extra truck (~$200k+ in revenue for Kenworth) and keeping managers informed. When I last checked in 2022, the app was still displayed and used across the plant floor. The AI revolution hasn't affected them, and obviously changing that battle-tested but impossible-to-untangle "callback hell" JavaScript code is a feast on its own and I am sure nobody is volunteering to mess with it!

I wish I had the code available to look at it, perhaps I could quickly rewrite it nowadays with the tools available. I'd probably keep the same relational backbone and the same idea—just swap the front end for something smaller and easier to maintain. Until next time.
