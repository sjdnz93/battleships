function init() {

  // !ELEMENTS TO TARGET
  

  //Grids
  const grid1 = document.querySelector('#wrapperContent1')
  const grid2 = document.querySelector('#wrapperContent2')

  //Start button
  const startButton = document.querySelector('#play')

  //Squares on gameboard

  const playerCells = []
  const compCells = []

  //Boat divs

  const allBoats = document.querySelectorAll('boat')

  //Player boat divs
  const pCarrier = document.querySelector('#pCarrier')
  const pBattleship = document.querySelector('#pBattleship')
  const pDestroyer = document.querySelector('#pDestroyer')
  const pSubmarine = document.querySelector('#pSubmarine')
  const pPatrol = document.querySelector('#pPatrol')

  //Computer boat divs
  const cCarrier = document.querySelector('#cCarrier')
  const cBattleship = document.querySelector('#cBattleship')
  const cDestroyer = document.querySelector('#cDestroyer')
  const cSubmarine = document.querySelector('#cSubmarine')
  const cPatrol = document.querySelector('#cPatrol')

  //Rules box text
  const rulesText = document.querySelector('#instructionText')
  

  // !VARIABLES - GLOBAL

  //Player boat type arrays
  let pCarrierSquares = []
  let pBattleshipSquares = []
  let pDestroyerSquares = []
  let pSubmarineSquares = []
  let pPatrolSquares = []

  let playerMasterArray = []

  //Computer boat type arrays
  let cCarrierSquares = []
  let cBattleshipSquares = []
  let cDestroyerSquares = []
  let cSubmarineSquares = []
  let cPatrolSquares = []

  let computerMasterArray = []

  
  //Boat orientation
  let horizontal = true


  const width = 10
  const cellCount = width * width

  let gameActive = 0

  let boatSelection = 1
  let compBoatsPlaced = 1
  let compBoatsRemaining = 0
  let playerBoatsRemaining = 17

  // !PAGE LOAD TASKS

  generateGrid(grid1, playerCells)
  generateGrid(grid2, compCells)
  compPlaceBoats()
  updateInstructionsText()
 
  

  //console.log('GAME ACTIVE -->', gameActive)
  //console.log('BOAT SELECTION -->', boatSelection)

  // !FUNCTIONS

  //Generate grid
  function generateGrid(grid, cells) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')

      cell.classList.add('gameSquare')

      cell.dataset.index = i

      cell.dataset.selected = false

      cell.dataset.clicked = false

      //cell.innerText = i

      grid.appendChild(cell)

      cells.push(cell)
    }
  }

  //Start game
  function startGame() {
    if (gameActive === 0) {
      gameActive = 1
      //console.log('GAME ACTIVE -->', gameActive)
      //console.log('BOAT SELECTION -->', boatSelection)
      highlightBoatPic()
      updateButtonText()
      updateInstructionsText()
    } else if (gameActive === 3) {
      resetBoard()
    } else {
      //console.log('BUTTON NOT WORKING')
    }
  }

  //Reset board
  function resetBoard() {
    if (gameActive >= 1) {
      gameActive = 1
      boatSelection = 1
      compBoatsPlaced = 1
      compBoatsRemaining = 0
      playerBoatsRemaining = 17

      pCarrierSquares = []
      pBattleshipSquares = []
      pDestroyerSquares = []
      pSubmarineSquares = []
      pPatrolSquares = []

      cCarrierSquares = []
      cBattleshipSquares = []
      cDestroyerSquares = []
      cSubmarineSquares = []
      cPatrolSquares = []

      computerMasterArray = []
      playerMasterArray = []

      playerCells.forEach(sqr => {
        if (sqr.classList.contains('highlightOn') || sqr.classList.contains('highlightOn2') || sqr.classList.contains('highlightOn3') || sqr.classList.contains('highlightOn4') || sqr.classList.contains('highlightOn5') || sqr.dataset.selected === 'true' || sqr.dataset.clicked === 'true' || sqr.classList.contains('hit') || sqr.classList.contains('miss')) {
          sqr.dataset.selected = false
          sqr.classList.remove('highlightOn')
          //sqr.classList.remove('highlightOn2')
          //sqr.classList.remove('highlightOn3')
          //sqr.classList.remove('highlightOn4')
          //sqr.classList.remove('highlightOn5')
          sqr.classList.remove('hit')
          sqr.classList.remove('miss')
          sqr.dataset.clicked = false
        }
      })

      compCells.forEach(sqr => {
        if (sqr.classList.contains('highlightOn') || sqr.classList.contains('highlightOn2') || sqr.classList.contains('highlightOn3') || sqr.classList.contains('highlightOn4') || sqr.classList.contains('highlightOn5') || sqr.dataset.selected === 'true' || sqr.dataset.clicked === 'true' || sqr.classList.contains('hit') || sqr.classList.contains('miss')) {
          sqr.dataset.selected = false
          //sqr.classList.remove('highlightOn')
          //sqr.classList.remove('highlightOn2')
          //sqr.classList.remove('highlightOn3')
          //sqr.classList.remove('highlightOn4')
          //sqr.classList.remove('highlightOn5')
          sqr.classList.remove('hit')
          sqr.classList.remove('miss')
          sqr.dataset.clicked = false
        }
      })


      pCarrier.classList.remove('boatDestroyed')
      pBattleship.classList.remove('boatDestroyed')
      pDestroyer.classList.remove('boatDestroyed')
      pSubmarine.classList.remove('boatDestroyed')
      pPatrol.classList.remove('boatDestroyed')
      pCarrier.classList.remove('highlightOn')
      pBattleship.classList.remove('highlightOn')
      pDestroyer.classList.remove('highlightOn')
      pSubmarine.classList.remove('highlightOn')
      pPatrol.classList.remove('highlightOn')


      cCarrier.classList.remove('boatDestroyed')
      cBattleship.classList.remove('boatDestroyed')
      cDestroyer.classList.remove('boatDestroyed')
      cSubmarine.classList.remove('boatDestroyed')
      cPatrol.classList.remove('boatDestroyed')

      compPlaceBoats()
      highlightBoatPic()
      updateInstructionsText()
    }

  }


  //?PLAYER SET UP FUNCTIONS
  //Highlight horizontal squares
  function highlightHorizontal(e) {
    const adjacentValues = [e.target.dataset.index - 1, e.target.dataset.index - 2, e.target.dataset.index - 3, e.target.dataset.index - 4, e.target.dataset.index - 5]
    if (boatSelection === 1 && (e.target.dataset.index % width !== 0)){
      e.target.classList.toggle('highlightOn')
      playerCells[adjacentValues[0]].classList.toggle('highlightOn')
    } else if (boatSelection === 2 && ((e.target.dataset.index - 1) % width !== 0 && e.target.dataset.index % width !== 0)){
      e.target.classList.toggle('highlightOn')
      playerCells[adjacentValues[0]].classList.toggle('highlightOn')
      playerCells[adjacentValues[1]].classList.toggle('highlightOn')
    } else if (boatSelection === 3 && ((e.target.dataset.index - 1) % width !== 0 && e.target.dataset.index % width !== 0 )){
      e.target.classList.toggle('highlightOn')
      playerCells[adjacentValues[0]].classList.toggle('highlightOn')
      playerCells[adjacentValues[1]].classList.toggle('highlightOn')
    } else if (boatSelection === 4 && ((e.target.dataset.index - 2) % width !== 0 && (e.target.dataset.index - 1) % width !== 0 && e.target.dataset.index % width !== 0 )){
      e.target.classList.toggle('highlightOn')  
      playerCells[adjacentValues[0]].classList.toggle('highlightOn')
      playerCells[adjacentValues[1]].classList.toggle('highlightOn')
      playerCells[adjacentValues[2]].classList.toggle('highlightOn')
    } else if (boatSelection === 5 && ((e.target.dataset.index - 3) % width !== 0 && (e.target.dataset.index - 2) % width !== 0 && (e.target.dataset.index - 1) % width !== 0 && e.target.dataset.index % width !== 0)){
      e.target.classList.toggle('highlightOn')
      playerCells[adjacentValues[0]].classList.toggle('highlightOn')
      playerCells[adjacentValues[1]].classList.toggle('highlightOn')
      playerCells[adjacentValues[2]].classList.toggle('highlightOn')
      playerCells[adjacentValues[3]].classList.toggle('highlightOn')
    }
  }

  //Highlight vertical squares
  function highlightVertical(e) {
    const vertValues = [e.target.dataset.index - 10, e.target.dataset.index - 20, e.target.dataset.index - 30, e.target.dataset.index - 40, e.target.dataset.index - 50]
    if (boatSelection === 1 && (e.target.dataset.index / width >= 1)){
      e.target.classList.toggle('highlightOn')
      playerCells[vertValues[0]].classList.toggle('highlightOn')
    } else if (boatSelection === 2 && ((e.target.dataset.index - 10) / width >= 1 && e.target.dataset.index / width >= 1)){
      e.target.classList.toggle('highlightOn')
      playerCells[vertValues[0]].classList.toggle('highlightOn')
      playerCells[vertValues[1]].classList.toggle('highlightOn')
    } else if (boatSelection === 3 && ((e.target.dataset.index - 10) / width >= 1 && e.target.dataset.index / width >= 1)){
      e.target.classList.toggle('highlightOn')
      playerCells[vertValues[0]].classList.toggle('highlightOn')
      playerCells[vertValues[1]].classList.toggle('highlightOn')
    } else if (boatSelection === 4 && ((e.target.dataset.index - 20) / width >= 1 && (e.target.dataset.index - 10) / width >= 1 && e.target.dataset.index / width >= 1)){
      e.target.classList.toggle('highlightOn')
      playerCells[vertValues[0]].classList.toggle('highlightOn')
      playerCells[vertValues[1]].classList.toggle('highlightOn')
      playerCells[vertValues[2]].classList.toggle('highlightOn')
    } else if (boatSelection === 5 && ((e.target.dataset.index - 30) / width >= 1 && (e.target.dataset.index - 20) / width >= 1 && (e.target.dataset.index - 10) / width >= 1 && e.target.dataset.index / width >= 1)){
      e.target.classList.toggle('highlightOn')
      playerCells[vertValues[0]].classList.toggle('highlightOn')
      playerCells[vertValues[1]].classList.toggle('highlightOn')
      playerCells[vertValues[2]].classList.toggle('highlightOn')
      playerCells[vertValues[3]].classList.toggle('highlightOn')
    } 
  }

  //Highlight squares to help player positioning
  function highlightSquares(e) {
    playerCells.forEach(sqr => { 
      if (gameActive === 1 && horizontal === true /*&& sqr.dataset.selected === 'false'*/) {
        checkForHighlightingRemove()
        highlightHorizontal(e)
      } else if (gameActive === 1 && horizontal === false) {
        checkForHighlightingRemove()
        highlightVertical(e)
      }
    })
  }

  //change boat orientation
  function boatOrientation(e) {
    const space = 32
    if (e.keyCode === space && gameActive === 1) {
      if (horizontal === true) {
        horizontal = false
        //console.log('HORIZONTAL -->', horizontal)
      } else {
        horizontal = true
        //console.log('HORIZONTAL -->', horizontal)
      }
    }
  }

  //select function
  function confirmBoatPosition() {
    if (gameActive === 1 && boatSelection < 5) {
      checkHighlightingPushArray()
      //console.log('PATROLS ===>', pPatrolSquares)
      //console.log('SUBS ===>', pSubmarineSquares)
      //console.log('DEST ===>', pDestroyerSquares)
      //console.log('BTTL ===>', pBattleshipSquares)
      //console.log('CARRIERS ===>', pCarrierSquares)
      //console.log('PLAYER MASTER ARRAY', playerMasterArray)
      boatSelection++
      highlightBoatPic()
      //console.log('BOAT SELECTION -->', boatSelection)
    } else if (gameActive === 1 && boatSelection === 5) {
      checkHighlightingPushArray()
      //console.log('PATROLS ===>', pPatrolSquares)
      //console.log('SUBS ===>', pSubmarineSquares)
      //console.log('DEST ===>', pDestroyerSquares)
      //console.log('BTTL ===>', pBattleshipSquares)
      //console.log('CARRIERS ===>', pCarrierSquares)
      //console.log('PLAYER MASTER ARRAY', playerMasterArray)
      boatSelection++
      highlightBoatPic()
      //console.log('BOAT SELECTION -->', boatSelection)
      gameActive = 2
      updateInstructionsText()
      //console.log('GAME ACTIVE -->', gameActive)
      pCarrier.classList.remove('highlightPlayerBoat')
    } 
  }
  

  //highlight boat picture
  function highlightBoatPic() {
    if (boatSelection === 1) {
      pPatrol.classList.add('highlightPlayerBoat')
    } else if (boatSelection === 2) {
      pPatrol.classList.remove('highlightPlayerBoat')
      pSubmarine.classList.add('highlightPlayerBoat')
    } else if (boatSelection === 3) {
      pSubmarine.classList.remove('highlightPlayerBoat')
      pDestroyer.classList.add('highlightPlayerBoat')
    } else if (boatSelection === 4) {
      pDestroyer.classList.remove('highlightPlayerBoat')
      pBattleship.classList.add('highlightPlayerBoat')
    } else if (boatSelection === 5) {
      pBattleship.classList.remove('highlightPlayerBoat')
      pCarrier.classList.add('highlightPlayerBoat')
    } 
  }

  //Check squares for highlighting to remove
  function checkForHighlightingRemove() {
    playerCells.forEach(sqr => {
      if (sqr.classList.contains('highlightOn') && sqr.dataset.selected === 'false') {
        sqr.classList.remove('highlightOn')
      }
    })
  }

  function unhighlightSquares() {
    playerCells.forEach(sqr => {
      if (sqr.classList.contains('highlightOn') && sqr.dataset.selected === false) {
        sqr.classList.remove('highlightOn')
      }
    })
  }

  //Check squares for highlighting to save to array for that boat type
  function checkHighlightingPushArray () {
    playerCells.forEach(sqr => {
      if (boatSelection === 1 && sqr.dataset.selected === 'false' && sqr.classList.contains('highlightOn')) {
        sqr.classList.add('highlightOn')
        pPatrolSquares.push(sqr.dataset.index)
        sqr.dataset.selected = true
        
        
      } else if (boatSelection === 2 && sqr.dataset.selected === 'false' && sqr.classList.contains('highlightOn')) {
        sqr.classList.add('highlightOn')
        pSubmarineSquares.push(sqr.dataset.index)
        sqr.dataset.selected = true
        
        
      } else if (boatSelection === 3 && sqr.dataset.selected === 'false' && sqr.classList.contains('highlightOn')) {
        sqr.classList.add('highlightOn')
        pDestroyerSquares.push(sqr.dataset.index)
        sqr.dataset.selected = true
        
      
      } else if (boatSelection === 4 && sqr.dataset.selected === 'false' && sqr.classList.contains('highlightOn')) {
        sqr.classList.add('highlightOn')
        pBattleshipSquares.push(sqr.dataset.index)
        sqr.dataset.selected = true
        
    
      } else if (boatSelection === 5 && sqr.dataset.selected === 'false' && sqr.classList.contains('highlightOn')) {
        sqr.classList.add('highlightOn')
        pCarrierSquares.push(sqr.dataset.index)
        sqr.dataset.selected = true
        
  
      } 
    })
    
  }

  //?COMPUTER SET UP FUNCTIONS
  function compPlaceBoats() {
    while (compBoatsPlaced <= 5) {
      const randNum = Math.floor(Math.random() * compCells.length)
      const sqrSub10 = randNum - 10
      const sqrSub20 = randNum - 20
      const sqrSub30 = randNum - 30
      const sqrSub40 = randNum - 40

      //?Patrol boat placement (2 squares)
      if (compBoatsPlaced === 1) {
        if (randNum % width !== 0) {
          //compCells[randNum].classList.add('highlightOn')
          cPatrolSquares.push(compCells[randNum].dataset.index)
          compCells[randNum].dataset.selected = true
          //compCells[randNum - 1].classList.add('highlightOn')
          cPatrolSquares.push(compCells[randNum - 1].dataset.index)
          compCells[randNum - 1].dataset.selected = true
          compBoatsRemaining += 2
          //console.log('ind boat square count', compBoatsRemaining)
          //console.log('patrol vals logged ok', cPatrolSquares)
          
        } else {
          //Resetting selected values of squares pre-reassignment to false
          compCells.forEach(sqr => {
            if (/*sqr.classList.contains('highlightOn') ||*/ sqr.dataset.selected === 'true') {
              sqr.dataset.selected = false
              //sqr.classList.remove('highlightOn')
              
            }
          })

          //compCells[0].classList.add('highlightOn')
          cPatrolSquares.push(compCells[0].dataset.index)
          compCells[0].dataset.selected = true
          //compCells[1].classList.add('highlightOn')
          cPatrolSquares.push(compCells[1].dataset.index)
          compCells[1].dataset.selected = true
          compBoatsRemaining += 2
          //console.log('ind boat square count', compBoatsRemaining)
          //console.log('patrol vals logged backup', cPatrolSquares)
        }
        
        
        //?Submarine boat placement (3 squares)
      } else if (compBoatsPlaced === 2) {
        if (compCells[randNum].dataset.index >= 20 && compCells[randNum].dataset.selected === 'false' && compCells[sqrSub20].dataset.index >= 0 && compCells[sqrSub20].dataset.selected === 'false' && compCells[sqrSub10].dataset.selected === 'false') {
          //compCells[randNum].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[randNum].dataset.index)
          compCells[randNum].dataset.selected = true
          //compCells[sqrSub10].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[sqrSub10].dataset.index)
          compCells[sqrSub10].dataset.selected = true
          //compCells[sqrSub20].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[sqrSub20].dataset.index)
          compCells[sqrSub20].dataset.selected = true
          compBoatsRemaining += 3
          //console.log('ind boat square count', compBoatsRemaining)
          //console.log('sub vals logged ok', cSubmarineSquares)

        } else {
          
          // THIS WILL NEED TO BE REWRITTEN TO ACCOUNT FOR SELECTED VALUES, NOT HIGHLIHGTED, WHEN SQUARE INDICIES ARE PUSHED TO ARRAYS
          compCells.forEach(sqr => {
            if (/*sqr.classList.contains('highlightOn') ||*/ sqr.dataset.selected === 'true') {
              sqr.dataset.selected = false
              //sqr.classList.remove('highlightOn')
              
            }
          })

          cPatrolSquares = []
          

          //HIGHLIGHTER COMMANDS REPLACED WITH COMMAND TO PUSH SQUARE INDICIES FOR EACH BOAT TO BOAT ARRAY
          //compCells[0].classList.add('highlightOn')
          cPatrolSquares.push(compCells[0].dataset.index)
          compCells[0].dataset.selected = true
          //compCells[1].classList.add('highlightOn')
          cPatrolSquares.push(compCells[1].dataset.index)
          compCells[1].dataset.selected = true

          //console.log('patrol array wiped and replaced with', cPatrolSquares)
          
          //compCells[99].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[99].dataset.index)
          compCells[99].dataset.selected = true
          //compCells[89].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[89].dataset.index)
          compCells[89].dataset.selected = true
          //compCells[79].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[79].dataset.index)
          compCells[79].dataset.selected = true

          compBoatsRemaining += 3
          //console.log('ind boat square count', compBoatsRemaining)
          //console.log('sub vals logged backup', cSubmarineSquares)
        }

        //?Destyroyer placement (3 squares)
      } else if (compBoatsPlaced === 3) {
        if (compCells[randNum].dataset.index >= 20 && compCells[randNum].dataset.selected === 'false' && compCells[sqrSub20].dataset.index >= 0 && compCells[sqrSub20].dataset.selected === 'false' && compCells[sqrSub10].dataset.selected === 'false') {
          //compCells[randNum].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[randNum].dataset.index)
          compCells[randNum].dataset.selected = true
          //compCells[sqrSub10].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[sqrSub10].dataset.index)
          compCells[sqrSub10].dataset.selected = true
          //compCells[sqrSub20].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[sqrSub20].dataset.index)
          compCells[sqrSub20].dataset.selected = true

          compBoatsRemaining += 3
          //console.log('ind boat square count', compBoatsRemaining)
          //console.log('Dest vals logged ok', cDestroyerSquares)

        } else {
          
          // THIS WILL NEED TO BE REWRITTEN TO ACCOUNT FOR SELECTED VALUES, NOT HIGHLIHGTED, WHEN SQUARE INDICIES ARE PUSHED TO ARRAYS
          compCells.forEach(sqr => {
            if (/*sqr.classList.contains('highlightOn') || sqr.classList.contains('highlightOn2') ||*/ sqr.dataset.selected === 'true') {
              sqr.dataset.selected = false
              //sqr.classList.remove('highlightOn')
              //sqr.classList.remove('highlightOn2')
            }
          })

          cPatrolSquares = []
          cSubmarineSquares = []


          //HIGHLIGHTER COMMANDS REPLACED WITH COMMAND TO PUSH SQUARE INDICIES FOR EACH BOAT TO BOAT ARRAY
          //compCells[0].classList.add('highlightOn')
          cPatrolSquares.push(compCells[0].dataset.index)
          compCells[0].dataset.selected = true
          //compCells[1].classList.add('highlightOn')
          cPatrolSquares.push(compCells[1].dataset.index)
          compCells[1].dataset.selected = true

          //console.log('patrol array wiped and replaced with', cPatrolSquares)
          
          //compCells[99].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[99].dataset.index)
          compCells[99].dataset.selected = true
          //compCells[89].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[89].dataset.index)
          compCells[89].dataset.selected = true
          //compCells[79].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[79].dataset.index)
          compCells[79].dataset.selected = true

          //console.log('sub array wiped and replaced with', cSubmarineSquares)

          //compCells[82].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[82].dataset.index)
          compCells[82].dataset.selected = true
          //compCells[72].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[72].dataset.index)
          compCells[72].dataset.selected = true
          //compCells[62].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[62].dataset.index)
          compCells[62].dataset.selected = true


          compBoatsRemaining += 3
          //console.log('ind boat square count', compBoatsRemaining)
          //console.log('Dest vals logged backup', cDestroyerSquares)
          
        }

        //?Battleship placement (4 squares)
      } else if (compBoatsPlaced === 4) {
        if (((compCells[randNum].dataset.index) % width !== 0 && (compCells[randNum].dataset.index - 1) % width !== 0 && (compCells[randNum].dataset.index - 2) % width !== 0 && (compCells[randNum].dataset.index - 3 % width !== 0) && (compCells[randNum].dataset.index % width !== 0)) && compCells[randNum].dataset.selected === 'false' && compCells[randNum - 1].dataset.selected === 'false' &&  compCells[randNum - 2].dataset.selected === 'false' && compCells[randNum - 3].dataset.selected === 'false') {
          console.log('test')
          //compCells[randNum].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[randNum].dataset.index)
          compCells[randNum].dataset.selected = true
          //compCells[randNum - 1].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[randNum - 1].dataset.index)
          compCells[randNum - 1].dataset.selected = true
          //compCells[randNum - 2].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[randNum - 2].dataset.index)
          compCells[randNum - 2].dataset.selected = true
          //compCells[randNum - 3].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[randNum - 3].dataset.index)
          compCells[randNum - 3].dataset.selected = true

          compBoatsRemaining += 4
          //console.log('ind boat square count', compBoatsRemaining)
          //console.log('Bttl vals logged ok', cBattleshipSquares)

        } else {
          
          // THIS WILL NEED TO BE REWRITTEN TO ACCOUNT FOR SELECTED VALUES, NOT HIGHLIHGTED, WHEN SQUARE INDICIES ARE PUSHED TO ARRAYS
          compCells.forEach(sqr => {
            if (/*sqr.classList.contains('highlightOn') || sqr.classList.contains('highlightOn2') || sqr.classList.contains('highlightOn3') ||*/ sqr.dataset.selected === 'true') {
              sqr.dataset.selected = false
              //sqr.classList.remove('highlightOn')
              //sqr.classList.remove('highlightOn2')
              //sqr.classList.remove('highlightOn3')
            }
          })

          cPatrolSquares = []
          cSubmarineSquares = []
          cDestroyerSquares = []



          //HIGHLIGHTER COMMANDS REPLACED WITH COMMAND TO PUSH SQUARE INDICIES FOR EACH BOAT TO BOAT ARRAY
          //compCells[0].classList.add('highlightOn')
          cPatrolSquares.push(compCells[0].dataset.index)
          compCells[0].dataset.selected = true
          //compCells[1].classList.add('highlightOn')
          cPatrolSquares.push(compCells[1].dataset.index)
          compCells[1].dataset.selected = true

          console.log('patrol array wiped and replaced with', cPatrolSquares)
          
          //compCells[99].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[99].dataset.index)
          compCells[99].dataset.selected = true
          //compCells[89].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[89].dataset.index)
          compCells[89].dataset.selected = true
          //compCells[79].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[79].dataset.index)
          compCells[79].dataset.selected = true

          //console.log('sub array wiped and replaced with', cSubmarineSquares)

          //compCells[82].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[82].dataset.index)
          compCells[82].dataset.selected = true
          //compCells[72].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[72].dataset.index)
          compCells[72].dataset.selected = true
          //compCells[62].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[62].dataset.index)
          compCells[62].dataset.selected = true

          //console.log('Dest array wiped and replaced with', cDestroyerSquares)

          //compCells[28].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[28].dataset.index)
          compCells[28].dataset.selected = true
          //compCells[27].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[27].dataset.index)
          compCells[27].dataset.selected = true
          //compCells[26].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[26].dataset.index)
          compCells[26].dataset.selected = true
          //compCells[25].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[25].dataset.index)
          compCells[25].dataset.selected = true


          compBoatsRemaining += 4
          //console.log('ind boat square count', compBoatsRemaining)
          //console.log('Bttl vals logged backup', cBattleshipSquares)
        }

        //?carrier placement (5 squares)
      } else if (compBoatsPlaced === 5) {
        if (compCells[randNum].dataset.index >= 40 && compCells[randNum].dataset.selected === 'false' && compCells[sqrSub40].dataset.index >= 0 && compCells[sqrSub40].dataset.selected === 'false' && compCells[sqrSub30].dataset.selected === 'false' && compCells[sqrSub20].dataset.selected === 'false' && compCells[sqrSub10].dataset.selected === 'false') {
          //compCells[randNum].classList.add('highlightOn5')
          cCarrierSquares.push(compCells[randNum].dataset.index)
          compCells[randNum].dataset.selected = true
          //compCells[sqrSub10].classList.add('highlightOn5')
          cCarrierSquares.push(compCells[sqrSub10].dataset.index)
          compCells[sqrSub10].dataset.selected = true
          //compCells[sqrSub20].classList.add('highlightOn5')
          cCarrierSquares.push(compCells[sqrSub20].dataset.index)
          compCells[sqrSub20].dataset.selected = true
          //compCells[sqrSub30].classList.add('highlightOn5')
          cCarrierSquares.push(compCells[sqrSub30].dataset.index)
          compCells[sqrSub30].dataset.selected = true
          //compCells[sqrSub40].classList.add('highlightOn5')
          cCarrierSquares.push(compCells[sqrSub40].dataset.index)
          compCells[sqrSub40].dataset.selected = true

          compBoatsRemaining += 5
          //console.log('ind boat square count', compBoatsRemaining)
          //console.log('FINALCarrier vals logged OK', cCarrierSquares) 
          //console.log('FINALBttl vals logged OK', cBattleshipSquares) 
          //console.log('FINALDest vals logged OK', cDestroyerSquares) 
          //console.log('FINALSub vals logged OK', cSubmarineSquares) 
          //console.log('FINALPatrol vals logged OK', cPatrolSquares) 

        } else {
          console.log('what happens here')
          // THIS WILL NEED TO BE REWRITTEN TO ACCOUNT FOR SELECTED VALUES, NOT HIGHLIHGTED, WHEN SQUARE INDICIES ARE PUSHED TO ARRAYS
          compCells.forEach(sqr => {
            if (/*sqr.classList.contains('highlightOn') || sqr.classList.contains('highlightOn2') || sqr.classList.contains('highlightOn3') || sqr.classList.contains('highlightOn4') ||*/ sqr.dataset.selected === 'true') {
              sqr.dataset.selected = false
              //sqr.classList.remove('highlightOn')
              //sqr.classList.remove('highlightOn2')
              //sqr.classList.remove('highlightOn3')
              //sqr.classList.remove('highlightOn4')
            }
          })

          cPatrolSquares = []
          cSubmarineSquares = []
          cDestroyerSquares = []
          cBattleshipSquares = []



          //HIGHLIGHTER COMMANDS REPLACED WITH COMMAND TO PUSH SQUARE INDICIES FOR EACH BOAT TO BOAT ARRAY

          //compCells[0].classList.add('highlightOn')
          cPatrolSquares.push(compCells[0].dataset.index)
          compCells[0].dataset.selected = true
          //compCells[1].classList.add('highlightOn')
          cPatrolSquares.push(compCells[1].dataset.index)
          compCells[1].dataset.selected = true

          //console.log('patrol array wiped and replaced with', cPatrolSquares)
          
          //compCells[99].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[99].dataset.index)
          compCells[99].dataset.selected = true
          //compCells[89].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[89].dataset.index)
          compCells[89].dataset.selected = true
          //compCells[79].classList.add('highlightOn2')
          cSubmarineSquares.push(compCells[79].dataset.index)
          compCells[79].dataset.selected = true

          //console.log('sub array wiped and replaced with', cSubmarineSquares)

          //compCells[82].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[82].dataset.index)
          compCells[82].dataset.selected = true
          //compCells[72].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[72].dataset.index)
          compCells[72].dataset.selected = true
          //compCells[62].classList.add('highlightOn3')
          cDestroyerSquares.push(compCells[62].dataset.index)
          compCells[62].dataset.selected = true

          //console.log('Dest array wiped and replaced with', cDestroyerSquares)

          //compCells[28].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[28].dataset.index)
          compCells[28].dataset.selected = true
          //compCells[27].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[27].dataset.index)
          compCells[27].dataset.selected = true
          //compCells[26].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[26].dataset.index)
          compCells[26].dataset.selected = true
          //compCells[25].classList.add('highlightOn4')
          cBattleshipSquares.push(compCells[25].dataset.index)
          compCells[25].dataset.selected = true

          //console.log('Bttl array wiped and replaced with', cBattleshipSquares)

          //compCells[60].classList.add('highlightOn5')
          cCarrierSquares.push(compCells[60].dataset.index)
          compCells[60].dataset.selected = true
          //compCells[50].classList.add('highlightOn5')
          cCarrierSquares.push(compCells[50].dataset.index)
          compCells[50].dataset.selected = true
          //compCells[40].classList.add('highlightOn5')
          cCarrierSquares.push(compCells[40].dataset.index)
          compCells[40].dataset.selected = true
          //compCells[30].classList.add('highlightOn5')
          cCarrierSquares.push(compCells[30].dataset.index)
          compCells[30].dataset.selected = true
          //compCells[20].classList.add('highlightOn5')
          cCarrierSquares.push(compCells[20].dataset.index)
          compCells[20].dataset.selected = true


          compBoatsRemaining += 5
          //console.log('ind boat square count', compBoatsRemaining)
          //console.log('FINALCarrier vals logged backup', cCarrierSquares) 
          //console.log('FINALBttl vals logged backup', cBattleshipSquares) 
          //console.log('FINALDest vals logged backup', cDestroyerSquares) 
          //console.log('FINALSub vals logged backup', cSubmarineSquares) 
          //console.log('FINALPatrol vals logged backup', cPatrolSquares) 
        }

      
      }
      compBoatsPlaced++
      //console.log('this is', compBoatsPlaced)
    }
  }

  //?ACTIVE GAMEPLAY FUNCTIONS
  function takeShot(e) {
    if (gameActive === 2 && compBoatsRemaining > 1 && playerBoatsRemaining > 1) {
      if (e.target.dataset.selected === 'true') {
        e.target.classList.add('hit')
        computerMasterArray.push(e.target.dataset.index)
        //console.log('Your shot successfully landed on ', e.target)
        compBoatsRemaining--
        //console.log(`The computer has ${compBoatsRemaining} left in play.`)
        computerTakeShot()
        //console.log('COMPUTER HAS ATTEMPTED SHOT')
      } else {
        e.target.classList.add('miss')
        //console.log('YOU MISSED ', e.target)
        computerTakeShot()
        //console.log('COMPUTER HAS ATTEMPTED SHOT')
      } 
    } else if (gameActive === 2 && (compBoatsRemaining === 1 || playerBoatsRemaining === 1)) {
      if (e.target.dataset.selected === 'true') {
        e.target.classList.add('hit')
        computerMasterArray.push(e.target.dataset.index)
        //console.log('Your shot successfully landed on ', e.target)
        compBoatsRemaining--
        //console.log(`The computer has ${compBoatsRemaining} left in play.`)
        //console.log('GAME OVER')
        gameActive = 3
        //console.log(gameActive)
        endGame()
      } else {
        e.target.classList.add('miss')
        //console.log('YOU MISSED ', e.target)
        computerTakeShot()
        //console.log('COMPUTER HAS ATTEMPTED SHOT')
      } 
    } else {
      //console.log('SOMETHING IS WRONG')//change this to an alert?
    } 
    destroyCompBoat()
  }

  function computerTakeShot() {
    let varActive = 1
    //While varActive is 1, check whether the randomly targeted square has been target before
    //if it has, find a new square to target
    //if it hasn't, shoot it
    while (varActive === 1 && playerBoatsRemaining > 0) {
      const randShotNum = Math.floor(Math.random() * 100)
      const targetSquareSelect = playerCells[randShotNum].dataset.selected
      const targetSquareIndex = playerCells[randShotNum].dataset.index
      const targetSquare = playerCells[randShotNum]
      if (playerBoatsRemaining > 1) {
        if (targetSquare.dataset.clicked === 'true') {
          console.log('FINDING NEW TARGET')
        } else if (targetSquare.dataset.clicked === 'false') {
          if (targetSquareSelect === 'true') {
            targetSquare.classList.add('hit')
            targetSquare.dataset.clicked = true
            playerMasterArray.push(targetSquareIndex)
            playerBoatsRemaining--
            varActive ++
          } else {
            targetSquare.classList.add('miss')
            targetSquare.dataset.clicked = true
            varActive ++
          }
        }
      } else if (playerBoatsRemaining === 1) {
        if (targetSquare.dataset.clicked === 'true') {
          console.log('FINDING NEW TARGET')
        } else if (targetSquare.dataset.clicked === 'false') {
          if (targetSquareSelect === 'true') {
            targetSquare.classList.add('hit')
            targetSquare.dataset.clicked = true
            playerMasterArray.push(targetSquareIndex)
            playerBoatsRemaining--
            gameActive = 3
            //console.log('GAME SHOULD END HERE COMPUTER HAS KILLED YOUR BOATS')
            endGame()
            varActive ++
          } else {
            targetSquare.classList.add('miss')
            targetSquare.dataset.clicked = true
            varActive ++
          }
        }
      }
      destroyPlayerBoat()
      
    }
  }

  function destroyCompBoat() {
    const allCPatrolHit = cPatrolSquares.every(i => computerMasterArray.includes(i))
    const allCSubmarineHit = cSubmarineSquares.every(i => computerMasterArray.includes(i))
    const allCDestroyerHit = cDestroyerSquares.every(i => computerMasterArray.includes(i))
    const allCBattleshipHit = cBattleshipSquares.every(i => computerMasterArray.includes(i))
    const allCCarrierHit = cCarrierSquares.every(i => computerMasterArray.includes(i))

    if (allCPatrolHit === true) {
      cPatrol.classList.add('boatDestroyed')
    }

    if (allCSubmarineHit === true) {
      cSubmarine.classList.add('boatDestroyed')
    }

    if (allCDestroyerHit === true) {
      cDestroyer.classList.add('boatDestroyed')
    }

    if (allCBattleshipHit === true) {
      cBattleship.classList.add('boatDestroyed')
    }

    if (allCCarrierHit === true) {
      cCarrier.classList.add('boatDestroyed')
    }
    
  }

  function destroyPlayerBoat() {
    const allPPatrolHit = pPatrolSquares.every(i => playerMasterArray.includes(i))
    const allPSubmarineHit = pSubmarineSquares.every(i => playerMasterArray.includes(i))
    const allPDestroyerHit = pDestroyerSquares.every(i => playerMasterArray.includes(i))
    const allPBattleshipHit = pBattleshipSquares.every(i => playerMasterArray.includes(i))
    const allPCarrierHit = pCarrierSquares.every(i => playerMasterArray.includes(i))

    if (allPPatrolHit === true) {
      pPatrol.classList.add('boatDestroyed')
    }

    if (allPSubmarineHit === true) {
      pSubmarine.classList.add('boatDestroyed')
    }

    if (allPDestroyerHit === true) {
      pDestroyer.classList.add('boatDestroyed')
    }

    if (allPBattleshipHit === true) {
      pBattleship.classList.add('boatDestroyed')
    }

    if (allPCarrierHit === true) {
      pCarrier.classList.add('boatDestroyed')
    }
  }


  //?END GAME FUNCTIONS
  function endGame() {
    if (compBoatsRemaining === 0) {
      rulesText.innerText = 'PLAYER WINS! Press the Reset button if you want to play again.'
    } else if (playerBoatsRemaining === 0) {
      rulesText.innerText = 'YOU LOSE. COMPUTER WINS! Press the Reset button if you want to play again.'
    }
    updateButtonText()
  }

  //?TEXT UPDATE FUNCTIONS

  function updateButtonText() {
    if (gameActive >= 1) {
      startButton.innerText = 'Reset'
    } else {
      startButton.innerText = 'Play'
    }
  }

  function  updateInstructionsText() {
    if (gameActive === 0) {
      rulesText.innerText = 'Press the Play button to start the game'
    } else if (gameActive === 1) {
      rulesText.innerText = 'Place your ships on your board. Press the spacebar to rotate boats horizontally or vertically.'
    } else if (gameActive === 2) {
      rulesText.innerText = 'Click on the Computer\'s board to take your shot!'
    }

  }

  //?AUDIO
  function playPing() {
    const sound = document.getElementById('sonarPing')
    sound.play()
  }

  // !EVENT LISTENERS

  //Start button
  startButton.addEventListener('click', startGame)
  startButton.addEventListener('click', resetBoard)

  //Highlight tiles on gameboard
  playerCells.forEach(sqr => {
    sqr.addEventListener('mouseover', highlightSquares)
    sqr.addEventListener('mouseleave', unhighlightSquares)
    sqr.addEventListener('click', confirmBoatPosition)
  })

  //Player shots at computer
  compCells.forEach(sqr => {
    sqr.addEventListener('click', takeShot)
  })

  document.addEventListener('keydown', boatOrientation)
  










  





   

}
window.addEventListener('DOMContentLoaded', init)


