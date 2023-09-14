const grid = document.querySelector(".grids");
const scoreDisplay = document.querySelector("#score")
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const userStart = [230, 10];
let userCurrentPosition = userStart;
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;
let timerId;
const ballDiameter = 20;
let xDirection = -2;
let yDirection = 2;
let score = 0 
// create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// all my blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.className = "Blocks h-5 w-[100px] bg-blue-900 absolute";
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlocks();

// add user
const user = document.createElement("div");
user.className = " user absolute w-[100px] h-5 bg-green-600";
drawUser();
grid.appendChild(user);

//  draw user
function drawUser() {
  user.style.left = userCurrentPosition[0] + "px";
  user.style.bottom = userCurrentPosition[1] + "px";
}

// move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (userCurrentPosition[0] > 0) {
        userCurrentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (userCurrentPosition[0] < boardWidth - blockWidth) {
        userCurrentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

// drew ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}
// add ball
const ball = document.createElement("div");
ball.className = " ball h-5 w-5 bg-red-900 border-[1px] border-solid border-black rounded-full absolute ";
drawBall();
grid.appendChild(ball);

// move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

//  check for collision
function checkForCollisions() {

    // check for block collison 
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1] )
        ) {
           const allBlocks =  Array.from(document.querySelectorAll(".Blocks"))
           allBlocks[i].classList.remove('h-5')
           allBlocks[i].classList.remove('w-[100px]')
           allBlocks[i].classList.remove('bg-blue-900')
           allBlocks[i].classList.remove('absolute')
           allBlocks[i].classList.remove('Blocks')
           blocks.splice(i,1)
      changeDirection()
      score++
      scoreDisplay.innerHTML = score
      if (blocks.length === 0) {
       scoreDisplay.innerHTML = "You Won"
       clearInterval(timerId)
       document.removeEventListener('keydown',moveUser) 
      }
        }

    }

    // check for user Collision 
    if(
        (ballCurrentPosition[0] > userCurrentPosition[0] && ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth) && (ballCurrentPosition[1] > userCurrentPosition[1]  && ballCurrentPosition[1] < userCurrentPosition[1] + blockHeight)
      ){
        changeDirection()
      }
  // check for wall collision
  if (
    ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
    ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

//   check collision for game over 
if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You Lose'
    document.removeEventListener('keydown',moveUser)
}


}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {

    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return 
  }
}
