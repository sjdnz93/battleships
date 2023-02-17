//! MVP
  //Single page only. Might add an intro homepage once basic game is working as it should
  //Super basic design in CSS - to the point where you can clearly make out what is going on, but no fancy designs/sound effects. Will still need to look nice
  //computer will be able to place all 5 boats of varying sizes
  //computer will be able to target random grids for shots --> with the logic that if a hit is successful it will then target adjacent squares that haven't previously been targeted 
  //grids will be one size (10x10 each)
  //design not responsive
  //won't include any logic that allows the computer to check which boats the player has remaining, and then target collections of unchecked squares that are the same size as the remaining boats


//!ELEMENTS TO TARGET

  //?Grid
    //Target the empty grid div so that the 10x10 (width, cellcount to be saved to variables so game board size can change) playing board can be generated on page load
    //Perhaps once MVP has been achieved this could be made to change in size depending on screen size, difficulty level selected, etc
    //Will obviously need to generate two grids (one for player, one for computer). Will need to think about naming/IDs so that squares on both grids can be targeted

  //?Start button
    //Will need to be able to target the start button to begin the game
    //When pressed, will reassign the gameActive variable from 0 to 1, allowing the below to then take place
    //This should trigger a function that randomly places the computer's boats
    //Should also enable the player to position their boats on the page, perhaps making the boards clickable

  //?Rules div
    //Shows different text depending on the value of the gameActive variable
    //Text updates from rules of game to then contain text saying "Place your X" as player rotates through placing each ship
    //Should contain fixed text that explains controls to rotate the boat around its axis

  //?Grid squares
    //First interaction with grid will be for player to place their boats. Probably only focus on one square at a time in terms of hover and clicks, but figure out a way to highlight multiple squares based on the size of the boat that's about to be placed (THINK ABOUT BOTH HOVER EVENTS AND CLICKS)
    //At this point there'll need to be a function and listener that will rotate the boat 90deg so can be placed horizontally or vertically
    //Grid squares will also need to be able to accept and track clicks in order to find enemy boats. (THIS WILL NEED TO WORK FOR BOTH PLAYER AND COMPUTER SHOTS)
  
  //?Boat placeholders (top and bottom of page)
    //Boat placeholders will need to illuminate when you're placing the boat at the beginning of the game 
    //and then again in a different colour when it has been destroyed

  //?Audio
    //One to add in once MVP is achieved
    //Sounds for click events on grid for missed shots, successful shots, boat sunk, game start and game end 

//!GLOBAL VARIABLES

  //?gameActive
    // number
    // at page load 0, at 1 will trigger functionality for board setup, 2 will trigger functionality for game play, at 3 will allow board to be reset
    // will be used to make click events and functions accessible/behave in a certain way i.e boatToSelect (toggle colouring to help with placement, and to notify if boat is destroyed)

  //?gridWidth
    //Will be 10 to begin with
    //Could vary based on screen size, difficulty selected (only once basic MVP achieved)

  //?squareCount
    //will be width * width - starting with 100 playing squares 
 
  //?squaresPlayer
    //Will be an empty array at page load
    //Generated squares will be pushed into this array when created
    //Used for targeting each square individually, likely tied to the randNumGenerator variable as well as the functions for placing and shooting at boats
    //id from 0 - 99
    
  //?squaresComputer
    //Will be an empty array at page load
    //Generated squares will be pushed into this array when created
    //Used for targeting each square individually, likely tied to the randNumGenerator variable as well as the functions for placing and shooting at boats
    //id from 0 - 99

  //?boatOrientation
    //will be true or false
    //will be toggled by the boatRotate function
    //true/false values will determine which squares adjacent to the square the mouse is hovering over will be illuminated

  //?boatSelection
    //no value until gameStart button is pressed  
    //will then be assigned a value between 1 and 5, incrementing as each boat is placed
    //depending on number, the boatToSelect and showOutline function behaviours will be altered

  //?playerBoatsPlaced
    //start at 0, tracked up to 5 with the placeBoat function incrementing this each time a boat is placed

  //?playerBoatsRemaining
    //number -> probs end up equalling playerBoatsPlaced once all boats are placed
    //Will count down as boats are destroyed, once it hits zero the game ends
    //Boats might be tricky to group together as they'll effectively be collections of individual tiles. This counter might need to be a running total of all of the squares populated by boats, rather than the number of boats in total 

  //?compBoatsPlaced
    // a number

  //?compBoatsRemaining
    //number 
    //Boats might be tricky to group together as they'll effectively be collections of individual tiles. This counter might need to be a running total of all of the squares populated by boats, rather than the number of boats in total 
    
  //?randNumGenerator
    //This will be used primarily to help the computer make its attack choices. -> this might not need to be global -> might be in function body of computer's attack function -> might need another for determining the computer's boat placement logic



    //? ========> DO I NEED AN OBJECT THAT WILL STORE THE SELECTED SQUARES FOR EACH BOAT CLASS TYPE? HOW WILL I TRACK WHICH BOATS ARE STIL IN PLAY?
    
//!PAGE-LOAD TASKS

  //?init function will need to execute once DOM has been loaded. All game mechanics to be contained within this function body

  //?generateGridPlayer function will need to execute

  //?generateGridComputer function will need to execute


