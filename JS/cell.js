class Cell {
  constructor(wall, food, x, y) {
    this.wall = wall;
    this.food = food;
    this.pos = createVector(x, y);
    if (food) {
      this.r = cellWidth / 3;
    } else {
      this.r = cellWidth / 4;
    }
  }

  show() {
    if (this.food) {
      fill("white");
      ellipseMode(CENTER);
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
      // this.food = createSprite(this.pos.x, this.pos.y, this.r, this.r)
      // this.food.addImage(dotIMG)
      // cell2Group.add(this.food)
      // this.food.scale = 2.5
    } else if (this.wall) {
      fill("blue");
      noStroke();
      // rectMode(CENTER);
      rect(this.pos.x, this.pos.y, cellWidth, cellHeight);
      // cell1Group.add(createSprite(this.pos.x, this.pos.y, 30, 20))
    }
  }
}
