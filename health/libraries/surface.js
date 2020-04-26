class Surface {

  constructor( x, y, name ) {

    this.name = name; // name is what helps finding the assets

    this.surface = createSprite( x, y ); this.surface.depth = 0; // create the sprite for the table surface
    this.surface.addAnimation( 'good', 'assets/'+this.name+'_surface_good_0001.png', 'assets/'+this.name+'_surface_good_0002.png' );
    this.surface.addAnimation( 'cont', 'assets/'+this.name+'_surface_cont_0001.png', 'assets/'+this.name+'_surface_cont_0002.png' );

    this.steto = createSprite( x, y ); this.steto.depth = 1; // create the sprite for the table surface
    this.steto.addAnimation( 'good', 'assets/'+this.name+'_steto_good_0001.png', 'assets/'+this.name+'_steto_good_0002.png' );
    this.steto.addAnimation( 'cont', 'assets/'+this.name+'_steto_cont_0001.png', 'assets/'+this.name+'_steto_cont_0002.png' );

    this.report = createSprite( x, y ); this.report.depth = 1; // create the sprite for the table surface
    this.report.addAnimation( 'good', 'assets/'+this.name+'_report_good_0001.png', 'assets/'+this.name+'_report_good_0002.png' );
    this.report.addAnimation( 'cont', 'assets/'+this.name+'_report_cont_0001.png', 'assets/'+this.name+'_report_cont_0002.png' );

    this.phone = createSprite( x, y ); this.phone.depth = 1; // create the sprite for the table surface
    this.phone.addAnimation( 'good', 'assets/'+this.name+'_phone_good_0001.png', 'assets/'+this.name+'_phone_good_0002.png' );
    this.phone.addAnimation( 'cont', 'assets/'+this.name+'_phone_cont_0001.png', 'assets/'+this.name+'_phone_cont_0002.png' );

    this.hasSteto = false; // rudimentary state machine for stetoscope
    this.hasReport = false; // rudimentary state machine for stetoscope
    this.hasPhone = false; // rudimentary state machine for phone

    this.isSurfaceContamined = false; // is this surface contamined?
    this.isStetoContamined = false; // is this object contamined?
    this.isReportContamined = false; // is this object contamined?
    this.isPhoneContamined = false; // is this object contamined?

    this.wasPlayerEntered = false;
    this.isPlayerEntered = false;
  }

  update() {

    // -- deal with animation --

    if( this.isSurfaceContamined ) this.surface.changeAnimation( 'cont' );
    else this.surface.changeAnimation( 'good' ); // check contamination

    if( this.isStetoContamined ) this.steto.changeAnimation( 'cont' );
    else this.steto.changeAnimation( 'good' ); // check contamination

    if( this.isReportContamined ) this.report.changeAnimation( 'cont' );
    else this.report.changeAnimation( 'good' ); // check contamination

    if( this.isPhoneContamined ) this.phone.changeAnimation( 'cont' );
    else this.phone.changeAnimation( 'good' ); // check contamination

    if( this.hasSteto ) this.steto.visible = true;
    else this.steto.visible = false;

    if( this.hasReport ) this.report.visible = true;
    else this.report.visible = false;

    if( this.hasPhone ) this.phone.visible = true;
    else this.phone.visible = false;

    // -- deal with contamination --

    if( this.hasSteto && this.isStetoContamined ) this.isSurfaceContamined = true;
    if( this.hasReport && this.isReportContamined ) this.isSurfaceContamined = true;
    if( this.hasPhone && this.isPhoneContamined ) this.isSurfaceContamined = true;

    if( this.hasSteto && this.isSurfaceContamined ) this.isStetoContamined = true;
    if( this.hasReport && this.isSurfaceContamined ) this.isReportContamined = true;
    if( this.hasPhone && this.isSurfaceContamined ) this.isPhoneContamined = true;

    // -- deal with state changes --

    this.wasPlayerEntered = this.isPlayerEntered;
  }
}
