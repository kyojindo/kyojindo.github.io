
let hasTouchScreen = false; // touch device?
let gameWidth = 1262; // game window width
let gameHeight = 852; // game window height
let ground_tiling; // ground tiling image
let walls_extruded_back; // wall extrusion
let walls_extruded_front; // wall extrusion

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

  if( !hasTouchScreen ) {

    obstacles = new Group(); // we create a group of elements

    // tiling = loadImage( 'assets/background.png' ); // load background image

    walls_extruded_back = loadImage( 'assets/walls_extruded_back.png' ); // load walls extrusion image
    walls_extruded_front = loadImage( 'assets/walls_extruded_front.png' ); // load walls extrusion image

    let abs_top = createSprite( 630, 15 );
    abs_top.addAnimation( 'normal', 'assets/abs_top_0001.png', 'assets/abs_top_0002.png' );
    obstacles.add( abs_top ); // add wall as an obstacle

    let abs_bottom = createSprite( 630, 835 );
    abs_bottom.addAnimation( 'normal', 'assets/abs_bottom_0001.png', 'assets/abs_bottom_0002.png' );
    obstacles.add( abs_bottom ); // add wall as an obstacle

    let abs_left = createSprite( 15, 445 );
    abs_left.addAnimation( 'normal', 'assets/abs_left_0001.png', 'assets/abs_left_0002.png' );
    obstacles.add( abs_left ); // add wall as an obstacle

    let abs_right = createSprite( 1245, 445 );
    abs_right.addAnimation( 'normal', 'assets/abs_right_0001.png', 'assets/abs_right_0002.png' );
    obstacles.add( abs_right ); // add wall as an obstacle

    let mid_left = createSprite( 238.5, 348.5 );
    mid_left.addAnimation( 'normal', 'assets/mid_left_0001.png', 'assets/mid_left_0002.png' );
    obstacles.add( mid_left ); // add wall as an obstacle

    let mid_right = createSprite( 1022.5, 465.5 );
    mid_right.addAnimation( 'normal', 'assets/mid_right_0001.png', 'assets/mid_right_0002.png' );
    obstacles.add( mid_right ); // add wall as an obstacle

    let hall_left_top = createSprite( 462, 90.5 );
    hall_left_top.addAnimation( 'normal', 'assets/hall_left_top_0001.png', 'assets/hall_left_top_0002.png' );
    obstacles.add( hall_left_top ); // add wall as an obstacle

    let hall_left_mid = createSprite( 462, 356 );
    hall_left_mid.addAnimation( 'normal', 'assets/hall_left_mid_0001.png', 'assets/hall_left_mid_0002.png' );
    obstacles.add( hall_left_mid ); // add wall as an obstacle

    let hall_left_bottom = createSprite( 462, 690.5 );
    hall_left_bottom.addAnimation( 'normal', 'assets/hall_left_bottom_0001.png', 'assets/hall_left_bottom_0002.png' );
    obstacles.add( hall_left_bottom ); // add wall as an obstacle

    let hall_right_top  = createSprite( 799, 149 );
    hall_right_top.addAnimation( 'normal', 'assets/hall_right_top_0001.png', 'assets/hall_right_top_0002.png' );
    obstacles.add( hall_right_top ); // add wall as an obstacle

    let hall_right_mid  = createSprite( 799, 498 );
    hall_right_mid.addAnimation( 'normal', 'assets/hall_right_mid_0001.png', 'assets/hall_right_mid_0002.png' );
    obstacles.add( hall_right_mid ); // add wall as an obstacle

    let hall_right_bottom  = createSprite( 799, 774 );
    hall_right_bottom.addAnimation( 'normal', 'assets/hall_right_bottom_0001.png', 'assets/hall_right_bottom_0002.png' );
    obstacles.add( hall_right_bottom ); // add wall as an obstacle

    /*
    let table = new Surface( 95, 45, 'table' ); // create the table as an object
    table.hasSteto = true; // tailor a specific set of objects to this table
    surfaces.push( table ); // push it as an action-enabled object in array

    let virus = new Surface( 55, 695, 'virus' );
    virus.isSurfaceContamined = true; // daaaah!
    surfaces.push( virus );
    */

    player = new Player( gameWidth/2, 100, 115, 140 ); // load player object
  }
}

function setup() {

  if( !hasTouchScreen ) {

    createCanvas( gameWidth, gameHeight );
    goto = createVector( gameWidth/2, 140 );

  } else {

    createCanvas( 300, 300 );
  }
}

function draw() {

  clear(); // clear & tiling
  background( 255, 255, 255 );

  if( !hasTouchScreen ) {

    background( 200, 200, 200 );
    // image( tiling, 0, 0 );
    image( walls_extruded_back, 0, 0 );

    // convert mouse clicks into the next place player goes
    if( mouseIsPressed ) { goto.x = mouseX; goto.y = mouseY; }

    player.update( goto, obstacles, surfaces );
    // surfaces.forEach( ( surface ) => { surface.update(); } )

    // obstacles.forEach( ( obstacle ) => { obstacle.debug = mouseIsPressed; } )
    // player.body.debug = mouseIsPressed;

    drawSprites(); // draw all sprites

    image( walls_extruded_front, 0, 0 );
  }
}
