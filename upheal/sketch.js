/*
let gameWidth = 600; // game window width
let gameHeight = 750; // game window height
let graph; // graph object for nodes/paths

function setup() {

  createCanvas( gameWidth, gameHeight );

  graph = new Graph(); // instanciate new graph

  graph.addNode( 200, 700, "table" );
  graph.addNode( 40, 300, "window" );
  graph.addNode( 530, 400, "door" );
  graph.addNode( 300, 290, "sink" );
  graph.addNode( 400, 50, "bed" );

  graph.addPath( "window", "table" );
  graph.addPath( "window", "sink" );
  graph.addPath( "door", "sink" );
  graph.addPath( "sink", "table" );
  graph.addPath( "sink", "bed" );
  graph.addPath( "bed", "door" );
}

function draw() {

  background( 30, 30, 30 );

  graph.draw(); // draw graph
}
*/

var sprite_sheet;
var explode_animation;
var sprite_sheet_image;

function preload() {

  // specify width and height of each frame and number of frames
  sprite_sheet = loadSpriteSheet('assets/explode_sprite_sheet.png', 171, 158, 11);
  explode_animation = loadAnimation(sprite_sheet);

  // load the full sprite sheet for example reference only
  sprite_sheet_image = loadImage('assets/explode_sprite_sheet.png');
}

function setup() {

  createCanvas(800, 225);
}

function draw() {
  
  clear();

  // animate the sprite sheet
  animation(explode_animation, 100, 130);

  // show full sheet for example reference
  image(sprite_sheet_image, 250, 40, 500, 154);
}
