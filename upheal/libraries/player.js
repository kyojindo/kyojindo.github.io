let mouseDistForStand = 5; // mouse distance to be standing
let velocityToReachGoto = 7.0; // velocity to reach goto point

class Player {

  constructor( x, y, wid, hei ) {

    this.body = createSprite( x, y, wid, hei ); this.body.depth = 1; // body sprite (layer 1)
    this.body.addAnimation( 'stand', 'assets/player_body_stand_0001.png', 'assets/player_body_stand_0002.png' );
    this.body.addAnimation( 'walk', 'assets/player_body_walk_0001.png', 'assets/player_body_walk_0004.png' );

    this.layers = []; // an array of all layers, so as to set properties to all of them

    this.gown = createSprite( x, y, wid, hei ); this.gown.depth = 2; // gown sprite (layer 2)
    this.gown.addAnimation( 'normal', 'assets/player_gown_normal_0001.png', 'assets/player_gown_normal_0002.png' );
    this.layers.push( this.gown ); // add gown to layers

    this.mask = createSprite( x, y, wid, hei ); this.mask.depth = 3; // mask sprite (layer 3)
    this.mask.addAnimation( 'normal', 'assets/player_mask_normal_0001.png', 'assets/player_mask_normal_0002.png' );
    this.layers.push( this.mask ); // add mask to layers

    this.shield = createSprite( x, y, wid, hei ); this.shield.depth = 4; // shield sprite (layer 4)
    this.shield.addAnimation( 'normal', 'assets/player_shield_normal_0001.png', 'assets/player_shield_normal_0002.png' );
    this.layers.push( this.shield ); // add shield to layers

    this.steto = createSprite( x, y, wid, hei ); this.steto.depth = 5; // steto sprite (layer 4)
    this.steto.addAnimation( 'normal', 'assets/player_steto_normal_0001.png', 'assets/player_steto_normal_0002.png' );
    this.layers.push( this.steto ); // add steto to layers

    this.report = createSprite( x, y, wid, hei ); this.report.depth = 5; // report sprite (layer 4)
    this.report.addAnimation( 'normal', 'assets/player_report_normal_0001.png', 'assets/player_report_normal_0002.png' );
    this.layers.push( this.report ); // add report to layers

    this.phone = createSprite( x, y, wid, hei ); this.phone.depth = 5; // report sprite (layer 4)
    this.phone.addAnimation( 'normal', 'assets/player_phone_normal_0001.png', 'assets/player_phone_normal_0002.png' );
    this.layers.push( this.phone ); // add phone to layers

    this.hands = createSprite( x, y, wid, hei ); this.hands.depth = 6; // hands sprite (layer 3)
    this.hands.addAnimation( 'stand', 'assets/player_hands_stand_0001.png', 'assets/player_hands_stand_0002.png' );
    this.hands.addAnimation( 'walk', 'assets/player_hands_walk_0001.png', 'assets/player_hands_walk_0004.png' );
    this.layers.push( this.hands ); // add hands to layers

    this.isWalking = false; // is the player walking or not?

    this.hasGown = false; // does the player wears the gown?
    this.hasMask = false; // does the player wears the mask?
    this.hasShield = false; // does the player wears the shield?

    this.hasSteto = false; // does the player has the steto?
    this.hasReport = false; // does the player has the report?
    this.hasPhone = true; // does the player has the phone?

    this.wasInObject = false;
    this.isInObject = false;
  }

