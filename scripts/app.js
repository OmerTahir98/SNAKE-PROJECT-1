/* eslint-disable no-unused-vars */
//Snake Game


// Select DOM
const snakeCanvas = document.querySelector('#canvas')
const endGame = document.querySelector('#gameover')
const image = document.querySelector('#snake')
const imageFlip = document.querySelector('#snake1')
const score = document.querySelector('#score')
const myhighscore = document.querySelector('#highscore')


//Create Canvas for Snake Game
const snakeCanvasStyle = snakeCanvas.getContext('2d')

snakeCanvas.width = 400
snakeCanvas.height = 400

//Define Variables

//Grid Variables
const tileCount = 20
const tileSize = snakeCanvas.width / tileCount - 2

//Player Score Variable
let playerScore = 0

//Snake Variables
let snakeCoordinateX = 10 
let snakeCoordinateY = 10 
let moveX = 0// How many spaces snake will move at starting position 10x. Set to 0 so snake will not move until button is pressed
let moveY = 0
const snakeTrail = []
let trailLength = 0
class SnakeBody {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

//Apple Variables
let appleCoordinateX = Math.floor(Math.random() * (19 - 1 + 1) + 1) 
let appleCoordinateY = Math.floor(Math.random() * (19 - 1 + 1) + 1) 
const moveAppleX = 0
const moveAppleY = 0

//Gameover Variables
const gameoverCoordinateX = 4
const gameoverCoordinateY = 11
const gameoverText = 'GAMEOVER'

//Restart Variables
const restartCoordinateX = 5
const restartCoordinateY = 12
const restartGame = 'PRESS ENTER TO PLAY AGAIN'

//Highscore Variable
const highScore = localStorage.getItem('highScore')
if (highScore == null) {
  myhighscore.innerText = 'HIGHSCORE: ' + 0
} else {
  myhighscore.innerText = 'HIGHSCORE: ' + highScore
}

//SnakeAnimation Variables
//Snake One
const snakeOneCoordX = 4
const snakeOneCoordY = 0
let moveSnakeOneX = 0
let moveSnakeOneY = 7

//Snake Two
const snakeTwoCoordX = -4
const snakeTwoCoordY = 0
let moveSnakeTwoX = 20
let moveSnakeTwoY = 12

//Create Snake using Canvas

const moveSnake = setInterval(function () {

  snakeCanvasStyle.clearRect(0, 0, 400, 400) 
  snakeCoordinateX += moveX
  snakeCoordinateY += moveY

  // Make Snake
  snakeCanvasStyle.strokeStyle = 'white' //Snake Head
  snakeCanvasStyle.strokeRect(snakeCoordinateX * tileCount, snakeCoordinateY * tileCount, tileSize, tileSize)

  snakeCanvasStyle.fillStyle = 'black'
  snakeCanvasStyle.fillRect(snakeCoordinateX * tileCount, snakeCoordinateY * tileCount, tileSize, tileSize)

  //Create Snake Body and Make snake grow when it hits apple
  for (let i = 0; i < snakeTrail.length; i++) {
    const snakeBody = snakeTrail[i]

    snakeCanvasStyle.strokeStyle = '#white' //Snake Body
    snakeCanvasStyle.strokeRect(snakeBody.x * tileCount, snakeBody.y * tileCount, tileSize, tileSize)

    snakeCanvasStyle.fillStyle = '#c99290'
    snakeCanvasStyle.fillRect(snakeBody.x * tileCount, snakeBody.y * tileCount, tileSize, tileSize)

    //Snake Body Hit - When snake's body hits itself - Gameover
    if (snakeBody.x === snakeCoordinateX && snakeBody.y === snakeCoordinateY) {
      clearInterval(moveSnake)

      snakeCanvasStyle.font = '40px Arial'
      snakeCanvasStyle.fillStyle = 'black'
      snakeCanvasStyle.fillText(gameoverText, gameoverCoordinateX * tileCount, gameoverCoordinateY * tileCount)

      snakeCanvasStyle.font = '13px Arial'
      snakeCanvasStyle.fillStyle = 'black'
      snakeCanvasStyle.fillText(restartGame, restartCoordinateX * tileCount, restartCoordinateY * tileCount)

      const audio = new Audio('scripts/video_game.wav')
      audio.play()
      
    }

  }

  //Creates body for snake and adds to the snake head
  snakeTrail.push(new SnakeBody(snakeCoordinateX, snakeCoordinateY))
  if (snakeTrail.length > trailLength) {
    snakeTrail.shift()
  }



  // Border Hit - When you hit the border - Gameover
  if (snakeCoordinateX === 20 || snakeCoordinateX === -1 || snakeCoordinateY === 20 || snakeCoordinateY === -1) {

    clearInterval(moveSnake)

    snakeCanvasStyle.font = '40px Arial'
    snakeCanvasStyle.fillStyle = 'black'
    snakeCanvasStyle.fillText(gameoverText, gameoverCoordinateX * tileCount, gameoverCoordinateY * tileCount)

    snakeCanvasStyle.font = '13px Arial'
    snakeCanvasStyle.fillStyle = 'black'
    snakeCanvasStyle.fillText(restartGame, restartCoordinateX * tileCount, restartCoordinateY * tileCount)

    const audio = new Audio('scripts/enough.wav')
    audio.play()
  }

}, 160)//milliseconds, how fast snake will move


//Keydown Events (Up, Down, Left, Right)
document.addEventListener('keydown', function (event) {

  const keyDirection = event.key
  if (keyDirection === 'ArrowDown') {
    if (moveY === -1) //Does not allow snake to move back into the direction it was in previously
      return
    moveX = 0
    moveY = 1
  }
  if (keyDirection === 'ArrowUp') {
    if (moveY === 1)
      return
    moveX = 0
    moveY = -1
  }
  if (keyDirection === 'ArrowRight') {
    if (moveX === -1)
      return
    moveX = 1
    moveY = 0
  }
  if (keyDirection === 'ArrowLeft') {
    if (moveX === 1)
      return
    moveX = -1
    moveY = 0
  }
  if (keyDirection === 'Enter') {
    location.reload()
  }
  event.preventDefault() //stops page from scrolling when using direction keys for snake
})


//Create Apple
function moveApple() {

  snakeCanvasStyle.fillStyle = 'white'
  snakeCanvasStyle.fillRect(appleCoordinateX * tileCount, appleCoordinateY * tileCount, tileSize, tileSize)

  snakeCanvasStyle.strokeStyle = 'black'
  snakeCanvasStyle.strokeRect(appleCoordinateX * tileCount, appleCoordinateY * tileCount, tileSize, tileSize)

  appleCoordinateX += moveAppleX
  appleCoordinateY += moveAppleY


  //Make Apple Disappear and Randomize when snake hits
  if (appleCoordinateX === snakeCoordinateX && appleCoordinateY === snakeCoordinateY) {

    appleCoordinateX = Math.floor(Math.random() * (19 - 1 + 1) + 1)
    appleCoordinateY = Math.floor(Math.random() * (19 - 1 + 1) + 1)

    //Grow snake when it hits apple
    trailLength += 3

    //Add Score when snake hits apple
    score.innerText = 'SCORE: ' + ++playerScore

    //Highscore - Local Storage

    if (playerScore > highScore) {
      localStorage.setItem('highScore', playerScore)
      myhighscore.innerText = 'HIGHSCORE: ' + playerScore
    }
  }
}
setInterval(moveApple, 0)

//Snake Animation
function moveSnakes() {

  snakeCanvasStyle.drawImage(image, moveSnakeOneX * tileCount, moveSnakeOneY * tileCount)

  moveSnakeOneX += snakeOneCoordX
  moveSnakeOneY += snakeOneCoordY

  snakeCanvasStyle.drawImage(imageFlip, moveSnakeTwoX * tileCount, moveSnakeTwoY * tileCount)

  moveSnakeTwoX += snakeTwoCoordX
  moveSnakeTwoY += snakeTwoCoordY

}
setInterval(moveSnakes, 150)