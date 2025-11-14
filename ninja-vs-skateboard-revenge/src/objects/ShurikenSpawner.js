import Shuriken from './Shuriken';

export default class ShurikenSpawner {
  constructor( game, player, jumpscareNinja ) {
    this.game = game;
    this.player = player;
    this.jumpscareNinja = jumpscareNinja;
  }

  throwShuriken( from ) {
    const fromChar = ( from === "player" ) ? this.player : this.jumpscareNinja;
    const toChar = ( from === "player" ) ? this.jumpscareNinja : this.player;
    new Shuriken( this.game, fromChar.x, fromChar.y, toChar.x, toChar.y - toChar.height / 2 );
  }
}
