let mouseDistForStand = 5; // mouse distance to be standing
let velocityToReachGoto = 7.0; // velocity to reach goto point

class Player {

  constructor( x, y, wid, hei ) {

    let oneAnim;
    this.layers = []; // an array of all layers added to body sprite

    this.body = createSprite( x, y, wid, hei ); this.body.depth = 3; // body is special but not on top
    this.body.addAnimation( 'normal', 'assets/player_body_0001.png', 'assets/player_body_0002.png' );
    this.body.setCollider( 'rectangle', 0, -28, 40, 100 );

    this.rightfoot = createSprite( x, y, wid, hei ); this.rightfoot.depth = 2; // right foot is under body sprite
    oneAnim = this.rightfoot.addAnimation( 'stand', 'assets/player_rightfoot_stand_0001.png', 'assets/player_rightfoot_stand_0002.png' );
    oneAnim.frameDelay = 8;
    oneAnim = this.rightfoot.addAnimation( 'walk', 'assets/player_rightfoot_walk_0001.png', 'assets/player_rightfoot_walk_0004.png' );
    oneAnim.frameDelay = 8;
    this.layers.push( this.rightfoot ); // add sprite to layers

    this.leftfoot = createSprite( x, y, wid, hei ); this.leftfoot.depth = 4; // left foot is over body sprite
    oneAnim = this.leftfoot.addAnimation( 'stand', 'assets/player_leftfoot_stand_0001.png', 'assets/player_leftfoot_stand_0002.png' );
    oneAnim.frameDelay = 8;
    oneAnim = this.leftfoot.addAnimation( 'walk', 'assets/player_leftfoot_walk_0001.png', 'assets/player_leftfoot_walk_0004.png' );
    oneAnim.frameDelay = 8;
    this.layers.push( this.leftfoot ); // add sprite to layers

    this.head = createSprite( x, y, wid, hei ); this.head.depth = 5; // head is over body sprite
    this.head.addAnimation( 'stand', 'assets/player_head_stand_0001.png', 'assets/player_head_stand_0002.png' );
    this.head.addAnimation( 'walk', 'assets/player_head_walk_0001.png', 'assets/player_head_walk_0002.png' );
    this.layers.push( this.head ); // add sprite to layers

    /*
    this.body = createSprite( x, y, wid, hei ); this.body.depth = 2; // body sprite
    this.body.addAnimation( 'stand_good', 'assets/player_body_stand_good_0001.png', 'assets/player_body_stand_good_0002.png' );
    this.body.addAnimation( 'walk_good', 'assets/player_body_walk_good_0001.png', 'assets/player_body_walk_good_0004.png' );
    this.body.addAnimation( 'stand_cont', 'assets/player_body_stand_cont_0001.png', 'assets/player_body_stand_cont_0002.png' );
    this.body.addAnimation( 'walk_cont', 'assets/player_body_walk_cont_0001.png', 'assets/player_body_walk_cont_0004.png' );

    this.layers = []; // an array of all layers, so as to set properties to all of them

    this.gown = createSprite( x, y, wid, hei ); this.gown.depth = 3; // gown sprite
    this.gown.addAnimation( 'good', 'assets/player_gown_good_0001.png', 'assets/player_gown_good_0002.png' );
    this.gown.addAnimation( 'cont', 'assets/player_gown_cont_0001.png', 'assets/player_gown_cont_0002.png' );
    this.layers.push( this.gown ); // add gown to layers

    this.mask = createSprite( x, y, wid, hei ); this.mask.depth = 4; // mask sprite
    this.mask.addAnimation( 'good', 'assets/player_mask_good_0001.png', 'assets/player_mask_good_0002.png' );
    this.mask.addAnimation( 'cont', 'assets/player_mask_cont_0001.png', 'assets/player_mask_cont_0002.png' );
    this.layers.push( this.mask ); // add mask to layers

    this.shield = createSprite( x, y, wid, hei ); this.shield.depth = 5; // shield sprite
    this.shield.addAnimation( 'good', 'assets/player_shield_good_0001.png', 'assets/player_shield_good_0002.png' );
    this.shield.addAnimation( 'cont', 'assets/player_shield_cont_0001.png', 'assets/player_shield_cont_0002.png' );
    this.layers.push( this.shield ); // add shield to layers

    this.steto = createSprite( x, y, wid, hei ); this.steto.depth = 6; // steto sprite
    this.steto.addAnimation( 'good', 'assets/player_steto_good_0001.png', 'assets/player_steto_good_0002.png' );
    this.steto.addAnimation( 'cont', 'assets/player_steto_cont_0001.png', 'assets/player_steto_cont_0002.png' );
    this.layers.push( this.steto ); // add steto to layers

    this.report = createSprite( x, y, wid, hei ); this.report.depth = 7; // report sprite
    this.report.addAnimation( 'good', 'assets/player_report_good_0001.png', 'assets/player_report_good_0002.png' );
    this.report.addAnimation( 'cont', 'assets/player_report_cont_0001.png', 'assets/player_report_cont_0002.png' );
    this.layers.push( this.report ); // add report to layers

    this.phone = createSprite( x, y, wid, hei ); this.phone.depth = 8; // report sprite
    this.phone.addAnimation( 'good', 'assets/player_phone_good_0001.png', 'assets/player_phone_good_0002.png' );
    this.phone.addAnimation( 'cont', 'assets/player_phone_cont_0001.png', 'assets/player_phone_cont_0002.png' );
    this.layers.push( this.phone ); // add phone to layers

    this.hands = createSprite( x, y, wid, hei ); this.hands.depth = 9; // hands sprite
    this.hands.addAnimation( 'stand_good', 'assets/player_hands_stand_good_0001.png', 'assets/player_hands_stand_good_0002.png' );
    this.hands.addAnimation( 'walk_good', 'assets/player_hands_walk_good_0001.png', 'assets/player_hands_walk_good_0004.png' );
    this.hands.addAnimation( 'stand_cont', 'assets/player_hands_stand_cont_0001.png', 'assets/player_hands_stand_cont_0002.png' );
    this.hands.addAnimation( 'walk_cont', 'assets/player_hands_walk_cont_0001.png', 'assets/player_hands_walk_cont_0004.png' );
    this.layers.push( this.hands ); // add hands to layers

    this.gloves = createSprite( x, y, wid, hei ); this.gloves.depth = 10; // gloves sprite
    this.gloves.addAnimation( 'stand_good', 'assets/player_gloves_stand_good_0001.png', 'assets/player_gloves_stand_good_0002.png' );
    this.gloves.addAnimation( 'walk_good', 'assets/player_gloves_walk_good_0001.png', 'assets/player_gloves_walk_good_0004.png' );
    this.gloves.addAnimation( 'stand_cont', 'assets/player_gloves_stand_cont_0001.png', 'assets/player_gloves_stand_cont_0002.png' );
    this.gloves.addAnimation( 'walk_cont', 'assets/player_gloves_walk_cont_0001.png', 'assets/player_gloves_walk_cont_0004.png' );
    this.layers.push( this.gloves ); // add gloves to layers
    */

    this.isWalking = false; // is the player walking or not?

    this.hasGown = false; // does the player wears the gown?
    this.hasMask = false; // does the player wears the mask?
    this.hasShield = false; // does the player wears the shield?
    this.hasGloves = false; // does the player wears the shield?
    this.hasSteto = false; // does the player has the steto?
    this.hasReport = false; // does the player has the report?
    this.hasPhone = true; // does the player has the phone?

    this.isBodyContamined = false; // is this body contamined?
    this.isHandsContamined = false; // are these hands contamined?
    this.isGownContamined = false; // is this object contamined?
    this.isMaskContamined = false; // is this object contamined?
    this.isShieldContamined = false; // is this object contamined?
    this.isGlovesContamined = false; // is this object contamined?
    this.isStetoContamined = false; // is this object contamined?
    this.isReportContamined = false; // is this object contamined?
    this.isPhoneContamined = false; // is this object contamined?
  }

