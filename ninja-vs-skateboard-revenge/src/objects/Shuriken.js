export default class Shuriken extends Phaser.Sprite {
  constructor( game, xStart, yStart, xEnd, yEnd ) {
    super( game, xStart, yStart, 'shuriken' )

    this.scale.setTo( 0.2 );
    this.anchor.setTo( 0.5, 0 );

    this.game.world.add( this );

    const tween = this.game.add.tween( this );
    tween.to( { x: xEnd, y: yEnd, angle: 720 }, 600, 'Linear', true );
    tween.onComplete.add( () => {
      this.destroy();
    } )
  }
}
