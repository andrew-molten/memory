// import confetti from 'https://cdn.skypack.dev/canvas-confetti'
const container = document.getElementById('container')

//////////////////////////////////////////////
/////////////////// TILES ////////////////////
//////////////////////////////////////////////
// add a list of possible tiles
const images = [
  { location: 'images/memory/alberto.jpg' },
  { location: 'images/memory/anna-ute.jpg' },
  { location: 'images/memory/anna.jpg' },
  { location: 'images/memory/bingo.jpg' },
  { location: 'images/memory/bluey.jpg' },
  { location: 'images/memory/gran-mala.jpg' },
  { location: 'images/memory/gran.jpg' },
  { location: 'images/memory/luca.jpg' },
  { location: 'images/memory/mala-andrew-crumpets.jpg' },
  { location: 'images/memory/mala-emmie.jpg' },
  { location: 'images/memory/mala-emmy.jpg' },
  { location: 'images/memory/mala-imogen.jpg' },
  { location: 'images/memory/mala-kiba.jpg' },
  { location: 'images/memory/mala-kiba2.jpg' },
  { location: 'images/memory/mala-pony.jpg' },
  { location: 'images/memory/mala-thomas-climbing.jpg' },
  { location: 'images/memory/mala-thomas.jpg' },
  { location: 'images/memory/mama-papa.jpg' },
  { location: 'images/memory/moana.jpg' },
  { location: 'images/memory/monkey-tongue.jpg' },
  { location: '/images/memory/oma-eis.jpg' },
  { location: 'images/memory/oma-tilo.jpg' },
  { location: 'images/memory/omi-mala.jpg' },
  { location: 'images/memory/opa-dressup.jpg' },
  { location: 'images/memory/sheep.jpg' },
  { location: 'images/memory/tilo.jpg' },
  { location: 'images/memory/triceratops.png' },
]

let preferences = {
  tileNum: 14,
  confettiPieces: 300,
}

let pairMatches = 0
// let tilesDOM
let playingImages = []
let scoreCountingTile
let lastScoreCountingTile

function generateTilesDOM(tileNum) {
  const individualTileMarkup = `<div class="tile"></div>`
  let containerMarkup = '<span class="confetti hidden"> </span>'
  for (let i = 0; i < tileNum; i++) {
    containerMarkup += individualTileMarkup
  }
  container.innerHTML = containerMarkup
}

const tilesDOM = document.getElementsByClassName('tile')

function giveIDsToDom() {
  for (let i = 0; i < tilesDOM.length; i++) {
    tilesDOM[i].id = i
  }
}

function assignTileListeners() {
  for (const tile of tilesDOM) {
    tile.addEventListener('click', handleClick)
  }
}
let lastClick = { src: '', id: '', clickNum: 2, completedPair: false }

function handleClick(e) {
  const id = e.target.closest('.tile').id
  const src = e.target.children[0].src
  const tile = document.getElementById(id)
  if (tile.classList.contains('counter')) return
  if (lastClick.clickNum === 2) {
    // checks if click starts new pair
    hideAll()
    assignLastClick(src, id)
    lastClick.clickNum = 1
    tile.children[0].classList.remove('hidden')
  } else if (lastClick.src === src && lastClick.id !== id) {
    completedPair(tile)
  } else {
    assignLastClick(src, id)
    tile.children[0].classList.remove('hidden')
    lastClick.clickNum++
  }
}

function completedPair(tile) {
  tile.children[0].classList.remove('hidden')
  lastClick.clickNum++
  lastClick.completedPair = true
  confetti()
  removeCompletedPair()
  countMatches(tile)
}

function removeCompletedPair() {
  const tile = document.getElementById(lastClick.id)
  const src = tile.children[0].src
  for (const image of tilesDOM) {
    if (image.children.length > 0) {
      if (src === image.children[0].src) {
        image.classList.add('fadeout') // fade out
        setTimeout(() => {
          image.innerHTML = ''
          image.classList.add('hidden')
        }, 1500)
      }
    }
  }
  lastClick.src = ''
  lastClick.id = ''
  lastClick.completedPair = false
}