  update( goto, obstacles, actionables ) {

    this.body.collide( obstacles ); // collisions with obstacles

    // -- deal with player position/motion relative to goto point --

    let mouseDist = dist( goto.x, goto.y, this.body.position.x, this.body.position.y );

    if( mouseDist > mouseDistForStand ) { // far enough to animate the sprite

      this.isWalking = true; // player is walking

      // compute player's new velocity vector
      let dirX = ( goto.x-this.body.position.x );
      let dirY = ( goto.y-this.body.position.y );
      let velocity = createVector( dirX, dirY );
      velocity.mult( 1.0 / velocity.mag() );
      velocity.mult( velocityToReachGoto );

      // move all the parts of player
      this.body.velocity.x = velocity.x;
      this.body.velocity.y = velocity.y;

      if( goto.x < this.body.position.x-mouseDistForStand ) {

        this.body.mirrorX( 1 ); // body and layers don't mirror
        this.layers.forEach( ( layer ) => { layer.mirrorX( 1 ); })

      } else if( goto.x > this.body.position.x+mouseDistForStand ) {

        this.body.mirrorX( -1 ); // body and layers do mirror
        this.layers.forEach( ( layer ) => { layer.mirrorX( -1 ); })
      }

    } else {

      this.isWalking = false;

      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    }

    // all layers copy body position (no relative body/layers motion)
    this.layers.forEach( ( layer ) => { layer.position = this.body.position; } )

    // -- deal with animation in sprites --

    if( this.hasGown ) this.gown.visible = true;
    else this.gown.visible = false; // see gown?

    if( this.hasMask ) this.mask.visible = true;
    else this.mask.visible = false; // see gown?

    if( this.hasShield ) this.shield.visible = true;
    else this.shield.visible = false; // see gown?

    if( this.hasSteto ) this.steto.visible = true;
    else this.steto.visible = false; // see gown?

    if( this.hasReport ) this.report.visible = true;
    else this.report.visible = false; // see gown?

    if( this.hasPhone ) this.phone.visible = true;
    else this.phone.visible = false; // see gown?

    if( this.isWalking ) { // walk animation

      this.body.changeAnimation( 'walk' );
      this.hands.changeAnimation( 'walk' );

    }
    else { // stand animation

      this.body.changeAnimation( 'stand' );
      this.hands.changeAnimation( 'stand' );
    }

    // -- deal with state changes --

    actionables.forEach( ( actionable ) => {

      let actDist = dist( actionable.surface.position.x, actionable.surface.position.y, this.body.position.x, this.body.position.y );
      if( actDist < 30 ) this.isInObject = true; else this.isInObject = false; // evaluate distance to object and flag if collide

      if( this.isInObject == true && this.wasInObject == false ) {

        this.onAction( actionable );
      }
    })

    this.wasInObject = this.isInObject;
  }

  onAction( actionable ) { // -- action callback --

    if( actionable.hasSteto ) { // steto on table

      this.hasPhone = false; // player drops phone
      actionable.hasPhone = true; // right on the table

      this.hasGown = true; // player puts the gown
      this.hasMask = true; // player puts the mask
      this.hasShield = true; // player puts the shield

      this.hasSteto = true; // player takes steto
      actionable.hasSteto = false; // from the table

    } else {

      this.hasSteto = false; // player drops steto
      actionable.hasSteto = true; // right on the table

      this.hasGown = false; // player throws the gown
      this.hasMask = false; // player throws the mask
      this.hasShield = false; // player throws the shield

      this.hasPhone = true; // player takes phone
      actionable.hasPhone = false; // from the table
    }
  }
}

class Table {

  constructor( x, y ) {

    this.surface = createSprite( x, y ); this.surface.depth = 0; // create the sprite for the table surface
    this.surface.addAnimation( 'normal', 'assets/table_surface_normal_0001.png', 'assets/table_surface_normal_0002.png' );

    this.steto = createSprite( x, y ); this.steto.depth = 1; // create the sprite for the table surface
    this.steto.addAnimation( 'normal', 'assets/table_steto_normal_0001.png', 'assets/table_steto_normal_0002.png' );

    this.phone = createSprite( x, y ); this.phone.depth = 1; // create the sprite for the table surface
    this.phone.addAnimation( 'normal', 'assets/table_phone_normal_0001.png', 'assets/table_phone_normal_0002.png' );

    this.hasSteto = true; // rudimentary state machine for stetoscope
    this.hasPhone = false; // rudimentary state machine for phone

    this.name = "table";
  }

  update() {

    if( this.hasSteto ) this.steto.visible = true;
    else this.steto.visible = false;

    if( this.hasPhone ) this.phone.visible = true;
    else this.phone.visible = false;
  }
}
