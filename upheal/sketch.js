
let hasTouchScreen = false; // touch device?
let gameWidth = 1200; // game window width
let gameHeight = 750; // game window height
let tiling; // background image (tiles)

let goto; // where player goes
let player; // player in the game
let obstacles; // obstacle objects
let surfaces = []; // surface objects

function preload() {

  // first thing first, we test if the game
  // is open on mobile device => not available

  if( "maxTouchPoints" in navigator ) {

    hasTouchScreen = navigator.maxTouchPoints > 0;

  } else if( "msMaxTouchPoints" in navigator ) {

    hasTouchScreen = navigator.msMaxTouchPoints > 0;

  } else {

    var mQ = window.matchMedia && matchMedia( "(pointer:coarse)" );

    if( mQ && mQ.media === "(pointer:coarse)" ) {

      hasTouchScreen = !!mQ.matches;

    } else if( 'orientation' in window ) {

      hasTouchScreen = true; // deprecated, but good fallback

    } else {

      // only as a last resort, fall
      // back to user agent sniffing

      var UA = navigator.userAgent;

      hasTouchScreen = (
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
      );
    }
  }

  // here we pre-load all the assets

  obstacles = new Group(); // we create a group of elements

  tiling = loadImage( 'assets/background.png' ); // load background image

  let wall_top = createSprite( 755, 225 ); // create the sprite for the wall top
  wall_top.addAnimation( 'normal', 'assets/wall_top_0001.png', 'assets/wall_top_0002.png' );
  obstacles.add( wall_top ); // add wall top as an obstacle

  let wall_bottom = createSprite( 755, 685 ); // create the sprite for the wall bottom
  wall_bottom.addAnimation( 'normal', 'assets/wall_bottom_0001.png', 'assets/wall_bottom_0002.png' );
  obstacles.add( wall_bottom ); // add wall bottom as an obstacle

  let table = new Surface( 95, 45, 'table' ); // create the table as an object
  table.hasSteto = true; // tailor a specific set of objects to this table
  surfaces.push( table ); // push it as an action-enabled object in array

  let virus = new Surface( 55, 695, 'virus' );
  virus.isSurfaceContamined = true; // daaaah!
  surfaces.push( virus );

  player = new Player( 1000, 75, 50, 100 ); // load player object
}

function setup() {

  createCanvas( gameWidth, gameHeight );
  goto = createVector( 1000, 75 );
}

function draw() {

  clear(); // clear & tiling
  background( 200, 200, 200 );

  if( !hasTouchScreen ) {

    image( tiling, 0, 0 );

    // convert mouse clicks into the next place player goes
    if( mouseIsPressed ) { goto.x = mouseX; goto.y = mouseY; }

    player.update( goto, obstacles, surfaces );
    surfaces.forEach( ( surface ) => { surface.update(); } )

    drawSprites(); // draw all sprites
  }
}
