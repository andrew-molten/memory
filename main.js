import confetti from 'https://cdn.skypack.dev/canvas-confetti'

const container = document.getElementById('container')
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
  let totalTileMarkup = ''
  for (let i = 0; i < tileNum; i++) {
    totalTileMarkup += individualTileMarkup
  }
  container.innerHTML = totalTileMarkup
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
  chooseConfetti()
}
const scalar = 2.5
const rainbow = confetti.shapeFromText({ text: '🌈', scalar })
const heart = confetti.shapeFromText({ text: '❤️', scalar })
const unicorn = confetti.shapeFromText({ text: '🦄', scalar })

const confettiOptions = {
  particleCount: 1000,
  spread: 100,
  origin: {
    y: 0.7,
  },
  gravity: 0.7,
  ticks: 200,
}
const confettiOptionsEmoji = {
  particleCount: 400,
  spread: 90,
  origin: {
    y: 0.7,
  },
  gravity: 1,
  scalar: scalar,
  shapes: [heart, rainbow, unicorn],
  ticks: 100,
}

function chooseConfetti() {
  const randomNum = getRandomInt(1, 2)
  randomNum === 1 ? confetti(confettiOptions) : confetti(confettiOptionsEmoji)
}

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
  giveIDsToDom()
  chooseImages(images, preferences.tileNum)
  assignTiles(preferences.tileNum)
  assignTileListeners()
}
init()
// assign tiles to random positions on the screen

// check for a match & remove tile/ do a celebration

// count matches

// check whether the image is bigger horizontally or vertically to decied which size to select by
function calculateTiles() {
  const height = window.innerHeight
  const width = window.innerWidth
  const widthFit = (width - 20) / 120
  const heightFit = height / 120
  const maxTiles = maxTileNum(widthFit, heightFit)
  const tileWidth = width / 3 - 20
  // console.log(widthFit)
  // console.log(heightFit)
  // console.log(tileWidth)
  // console.log(maxTiles)
  adjustTileSize(tileWidth)
}
calculateTiles()

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
