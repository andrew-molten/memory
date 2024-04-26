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
}

function generateTilesDOM(tileNum) {
  const individualTileMarkup = `<div class="tile"></div>`
  let containerMarkup = '<span class="confetti hidden"> </span>'
  for (let i = 0; i < tileNum; i++) {
    containerMarkup += individualTileMarkup
  }
  container.innerHTML = containerMarkup
}

const tilesDOM = document.getElementsByClassName('tile')
let playingImages = []
// let tileNum = 18

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
  if (lastClick.clickNum === 2) {
    if (lastClick.completedPair === true) {
      removeCompletedPair()
    } else hideAll()
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
  // chooseConfetti()
}

//////////////////////////////////////////////
///////////////  CONFETTI  ///////////////////
//////////////////////////////////////////////
// const scalar = 2.5
// const rainbow = confetti.shapeFromText({ text: '🌈', scalar })
// const heart = confetti.shapeFromText({ text: '❤️', scalar })
// const unicorn = confetti.shapeFromText({ text: '🦄', scalar })

// const confettiOptions = {
//   particleCount: 1000,
//   spread: 100,
//   origin: {
//     y: 0.7,
//   },
//   gravity: 0.7,
//   ticks: 200,
// }
// const confettiOptionsEmoji = {
//   particleCount: 400,
//   spread: 90,
//   origin: {
//     y: 0.7,
//   },
//   gravity: 1,
//   scalar: scalar,
//   shapes: [heart, rainbow, unicorn],
//   ticks: 100,
// }

// function chooseConfetti() {
//   const randomNum = getRandomInt(1, 2)
//   randomNum === 1 ? confetti(confettiOptions) : confetti(confettiOptionsEmoji)
// }

function removeCompletedPair() {
  const tile = document.getElementById(lastClick.id)
  const src = tile.children[0].src
  for (const image of tilesDOM) {
    if (image.children.length > 0) {
      if (src === image.children[0].src) {
        image.innerHTML = ''
        image.classList.add('hidden')
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
    tile.children.length > 0 ? tile.children[0].classList.add('hidden') : ''
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
  createConfettiPieces(300)
  manipulateConfettiPieces()
  confetti()
}

// assign tiles to random positions on the screen

// check for a match & remove tile/ do a celebration

// count matches

//////////////////////////////////////////////
///////////////  TILE SIZE ///////////////////
//////////////////////////////////////////////
function calculateTiles() {
  // Finds out which length is longer

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

  // assigns tile nsize to fit viewport
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

// Confetti

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
  const maxWidthSpread = 1 * width
  const maxShapeWidth = 8
  const minShapeWidth = 2
  const shape = 0.5 // 0 =circles, .5 = mix, 1 =squares
  const maxDepth = 500
  const maxSpin = 10
  let baseHue = 1 // 1 to 360
  let hueVariation = 360 // 1 = no variation, 360 - max

  for (const piece of confettiPieces) {
    const offsetY = spread(maxHeightSpread)
    const offsetX = spread(maxWidthSpread)
    const hue = baseHue + spread(hueVariation)
    const confettiSize = getRandomInt(minShapeWidth, maxShapeWidth)
    const offsetZ = spread(maxDepth)
    const spin = getRandomInt(0, maxSpin)
    const spinY = getRandomInt(0, maxSpin)
    piece.style = `--offsetX: ${offsetX}px; --offsetY: ${offsetY}px; --hue: ${hue}; --confetti-size: ${confettiSize}px; --shape: ${
      (Math.random() - shape) * width
    }px;`
  }
}

//  --offsetZ: ${offsetZ}px; --spin: ${spin}turn; --spinY: ${spinY}turn

function spread(value) {
  return value / 2 - getRandomInt(0, value)
}

init()
