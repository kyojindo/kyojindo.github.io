
let gameWidth = 1200; // game window width
let gameHeight = 750; // game window height

let bgImg; // background image (concrete tiles)

let obstacles; // group of obstacles objects
let hoverables; // group of hoverable objects

let player; // the player in the game
let goto; // where the player goes

let table;

let isEnterTable = false;
let wasEnterTable = false;
let playerHasSteto = false;
let tableHasSteto = true;

function preload() {

  bgImg = loadImage( 'assets/background.png' );
}

function setup() {

  createCanvas( gameWidth, gameHeight );

  // ---

  obstacles = new Group(); // we create a group of elements
  hoverables = new Group(); // we create a group of elements

  let wall_top = createSprite( 755, 225 );
  wall_top.addAnimation( 'normal', 'assets/wall_top_0001.png', 'assets/wall_top_0002.png' );

  let wall_bottom = createSprite( 755, 685 );
  wall_bottom.addAnimation( 'normal', 'assets/wall_bottom_0001.png', 'assets/wall_bottom_0002.png' );

  table = createSprite( 1144, 694 );
  table.addAnimation( 'empty', 'assets/table_empty_0001.png', 'assets/table_empty_0002.png' );
  table.addAnimation( 'steto', 'assets/table_steto_0001.png', 'assets/table_steto_0002.png' );

  obstacles.add( wall_top );
  obstacles.add( wall_bottom );

  // ---

  player = createSprite( 1000, 75, 50, 100 );
  player.addAnimation( 'empty_standing', 'assets/player_empty_standing_0001.png', 'assets/player_empty_standing_0002.png' );
  player.addAnimation( 'empty_walking', 'assets/player_empty_walking_0001.png', 'assets/player_empty_walking_0006.png' );
  player.addAnimation( 'steto_standing', 'assets/player_steto_standing_0001.png', 'assets/player_steto_standing_0002.png' );
  player.addAnimation( 'steto_walking', 'assets/player_steto_walking_0001.png', 'assets/player_steto_walking_0006.png' );
  goto = createVector( 1000, 75 ); // start here
}

function draw() {

  clear(); // clear pixels
  background( 200, 200, 200 );
  image( bgImg, 0, 0 ); // bg

  // -- deal with mouse clicks --

  if( mouseIsPressed ) {

    goto.x = mouseX;
    goto.y = mouseY;
  }

  // -- deal with player motion --

  let distMousePlayer = dist( goto.x, goto.y, player.position.x, player.position.y );

  if( distMousePlayer > 10 ) {

    if( playerHasSteto ) player.changeAnimation( 'steto_walking' );
    else player.changeAnimation( 'empty_walking' );

    let dirX = ( goto.x-player.position.x );
    let dirY = ( goto.y-player.position.y );
    let dir = createVector( dirX, dirY );
    dir.mult( 1.0 / dir.mag() );
    dir.mult( 5.0 ); // speed

    player.velocity.x = dir.x;
    player.velocity.y = dir.y;

    if( goto.x < player.position.x-10 ) player.mirrorX( 1 );
    else if( goto.x > player.position.x+10 ) player.mirrorX( -1 );

  } else {

    if( playerHasSteto ) player.changeAnimation( 'steto_standing' );
    else player.changeAnimation( 'empty_standing' );

    player.velocity.x = 0;
    player.velocity.y = 0;
  }

  if( tableHasSteto ) table.changeAnimation( 'steto' );
  else table.changeAnimation( 'empty' );

  player.collide( obstacles );

  // -- deal with state changes --

  let distTablePlayer = dist( table.position.x, table.position.y, player.position.x, player.position.y );

  if( distTablePlayer < 30 ) isEnterTable = true;
  else isEnterTable = false; // flag about entering table

  if( isEnterTable == true && wasEnterTable == false ) {

    playerHasSteto = !playerHasSteto;
    tableHasSteto = !tableHasSteto;
  }

  drawSprites(); // draw all sprites

  wasEnterTable = isEnterTable;
}
