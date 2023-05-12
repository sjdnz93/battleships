# SEI Project 1: Battleships

## Overview
This is a web-based take on the classic board game Battleships.

This was my very first project on the General Assembly Software Engineering Immersive course, kicking off towards the tail end of week three. At this point I’d spent about half a week on HTML and CSS, and roughly two weeks on JavaScript.

The brief was reasonably straightforward, but given the fact that all of these technologies were still extremely new it was daunting too! I chose the classic board game Battleships, largely because I enjoyed playing the game as a kid, but also because I was fascinated by the challenge that would come with programming the computer’s turn and shot logic.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683800448/Project%201:%20Battleships/hero2-min_g7tomt.png)

## Brief
**General requirements:**
* From a predetermined list of games, choose one and spend the week building it from scratch
* The game must be rendered in the browser
* The game must be built on a grid
* Must contain logic for winning and a visual display of which player won
* Must contain separate HTML, CSS and JavaScript files
* Stick with KISS (Keep it Simple, Stupid) and DRY (Don’t Repeat Yourself) principles
* Use JavaScript for DOM manipulation
* Must be deployed online
* Use semantic markup for HTML and CSS

**Battleship-specific requirements to achieve Minimum Viable Product (MVP):**
* Game should be one player, with the computer placing its pieces randomly at the beginning of the game
* The computer should be able to make random attacks on the player’s board

**Stretch goals:**
* Responsive design
* Intelligent shot logic for the computer (identify successful hits and target adjacent squares)

## Deployment
<a href="https://sjdnz93.github.io/battleships/">Battleships - check out the project here</a>

## Timeframe
This was a solo project. I was given a week to plan, design, build and deploy this project from scratch.

Dates: Feb 17 to Feb 24 2023

## Technologies used
* HTML
* CSS
* JavaScript
* Chrome Developer Tools
* Excalidraw (wireframing)

## Planning
**1. Wireframing the basic design of the web page**

Prior to writing any code or thinking through any programming problems that I might run into during the course of the build, I used Excalidraw to make a mock-up of the page layout. This helped me to think about the basic foundation of the page, and really be conscious of how much space I was playing with in terms of fitting the game on the page. More importantly, it gave me a starting point for the basic HTML I’d need to write, and think about what elements I’d need to group together within parent containers so that I could apply Flex CSS styling effectively further down the line. The basic wireframe below was my starting point:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683801096/Project%201:%20Battleships/wireframe_gr8oy3.png)

**2. Pseudocode to help define the approach I’d take to writing functional JavaScript, determine the elements that would need to be targeted and anticipate potential problems I might run into**

This process really helped me to break down the task in front of me, and provide an idea of what my starting point would be when it came to the task of writing the JavaScript code. While I eventually ended up deviating from the plan once I was fully immersed in writing the code, this helped to me make what felt like a huge task seem far more achievable, and also enabled me to identify which problems I’d likely need to prioritise in terms of the time they’d take to work through, and how crucial they’d be in terms of  achieving my MVP. This plan was broken down into the following sections: Elements on the page that would need to be targeted; global variables that would be used by multiple functions throughout the code to execute certain tasks and drive the game forward; any page-load tasks that would need to happen; a list of functions required for gameplay and game setup; and finally a breakdown of the page events (click, hover, keystroke, etc) that would trigger the necessary functions. An example snapshot of this planning is included below:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683801390/Project%201:%20Battleships/psuedocode_phjlb8.png)

## Build/code process
**Day 1 - Friday 17/02/23**

The first day was primarily spent working through the planning process laid out above, achieving sign off on my plan from our course instructor, and then making a start on the basic HTML for the page.

**Day 2 - Saturday 18/02/23**

On Saturday I spent a few hours finalising the basic HTML structure of the page before diving into adding basic CSS to make the page appear in a similar fashion to the wireframe I’d constructed the day before. I also took a bit of time to add in CSS styling that would make the elements on the page scale correctly depending on the screen size the page was viewed on. The final project isn’t truly responsive across all device types, but after laying everything out at fixed sizes on a large monitor I then realised everything broke when I viewed it on my smaller laptop screen. 

