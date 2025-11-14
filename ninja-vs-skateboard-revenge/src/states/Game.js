import GameUI from '../UI/GameUI';
import Ninja from '../objects/Ninja';
import JumpscareNinja from '../objects/JumpscareNinja';
import ShurikenSpawner from '../objects/ShurikenSpawner';

import { NINJA_COLLISION_Y } from '../constants/NinjaConstants';

import ObstacleSpawner from "../objects/ObstacleSpawner";

export default class Game extends Phaser.State {
  create() {
    window.REVOLUTION_SPEED_SAFE_ZONE = 50;
    window.TARGET_REVOLUTION_SPEED = 200;
    window.CURRENT_REVOLUTION_SPEED = 200;

    this.game.add.sprite( 0, 0, 'background' );

    this.gameUI = new GameUI( this );

    this.camera.resetFX();
    this.camera.flash( 0x000000, 500, false );

    this.game.onResume.add( () => {
      if ( this.gameUI.stateStatus !== 'playing' ) {
        this.game.time.events.pause();
      }
    } );

    this.ninja = new Ninja( this.game, 500, NINJA_COLLISION_Y + 400, 'ninja', this.fallOff.bind( this ) );

    this.jumpscareNinja = new JumpscareNinja( this.game );

    this.ShurikenSpawner = new ShurikenSpawner( this.game, this.ninja, this.jumpscareNinja );

    this.ObstacleSpawner = new ObstacleSpawner( this.game, this.ninja.checkForCollision.bind( this.ninja ) );
    this.ObstacleSpawner.onObstacleSpawn.add( () => this.game.world.bringToTop( this.ninja ) );
    this.ObstacleSpawner.initSpawning();

    this.ObstacleSpawner.addPoints.add( this.gameUI.handlePointsAddition.bind( this.gameUI ) );

    this.ninja.onDeath.add( () => this.fallOff( 'WATCH OUT!' ) );

  }

  update() {
    this.gameUI.updateUI();

    if( CURRENT_REVOLUTION_SPEED < TARGET_REVOLUTION_SPEED - REVOLUTION_SPEED_SAFE_ZONE){
      this.jumpscareNinja.showNinja();
      this.ShurikenSpawner.throwShuriken( 'jumpscareNinja' );
      this.gameUI.showSlowDownText( 'SPEED UP!' );
      this.game.time.events.add( Phaser.Timer.SECOND * 2, () => {
        this.gameUI.hideSlowDownText();
        this.jumpscareNinja.destroy();
      } );

      this.gameUI.handlePointsSubstraction();
      CURRENT_REVOLUTION_SPEED = TARGET_REVOLUTION_SPEED;
    } else if( CURRENT_REVOLUTION_SPEED > TARGET_REVOLUTION_SPEED + REVOLUTION_SPEED_SAFE_ZONE){
      this.fallOff('SLOW DOWN!');
    }
  }
  fallOff( msg ){
    if( this.ninja.isOnBoard === false ){
      return;
    }

    this.ObstacleSpawner.pauseObstacles();

    this.game.time.events.pause();
    this.gameUI.showSlowDownText( msg );
    this.gameUI.handlePointsSubstraction();

    this.ninja.fallOff( () => {
      this.gameUI.hideSlowDownText();
      this.ObstacleSpawner.resumeObstacles();
      this.game.time.events.resume();
      CURRENT_REVOLUTION_SPEED = TARGET_REVOLUTION_SPEED;
    } );
  }
}
