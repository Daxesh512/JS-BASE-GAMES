import { LEFT_RAIL_POSITION_X, SIDE_RAIL_WIDTH, RIGHT_RAIL_POSITION_X, CENTER_RAIL_WIDTH, CENTER_RAIL_POSITION_X } from '../constants/ObstacleConstants';
import { LEFT, RIGHT, CENTER } from '../constants/NinjaConstants';

export function getRailNumberBasedOnPosition( x ){
  console.log( LEFT_RAIL_POSITION_X, CENTER_RAIL_POSITION_X, RIGHT_RAIL_POSITION_X, );
  if( x >= RIGHT_RAIL_POSITION_X ){
    return RIGHT;
  } else if( x < RIGHT_RAIL_POSITION_X && x >= CENTER_RAIL_POSITION_X ){
    return CENTER;
  } else {
    return LEFT;
  }
}