Time was spent rectifying this, and one aspect that proved particularly challenging was finding a way to make the square-shaped structures on the page remain perfectly square as the window size was scaled up or down. I had to do a bit of research to figure this out, but came across the following solution that targets the ```.wrapper:after``` pseudo-element. Admittedly, I’ll need to spend a bit more time to properly understand how/why the following works, but it lead me to the result I was looking for:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683801684/Project%201:%20Battleships/css-square_shugll.png)

**Day 3 - Sunday 19/02/23**

Once the basic CSS styling and HTML was in place, I then made a start on writing the JavaScript that would be used to target the various elements on the page, as well as laying out the basic global variables that I had identified as being crucial to pushing the game forwards. At this point, I also introduced the functions that would generate both the player and computer game grids on page-load, as well as the event listeners that would start the game, and allow the player to begin positioning their boats on the board.

The task of writing the code that would allow the player to position their boats on the board was the first big challenge that I ran into, and one that I would spend the following day solving.

**Day 4 - Monday 20/02/23**

One of the problems I ran into early on in the build was to do with player boat placement. I found that the manner in which squares were highlighting was inconsistent, and I’d either inadvertently remove all of the highlighting that visually showed where a boat had been placed when I moved my mouse away from that particular grid cell, or I’d end up highlighting all of the squares on the board as I moved my mouse around. Eventually I was able to come across the solution, which saw me incorporate a check that would scan the entire board for the presence of my highlighting CSS class and remove it, provided that the squares in question hadn’t already been selected by the player, as I moused over a new square, and only then add back in the highlighting class on the square and surrounding squares that my mouse was over. This was quite a simple fix in the end, but one that worked well and allowed me to highlight the number of squares needed depending on the size of the boat being placed (both horizontally and vertically):

Below is a snapshot of the code I wrote to highlight a set number of squares relating to the size of the boat being placed. This is for horizontal placement, I had a similar function for boats outlined on the vertical axis. This is one of many sections of code I believe can be tidied up and written more efficiently in the future, but it worked well enough in terms of allowing me to deliver my MVP:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683801864/Project%201:%20Battleships/position_gwcsb0.png)

This is the function I introduced to the beginning of my master highlightSquares function to check the entire board for the highlighting CSS class and remove it from squares that hadn’t been selected by the player:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683801928/Project%201:%20Battleships/highlight_ctsq83.png)

This is all of those functions wrapped together in the master ```highlightSquares()``` function. Any previous highlighting that might have been applied to a group of squares that wasn’t selected by the player is removed, before being reapplied to the group of squares the player is currently highlighting:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683801989/Project%201:%20Battleships/highlight2_yatqlw.png)

Once the player was happy with their boat positioning, the ```checkHighlightingPushArray()``` function was called on a click action on the grid square in question. Again, this checked for the presence of the highlighting CSS class on the squares in question, and depending on the boat currently being positioned would then save the numerical value I’d attributed to each square to a separate array variable for that boat, so that it could be accessed later in the game.

This function was called within the master ```confirmBoatPosition()``` function to assign permanent highlighting, the attribute of selected (so that highlighting wouldn’t be turned off when the player continued to move around the board to position their next boat), and push the numerical index value of all the squares in question to the relevant boat type array. At this point in time, I hadn’t added the ```sqr.disabled = true``` section of the code, and was still in the process of figuring out how I’d prevent the player from positioning boats that overlapped. Here's the ```checkHighlightingPushArray()``` function: 

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683802558/Project%201:%20Battleships/check_bjf9x3.png)

The master ```confirmBoatPosition()``` function:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683802648/Project%201:%20Battleships/confirm_fc84xo.png)

**Day 5 - Tuesday 21/02/23**

Once I was happy enough with the basic logic that allowed the player to position their boats, I then moved on to writing the code that would allow the computer’s boats to be randomly positioned on the board. This took me a considerable amount of time to figure out, as I continued to run into problems not only regarding collisions between the boat pieces on the board, but also issues regarding boats being placed at the extremities of the board and either being spread across multiple rows, or an error being thrown up because the code was trying to place a boat on something that didn’t exist. 

