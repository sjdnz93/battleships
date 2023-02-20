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

  
  //Boat orientation
  let horizontal = true
  

  // !VARIABLES - GLOBAL


  const width = 10
  const cellCount = width * width

  let gameActive = 0

  let boatSelection = 1

  // !PAGE LOAD TASKS

  generateGrid(grid1, playerCells)
  generateGrid(grid2, compCells)

  console.log('GAME ACTIVE -->', gameActive)
  console.log('BOAT SELECTION -->', boatSelection)

  // !FUNCTIONS

  //Generate grid
  function generateGrid(grid, cells) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')

      cell.classList.add('gameSquare')

      cell.dataset.index = i

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

  //Highlight squares
  function highlightSquares(e) {
    if (gameActive === 1 && horizontal === true) {
      checkForHighlighting()
      highlightHorizontal(e)
    } else if (gameActive === 1 && horizontal === false) {
      checkForHighlighting()
      highlightVertical(e)
    }
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
    playerCells.forEach
    boatSelection++
    highlightBoatPic()
    console.log('BOAT SELECTION -->', boatSelection)
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

  //Check squares for highlighting
  function checkForHighlighting() {
    playerCells.forEach(sqr => {
      if (sqr.classList.contains('highlightOn')) {
        sqr.classList.remove('highlightOn')
      }
    })
  }

  // !EVENT LISTENERS

  //Start button
  startButton.addEventListener('click', startGame)

  //Highlight tiles on gameboard
  playerCells.forEach(sqr => {
    sqr.addEventListener('mouseover', highlightSquares)
    sqr.addEventListener('mouseleave', highlightSquares)
    sqr.addEventListener('click', confirmBoatPosition)
  })

  document.addEventListener('keydown', boatOrientation)
  










  





   

}
window.addEventListener('DOMContentLoaded', init)