  update( goto, obstacles, actionables ) {

    this.body.collide( obstacles ); // body collides with obstacles

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

    if( this.isWalking ) { // walk animation

      this.rightfoot.changeAnimation( 'walk' );
      this.leftfoot.changeAnimation( 'walk' );
      this.head.changeAnimation( 'walk' );

    } else { // stand animation

      this.rightfoot.changeAnimation( 'stand' );
      this.leftfoot.changeAnimation( 'stand' );
      this.head.changeAnimation( 'stand' );
    }

    /*
    if( this.isGownContamined ) this.gown.changeAnimation( 'cont' );
    else this.gown.changeAnimation( 'good' ); // check contamination

    if( this.isMaskContamined ) this.mask.changeAnimation( 'cont' );
    else this.mask.changeAnimation( 'good' ); // check contamination

    if( this.isShieldContamined ) this.shield.changeAnimation( 'cont' );
    else this.shield.changeAnimation( 'good' ); // check contamination

    if( this.isStetoContamined ) this.steto.changeAnimation( 'cont' );
    else this.steto.changeAnimation( 'good' ); // check contamination

    if( this.isReportContamined ) this.report.changeAnimation( 'cont' );
    else this.report.changeAnimation( 'good' ); // check contamination

    if( this.isPhoneContamined ) this.phone.changeAnimation( 'cont' );
    else this.phone.changeAnimation( 'good' ); // check contamination

    if( this.isWalking ) { // walk animation

      if( this.isBodyContamined ) this.body.changeAnimation( 'walk_cont' );
      else this.body.changeAnimation( 'walk_good' ); // check contamination

      if( this.isHandsContamined ) this.hands.changeAnimation( 'walk_cont' );
      else this.hands.changeAnimation( 'walk_good' ); // check contamination

      if( this.isGlovesContamined ) this.gloves.changeAnimation( 'walk_cont' );
      else this.gloves.changeAnimation( 'walk_good' ); // check contamination

    } else { // stand animation

      if( this.isBodyContamined ) this.body.changeAnimation( 'stand_cont' );
      else this.body.changeAnimation( 'stand_good' ); // check contamination

      if( this.isHandsContamined ) this.hands.changeAnimation( 'stand_cont' );
      else this.hands.changeAnimation( 'stand_good' ); // check contamination

      if( this.isGlovesContamined ) this.gloves.changeAnimation( 'stand_cont' );
      else this.gloves.changeAnimation( 'stand_good' ); // check contamination
    }

    if( this.hasGown ) this.gown.visible = true;
    else this.gown.visible = false; // see gown?

    if( this.hasMask ) this.mask.visible = true;
    else this.mask.visible = false; // see gown?

    if( this.hasShield ) this.shield.visible = true;
    else this.shield.visible = false; // see gown?

    if( this.hasGloves ) { this.gloves.visible = true; this.hands.visible = false; }
    else { this.gloves.visible = false; this.hands.visible = true; } // see gown?

    if( this.hasSteto ) this.steto.visible = true;
    else this.steto.visible = false; // see gown?

    if( this.hasReport ) this.report.visible = true;
    else this.report.visible = false; // see gown?

    if( this.hasPhone ) this.phone.visible = true;
    else this.phone.visible = false; // see gown?
    */

    // -- deal with state changes --

    actionables.forEach( ( actionable ) => {

      let actDist = dist( actionable.surface.position.x, actionable.surface.position.y, this.body.position.x, this.body.position.y );
      if( actDist < 30 ) { actionable.isPlayerEntered = true; } else { actionable.isPlayerEntered = false; } // flag if collide

      if( actionable.isPlayerEntered == true && actionable.wasPlayerEntered == false ) {

        this.onAction( actionable );
      }
    })

    // -- deal with contamination --

    if( this.hasSteto && this.isStetoContamined && !this.hasGown ) this.isBodyContamined = true;
    if( this.hasSteto && this.isStetoContamined && this.hasGown ) this.isGownContamined = true;
    if( this.hasSteto && this.isBodyContamined && !this.hasGown ) this.isStetoContamined = true;
    if( this.hasSteto && this.isGownContamined && this.hasGown ) this.isStetoContamined = true;

    if( this.hasPhone && this.isPhoneContamined && !this.hasGloves ) this.isHandsContamined = true;
    if( this.hasPhone && this.isPhoneContamined && this.hasGloves ) this.isGlovesContamined = true;
    if( this.hasPhone && this.isHandsContamined && !this.hasGloves ) this.isPhoneContamined = true;
    if( this.hasPhone && this.isGlovesContamined && this.hasGloves ) this.isPhoneContamined = true;

    if( this.hasReport && this.isReportContamined && !this.hasGloves ) this.isHandsContamined = true;
    if( this.hasReport && this.isReportContamined && this.hasGloves ) this.isGlovesContamined = true;
    if( this.hasReport && this.isHandsContamined && !this.hasGloves ) this.isReportContamined = true;
    if( this.hasReport && this.isGlovesContamined && this.hasGloves ) this.isReportContamined = true;

    if( this.isHandsContamined ) {

      // 20% chance to infect body if hands are contaminated
      if( random( 10000 ) > 9990 ) this.isBodyContamined = true;
    }
  }