Initially I accounted for this by assigning default positions that the boats would be snapped to if the algorithm had trouble placing them, but it meant that the boats weren’t truly positioned randomly as the code failed more often than not. At this point, each of the computer’s boats were fixed as being either horizontally- or vertically-placed too; I hadn’t been able to implement additional logic that would randomly assign their orientation. By the end of the day I still hadn’t come up with a solution that I was properly happy with in terms of the computer’s boat placement, but by having the pre-assigned fallback implemented I was able to move on to add in the computer’s shot logic functionality (to shoot at totally random squares on the player’s board), and also implement a basic end-game and reset board functionality. Although I felt like there were a lot of improvements I could still make to the game’s functionality, I felt I was fast approaching MVP. 

**Day 6 - Wednesday 22/02/23**

Straight back into trying to solve the issues regarding random placement of the computer’s boats. After a fair bit more tinkering I realised that I’d massively over complicated my initial code, and particularly the the conditions I’d laid out within the if statements for each boat. I was able to strip this back to a far more simple set of conditions (although there’s likely work I can do to make this even more efficient now), and I also realised that the ```compBoatsPlaced++``` counter that helped to control the while loop had seemingly been positioned in the wrong place. 

By moving this within the individual if statements for each boat from its original position as the last command in the while loop, I was able to guarantee that the function would only start to look to place the next boat once the first one had been successfully placed with no collisions. This allowed me to remove the branch of code that would assign each boat to a fixed position if an issue was encountered in the code, while also guaranteeing that each boat was randomly placed (in a fixed horizontal or vertical position depending on which boat was being placed) in the first instance. Still not true random placement at this point, but good enough to allow me to move on to other areas of the project.

Below are a few screen grabs of the code for the compPlaceBoats function in its final stage. As with much of this project, there’s still plenty here that’d I like to clean up and make more efficient/less repetitive, but this served well enough to allow me to complete the project on time:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683802767/Project%201:%20Battleships/place_zhzxvp.png)

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683802814/Project%201:%20Battleships/place2_lnxa4x.png)

I was also able to begin to figure out a decent way of preventing the player from positioning their boats in overlapping positions. A key part of this was altering the function that generated the gameboards on page load, so that the board was populated with button elements rather than empty divs. This allowed me to easily disable the buttons once they’d been clicked/selected, as shown below by the addition of the ```.disabled = true``` attribute to the individual player cell buttons:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683802912/Project%201:%20Battleships/disabled_efnfcl.png)

I also took some time on this day to add in a bit more CSS styling to create a page that looked like the below:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683800448/Project%201:%20Battleships/hero2-min_g7tomt.png)

**Day 7 - Thursday 23/02/23**

Final full day of the project was spent fixing a few remaining issues. Managed to introduce additional code to allow the computer’s boats to be placed totally randomly (accounting for both horizontal and vertical placement of boats), and also finalise the code that would prevent the player from being able to click on the same square on the computer’s board twice. Was also able to finish the code that prevented the player from highlighting squares or positioning their boats if the code detected overlaps. The clicking aspect was covered by disabling the buttons as mentioned above, while the highlighting was solved by adding the following conditions into my original ```highlightHorizontal()``` and ```highlightVertical()``` functions - squares would only highlight if each square that made up a boat did not contain highlighting, as opposed to only the square that the mouse was hovering over:

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683803042/Project%201:%20Battleships/adj_jpxiqt.png)

I felt like I had very much achieved my MVP by this point, so I spent the rest of my time trying to improve the logic that determined which squares the computer would randomly target. By the submission deadline on the following afternoon (Friday 24/02/23), I hadn’t quite been able to figure this out so the computer continued to just take random pot-shots at the player’s board. I was slightly disappointed by this, as it was the problem that I was most looking forward to tackling. I came close, but couldn’t come up with a working solution in time. Looking forward to continuing to work on this problem in the future.

## Challenges
**Computer’s random boat placement**

As mentioned above, I think this was by far and away the biggest challenge that I came across in the course of achieving my MVP. Initially I wrote extremely long-winded code that didn’t always work reliably, to a point where I had to make the code even more long-winded by adding in default positioning that could act as a failsafe. While this was initially an acceptable workaround that allowed me to work on other aspects of the process, I was never really happy with the fact that, eight times out of ten, the computer’s boats would be placed in exactly the same position. I guess I ended up making this more of a problem for myself by writing more and more code to try and fix it, which ended up becoming pretty unreadable. Initially I thought adding in the default position failsafe for each boat was clever, until I realised that the main issue with the entire code block was that I had put the iterator that allowed the while loop to close in the wrong place. 

