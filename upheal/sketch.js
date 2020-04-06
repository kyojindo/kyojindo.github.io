
let gameWidth = 1200; // game window width
let gameHeight = 750; // game window height

let bgImg; // background image (concrete tiles)

let obstacles; // group of obstacles objects
let hoverables; // group of hoverable objects

let player; // the player in the game
let goto; // where the player goes

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

  obstacles.add( wall_top );
  obstacles.add( wall_bottom );

  // ---

  player = createSprite( 1000, 75, 50, 100 );
  player.addAnimation( 'standing', 'assets/player_standing_0001.png', 'assets/player_standing_0002.png' );
  player.addAnimation( 'walking', 'assets/player_walking_0001.png', 'assets/player_walking_0003.png' );
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

    player.changeAnimation( 'walking' );

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

    player.changeAnimation( 'standing' );

    player.velocity.x = 0;
    player.velocity.y = 0;
  }

  player.collide( obstacles );

  drawSprites(); // sprites
}
