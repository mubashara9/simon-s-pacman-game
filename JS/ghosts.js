class Ghost {
  constructor(sx, sy, x, y) {
    this.virtualpos = createVector(14, 24);
    this.r = cellWidth / 3;
    this.pos = createVector(x, y);
    this.dir = createVector(0, 0);

    this.flag = 0;
    this.form = 0;
    this.currentCell = createVector(
      Math.floor(this.pos.x / cellWidth),
      Math.floor(this.pos.y / cellHeight)
    );
    this.imgIndex = createVector(4, 3);
    this.command = [];
  }
  changeForm() {
    this.flag = 0;
    this.form = (this.form + 1) % 4;
  }

  randomDir() {
    let temp = int(random(4));
    if (temp === 0) {
      this.addInstruction(-1, 0);
    } else if (temp === 1) {
      this.addInstruction(1, 0);
    } else if (temp === 2) {
      this.addInstruction(0, 1);
    } else if (temp === 3) {
      this.addInstruction(0, -1);
    }
  }

  chooseDir() {
    if (this.pos.x === pacman.pos.x) {
      if (
        pacman.pos.y > this.pos.y &&
        !wall.wall[this.currentCell.y + 1][this.currentCell.x].wall
      ) {
        this.setdir(0, 1);
      } else if (
        pacman.pos.y < this.pos.y &&
        !wall.wall[this.currentCell.y - 1][this.currentCell.x].wall
      ) {
        this.setdir(0, -1);
      } else {
        this.randomDir();
      }
    } else if (this.pos.y === pacman.pos.y) {
      if (
        pacman.pos.x > this.pos.x &&
        !wall.wall[this.currentCell.y][this.currentCell.x + 1].wall
      ) {
        this.setdir(1, 0);
      } else if (
        pacman.pos.x < this.pos.x &&
        !wall.wall[this.currentCell.y][this.currentCell.x - 1].wall
      ) {
        this.setdir(-1, 0);
      } else {
        this.randomDir();
      }
    } else {
      this.randomDir();
    }
  }
  move() {
    this.chooseDir();
    if (this.pos.x + this.r >= canvasWidth && this.dir.x === 1) {
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
      var nextCommand;

      if (!this.wall()) {
        this.pos.x += this.dir.x;
        this.pos.y += this.dir.y;
      } else {
        if (this.command.length != 0) {
          nextCommand = this.command.pop();
        } else {
          nextCommand = createVector(0, 0);
        }
        this.setdir(nextCommand.x, nextCommand.y);
        this.pos.x = this.currentCell.x * cellWidth + cellWidth / 2;
        this.pos.y = this.currentCell.y * cellHeight + cellHeight / 2;
      }
    }
  }
  setPos(x, y) {
    this.pos.x = x;
    this.pos.y = y;
    this.currentCell.x = Math.floor(this.pos.x / cellWidth);
    this.currentCell.y = Math.floor(this.pos.y / cellHeight);
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
    this.command.push(xdir, ydir);
  }

  clearCommands() {
    if (this.commands.length != 0) {
      for (var i = this.command.length; i > 0; i--) {
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

  show() {
    this.currentCell.x = Math.floor(this.pos.x / cellWidth);
    this.currentCell.y = Math.floor(this.pos.y / cellHeight);
    this.flag++;
    if (this.flag === 10) {
      this.changeForm();
    }
    let xIndex = this.imgIndex.x + this.form;
    image(pinkIMG, this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}
