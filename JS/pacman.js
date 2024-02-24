class Pacman {
  constructor(x, y, pos) {
    this.virtualpos = createVector(14, 24);
    this.r = cellWidth / 3;
    this.pos = createVector(x, y);
    this.dir = createVector(0, 0);
    this.death = false;
    this.deathStage = 0;
    this.flag = 0;
    this.open = 0;
    this.currentCell = createVector(
      Math.floor(this.pos.x / cellWidth),
      Math.floor(this.pos.y / cellHeight)
    );
    this.imgIndex = createVector(4, 3);
    this.commands = [];
  }
  show() {
    this.currentCell.x = Math.floor(this.pos.x / cellWidth);
    this.currentCell.y = Math.floor(this.pos.y / cellHeight);
    this.flag++;
    if (this.flag === 10) {
      this.changeMouth();
    }
    if (this.dir.x == 1) {
      this.imgIndex.x = 4 + this.open;
    } else if (this.dir.x == -1) {
      this.imgIndex.x = 0 + this.open;
    } else if (this.dir.y == 1) {
      this.imgIndex.x = 5 + this.open;
    } else if (this.dir.y == -1) {
      this.imgIndex.x = 1 + this.open;
    }
    image(Left, this.pos.x - 3, this.pos.y - 7, this.r * 2, this.r * 2);
  }

  move() {
    if (this.pos.x + this.r >= canvasWidth && this.dir.x == 1) {
      this.pos.x += this.dir.x;
      if (this.pos.x - this.r >= canvasWidth) {
        this.pos.x = this.r;
      }
    } else if (this.pos.x - this.r <= 0 && this.dir.x === -1) {
      this.pos.x += this.dir.x;
      if (this.pos.x + this.r <= 0) {
        this.pos.x = canvasWidth - this.r;
      }
    } else {
      let nextCommand;
      //  this.setdir(nextCommand.x, nextCommand.y);
      if (this.commands.length != 0) {
        nextCommand = this.commands.pop();
        if (
          !wall.wall[this.currentCell.y + nextCommand.y][
            this.currentCell.x + nextCommand.x
          ].wall
        )
          this.setdir(nextCommand.x, nextCommand.y);
        else this.commands.unshift(nextCommand);
      }
      if (!this.wall()) {
        this.pos.x += this.dir.x;
        this.pos.y += this.dir.y;
      } else {
        if (this.commands.length != 0) {
          nextCommand = this.commands.pop();
        } else {
          nextCommand = createVector(0, 0);
        }
        this.setdir(nextCommand.x, nextCommand.y);
        this.pos.x = this.currentCell.x * cellWidth + cellWidth / 2;
        this.pos.y = this.currentCell.y * cellHeight + cellHeight / 2;
      }
    }
  }

  wall() {
    if (this.dir.x == 1) {
      this.virtualpos.x = Math.floor((this.pos.x + this.r) / cellWidth);
      this.virtualpos.y = Math.floor((this.pos.y - this.r) / cellHeight);
      this.pos.y = this.currentCell.y * cellHeight + cellHeight / 2;
    } else if (this.dir.x == -1) {
      this.virtualpos.x = Math.floor((this.pos.x - this.r) / cellWidth);
      this.virtualpos.y = Math.floor((this.pos.y - this.r) / cellHeight);
      this.pos.y = this.currentCell.y * cellHeight + cellHeight / 2;
    } else if (this.dir.y == 1) {
      this.virtualpos.x = Math.floor((this.pos.x - this.r) / cellWidth);
      this.virtualpos.y = Math.floor((this.pos.y + this.r) / cellHeight);
      this.pos.x = this.currentCell.x * cellWidth + cellWidth / 2;
    } else if (this.dir.y == -1) {
      this.virtualpos.x = Math.floor((this.pos.x - this.r) / cellWidth);
      this.virtualpos.y = Math.floor((this.pos.y - this.r) / cellHeight);
      this.pos.x = this.currentCell.x * cellWidth + cellWidth / 2;
    }
    if (wall.wall[this.virtualpos.y][this.virtualpos.x].wall) {
      return true;
    }
    return false;
  }
  addInstruction(xdir, ydir) {
    this.commands.push(createVector(xdir, ydir));   //change

    if (!wall.wall[this.currentCell.y + ydir][this.currentCell.x + xdir].wall) {
      this.clearCommands();
      this.setdir(xdir, ydir);
    }
  }

  clearCommands() {
    if (this.commands.length != 0) {
      for (var i = this.commands.length; i > 0; i--) {
        this.commands.pop();
      }
    }
  }

  setdir(xdir, ydir) {
    this.dir.x = xdir;
    this.dir.y = ydir;
    if (xdir == 0 && ydir == 0) {
      this.clearCommands();
    }
  }
  hits(object) {
    var dx = this.pos.x - object.pos.x;
    var dy = this.pos.y - object.pos.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.r + object.r) {
      return true;
    } else {
      return false;
    }
  }
  die() {
    this.flag++;
    if (this.flag === 10) {
      this.flag = 0;

      this.deathStage++;
    } else {
      this.imgIndex.y = 7;
      this.imgIndex.x = 4;
      if (this.deathStage === 5) {
        noLoop();
        textAlign(CENTER);
        textSize(60);
        textStyle(BOLD);
        text("You Lost", canvasWidth / 2, canvasHeight / 2);
      }
    }
  }
  changeMouth() {
    this.flag = 0;
    if (this.open === 0) {
      this.open = 2;
    } else {
      this.open = 0;
    }
  }
}
