function Snake() {
  this.snakeBody = [
    createVector(80, 40),
    createVector(60, 40),
    createVector(40, 40),
    createVector(20, 40),
  ];
  this.snakeLength = 4;
  this.movement = createVector(1, 0);

  /////
  // Eat food
  /////
  this.checkEatFood = function () {
    let distanceFromFood = dist(
      this.snakeBody[0].x,
      this.snakeBody[0].y,
      food.foodLocation.x,
      food.foodLocation.y
    );

    if (distanceFromFood < 1) {
      this.snakeLength++;
      food.spawnFood();
      return true;
    } else {
      return false;
    }
  };

  /////
  // Game over - winning
  /////
  this.checkWinning = function () {
    let maximumPossibleLength = canvasGrid.rows * canvasGrid.cols;

    if (this.snakeLength == maximumPossibleLength) {
      textAlign(CENTER);
      textSize(24);
      text('YOU WIN', 300, 280);

      return true;
    }
    return false;
  };

  /////
  // Game over - losing
  ////
  this.checkLosing = function () {
    for (let i = 1; i <= this.snakeBody.length - 1; i++) {
      let distanceFromBody = dist(
        this.snakeBody[0].x,
        this.snakeBody[0].y,
        this.snakeBody[i].x,
        this.snakeBody[i].y
      );

      if (distanceFromBody < 1) return true;
    }

    return false;
  };

  this.displayGameOver = function () {
    noLoop();

    fill(255);
    textAlign(CENTER);

    textSize(32);
    text('GAME OVER', 300, 250);

    textSize(16);
    text(`Your score is: ${this.snakeLength - 4}`, 300, 320);
  };

  /////
  // Update location
  /////
  this.changeDirection = function (newDirection) {
    // Prevent from going the opposite direction/backwards
    if (
      this.movement.x !== -newDirection.x &&
      this.movement.y !== -newDirection.y
    ) {
      this.movement.x = newDirection.x;
      this.movement.y = newDirection.y;
    }
  };

  this.update = function () {
    this.snakeBody.unshift(
      createVector(this.snakeBody[0].x, this.snakeBody[0].y)
    );
    // Update snake head's location: snakeBody[0]
    this.snakeBody[0].x += this.movement.x * pixelSize;
    this.snakeBody[0].y += this.movement.y * pixelSize;
    this.snakeBody[0].x = constrain(this.snakeBody[0].x, 0, width - pixelSize);
    this.snakeBody[0].y = constrain(this.snakeBody[0].y, 0, height - pixelSize);

    this.checkLosing() || this.checkWinning() ? this.displayGameOver() : null;

    !this.checkEatFood() && this.snakeBody.pop();
  };

  this.show = function () {
    fill(120, 230, 220);
    rect(this.snakeBody[0].x, this.snakeBody[0].y, pixelSize, pixelSize);

    for (let i = 0; i < this.snakeBody.length; i++) {
      rect(this.snakeBody[i].x, this.snakeBody[i].y, pixelSize, pixelSize);
    }
  };
}