function assignLastClick(src, id) {
  lastClick.src = src
  lastClick.id = id
}

function hideAll() {
  for (const tile of tilesDOM) {
    if (tile.children.length > 0 && !tile.classList.contains('counter'))
      tile.children[0].classList.add('hidden')
  }
}

// choose tiles *2
function chooseImages(imageSet, tileNum) {
  const imageNum = tileNum / 2
  for (let i = 0; i < imageNum; i++) {
    chooseImage(imageSet, tileNum)
  }
}

function chooseImage(imageSet, imageNum) {
  const index = getRandomInt(0, imageNum)
  const image = imageSet[index]
  // check image isn't doubled
  if (!playingImages.includes(image)) {
    playingImages.push(image)
    return image
  } else return chooseImage(imageSet, imageNum)
}

function assignTiles(tileNum) {
  for (const image of playingImages) {
    const markup = createTileMarkup(image.location)
    const indexOne = getRandomTile()
    tilesDOM[indexOne].innerHTML = markup
    const indexTwo = getRandomTile()
    tilesDOM[indexTwo].innerHTML = markup
  }
}

function getRandomTile() {
  const index = getRandomInt(0, preferences.tileNum - 1)
  if (tilesDOM[index].innerHTML === '') {
    return index
  } else return getRandomTile()
}

function createTileMarkup(image) {
  return `<img src="${image}" class="hidden" />`
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // max & min inclusive
}

function init() {
  generateTilesDOM(preferences.tileNum)
  calculateTiles()
  giveIDsToDom()
  chooseImages(images, preferences.tileNum)
  assignTiles(preferences.tileNum)
  assignTileListeners()
  confettiInit()
}

function confettiInit() {
  createConfettiPieces(preferences.confettiPieces)
  manipulateConfettiPieces()
}

function endGame() {
  const congratsMessage = `<span class="confetti hidden"> </span><h1>Well done! You got all ${pairMatches} pairs!</h1> <p><button class="reset-btn" id="reset-btn">Reset</button></p>`
  confettiInit()
  container.classList.add('block')
  container.innerHTML = congratsMessage
  confetti()
  setTimeout(confetti, 1100)
  setTimeout(confetti, 3000)
  const resetBtn = document.getElementById('reset-btn')
  resetBtn.addEventListener('click', resetGame)
}

function resetGame() {
  container.innerHTML = ''
  container.classList.remove('block')
  playingImages = []
  pairMatches = 0
  init()
}

function countMatches(tile) {
  if (++pairMatches === preferences.tileNum / 2) {
    setTimeout(endGame, 2000)
  } else {
    displayScoreCounter(tile)
  }
}

function displayScoreCounter(tile) {
  lastScoreCountingTile = scoreCountingTile
  if (scoreCountingTile) {
    lastScoreCountingTile.classList.remove('fadein')
    lastScoreCountingTile.classList.add('fadeout')
    setTimeout(() => {
      lastScoreCountingTile.classList.add('hidden')
    }, 1500)
  }

  setTimeout(() => {
    scoreCountingTile = document.getElementById(tile.id)
    scoreCountingTile.classList.remove('hidden')
    scoreCountingTile.classList.remove('fadeout')
    scoreCountingTile.classList.add('fadein')
    scoreCountingTile.classList.add('counter')
    scoreCountingTile.innerHTML = `<h2>${pairMatches}</h2>`
  }, 1600)
}

//////////////////////////////////////////////
///////////////  TILE SIZE ///////////////////
//////////////////////////////////////////////
function calculateTiles() {
  // Which length is longer
  const height = document.body.clientHeight
  const width = document.body.clientWidth
  let shortWay
  let longWay
  height > width ? (shortWay = width) : (shortWay = height)
  height < width ? (longWay = width) : (longWay = height)

  // calculate length to fit
  const tileShort = shortWay / 3 - 20
  const tileLong = longWay / 5 - 30 // number of lines in each direction 5 & 3
  const squareScreenTile = longWay / 4 - 25

  // give tiles size to fit vp
  if (shortWay > 0.85 * longWay) {
    adjustTileSize(squareScreenTile) // square screen
  } else {
    tileShort < tileLong ? adjustTileSize(tileShort) : adjustTileSize(tileLong)
  }
}

