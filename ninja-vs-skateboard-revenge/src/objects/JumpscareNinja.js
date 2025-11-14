export default class JumpscareNinja extends Phaser.Sprite {
  constructor( game ) {
    super( game, game.world.width + 10, 0, 'jumping-ninja' );

    this.anchor.setTo( 1, 0 );
  }
  showNinja(){
    this.game.world.add( this );
  }
}
