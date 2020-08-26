var pixelSize = 20;
var canvasWidth = 600,
  canvasHeight = 600;
var canvasGrid = { cols: 0, rows: 0 };
var fps = 7;
var snake;
var food;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  canvasGrid.cols = floor(canvasWidth / pixelSize);
  canvasGrid.rows = floor(canvasHeight / pixelSize);

  frameRate(fps);
  snake = new Snake();
  food = new Food();
  food.spawnFood();
}

function draw() {
  background(25, 25, 25);

  snake.show();
  food.show();
  snake.update();
}

function keyPressed() {
  let newDirection;

  switch (keyCode) {
    case UP_ARROW:
      newDirection = createVector(0, -1);
      break;
    case DOWN_ARROW:
      newDirection = createVector(0, 1);
      break;
    case LEFT_ARROW:
      newDirection = createVector(-1, 0);
      break;
    case RIGHT_ARROW:
      newDirection = createVector(1, 0);
      break;
    default:
      return;
  }

  snake.changeDirection(newDirection);
}
