/* NODE */

class Node {

  constructor( _xPos, _yPos, _name ) {

    this.xPos = _xPos;
    this.yPos = _yPos;
    this.name = _name;
  }

  draw() { // -- draw node --

    noStroke(); // draw the fill shape
    fill( 'rgba( 255, 255, 255, 0.2 )' );
    circle( this.xPos, this.yPos, 30 );

    noFill(); // draw the stroke shape
    stroke( 'rgba( 255, 255, 255, 0.5 )' );
    circle( this.xPos, this.yPos, 30 );

    textSize( 12 ); noStroke(); fill( 'rgba( 255, 255, 255, 0.6 )' );
    text( this.name, this.xPos+20, this.yPos+3 ); // draw the name
  }
}

/* PATH */

class Path {

  constructor( left, right ) {

    this.nameLeft = left.name;
    this.nameRight = right.name;
  }
}

/* GRAPH */

class Graph {

  constructor() {

    this.node = [];
    this.path = [];
  }

  getIdFromName( _name ) { // -- name->id --

    let nId = -1;

    for( let n=0; n<this.node.length; n++ ) {

      if( this.node[n].name == _name ) nId = n;
    }

    return( nId );
  }

  addNode( _xPos, _yPos, _name ) { // -- add node --

    let nId = this.getIdFromName( _name );

    if( nId < 0 ) {

      this.node.push( new Node( _xPos, _yPos, _name ) );

    } else {

      this.node[nId].xPos = _xPos;
      this.node[nId].yPos = _yPos;
    }
  }

  addPath( _nameLeft, _nameRight ) { // -- add path --

    let nIdLeft = this.getIdFromName( _nameLeft );
    let nIdRight = this.getIdFromName( _nameRight );
    let isPathAlready = false; // is path already?

    if( nIdLeft>=0 && nIdRight>=0 ) {

      for( let p=0; p<this.path.length; p++ ) {

        // we check permutation because a left-to-right link is the same as a right-to-left link
        if( this.path[p].nameLeft == _nameLeft && this.path[p].nameRight == _nameRight ) { isPathAlready = true; }
        if( this.path[p].nameLeft == _nameRight && this.path[p].nameRight == _nameLeft ) { isPathAlready = true; }
      }

      if( !isPathAlready ) {

        this.path.push( new Path( this.node[nIdLeft], this.node[nIdRight] ) );
      }
    }
  }

  draw() { // -- draw graph --

    for( let n=0; n<this.node.length; n++ ) {

      this.node[n].draw();
    }

    for( let p=0; p<this.path.length; p++ ) {

      let idLeft = this.getIdFromName( this.path[p].nameLeft );
      let idRight = this.getIdFromName( this.path[p].nameRight );

      stroke( 'rgba( 255, 255, 255, 0.5 )' );
      line( this.node[idLeft].xPos, this.node[idLeft].yPos, this.node[idRight].xPos, this.node[idRight].yPos );
    }
  }
}