// if 348 /417 - these kind of dimensions then we would want 4 lines

function maxTileNum(widthFit, heightFit) {
  const max = Math.floor(widthFit) * Math.floor(heightFit)
  if (max % 6 === 0) {
    return max
  } else {
    const remainder = max % 6
    return max - remainder
  }
}

function adjustTileSize(tileWidth) {
  for (const tile of tilesDOM) {
    tile.style.maxWidth = `${tileWidth}px`
    tile.style.maxHeight = `${tileWidth}px`
    tile.style.height = `${tileWidth}px`
    tile.style.width = `${tileWidth}px`
  }
}

//////////////////////////////////////////////
///////////////  CONFETTI  ///////////////////
//////////////////////////////////////////////

function confetti() {
  const confettiContainer = document.querySelector('.confetti')

  confettiContainer.classList.add('explosion')
  confettiContainer.classList.remove('hidden')

  confettiContainer.addEventListener(
    'animationend',
    () => {
      confettiContainer.classList.remove('explosion')
      confettiContainer.classList.add('hidden')
    },
    { once: true }
  )
}

function createConfettiPieces(numPieces) {
  const confettiContainer = document.querySelector('.confetti')
  for (let i = 0; i < numPieces; i++) {
    confettiContainer.innerHTML += `<span></span>`
  }
}

function manipulateConfettiPieces() {
  const confettiContainer = document.querySelector('.confetti')
  const confettiPieces = confettiContainer.children
  const height = document.body.clientHeight
  const width = document.body.clientWidth
  const maxHeightSpread = 0.4 * height
  const maxHeightMiddle = 0.3 * height
  const maxWidthSpread = 1 * width
  const maxShapeWidth = 8
  const minShapeWidth = 2
  const shape = 0.5 // 0 =circles, .5 = mix, 1 =squares
  const maxDepth = 500
  const maxSpin = 10
  let baseHue = 1 // 1 to 360
  let hueVariation = 360 // 1 = no variation, 360 - max

  for (const piece of confettiPieces) {
    const offsetX = spread(0, maxWidthSpread)
    const offsetY = spreadWide(offsetX, width, maxHeightSpread, maxHeightMiddle)
    const hue = baseHue + spread(0, hueVariation)
    const confettiSize = getRandomInt(minShapeWidth, maxShapeWidth)
    const offsetZ = spread(0, maxDepth)
    const spin = getRandomInt(0, maxSpin)
    const spinY = getRandomInt(0, maxSpin)
    piece.style = `--offsetX: ${offsetX}px; --offsetY: ${offsetY}px; --hue: ${hue}; --confetti-size: ${confettiSize}px; --shape: ${
      (Math.random() - shape) * width
    }px; --offsetZ: ${offsetZ}px; --spin: ${spin}turn; --spinY: ${spinY}turn;`
  }
}

function spread(middle, value) {
  return value / 2 - getRandomInt(middle, value)
}

function spreadWide(offsetX, width, maxHeightSpread, maxHeightMiddle) {
  if (offsetX < -0.9 * (width / 2) || offsetX > 0.9 * (width / 2)) {
    return spread(0, maxHeightSpread)
  } else if (offsetX < -0.8 * (width / 2) || offsetX > 0.8 * (width / 2)) {
    return spread(0, maxHeightSpread) - 0.1 * maxHeightSpread
  } else if (offsetX < -0.7 * (width / 2) || offsetX > 0.7 * (width / 2)) {
    return spread(0, maxHeightSpread)
  } else if (offsetX < -0.5 * (width / 2) || offsetX > 0.5 * (width / 2)) {
    return spread(0, maxHeightSpread) - 0.2 * maxHeightSpread
  } else return spread(0, maxHeightMiddle) - 0.3 * maxHeightSpread
}

init()
