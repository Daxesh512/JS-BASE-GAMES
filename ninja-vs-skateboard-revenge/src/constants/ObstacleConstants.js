export const HORIZON_Y = 254 - 70;
export const SIDE_RAIL_CENTER = 850;
export const SIDE_RAIL_SCALE = 0.1;
export const CENTER_RAIL_SCALE = 0.1;
export const OBSTACLE_VELOCITY_Y = 350;
export const OBSTACLE_VELOCITY_X = 240;

export const LEFT_RAIL_POSITION_X = 543;
export const SIDE_RAIL_WIDTH = 254;
export const CENTER_RAIL_POSITION_X = LEFT_RAIL_POSITION_X + SIDE_RAIL_WIDTH;
export const CENTER_RAIL_WIDTH = 330;
export const RIGHT_RAIL_POSITION_X = CENTER_RAIL_POSITION_X + CENTER_RAIL_WIDTH;

export const TREE_X_OFFSET = 550;

export const RAIL_OPTIONS = ( gameWidth ) => { return [
  {
    x: SIDE_RAIL_CENTER,
    y: HORIZON_Y,
    velocity: {
      y: OBSTACLE_VELOCITY_Y,
      x: -OBSTACLE_VELOCITY_X
    },
    scale: SIDE_RAIL_SCALE
  },
  {
    x: gameWidth / 2,
    y: HORIZON_Y,
    velocity: {
      y: OBSTACLE_VELOCITY_Y,
      x: 0
    },
    scale: CENTER_RAIL_SCALE
  },
  {
    x: gameWidth - SIDE_RAIL_CENTER,
    y: HORIZON_Y,
    velocity: {
      y: OBSTACLE_VELOCITY_Y,
      x: OBSTACLE_VELOCITY_X
    },
    scale: SIDE_RAIL_SCALE,
  }
] };

export const TREES_OPTIONS = ( gameWidth ) => { return [
  {
    x: TREE_X_OFFSET,
    y: HORIZON_Y - 120,
    velocity: {
      y: OBSTACLE_VELOCITY_Y,
      x: -OBSTACLE_VELOCITY_X * 4,
    },
    scale: SIDE_RAIL_SCALE
  },
  {
    x: gameWidth - TREE_X_OFFSET,
    y: HORIZON_Y - 120,
    velocity: {
      y: OBSTACLE_VELOCITY_Y,
      x: OBSTACLE_VELOCITY_X * 4,
    },
    scale: SIDE_RAIL_SCALE,
  }
] };
