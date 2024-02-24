var pink,
  pinkIMG,
  blue,
  blueIMG,
  orange,
  orangeIMG,
  red,
  redIMG,
  light,
  lightIMG;
var Up, Down, Left, Right;
var appleIMG, dotIMG, strawberryIMG;
var apple, dot, strawberry;
var bg;
var wall;
var pacman, pacIMG;
var cell1Group;
var cell2Group;
const canvasHeight = 620;
const canvasWidth = 560;
var cellWidth = canvasWidth / 28;
var cellHeight = canvasHeight / 31;
var spawn, count;
var ghosts = [];

function preload() {
  //loading all the Pacman Images (left, right, up, down)
  Up = loadImage("images/pacman-up/1.png");
  Down = loadImage("images/pacman-down/1.png");
  Right = loadImage("images/pacman-right/1.png");
  Left = loadImage("images/pacman-left/1.png");
  //loading all the Fruits
  appleIMG = loadImage("images/other/apple.png");
  dotIMG = loadImage("images/other/dot.png");
  strawberryIMG = loadImage("images/other/strawberry.png");
  //loading the ghosts
  pinkIMG = loadImage("images/ghosts/pinky.png");
  blueIMG = loadImage("images/ghosts/blue_ghost.png");
  orangeIMG = loadImage("images/ghosts/clyde.png");
  lightIMG = loadImage("images/ghosts/inky.png");
  redIMG = loadImage("images/ghosts/blinky.png");
  //loading the other ones
  bg = loadImage("images/PacmanBG.png");
  wall = loadImage("images/BlueLine.png");
  pacIMG = loadImage("images/pacman-right/1.png");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight + 30);

  // strawberry = createSprite()
  // apple = createSprite()

  pacman = new Pacman(14 * cellWidth, 23 * cellHeight);

  // orange = createSprite()
  // pink = createSprite()
  // red = createSprite()
  // light = createSprite()
  /*w1 = createSprite(517, 1, 1600, 30)
    w1.shapeColor = "blue"
    w2 = createSprite(1160, 130, 30, 290)
    w2.addImage(wall)
    w2.shapeColor = "blue"
    w3 = createSprite(0.5, 130, 30, 290)
    w3.shapeColor = "blue"
    w4 = createSprite(590, 830, 1600, 30)
    w4.shapeColor ="blue"
    w5 = createSprite(340, 468, 45)
    w5.shapeColor = "blue"
   */

  //Creating the Ghost
  wall = new Wall();
  ghosts.push(new Ghost(0, 6, 12.5 * cellWidth, 14.5 * cellHeight));
  ghosts.push(new Ghost(0, 8, 15.5 * cellWidth, 14.5 * cellHeight));
  ghosts.push(new Ghost(0, 8, 13.5 * cellWidth, 14.5 * cellHeight));
  ghosts.push(new Ghost(0, 9, 14.5 * cellWidth, 14.5 * cellHeight));
  spawn = true;
  count = 0;
}

function draw() {
  background(bg);
  text("x: " + mouseX + " y: " + mouseY, mouseX, mouseY);
  fill(255);
  rect(13 * cellWidth, 12 * cellHeight, cellWidth * 2, cellHeight);
  noFill();
  //   if (keyDown(UP_ARROW)) {
  //       pacman.changeAnimation("upmove", Up);
  //       pacman.velocityY = -3;
  //   } else if (keyDown(DOWN_ARROW)) {
  //       pacman.velocityY = 3;
  //       pacman.changeAnimation("downmove", Down);
  //   } else if (keyDown(RIGHT_ARROW)) {
  //       pacman.changeAnimation("rightmove", Right);
  //       pacman.velocityX = 3;
  //   } else if (keyDown(LEFT_ARROW)) {
  //       pacman.changeAnimation("leftmove", Left);
  //       pacman.velocityX = -3;
  //   }

  //The wall
  wall.show();

  count++;
  if (pacman.death) {
    pacman.die();
  } else if (wall.food === 0) {
    text("You Win", 500, 350);
  } else {
    //spawn all the Ghosts
    if (spawn) {
      if (count > 100 && count < 150) {
        ghosts[0].setPos(
          9 * cellWidth + cellWidth / 2,
          11 * cellHeight + cellHeight / 2
        );
      } else if (count > 200 && count < 250) {
        ghosts[1].setPos(
          18 * cellWidth + cellWidth / 2,
          17 * cellHeight + cellHeight / 2
        );
      } else if (count > 300 && count < 350) {
        ghosts[2].setPos(
          18 * cellWidth + cellWidth / 2,
          11 * cellHeight + cellHeight / 2
        );
      } else if (count > 400 && count < 450) {
        ghosts[3].setPos(
          9 * cellWidth + cellWidth / 2,
          17 * cellHeight + cellHeight / 2
        );
        spawn = false;
      }
    }
    //pacman show and move
    pacman.show();
    pacman.move();
    //Displaying the Ghosts
    for (let gh of ghosts) {
      gh.move();
      gh.show();
      if (pacman.hits(gh)) {
        pacman.flag = 0;
        pacman.death = true;
        pacman.die();
      }
    }

    //The Pacman eats Food
    for (var i = wall.wall.length - 1; i >= 0; i--) {
      for (var j = wall.wall[i].length - 1; j >= 0; j--) {
        let Element = wall.wall[i][j];
        if (pacman.hits(Element) && Element.food) {
          wall.wall[i][j] = new Cell(false, false, Element.x, Element.y);
          wall.food--;
        }
      }
    }
    // Bounce off the wall

    //   pacman.bounceOff(cell1Group);
    //   pacman.bounceOff(cell2Group);
  }

  drawSprites();
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    pacman.addInstruction(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    pacman.addInstruction(-1, 0);
  } else if (keyCode === UP_ARROW) {
    pacman.addInstruction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    pacman.addInstruction(0, 1);
  } else if (keyCode === ENTER && pacman.death) {
    setup();
    loop();
  }
}
