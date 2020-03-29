class Particle {
  
  constructor() {
    
    this.x = random( 50, width-50 );
    this.y = random( 50, height-50 );
    
    this.xSpeed = random( -1.2, 1.2 );
    this.ySpeed = random( -1.2, 1.2 );
    
    this.d = random( 20, 30 );
    
    if( random( 0, 100 ) < 70 ) this.contam = false;
    else this.contam = true; // random contamination
  }

  update() {
    
    if( this.x < this.d/2 || this.x > ( width-this.d/2 ) ) this.xSpeed*=-1;
    if( this.y < this.d/2 || this.y > ( height-this.d/2 ) ) this.ySpeed*=-1;
    
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  drawParticle() {
    
    if( this.contam == false ) {
    
      noStroke();
      fill( 'rgba( 30, 30, 30, 0.2 )' );
      circle( this.x, this.y, this.d );
      
      noFill();
      stroke( 'rgba( 30, 30, 30, 0.8 )' );
      circle( this.x, this.y, this.d );
      
    } else {
      
      noStroke();
      fill( 'rgba( 255, 0, 0, 0.6 )' );
      circle( this.x, this.y, this.d );
      
      noFill();
      stroke( 'rgba( 255, 0, 0, 0.8 )' );
      circle( this.x, this.y, this.d );
    }
  }
  
  drawJoints( particles ) {
    
    particles.forEach( element => {
      
      let dis = dist( this.x, this.y, element.x, element.y );
      
      if( dis < 140 ) {
        
        stroke( 'rgba( 60, 60, 60, 0.1 )' );
        line( this.x, this.y, element.x, element.y );
      }
      
      if( dis < 20 && element.contam == true ) {
      
        this.contam = true;
      }
    });
  }
  
  isTouched( mX, mY ) {
    
    let dis = dist( this.x, this.y, mX, mY );
    
    if( dis < 20 ) {
    
      this.contam = false;
    }
  }
}

let particles = []; // particles
let washImg; // wash hands image
let bgSound; // background sound

function preload() {
  
  bgSound = loadSound( 'soundtrack.mp3' );
}

function setup() {
  
  createCanvas( windowWidth, windowHeight );
  washImg = loadImage( 'wash.png' ); // wash picto
  bgSound.loop(); // put the sound in loop mode
  
  for( let i=0; i<width/30; i++ ) {
    
    particles.push( new Particle() );
  }
}

function draw() {
  
  background( '#ffffff' );
  
  for( let i=0; i<particles.length; i++ ) {
    
    particles[i].update();
    particles[i].drawParticle();
    particles[i].drawJoints( particles );
    
    if( mouseIsPressed ) {
      
      particles[i].isTouched( mouseX, mouseY );
      image( washImg, mouseX-25, mouseY-25, 50, 50 );
    }
  }
}

function windowResized() {
  
  resizeCanvas( windowWidth, windowHeight );
}