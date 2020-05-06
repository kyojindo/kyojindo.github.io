function setup() {

  createCanvas( windowWidth, windowHeight );
}

function draw() {

  clear(); // clear & bg
  background( 30, 30, 30 );

  noStroke(); fill( 255, 255, 255 );
  ellipse( width/2, height/2, 100, 100 );
}

function windowResized() {

  resizeCanvas( windowWidth, windowHeight );
}

document.ontouchmove = function( event ) {

    event.preventDefault();
};
