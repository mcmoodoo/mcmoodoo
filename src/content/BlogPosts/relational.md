## Mainline Downtime

It all started with the need to measure how long the mainline was down at Kenworth Truck factory whatever in Ohio. The factory was rolling out over 200 trucks per day. That's 16\*60 / 200 ~ one truck every 5 minutes. So a slight delay measured in jsut seconds could cost the plant a whole truck that could have rolled out that day but didnt!

So, pausing any of the assembly lines, let alone mainline was the last resort thing to do. The production shouldn't be paused and things should be kept moving all the time. But it's life and things happen and the workers had no choice but to pause the mainline. One delay somewhere could cause the mainline pause.

## I was approached and asked to create a tool to monitor the mainline status and adjacent critical data that could cause the pause.

I was approached by Terry, one of the production managers. He said that him and other managers need a way to see (in a single place) the status of the mainline, the critical metrics such as how many chassis are loaded on it, how many already flipped, whether if it's paused or moving and at which speed, how long was it paused for in total today. HOw many trucks already been rolled out and all that live data along with recent historical aggregation for analytics.

I was not fresh out of college at that time, but I definitely didn't have the experience of putting together a system by myself. And this time around I was almost by myself with intermittent help from our DB administrator. Obviously, I had all the plant managers at my disposal who had domain expertise, the desire for such a system, but absolutely no time to help out with implementing the solution. So I took on the challenge.

## Starting the work

I asked Terry where can I grab the data to work with? What's going to be the source? He pointed me toward PLC data that provides everything needed, but it had to be sourced, processed, aggregated and stored for efficient retrieval. I didn't know about databases a whole lot back then, but again, I've had Daemon - our db administrator. So we chose the stack - MS_SQL server as a relational database solution in our case. We've modeled the schema with several database tables. Obviously I can't remember it now, 13 years later. But I do remember that there were several tables that were spec tables and held the most common event types and then there were just few tables that held those actual events that we were receiving from the sensor readings, digital states, timers, counters, setpoints, state-machine flags, interlocks, alarms, error codes, etc.

The problem with the PLC data was that it was not that consistent and also it was ephemeral. It lived in memory and once the machine rebooted or turned, it was gone. So if we didn't capture it ontime, it was gone. At that time I didn't even know that I was implementing an ETL pipeline with live data feeding into our db.

My solution was straightforawrd. Plug into as many of thos PLC data sources as possible, grab the data, process it right there on the MS_SQL Server with T-SQL stored procedures and functions and then store it in the db schema we've created.

Little did I know then how complicated it will become rather quickly. Writing T-SQL was a nigtmare, testing was impossible (except with Live data - smiley face) or I just didn't know how. I did not enjoy writing so much SQL. For weekds, it was non-stop editing and adding and complicating it further, hitting performance bottlenecks and the tearing it down, optimizing and rewriting.

Time had slowed down and also that was supposed to be my side project, because I was also working on our main project "Trailer Tracking" that was just a month away from release.

## Fast forward

After becoming a SQL wizard and wrangling data like a trained Bull maestro professional (whoever that guy with a red blanket tricking bulls...), I had to display that data in a meaningul way so that we could show something useful on those huge screens on the production floor so that the managers and other interetsed parties could see in real time all the critical metrics. WIth the amount and diversity of data that I was collecting, I could show them a lot more! I thought to myself, I could surprise them with a lot more useful data.

So I started doing frequent trips to the production floor, interviewing managers, even the assembly line workers. I started gather intel - what do they need, what do they want, what would make them happy. This part of my job - I've never done before, but it was fun and I got hands on looks on the actual production.

## Displaying the data in a meaninful way

What started as a simple mainline downtime reporting quickly turned into a full-fledged analytics / live dashboard app. I was thinking to myself, it I am collecting all this data anyway, why not display and make it useful.

But how? The data is sitting neatly packed in a relational database. I am limited to .NET tech stack because all the servers on the plant were running MS Servers. Ok, so the choice was between C# and VB.NET. I chose former, although I alrady has some exposure to the latter, but me being the forward thinker, I thought that whoever comes after me to maintain it is more likely to have C# knowledge than VB.NET.

The web app was a simple ASP.NET app but that immediately caused a problme on the front end: even if I only need to update a single value on the front end - I'll have to do a full page refresh! That would suck and also cause delays as back in 2013 full page refreshes still sucked!

I started browsing stackoverflow for solutions and stumbled on Angular which at that time sounded so complicated to me. And in fact, considereing that my app did not need much user interaction, angular seemed like an overkill in my case. I could, however, user a simple XMLHttp Request for my case. I could make http requests to my ASP.NET backend behind the scenes without doing full page refreshes. I thought that's the solution! Little did I know aobut the callback hell it was going to create!

Working with javascript's native API felt like doing so much repetitive things. But the results were astonishing (to my colleagues and managers seeing the first data popping up on the screens). I iterated quickkly and gave them the access from the start to see the first feedback coming my way.

## Shipping

Three months, ten thousand lines of pure js code, and hours of headache later, the Mainline Dashboard was beautfiully displayed on tens of large screen across the plant floor. Never did I feel so proud of my creation being used daily, helping roll out that extra truck (~$200k+ in Revenue for Kenworth) and keeping managers informed. When I last checked in 2022 - the app is still displayed and used across the plant floor. AI revolution hasn't affected them, and obviously changing that battle-tested but impossible to untangle "callback hell" js code is a feast on its own and I am sure nobody is volunteering to mess with it!

I wish I had the code available to look at it, perhaps I could quickly rewrite it nowadays with the tools available. Until next time.
