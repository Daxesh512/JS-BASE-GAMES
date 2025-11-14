import Obstacle from './Obstacle';
import Coin from './Coin';
import Tree from './Tree';
import { SIDE_RAIL_CENTER, OBSTACLE_VELOCITY_X, OBSTACLE_VELOCITY_Y, SIDE_RAIL_SCALE, CENTER_RAIL_SCALE, RAIL_OPTIONS, TREES_OPTIONS } from '../constants/ObstacleConstants';

export default class ObstacleSpawner {
  constructor( game, ninjaCheckForCollision ) {
    this.game = game;

    this.ninjaCheckForCollision = ninjaCheckForCollision;

    this.obstacles = this.game.add.group();

    this.onObstacleSpawn = new Phaser.Signal();
    this.addPoints = new Phaser.Signal();
  }

  spawnObstacle() {
    let railOptions = RAIL_OPTIONS( this.game.width );
    const index = this.game.rnd.integerInRange( 0, railOptions.length - 1 );
    const currentOption = railOptions[ index ];

    const newObstacle = this.obstacles.add( new Obstacle( this.game, currentOption.x, currentOption.y, currentOption.velocity, currentOption.scale ) );
    newObstacle.onCollisionZoneEnter.add( this.ninjaCheckForCollision );

    railOptions.splice( index, 1 );

    const coinIndex = this.game.rnd.integerInRange( 0, railOptions.length - 1 );
    const currentCoinOption = railOptions[ coinIndex ];

    const newCoin = this.obstacles.add( new Coin( this.game, currentCoinOption.x, currentCoinOption.y, currentCoinOption.velocity, currentCoinOption.scale ) );

    newCoin.onCollisionZoneEnter.add( () => {
      this.addPoints.dispatch();
    } );

    this.onObstacleSpawn.dispatch();
  }

  spawnTree() {
    const treeOptions = TREES_OPTIONS( this.game.width );

    this.obstacles.add( new Tree( this.game, treeOptions[ 0 ].x, treeOptions[ 0 ].y, treeOptions[ 0 ].velocity, treeOptions[ 0 ].scale ) );
    this.obstacles.add( new Tree( this.game, treeOptions[ 1 ].x, treeOptions[ 1 ].y, treeOptions[ 1 ].velocity, treeOptions[ 1 ].scale ) );
  }

  initSpawning() {
    this.spawnObstacle();
    this.game.time.events.loop( Phaser.Timer.SECOND * 2, this.spawnObstacle, this );

    this.spawnTree();
    this.game.time.events.loop( Phaser.Timer.SECOND * 1, this.spawnTree, this );
  }

  pauseObstacles() {
    this.obstacles.forEach( ( obstacle ) => {
      obstacle.oldVelocity = {
        x: obstacle.body.velocity.x,
        y: obstacle.body.velocity.y,
      }
      obstacle.oldAcceleration = {
        x: obstacle.body.acceleration.x,
        y: obstacle.body.acceleration.y,
      }

      obstacle.body.velocity.x = 0;
      obstacle.body.velocity.y = 0;
      obstacle.body.acceleration.x = 0;
      obstacle.body.acceleration.y = 0;
    } );
  }

  resumeObstacles() {
    this.obstacles.forEach( ( obstacle ) => {
      obstacle.body.velocity.x = obstacle.oldVelocity.x;
      obstacle.body.velocity.y = obstacle.oldVelocity.y;
      obstacle.body.acceleration.x = obstacle.oldAcceleration.x;
      obstacle.body.acceleration.y = obstacle.oldAcceleration.y;
    } );
  }
}
