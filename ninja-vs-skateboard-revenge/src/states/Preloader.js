const resources = {
  'image': [
		[ 'background', 'img/background.png' ],
		[ 'title', 'img/title.png' ],
    [ 'head', 'img/head.png' ],
		[ 'logo-pigames', 'img/logo-pigames.png' ],
		[ 'overlay', 'img/ui/overlay.png' ],

    [ 'nutrition-bar-background', 'img/ui/nutrition-bar-background.png' ],
    [ 'bush', 'img/assets/bush.png' ],
    [ 'jumping-ninja', 'img/assets/jumping-ninja.png' ],
    [ 'katana', 'img/assets/katana.png' ],
    [ 'shuriken', 'img/assets/shuriken.png' ],
  ],
  'spritesheet': [
    [ 'trees', 'img/assets/trees.png', 766, 1129 ],
    [ 'ninja', 'img/assets/ninja.png', 1272, 1340 ],
		[ 'button-start', 'img/ui/button-start.png', 160, 160 ],
		[ 'button-continue', 'img/ui/button-start.png', 160, 160 ],
		[ 'button-mainmenu', 'img/ui/button-mainmenu.png', 160, 160 ],
		[ 'button-restart', 'img/ui/button-tryagain.png', 160, 160 ],
		[ 'button-credits', 'img/ui/button-credits.png', 160, 160 ],
		[ 'button-pause', 'img/ui/button-pause.png', 160, 160 ],
		[ 'button-audio', 'img/ui/button-sound.png', 160, 160 ],
		[ 'button-back', 'img/button-back.png', 70, 70 ],
		[ 'button-next', 'img/button-next.png', 70, 70 ],
    [ 'nutrition-bar', 'img/ui/nutrition-bar.png', 680, 56 ],
  ],
  'audio': [
		[ 'audio-click', [ 'sfx/click.mp3', 'sfx/click.ogg' ] ],
		[ 'audio-theme', [ 'sfx/jbm.mp3' ] ],
  ],
};

export default class Preloader extends Phaser.State {
  preload() {
    this.add.sprite( ( this.world.width - 580 ) * 0.5, ( this.world.height + 150 ) * 0.5, 'loading-background' );
    const preloadProgress = this.add.sprite( ( this.world.width - 540 ) * 0.5, ( this.world.height + 170 ) * 0.5, 'loading-progress' );
    this.load.setPreloadSprite( preloadProgress );

    this._preloadResources();
  }
  _preloadResources() {
    this.span = document.createElement( 'span' );
    this.span.innerHTML = 'Zażółć';
    this.span.setAttribute( 'style', 'position: absolute; font-family: Arial,  monospace; font-size: 300px; top: -99999px; left: -99999px; opacity: 0;' );
    document.body.appendChild( this.span );
    this.initialFontSize = this.span.clientHeight;
    this.span.style.fontFamily = '"Bromine"';

    for ( const method in resources ) {
      resources[ method ].forEach( ( args ) => {
        const loader = this.load[ method ];
        loader && loader.apply( this.load, args );
      }, this );
    }
  }
  update() {
    if ( this.initialFontSize !== this.span.clientHeight ) {
      document.body.removeChild( this.span );
      this.state.start( 'MainMenu' );
      // this.state.start( 'Game' );
    }
  }
}
