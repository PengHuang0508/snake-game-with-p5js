function Food() {
  this.foodLocation;

  this.pickFoodLocation = function () {
    let newFoodLocation = createVector(
      floor(random(canvasGrid.cols)),
      floor(random(canvasGrid.rows))
    );
    this.foodLocation = newFoodLocation;
    this.foodLocation.mult(pixelSize);
  };

  this.validateFoodLocation = function () {
    for (i = 0; i < snake.snakeBody.length; i++) {
      distanceFromSnake = dist(
        this.foodLocation.x,
        this.foodLocation.y,
        snake.snakeBody[i].x,
        snake.snakeBody[i].y
      );

      if (distanceFromSnake < 1) return false;
    }

    return true;
  };

  this.spawnFood = function () {
    this.pickFoodLocation();

    while (!this.validateFoodLocation()) {
      this.pickFoodLocation();
    }
  };

  this.show = function () {
    fill(235, 65, 50);
    rect(this.foodLocation.x, this.foodLocation.y, pixelSize, pixelSize);
  };
}
