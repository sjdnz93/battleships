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

  //Player boat type arrays
  const pCarrierSquares = []
  const pBattleshipSquares = []
  const pDestroyerSquares = []
  const pSubmarineSquares = []
  const pPatrolSquares = []

  //Computer boat type arrays
  const cCarrierSquares = []
  const cBattleshipSquares = []
  const cDestroyerSquares = []
  const cSubmarineSquares = []
  const cPatrolSquares = []

  
  //Boat orientation
  let horizontal = true
  

  // !VARIABLES - GLOBAL


  const width = 10
  const cellCount = width * width

  let gameActive = 0

  let boatSelection = 1
  let compBoatsPlaced = 1

  // !PAGE LOAD TASKS

  generateGrid(grid1, playerCells)
  generateGrid(grid2, compCells)
  compPlaceBoats()
  

  console.log('GAME ACTIVE -->', gameActive)
  console.log('BOAT SELECTION -->', boatSelection)

  // !FUNCTIONS

  //Generate grid
  function generateGrid(grid, cells) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')

      cell.classList.add('gameSquare')

      cell.dataset.index = i

      cell.dataset.selected = false

      cell.innerText = i

      grid.appendChild(cell)

      cells.push(cell)
    }
  }

  //Start game
  function startGame() {
    gameActive = 1
    console.log('GAME ACTIVE -->', gameActive)
    console.log('BOAT SELECTION -->', boatSelection)
    highlightBoatPic()
    
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
      if (gameActive === 1 && horizontal === true && sqr.dataset.selected === 'false') {
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
        console.log('HORIZONTAL -->', horizontal)
      } else {
        horizontal = true
        console.log('HORIZONTAL -->', horizontal)
      }
    }
  }

  //select function
  function confirmBoatPosition() {
    if (gameActive === 1 && boatSelection <= 5) {
      checkHighlightingPushArray()
      console.log('PATROLS ===>', pPatrolSquares)
      console.log('SUBS ===>', pSubmarineSquares)
      console.log('DEST ===>', pDestroyerSquares)
      console.log('BTTL ===>', pBattleshipSquares)
      console.log('CARRIERS ===>', pCarrierSquares)
      boatSelection++
      highlightBoatPic()
      console.log('BOAT SELECTION -->', boatSelection)
    } else {
      pCarrier.classList.remove('highlightOn')
      
      console.log('GAME ACTIVE -->', gameActive)
    }
  }

  //highlight boat picture
  function highlightBoatPic() {
    if (boatSelection === 1) {
      pPatrol.classList.add('highlightOn')
    } else if (boatSelection === 2) {
      pPatrol.classList.remove('highlightOn')
      pSubmarine.classList.add('highlightOn')
    } else if (boatSelection === 3) {
      pSubmarine.classList.remove('highlightOn')
      pDestroyer.classList.add('highlightOn')
    } else if (boatSelection === 4) {
      pDestroyer.classList.remove('highlightOn')
      pBattleship.classList.add('highlightOn')
    } else if (boatSelection === 5) {
      pBattleship.classList.remove('highlightOn')
      pCarrier.classList.add('highlightOn')
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
    while (compBoatsPlaced <= 2) {
      const randNum = Math.floor(Math.random() * compCells.length)
      const sqrSub10 = randNum - 10
      const sqrSub20 = randNum - 20
      if (compBoatsPlaced === 1) {
        if ((randNum % width !== 0)) {
          compCells[randNum].classList.add('highlightOn')
          compCells[randNum].dataset.selected = true
          compCells[randNum - 1].classList.add('highlightOn')
          compCells[randNum - 1].dataset.selected = true
          
        } else {
          compCells[0].classList.add('highlightOn')
          compCells[0].dataset.selected = true
          compCells[1].classList.add('highlightOn')
          compCells[1].dataset.selected = true
        }
        
        
        
      } else if (compBoatsPlaced === 2) {
        if (compCells[randNum].dataset.index >= 20 && compCells[randNum].dataset.selected === 'false' && compCells[sqrSub20].dataset.index >= 0 && compCells[sqrSub20].dataset.selected === 'false' && compCells[sqrSub10].dataset.selected === 'false') {
          console.log('test')
          compCells[randNum].classList.add('highlightOn2')
          compCells[randNum].dataset.selected = true
          console.log('boat placed here', compCells[randNum])
          compCells[sqrSub10].classList.add('highlightOn2')
          compCells[sqrSub10].dataset.selected = true
          console.log('boat placed here', compCells[sqrSub10])
          compCells[sqrSub20].classList.add('highlightOn2')
          compCells[sqrSub20].dataset.selected = true
          console.log('boat placed here', compCells[sqrSub20])
        } else {
          console.log('what happens here')
          // THIS WILL NEED TO BE REWRITTEN TO ACCOUNT FOR SELECTED VALUES, NOT HIGHLIHGTED, WHEN SQUARE INDICIES ARE PUSHED TO ARRAYS
          compCells.forEach(sqr => {
            if (sqr.classList.contains('highlightOn')) {
              sqr.classList.remove('highlightOn')
            }
          })
          //HIGHLIGHTER COMMANDS REPLACED WITH COMMAND TO PUSH SQUARE INDICIES FOR EACH BOAT TO BOAT ARRAY
          compCells[0].classList.add('highlightOn')
          compCells[0].dataset.selected = true
          compCells[1].classList.add('highlightOn')
          compCells[1].dataset.selected = true
          compCells[99].classList.add('highlightOn2')
          compCells[99].dataset.selected = true
          compCells[89].classList.add('highlightOn2')
          compCells[89].dataset.selected = true
          compCells[79].classList.add('highlightOn2')
          compCells[79].dataset.selected = true
        }

        
      } 
      compBoatsPlaced++
      console.log('this is', compBoatsPlaced)
    }
  }


  // !EVENT LISTENERS

  //Start button
  startButton.addEventListener('click', startGame)

  //Highlight tiles on gameboard
  playerCells.forEach(sqr => {
    sqr.addEventListener('mouseover', highlightSquares)
    sqr.addEventListener('mouseleave', unhighlightSquares)
    sqr.addEventListener('click', confirmBoatPosition)
  })

  document.addEventListener('keydown', boatOrientation)
  










  





   

}
window.addEventListener('DOMContentLoaded', init)

//&& (((randNum - 10) / width >= 1) || (randNum) === 10)
//([sqr.dataset.index - 10].dataset.selected === 'false') && (((randNum - 10) / width >= 1) || (randNum) === 10)
//&& (compCells[sqrSub10].dataset.selected === 'false') && (compCells[sqrSub10].dataset.index >= 0)
//(sqr.dataset.selected !== 'true') && sqrSub10 >= 0 && (compCells[sqrSub10].dataset.selected === 'false')