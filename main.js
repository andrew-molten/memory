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

const tilesDOM = document.getElementsByClassName('tile')
let playingImages = []
let tileNum = 18

function giveIDsToDom() {
  for (let i = 0; i < tilesDOM.length; i++) {
    tilesDOM[i].id = i
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
    tilesDOM[0].innerHTML = markup
  }
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
  giveIDsToDom()
  chooseImages(images, tileNum)
  assignTiles(tileNum)
}
init()
// assign tiles to random positions on the screen

// check for a match & remove tile/ do a celebration

// count matches
