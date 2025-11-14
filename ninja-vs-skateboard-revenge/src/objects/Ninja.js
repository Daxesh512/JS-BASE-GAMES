import { NINJA_HIT_AREA_WIDTH, LEFT, RIGHT, CENTER, VELOCITY, TIME_TO_RECOVER } from '../constants/NinjaConstants';
import { getRailNumberBasedOnPosition } from '../utils/RoadUtils';

export default class Ninja extends Phaser.Sprite{
  constructor( game, x, y, key, externalFallOff ){
    super( game, x, y, key, 1 );

    this.externalFallOff = externalFallOff;

    this.game.physics.enable( this, Phaser.Physics.ARCADE );
    this.game.world.add( this );

    this.body.gravity.y = 400;
    this.body.allowGravity = false;

    this.mouse = this.game.input.activePointer;

    this.anchor.set( 0.5, 1 );
    this.scale.set( 0.33 );

    this.onDeath = new Phaser.Signal();

    this.originY = this.position.y;

    this.isOnBoard = true;

    this.animations.add( 'falling-off', [ 3, 4, 5 ] );
  }
  update(){
    if( this.body.allowGravity === true && this.position.y > this.originY && this.body.velocity.y >= 0 ){
      this.body.allowGravity = false;
      this.position.y = this.originY;
      this.body.velocity.y = 0;
    }

    if( this.isOnBoard ){
      const currentDirection = this.getDirection();
      this.body.velocity.x = currentDirection * VELOCITY;
      this.frame = currentDirection + 1;

      if ( this.game.input.activePointer.isDown ){
         this.jump();
       }
    } else {
      this.body.velocity.x = 0;
    }
  }
  getDirection(){
    if( this.mouse.x + this.game.camera.x < this.position.x - NINJA_HIT_AREA_WIDTH / 2 ){
      return LEFT;
    } else if( this.mouse.x + this.game.camera.x > this.position.x + NINJA_HIT_AREA_WIDTH / 2 ){
      return RIGHT;
    } else {
      return CENTER;
    }
  }
  checkForCollision( obstacle ){
    console.log( obstacle.x, this.x );
    const obstacleRail = getRailNumberBasedOnPosition( obstacle.x );
    const ninjaRail = getRailNumberBasedOnPosition( this.x );
    console.log(obstacleRail, ninjaRail);
    if( obstacleRail === ninjaRail && this.body.allowGravity === false ){
      this.handleDeath();
    }
  }
  handleDeath(){
    this.onDeath.dispatch();
  }
  jump(){
    if( this.body.allowGravity === false ){
    this.body.velocity.y = -300;
    this.body.allowGravity = true;
    }
  }
  fallOff( onGetBackCallBack ){
    this.animations.play( 'falling-off', 6 );
    this.isOnBoard = false;
    window.setTimeout( () => {
      this.getBackOnBoard();
      onGetBackCallBack();
    }, TIME_TO_RECOVER );
  }
  getBackOnBoard(){
    this.isOnBoard = true;
  }
}
