
let gameWidth = 1200; // game window width
let gameHeight = 750; // game window height
let graph; // graph object for nodes/paths

// Collisions
// Collision between groups
// function called upon collision

let obstacles;
let collectibles;
let asterisk;

function setup() {

  createCanvas( gameWidth, gameHeight );

  graph = new Graph(); // instanciate new graph

  graph.addNode( 400, 700, "table" );
  graph.addNode( 80, 300, "window" );
  graph.addNode( 1060, 400, "door" );
  graph.addNode( 600, 290, "sink" );
  graph.addNode( 800, 50, "bed" );

  graph.addPath( "window", "table" );
  graph.addPath( "window", "sink" );
  graph.addPath( "door", "sink" );
  graph.addPath( "sink", "table" );
  graph.addPath( "sink", "bed" );
  graph.addPath( "bed", "door" );

  asterisk = createSprite( 400, 200 ); // create a user-controlled sprite
  asterisk.addAnimation( 'normal', 'assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png' );
  asterisk.addAnimation( 'stretch', 'assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png' );

  // create 2 groups
  obstacles = new Group();
  collectibles = new Group();

  for( let n=0; n<graph.node.length; n++ ) {

    let box = createSprite( graph.node[n].xPos, graph.node[n].yPos );
    box.addAnimation( 'normal', 'assets/ublock_0001.png', 'assets/ublock_0003.png' );
    obstacles.add( box );
  }

  for( let j=0; j<10; j++ ) {

    let dot = createSprite( random( 0, width ), random( 0, height ) );
    dot.addAnimation( 'normal', 'assets/small_circle0001.png', 'assets/small_circle0001.png' );
    collectibles.add( dot );
  }
}

function draw() {

  background( 30, 30, 30 );

  graph.draw(); // draw graph

  // if no arrow input set velocity to 0
  asterisk.velocity.x = ( mouseX-asterisk.position.x ) / 10;
  asterisk.velocity.y = ( mouseY-asterisk.position.y ) / 10;

  // asterisk collides against all
  // the sprites in the group obstacles
  asterisk.collide( obstacles );

  //I can define a function to be called upon
  // collision, overlap, displace or bounce
  asterisk.overlap( collectibles, collect );

  //if the animation is "stretch" and it reached its last frame
  if( asterisk.getAnimationLabel() == 'stretch' &&
  asterisk.animation.getFrame() == asterisk.animation.getLastFrame() ) {

    asterisk.changeAnimation('normal');
  }

  drawSprites();
}

// the first parameter will be the sprite
// (individual or from a group) calling the function
// the second parameter will be the sprite (individual or from a group)
// against which the overlap, collide, bounce, or displace is checked

function collect(collector, collected) {

  // collector is another name
  // for asterisk show the animation

  collector.changeAnimation( 'stretch' );
  collector.animation.rewind();

  // collected is the sprite in the group
  // collectibles that triggered the event

  collected.remove();
}