By taking a step back and making this seemingly simple change, it made the code work reliably 100% of the time, and enabled me to strip out all of the now unnecessary code I had written to snap the boats to a default failsafe position. That said, I wouldn’t say that writing in the code that placed the boats in a predetermined position was a complete waste of time. By implementing this, I was able to come to a relatively acceptable workaround that allowed me to progress on to the next stage of the build, giving me a bit of extra headspace to mentally step away from this particular challenge so that I could come back to it later with a different perspective. Even though it took me longer than I’d have liked to solve this problem, I think being able to focus on something else helped me to identify what was ultimately a pretty simple solution that would successfully fix things.

## Wins
**Built a working game that achieved the brief we were given, with only a few weeks of experience**

Being set this assignment was equal parts exciting and daunting. Exciting that we’d get to put the HTML, CSS and JavaScript we’d learnt over the preceding 2.5 weeks or so to the task, but also daunting because, well, it’d only been 2.5 weeks since we started learning about these tools. So the fact that I was able to actually deliver a working project on time and that hit the brief we’d been set was an extremely satisfying achievement, even if I’m conscious of the fact that the scope for further improvement and refinement of my code is pretty huge.

**Managed to remain calm under pressure**

There were certainly times when it felt like the pressure was on and I wouldn’t finish the project in time, particularly when I was stuck on a particular problem that was taking up what felt to be a lot of time. But by remaining calm, and allowing myself to move on to working on another aspect of the build, I was able to keep progress pushing forward while also giving myself the mental space to think a bit more about the issue that was facing, so that I could return to it later down the line and solve it far more quickly.

**```compPlaceBoat()``` function**

I realise I’m banging on a lot about this particular problem, but given the fact that this particular part of the project was such a challenge to get working properly/reliably, I’m happy that I was able to eventually figure it out. That said, I’m extremely conscious of the fact that this is still a very long-winded block of code, so I’m looking forward to the process of refactoring this (and the rest of the project), into something that’s far more readable and efficient.

## Key learnings/takeaways
* I think one of the biggest key takeaways from this project is just how much I enjoy the process of writing functional JavaScript. Entering into this course, I had it in my head that it’d be some of the more design-related CSS content that I’d get the most satisfaction from, but that’s no longer the case. Writing functional code that works reliably is hugely rewarding, and the process of starting from nothing and getting to that point is totally engrossing.

* I absolutely feel more confident in writing JavaScript now, too. When you begin to learn about it, a lot of the concepts can seem rather abstract and you wonder when you’d ever need to apply them. I think that changed as soon as I got stuck into this project. A lot of my project in particular is based around arrays. Though my code is by no means as efficient as it could be, I now feel far more comfortable with the process of storing information in arrays so it can then be accessed by JavaScript memory further down the line. I also feel more comfortable with the syntax required to access that information.

* That said, I’ve realised that a lot of the code I’ve written relies on many of the same tricks to get things to work. I need to work on building my confidence with other array methods, as well as other means of saving and storing information in JavaScript (objects, classes, etc.) through practice.

## Bugs
No major bugs that I’m aware of, aside from the fact that if you get to a point where practically all the squares have been clicked on the board and you and the computer only have one boat square remaining to be hit, the game will stop working. Fairly certain it has to do with the fact I’ve left the  ```playerBoatsRemaining === 1``` section in the if statements for the ```takeShot()``` function. I will test now that the project has been submitted to see if this rectifies the problem.

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683803282/Project%201:%20Battleships/bug_zpfm5t.png)

![](https://res.cloudinary.com/djvf3fooo/image/upload/v1683803367/Project%201:%20Battleships/bug2-min_c3kxfo.png)

## Future improvements
* Improve the efficiency/readability of the code. Aware there’s a fair amount of repetition here. First big job I’d like to tackle is to spend a good deal of time cleaning this code up. It’s functional at the moment, but I feel like it could be far, far tighter.

* I’d like to finally crack the more intelligent shot logic for the computer, so that it can recognise when it’s made a successful shot on its previous turn and then know to target squares that are adjacent to that until it sinks a boat.

* I would like to jazz the design of the page up with a few more features. Largely things like additional sound-effects, and perhaps some eye-catching animations.
















