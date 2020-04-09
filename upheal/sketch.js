
let gameWidth = 1200; // game window width
let gameHeight = 750; // game window height
let tiling; // background image (tiles)

let goto; // where the player goes
let player; // the player in the game
let obstacles; // obstacle objects group
let actionables = []; // actionable objects

let isEnterTable = false;
let wasEnterTable = false;
let tableHasSteto = true;

function preload() {

  obstacles = new Group(); // we create a group of elements
  actionables = new Group(); // we create a group of elements

  tiling = loadImage( 'assets/background.png' ); // load background image

  let wall_top = createSprite( 755, 225 ); // create the sprite for the wall top
  wall_top.addAnimation( 'normal', 'assets/wall_top_0001.png', 'assets/wall_top_0002.png' );
  obstacles.add( wall_top ); // add wall top as an obstacle

  let wall_bottom = createSprite( 755, 685 ); // create the sprite for the wall bottom
  wall_bottom.addAnimation( 'normal', 'assets/wall_bottom_0001.png', 'assets/wall_bottom_0002.png' );
  obstacles.add( wall_bottom ); // add wall bottom as an obstacle

  let table = new Table( 1144, 694 ); // create the table as an object
  actionables.push( table ); // push it as an action-enabled in array

  player = new Player( 1000, 75, 50, 100 ); // load player object assets
}

function setup() {

  createCanvas( gameWidth, gameHeight );
  goto = createVector( 1000, 75 );
}

function draw() {

  clear(); // clear & tiling
  background( 200, 200, 200 );
  image( tiling, 0, 0 );

  // convert mouse clicks into the next place player goes
  if( mouseIsPressed ) { goto.x = mouseX; goto.y = mouseY; }

  player.update( goto, obstacles, actionables );
  actionables[0].update();

  drawSprites(); // draw all sprites
}