//!EXECUTE - functions

  //?changeGameActive
    //when called this will toggle the gameActive variable between 0 - 3. Will be called from within multiple functions throughout the course of the game

  //?generateGridPlayer
    //  Use a for loop to iterate through squareCount variable to generate squares within the player's grid
      // for each value in the square count variable, it will generate a new div
      // that div will be assigned an id attribute => used for targeting on computer's turn
      // div will be appended to grid
      // square will be pushed into the squaresPlayer array so individual items can be accessed

  //?generateGridComputer  
    //  Use a for loop to iterate through squareCount variable to generate squares within the computer's grid
      // for each value in the square count variable, it will generate a new div
      // that div will be assigned an id attribute => used for targeting on player's turn
      // div will be appended to grid
      // square will be pushed into the squaresComputer array so individual items can be accessed

  //?startGame
    // Will trigger the compPlaceBoat function to randomly position the computer's boats on its board
    // Will trigger the updateText function so that player has instructions for placing boats and knows the controls to rotate boats
    // Will set the gameActive variable to 1 (to determine the manner in which the placeBoat and boatToSelect functions work, and also to make the player board clickable)
    // Will use an if statement to remain active while playerBoatsPlaced variable is less than 5 and computerBoatsPlaced is false
      // Will need hover, click and keystroke event listeners within function body that are only triggered while this function is active. Will help player to position their boats and confirm their boat selections
        //Tied to the placeBoat and rotateBoat functions
        //Tied to boatToSelect function
    // Once boats have been placed, the updateText function will trigger again to let player know that they need to start clicking on the computer's board to target its boats
    // gameActive variable to be set to 2. Player board no longer clickable by player. Computer board to become clickable

  //?updateText
    // If gameActive variable is 0, shows introductory text
    // If gameActive variable is 1 (following startGame button being pressed), will show instructions for placing boats and rotating boats
    // If gameActive variable is 2 (once all boats have been pressed)

  //?showOutline
    // Function will be triggered by a hover event over the player's board
    // Will only work if gameActive variable is set to 1. If 0 or 2, nothing happens
    // On 1, it will highlight the gridsquare that the mouse is over
    // Depending on the value the boatOrientation variable is set to (true or false) and the value of the boatSelection variable (between 1 and 5), it will highlight a certain number of squares adjacent to the square being hovered over. If boatOrentation is false, they'll be horizontal squares. If true, they'll be vertically adjacent squares

  //?placeBoat
    // If gameActive variable is 1, player board will become interactive
    // function triggered by click event
    // Depending on the value of boatOrientation and boatSelection variables, the click event that triggers this function will then assign the highlighted squares a new value that relates to the type of boat (carrier, destroyer etc)
    // Will check for collisions (do any squares hovered over contain a value) and prevent boat from being placed if there is one
    // Will increment the playerBoats placed variable for each boat placed (up to 5)
    // Will call compPlaceBoat function after all playerBoats placed
    // Once 5 boats placed and compPlaceBoat called, will toggle the gameActive variable to 2

  //?rotateBoat
    // will use a keystroke event to toggle the value of the boatOrientation variable between true and false

  //?boatToSelect
    // Depending on the value of the boatSelection variable, this will highlight the boat divs (above and below the grid) in a certain colour to signify to the player which boat they're placing at that time

  //?compPlaceBoat
    // While compBoatsPlaced variable is less than or equal to five, a randomNumber will be generated that will represent a square on the board
    // for each square targeted, checks will be run to ensure that square and the adjacent squares in question aren't populated
    // if populated, new square number generated
    // if not populated, square and adjacent squares assigned a value relating to the type of boat being placed
    // each run will toggle the boat orientation so that computer boats alternate between horizontal and vertical
    // function to be called within the placeBoat function, once all player boats have been placed

  //?takeShot
    // Tied to click event listener that will call function, only once gameActive variable is set to 2 and while playerBoatsRemaining or compBoatsRemaining are above 0
    // Each time this function is called, the compTakeShot function will be called afterwards
    // When all of a boats squares have been successfully hit (based on the boat type value assigned to each square in play), boatDestroyed will be triggered
    

  //?compTakeShot
    //Will contain a lastShotSuccessful variable. This will be checked at the start of each time this function is called (for first compShot this will be unassigned)
    //Will generate a randomNumber that's tied to a square on the player's grid
    //If square is not assigned a value, will highlight the square in colour associated with a miss and toggle lastShotSuccessful variable to false
    //For next time function is called, if the lastShotSuccessful variant is false, a new random number will be generated and above process will repeat
    //If lastShotSuccessful variable is true, all squares directly adjacent to the previously targeted square will be targeted, so long as they haven't already been checked
    //If all squares associated with a certain boat-type value are hit, the boatDestroyed function will be called

  //?boatDestroyed
    //Called within the takeShot and compTakeShot functions
    //Will be triggered once all squares with a certain boat-type value have been identified
    //Will blank out the boat in question in the boat container divs to signify they're not out of play
    //Will decrement the playerBoatsRemaining or compBoatsRemaining variables
    //When playerBoatsRemaining or compBoatsRemaining hits 0, endGame function will be called

  //?endGame
    //will be called once playerBoatsRemaining or compBoatsRemaining variables hit zero, from within either the boatDestroyed function
    //will increment gameActive variable to 3

  //?cleanUp
    //will reset board
    //reassign all relevant variables to their required value to restart the game
    //tied to the startGame button

  //?playAudio
    //only to be added in once MVP has been delivered

//!EVENTS

  //?DOMContentLoaded
    //Will trigger the init function that controls the game

  //?click (targeted on start button)
    //Once pressed will trigger the startGame function (if gameActive variable is 0)
  
  //?click (targeted on player grid)
    //will trigger placeBoat function (if gameActive variable is 1)

  //?click (targeted on computer grid)
    //will trigger takeShot function (if gameActive variable is 2)  

  //?click (targeted on reset button)
    //will trigger cleanUp function (regardless what gameActive variable is set to)
    
  //?hoverEvent
    //will trigger the showOutline function
  
  //?keystrokeEvent
    //tied to spacebar
    //will trigger the boatRotate function (if gameActive variable is set to 1)