  onAction( actionable ) { // -- action callback --

    if( actionable.name == 'table' ) {

      if( actionable.hasSteto ) { // steto on table

        this.hasPhone = false; // player drops phone
        actionable.hasPhone = true; // right on the table
        actionable.isPhoneContamined = this.isPhoneContamined;

        this.hasGown = true; // player puts the gown
        this.hasMask = true; // player puts the mask
        this.hasShield = true; // player puts the shield

        if( random( 1000) > 500 ) this.hasGloves = true; // player
        else this.hasGloves = false; // sometimes puts the gloves

        this.isGownContamined = false; // new object here
        this.isMaskContamined = false; // new object here
        this.isShieldContamined = false; // new object here
        this.isGlovesContamined = false; // new object here

        this.hasSteto = true; // player takes steto
        actionable.hasSteto = false; // from the table
        this.isStetoContamined = actionable.isStetoContamined;

      } else {

        this.hasSteto = false; // player drops steto
        actionable.hasSteto = true; // right on the table
        this.isPhoneContamined = actionable.isPhoneContamined;

        this.hasGown = false; // player throws the gown
        this.hasMask = false; // player throws the mask
        this.hasShield = false; // player throws the shield
        this.hasGloves = false; // player throws the gloves

        this.hasPhone = true; // player takes phone
        actionable.hasPhone = false; // from the table
        actionable.isStetoContamined = this.isStetoContamined;
      }
    }

    if( actionable.name == 'virus' ) {

      // -- action for protective equipment --
      if( actionable.isSurfaceContamined == true ) {

        if( this.hasMask ) this.isMaskContamined = true;
        else this.isBodyContamined = true; // mask or body

        if( this.hasGown ) this.isGownContamined = true;
        else this.isBodyContamined = true; // mask or body

        if( this.hasShield ) {

          this.isShieldContamined = true;
          this.isMaskContamined = false;

        } else this.isBodyContamined = true; // mask or body

        if( this.hasGloves ) this.isGlovesContamined = true;
        else this.isHandsContamined = true; // mask or body

        if( this.hasSteto ) this.isStetoContamined = true;
        if( this.hasReport ) this.isReportContamined = true;
        if( this.hasPhone ) this.isPhoneContamined = true;
      }
    }
  }
}
