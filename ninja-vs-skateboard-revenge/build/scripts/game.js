(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _UIConstants = require('../constants/UIConstants');

var _AudioManager = require('../utils/AudioManager');

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _StorageManager = require('../utils/StorageManager');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var GameUI = function () {
  function GameUI(state) {
    _classCallCheck(this, GameUI);

    this.state = state;
    this.game = state.game;

    this.stateStatus = 'playing';

    this.score = 100;
    this.runOnce = false;
    this.gamePaused = false;

    this.initScore();
    this.initPauseScreen();
    this.initGameoverScreen();
    this.initSlowDownText();
  }

  _createClass(GameUI, [{
    key: 'initScore',
    value: function initScore() {
      this.textScore = new _Text2.default(this.game, 30, this.game.world.height - 20, (0, _UIConstants.SCORE_TEMPLATE)(this.score), _UIConstants.SCORE_FONT, [0, 1]);
    }
  }, {
    key: 'initPauseScreen',
    value: function initPauseScreen() {
      this.buttonPause = this.game.add.button(this.game.world.width - _UIConstants.BUTTON_PADDING, _UIConstants.BUTTON_PADDING, 'button-pause', this.managePause, this, 1, 0, 2);
      this.buttonPause.anchor.set(1, 0);
      this.buttonPause.input.priorityID = 0;

      this.buttonPause.y = -this.buttonPause.height - _UIConstants.BUTTON_PADDING;
      this.game.add.tween(this.buttonPause).to({ y: _UIConstants.BUTTON_PADDING }, 1000, Phaser.Easing.Exponential.Out, true);

      this.screenPausedGroup = this.game.add.group();
      this.screenPausedBg = this.game.add.sprite(0, 0, 'overlay');
      this.screenPausedBg.scale.setTo(2);

      this.screenPausedText = new _Text2.default(this.game, 'center', 'center', 'Paused', _UIConstants.PAUSE_TITLE_FONT);

      this.buttonAudio = this.game.add.button(this.game.world.width - _UIConstants.BUTTON_PADDING, _UIConstants.BUTTON_PADDING, 'button-audio', this.clickAudio, this, 1, 0, 2);
      this.buttonAudio.anchor.set(1, 0);
      this.buttonAudio.setFrames((0, _AudioManager.getAudioOffset)() + 1, (0, _AudioManager.getAudioOffset)() + 0, (0, _AudioManager.getAudioOffset)() + 2);

      this.screenPausedBack = this.game.add.button(_UIConstants.BUTTON_PADDING, this.game.world.height - _UIConstants.BUTTON_PADDING, 'button-mainmenu', this.stateBack, this, 1, 0, 2);
      this.screenPausedBack.anchor.set(0, 1);

      this.screenPausedContinue = this.game.add.button(this.game.world.width - _UIConstants.BUTTON_PADDING, this.game.world.height - _UIConstants.BUTTON_PADDING, 'button-continue', this.managePause, this, 1, 0, 2);
      this.screenPausedContinue.anchor.set(1, 1);

      this.screenPausedGroup.add(this.screenPausedBg);
      this.screenPausedGroup.add(this.screenPausedText);
      this.screenPausedGroup.add(this.buttonAudio);
      this.screenPausedGroup.add(this.screenPausedBack);
      this.screenPausedGroup.add(this.screenPausedContinue);
      this.screenPausedGroup.alpha = 0;
      this.screenPausedGroup.visible = false;
    }
  }, {
    key: 'initGameoverScreen',
    value: function initGameoverScreen() {
      this.screenGameoverGroup = this.game.add.group();
      this.screenGameoverBg = this.game.add.sprite(0, 0, 'overlay');
      this.screenGameoverBg.scale.setTo(2);
      this.screenGameoverBg.inputEnabled = true;
      this.screenGameoverBg.input.priorityID = 1;

      this.screenGameoverText = new _Text2.default(this.game, 'center', 100, 'Game over', _UIConstants.GAMEOVER_TITLE_FONT);

      this.screenGameoverBack = this.game.add.button(_UIConstants.BUTTON_PADDING, this.game.world.height - _UIConstants.BUTTON_PADDING, 'button-mainmenu', this.stateBack, this, 1, 0, 2);
      this.screenGameoverBack.anchor.set(0, 1);
      this.screenGameoverBack.input.priorityID = 2;

      this.screenGameoverRestart = this.game.add.button(this.game.world.width - _UIConstants.BUTTON_PADDING, this.game.world.height - _UIConstants.BUTTON_PADDING, 'button-restart', this.stateRestart, this, 1, 0, 2);
      this.screenGameoverRestart.anchor.set(1, 1);
      this.screenGameoverRestart.anchor.set(1, 1);
      this.screenGameoverRestart.input.priorityID = 2;

      this.screenGameoverScore = new _Text2.default(this.game, 'center', 'center', 'Score: ' + this.score, _UIConstants.GAMEOVER_SCORE_FONT);

      this.screenGameoverGroup.add(this.screenGameoverBg);
      this.screenGameoverGroup.add(this.screenGameoverText);
      this.screenGameoverGroup.add(this.screenGameoverBack);
      this.screenGameoverGroup.add(this.screenGameoverRestart);
      this.screenGameoverGroup.add(this.screenGameoverScore);
      this.screenGameoverGroup.alpha = 0;
      this.screenGameoverGroup.visible = false;
    }
  }, {
    key: 'initSlowDownText',
    value: function initSlowDownText() {
      this.slowDownText = new _Text2.default(this.game, 'center', 100, 'SLOW DOWN!', _UIConstants.GAMEOVER_TITLE_FONT);
      this.slowDownText.alpha = 0;
    }
  }, {
    key: 'showSlowDownText',
    value: function showSlowDownText(msg) {
      this.slowDownText.setText(msg);
      this.game.world.bringToTop(this.slowDownText);
      this.game.add.tween(this.slowDownText).to({ alpha: 1 }, 500, 'Linear', true);
    }
  }, {
    key: 'hideSlowDownText',
    value: function hideSlowDownText() {
      this.game.add.tween(this.slowDownText).to({ alpha: 0 }, 500, 'Linear', true);
    }
  }, {
    key: 'updateUI',
    value: function updateUI() {
      switch (this.stateStatus) {
        case 'paused':
          {
            if (!this.runOnce) {
              this.statePaused();
              this.runOnce = true;
            }
            break;
          }
        case 'gameover':
          {
            if (!this.runOnce) {
              this.stateGameover();
              this.runOnce = true;
            }
            break;
          }
        case 'playing':
          {
            if (!this.runOnce) {
              this.statePlaying();
              this.runOnce = true;
            }
          }
      }
    }
  }, {
    key: 'handlePointsAddition',
    value: function handlePointsAddition() {
      this.score++;
      this.textScore.setText((0, _UIConstants.SCORE_TEMPLATE)(this.score));
    }
  }, {
    key: 'handlePointsSubstraction',
    value: function handlePointsSubstraction() {
      this.score = Math.max(this.score - 10, 0);
      this.textScore.setText((0, _UIConstants.SCORE_TEMPLATE)(this.score));
    }
  }, {
    key: 'managePause',
    value: function managePause() {
      if (!this.screenGameoverGroup.visible) {
        this.gamePaused = !this.gamePaused;
        (0, _AudioManager.playAudio)('click');
        if (this.gamePaused) {
          this.game.world.bringToTop(this.screenPausedGroup);
          this.stateStatus = 'paused';
          this.runOnce = false;
          this.game.time.events.pause();
        } else {
          this.stateStatus = 'playing';
          this.runOnce = false;
          this.game.time.events.resume();
        }
      }
    }
  }, {
    key: 'statePlaying',
    value: function statePlaying() {
      var _this = this;

      var tween = this.game.add.tween(this.screenPausedGroup);
      tween.to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
      tween.onComplete.add(function () {
        if (_this.screenPausedGroup.visible) {
          _this.screenPausedGroup.visible = false;
        }
      }, this);
    }
  }, {
    key: 'statePaused',
    value: function statePaused() {
      this.screenPausedGroup.visible = true;
      var tween = this.game.add.tween(this.screenPausedGroup);
      tween.to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true);
    }
  }, {
    key: 'stateBack',
    value: function stateBack() {
      (0, _AudioManager.playAudio)('click');
      this.screenGameoverGroup.visible = false;
      this.gamePaused = false;
      this.runOnce = false;
      this.stateStatus = 'playing';
      this.game.time.events.resume();
      this.state.state.start('MainMenu');
    }
  }, {
    key: 'stateGameover',
    value: function stateGameover() {
      this.stateStatus = 'gameover';
      this.game.time.events.pause();
      this.game.world.bringToTop(this.screenGameoverGroup);
      this.screenGameoverScore.setText('You have survived for ' + Math.floor(this.score) + ' seconds');

      this.screenGameoverGroup.visible = true;
      var tween = this.game.add.tween(this.screenGameoverGroup);
      tween.to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true);

      _StorageManager.PPTStorage.setHighscore('PPT-highscore', this.score);
    }
  }, {
    key: 'stateRestart',
    value: function stateRestart() {
      (0, _AudioManager.playAudio)('click');
      this.screenGameoverGroup.visible = false;
      this.gamePaused = false;
      this.runOnce = false;
      this.stateStatus = 'playing';
      this.game.time.events.resume();
      this.state.state.restart(true);
    }
  }, {
    key: 'clickAudio',
    value: function clickAudio() {
      (0, _AudioManager.playAudio)('click');
      (0, _AudioManager.manageAudio)('switch', this);
    }
  }]);

  return GameUI;
}();

exports.default = GameUI;

},{"../constants/UIConstants":5,"../utils/AudioManager":22,"../utils/StorageManager":24,"./Text":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Text = function (_Phaser$Text) {
  _inherits(Text, _Phaser$Text);

  function Text(game) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var text = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var style = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var anchor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [0, 0];

    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, game, x, y, text, style));

    var newAnchor = anchor;

    if (x === 'center') {
      _this.x = game.world.centerX;
      newAnchor[0] = newAnchor[0] || 0.5;
    }

    if (y === 'center') {
      _this.y = game.world.centerY;
      newAnchor[1] = newAnchor[1] || 0.5;
    }

    if (style.shadow) {
      var shadow = style.shadow.match(/rgba\(.+\)|[^ ]+/g);
      _this.setShadow.apply(_this, shadow);
    }

    _this.anchor.setTo(newAnchor[0], newAnchor[1]);
    game.add.existing(_this);
    return _this;
  }

  return Text;
}(Phaser.Text);

exports.default = Text;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NINJA_HIT_AREA_WIDTH = exports.NINJA_HIT_AREA_WIDTH = 650;
var NINJA_COLLISION_Y = exports.NINJA_COLLISION_Y = 680;

var LEFT = exports.LEFT = -1;
var CENTER = exports.CENTER = 0;
var RIGHT = exports.RIGHT = 1;

var VELOCITY = exports.VELOCITY = 500;

var TIME_TO_RECOVER = exports.TIME_TO_RECOVER = 4000;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var HORIZON_Y = exports.HORIZON_Y = 254 - 70;
var SIDE_RAIL_CENTER = exports.SIDE_RAIL_CENTER = 850;
var SIDE_RAIL_SCALE = exports.SIDE_RAIL_SCALE = 0.1;
var CENTER_RAIL_SCALE = exports.CENTER_RAIL_SCALE = 0.1;
var OBSTACLE_VELOCITY_Y = exports.OBSTACLE_VELOCITY_Y = 350;
var OBSTACLE_VELOCITY_X = exports.OBSTACLE_VELOCITY_X = 240;

var LEFT_RAIL_POSITION_X = exports.LEFT_RAIL_POSITION_X = 543;
var SIDE_RAIL_WIDTH = exports.SIDE_RAIL_WIDTH = 254;
var CENTER_RAIL_POSITION_X = exports.CENTER_RAIL_POSITION_X = LEFT_RAIL_POSITION_X + SIDE_RAIL_WIDTH;
var CENTER_RAIL_WIDTH = exports.CENTER_RAIL_WIDTH = 330;
var RIGHT_RAIL_POSITION_X = exports.RIGHT_RAIL_POSITION_X = CENTER_RAIL_POSITION_X + CENTER_RAIL_WIDTH;

var TREE_X_OFFSET = exports.TREE_X_OFFSET = 550;

var RAIL_OPTIONS = exports.RAIL_OPTIONS = function RAIL_OPTIONS(gameWidth) {
  return [{
    x: SIDE_RAIL_CENTER,
    y: HORIZON_Y,
    velocity: {
      y: OBSTACLE_VELOCITY_Y,
      x: -OBSTACLE_VELOCITY_X
    },
    scale: SIDE_RAIL_SCALE
  }, {
    x: gameWidth / 2,
    y: HORIZON_Y,
    velocity: {
      y: OBSTACLE_VELOCITY_Y,
      x: 0
    },
    scale: CENTER_RAIL_SCALE
  }, {
    x: gameWidth - SIDE_RAIL_CENTER,
    y: HORIZON_Y,
    velocity: {
      y: OBSTACLE_VELOCITY_Y,
      x: OBSTACLE_VELOCITY_X
    },
    scale: SIDE_RAIL_SCALE
  }];
};

var TREES_OPTIONS = exports.TREES_OPTIONS = function TREES_OPTIONS(gameWidth) {
  return [{
    x: TREE_X_OFFSET,
    y: HORIZON_Y - 120,
    velocity: {
      y: OBSTACLE_VELOCITY_Y,
      x: -OBSTACLE_VELOCITY_X * 4
    },
    scale: SIDE_RAIL_SCALE
  }, {
    x: gameWidth - TREE_X_OFFSET,
    y: HORIZON_Y - 120,
    velocity: {
      y: OBSTACLE_VELOCITY_Y,
      x: OBSTACLE_VELOCITY_X * 4
    },
    scale: SIDE_RAIL_SCALE
  }];
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BACKGROUND_COLOR = exports.BACKGROUND_COLOR = '#3a3537';

var BUTTON_PADDING = exports.BUTTON_PADDING = 20;

var STORY_FONT = exports.STORY_FONT = { font: '88px "Bromine"', fill: '#fff', shadow: '0 0 rgba(0, 0, 0, 0.5) 10' };

var SCORE_FONT = exports.SCORE_FONT = { font: '64px "Bromine"', fill: '#fff', shadow: '0 0 rgba(0, 0, 0, 0.5) 10' };
var SCORE_TEMPLATE = exports.SCORE_TEMPLATE = function SCORE_TEMPLATE(time) {
  return 'GOLD KATANAS: ' + time;
};

var PAUSE_TITLE_FONT = exports.PAUSE_TITLE_FONT = { font: '112px "Bromine"', fill: '#fff', shadow: '0 0 rgba(0, 0, 0, 0.5) 30' };

var GAMEOVER_TITLE_FONT = exports.GAMEOVER_TITLE_FONT = { font: '112px "Bromine"', fill: '#fff', shadow: '0 0 rgba(0, 0, 0, 0.5) 10' };
var GAMEOVER_SCORE_FONT = exports.GAMEOVER_SCORE_FONT = { font: '64px "Bromine"', fill: '#fff', align: 'center', shadow: '0 0 rgba(0, 0, 0, 0.5) 10' };

var MENU_HIGHSCORE_FONT = exports.MENU_HIGHSCORE_FONT = { font: '56px "Bromine"', fill: '#fff', align: 'center', shadow: '0 0 rgba(0, 0, 0, 0.5) 10' };

var CREDITS_TITLE_FONT = exports.CREDITS_TITLE_FONT = { font: '128px "Bromine"', fill: '#fff', align: 'center', shadow: '0 0 rgba(0, 0, 0, 0.5) 10' };
var CREDITS_FONT = exports.CREDITS_FONT = { font: '56px "Bromine"', fill: '#fff', align: 'center', shadow: '0 0 rgba(0, 0, 0, 0.5) 10' };
var CREDITS_FONT_SOUNDS = exports.CREDITS_FONT_SOUNDS = { font: '36px "Bromine"', fill: '#fff', align: 'center', shadow: '0 0 rgba(0, 0, 0, 0.5) 10' };

},{}],6:[function(require,module,exports){
'use strict';

var _states = require('./states');

var _states2 = _interopRequireDefault(_states);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var game = new Phaser.Game(1920, 1280, Phaser.AUTO);
var states = {
  'Boot': _states2.default.Boot,
  'Preloader': _states2.default.Preloader,
  'MainMenu': _states2.default.MainMenu,
  'Credits': _states2.default.Credits,
  'Story': _states2.default.Story,
  'Game': _states2.default.Game
};
for (var stateName in states) {
  game.state.add(stateName, states[stateName]);
}
game.state.start('Boot');

},{"./states":21}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _NinjaConstants = require('../constants/NinjaConstants');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Coin = function (_Phaser$Sprite) {
  _inherits(Coin, _Phaser$Sprite);

  function Coin(game, x, y, velocity, initScale) {
    _classCallCheck(this, Coin);

    var _this = _possibleConstructorReturn(this, (Coin.__proto__ || Object.getPrototypeOf(Coin)).call(this, game, x, y, 'katana'));

    _this.initScale = initScale;

    _this.sentSignal = false;
    _this.onCollisionZoneEnter = new Phaser.Signal();

    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.game.physics.setBoundsToWorld();

    _this.anchor.setTo(0.5, 0);

    _this.scale.setTo(_this.initScale);

    _this.body.acceleration.y = velocity.y;
    _this.body.acceleration.x = velocity.x;

    _this.checkWorldBounds = true;

    _this.events.onOutOfBounds.add(function () {
      _this.destroy();
    }, _this);

    _this.game.world.add(_this);
    return _this;
  }

  _createClass(Coin, [{
    key: 'update',
    value: function update() {
      this.scale.setTo(((1 - this.initScale) * (this.body.y / this.game.world.height) + this.initScale) * 0.8);

      if (!this.sentSignal && this.body.y >= _NinjaConstants.NINJA_COLLISION_Y) {
        this.sentSignal = true;
        this.onCollisionZoneEnter.dispatch(this);
        this.game.world.bringToTop(this);
        this.destroy();
      }
    }
  }]);

  return Coin;
}(Phaser.Sprite);

exports.default = Coin;

},{"../constants/NinjaConstants":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var JumpscareNinja = function (_Phaser$Sprite) {
  _inherits(JumpscareNinja, _Phaser$Sprite);

  function JumpscareNinja(game) {
    _classCallCheck(this, JumpscareNinja);

    var _this = _possibleConstructorReturn(this, (JumpscareNinja.__proto__ || Object.getPrototypeOf(JumpscareNinja)).call(this, game, game.world.width + 10, 0, 'jumping-ninja'));

    _this.anchor.setTo(1, 0);
    return _this;
  }

  _createClass(JumpscareNinja, [{
    key: 'showNinja',
    value: function showNinja() {
      this.game.world.add(this);
    }
  }]);

  return JumpscareNinja;
}(Phaser.Sprite);

exports.default = JumpscareNinja;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _NinjaConstants = require('../constants/NinjaConstants');

var _RoadUtils = require('../utils/RoadUtils');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Ninja = function (_Phaser$Sprite) {
  _inherits(Ninja, _Phaser$Sprite);

  function Ninja(game, x, y, key, externalFallOff) {
    _classCallCheck(this, Ninja);

    var _this = _possibleConstructorReturn(this, (Ninja.__proto__ || Object.getPrototypeOf(Ninja)).call(this, game, x, y, key, 1));

    _this.externalFallOff = externalFallOff;

    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.game.world.add(_this);

    _this.body.gravity.y = 400;
    _this.body.allowGravity = false;

    _this.mouse = _this.game.input.activePointer;

    _this.anchor.set(0.5, 1);
    _this.scale.set(0.33);

    _this.onDeath = new Phaser.Signal();

    _this.originY = _this.position.y;

    _this.isOnBoard = true;

    _this.animations.add('falling-off', [3, 4, 5]);
    return _this;
  }

  _createClass(Ninja, [{
    key: 'update',
    value: function update() {
      if (this.body.allowGravity === true && this.position.y > this.originY && this.body.velocity.y >= 0) {
        this.body.allowGravity = false;
        this.position.y = this.originY;
        this.body.velocity.y = 0;
      }

      if (this.isOnBoard) {
        var currentDirection = this.getDirection();
        this.body.velocity.x = currentDirection * _NinjaConstants.VELOCITY;
        this.frame = currentDirection + 1;

        if (this.game.input.activePointer.isDown) {
          this.jump();
        }
      } else {
        this.body.velocity.x = 0;
      }
    }
  }, {
    key: 'getDirection',
    value: function getDirection() {
      if (this.mouse.x + this.game.camera.x < this.position.x - _NinjaConstants.NINJA_HIT_AREA_WIDTH / 2) {
        return _NinjaConstants.LEFT;
      } else if (this.mouse.x + this.game.camera.x > this.position.x + _NinjaConstants.NINJA_HIT_AREA_WIDTH / 2) {
        return _NinjaConstants.RIGHT;
      } else {
        return _NinjaConstants.CENTER;
      }
    }
  }, {
    key: 'checkForCollision',
    value: function checkForCollision(obstacle) {
      console.log(obstacle.x, this.x);
      var obstacleRail = (0, _RoadUtils.getRailNumberBasedOnPosition)(obstacle.x);
      var ninjaRail = (0, _RoadUtils.getRailNumberBasedOnPosition)(this.x);
      console.log(obstacleRail, ninjaRail);
      if (obstacleRail === ninjaRail && this.body.allowGravity === false) {
        this.handleDeath();
      }
    }
  }, {
    key: 'handleDeath',
    value: function handleDeath() {
      this.onDeath.dispatch();
    }
  }, {
    key: 'jump',
    value: function jump() {
      if (this.body.allowGravity === false) {
        this.body.velocity.y = -300;
        this.body.allowGravity = true;
      }
    }
  }, {
    key: 'fallOff',
    value: function fallOff(onGetBackCallBack) {
      var _this2 = this;

      this.animations.play('falling-off', 6);
      this.isOnBoard = false;
      window.setTimeout(function () {
        _this2.getBackOnBoard();
        onGetBackCallBack();
      }, _NinjaConstants.TIME_TO_RECOVER);
    }
  }, {
    key: 'getBackOnBoard',
    value: function getBackOnBoard() {
      this.isOnBoard = true;
    }
  }]);

  return Ninja;
}(Phaser.Sprite);

exports.default = Ninja;

},{"../constants/NinjaConstants":3,"../utils/RoadUtils":23}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _NinjaConstants = require('../constants/NinjaConstants');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Obstacle = function (_Phaser$Sprite) {
  _inherits(Obstacle, _Phaser$Sprite);

  function Obstacle(game, x, y, velocity, initScale) {
    _classCallCheck(this, Obstacle);

    var _this = _possibleConstructorReturn(this, (Obstacle.__proto__ || Object.getPrototypeOf(Obstacle)).call(this, game, x, y, 'bush'));

    _this.initScale = initScale;

    _this.sentSignal = false;
    _this.onCollisionZoneEnter = new Phaser.Signal();

    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.game.physics.setBoundsToWorld();

    _this.anchor.setTo(0.5, 0);

    _this.scale.setTo(_this.initScale);

    _this.body.acceleration.y = velocity.y;
    _this.body.acceleration.x = velocity.x;

    _this.checkWorldBounds = true;

    _this.events.onOutOfBounds.add(function () {
      _this.destroy();
    }, _this);

    _this.game.world.add(_this);
    return _this;
  }

  _createClass(Obstacle, [{
    key: 'update',
    value: function update() {
      this.scale.setTo(((1 - this.initScale) * (this.body.y / this.game.world.height) + this.initScale) * 1);

      if (!this.sentSignal && this.body.y >= _NinjaConstants.NINJA_COLLISION_Y) {
        this.sentSignal = true;
        this.onCollisionZoneEnter.dispatch(this);
        this.game.world.bringToTop(this);
      }
    }
  }]);

  return Obstacle;
}(Phaser.Sprite);

exports.default = Obstacle;

},{"../constants/NinjaConstants":3}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Obstacle = require('./Obstacle');

var _Obstacle2 = _interopRequireDefault(_Obstacle);

var _Coin = require('./Coin');

var _Coin2 = _interopRequireDefault(_Coin);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

var _ObstacleConstants = require('../constants/ObstacleConstants');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var ObstacleSpawner = function () {
  function ObstacleSpawner(game, ninjaCheckForCollision) {
    _classCallCheck(this, ObstacleSpawner);

    this.game = game;

    this.ninjaCheckForCollision = ninjaCheckForCollision;

    this.obstacles = this.game.add.group();

    this.onObstacleSpawn = new Phaser.Signal();
    this.addPoints = new Phaser.Signal();
  }

  _createClass(ObstacleSpawner, [{
    key: 'spawnObstacle',
    value: function spawnObstacle() {
      var _this = this;

      var railOptions = (0, _ObstacleConstants.RAIL_OPTIONS)(this.game.width);
      var index = this.game.rnd.integerInRange(0, railOptions.length - 1);
      var currentOption = railOptions[index];

      var newObstacle = this.obstacles.add(new _Obstacle2.default(this.game, currentOption.x, currentOption.y, currentOption.velocity, currentOption.scale));
      newObstacle.onCollisionZoneEnter.add(this.ninjaCheckForCollision);

      railOptions.splice(index, 1);

      var coinIndex = this.game.rnd.integerInRange(0, railOptions.length - 1);
      var currentCoinOption = railOptions[coinIndex];

      var newCoin = this.obstacles.add(new _Coin2.default(this.game, currentCoinOption.x, currentCoinOption.y, currentCoinOption.velocity, currentCoinOption.scale));

      newCoin.onCollisionZoneEnter.add(function () {
        _this.addPoints.dispatch();
      });

      this.onObstacleSpawn.dispatch();
    }
  }, {
    key: 'spawnTree',
    value: function spawnTree() {
      var treeOptions = (0, _ObstacleConstants.TREES_OPTIONS)(this.game.width);

      this.obstacles.add(new _Tree2.default(this.game, treeOptions[0].x, treeOptions[0].y, treeOptions[0].velocity, treeOptions[0].scale));
      this.obstacles.add(new _Tree2.default(this.game, treeOptions[1].x, treeOptions[1].y, treeOptions[1].velocity, treeOptions[1].scale));
    }
  }, {
    key: 'initSpawning',
    value: function initSpawning() {
      this.spawnObstacle();
      this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnObstacle, this);

      this.spawnTree();
      this.game.time.events.loop(Phaser.Timer.SECOND * 1, this.spawnTree, this);
    }
  }, {
    key: 'pauseObstacles',
    value: function pauseObstacles() {
      this.obstacles.forEach(function (obstacle) {
        obstacle.oldVelocity = {
          x: obstacle.body.velocity.x,
          y: obstacle.body.velocity.y
        };
        obstacle.oldAcceleration = {
          x: obstacle.body.acceleration.x,
          y: obstacle.body.acceleration.y
        };

        obstacle.body.velocity.x = 0;
        obstacle.body.velocity.y = 0;
        obstacle.body.acceleration.x = 0;
        obstacle.body.acceleration.y = 0;
      });
    }
  }, {
    key: 'resumeObstacles',
    value: function resumeObstacles() {
      this.obstacles.forEach(function (obstacle) {
        obstacle.body.velocity.x = obstacle.oldVelocity.x;
        obstacle.body.velocity.y = obstacle.oldVelocity.y;
        obstacle.body.acceleration.x = obstacle.oldAcceleration.x;
        obstacle.body.acceleration.y = obstacle.oldAcceleration.y;
      });
    }
  }]);

  return ObstacleSpawner;
}();

exports.default = ObstacleSpawner;

},{"../constants/ObstacleConstants":4,"./Coin":7,"./Obstacle":10,"./Tree":14}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Shuriken = function (_Phaser$Sprite) {
  _inherits(Shuriken, _Phaser$Sprite);

  function Shuriken(game, xStart, yStart, xEnd, yEnd) {
    _classCallCheck(this, Shuriken);

    var _this = _possibleConstructorReturn(this, (Shuriken.__proto__ || Object.getPrototypeOf(Shuriken)).call(this, game, xStart, yStart, 'shuriken'));

    _this.scale.setTo(0.2);
    _this.anchor.setTo(0.5, 0);

    _this.game.world.add(_this);

    var tween = _this.game.add.tween(_this);
    tween.to({ x: xEnd, y: yEnd, angle: 720 }, 600, 'Linear', true);
    tween.onComplete.add(function () {
      _this.destroy();
    });
    return _this;
  }

  return Shuriken;
}(Phaser.Sprite);

exports.default = Shuriken;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Shuriken = require("./Shuriken");

var _Shuriken2 = _interopRequireDefault(_Shuriken);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var ShurikenSpawner = function () {
  function ShurikenSpawner(game, player, jumpscareNinja) {
    _classCallCheck(this, ShurikenSpawner);

    this.game = game;
    this.player = player;
    this.jumpscareNinja = jumpscareNinja;
  }

  _createClass(ShurikenSpawner, [{
    key: "throwShuriken",
    value: function throwShuriken(from) {
      var fromChar = from === "player" ? this.player : this.jumpscareNinja;
      var toChar = from === "player" ? this.jumpscareNinja : this.player;
      new _Shuriken2.default(this.game, fromChar.x, fromChar.y, toChar.x, toChar.y - toChar.height / 2);
    }
  }]);

  return ShurikenSpawner;
}();

exports.default = ShurikenSpawner;

},{"./Shuriken":12}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _NinjaConstants = require('../constants/NinjaConstants');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Tree = function (_Phaser$Sprite) {
  _inherits(Tree, _Phaser$Sprite);

  function Tree(game, x, y, velocity, initScale) {
    _classCallCheck(this, Tree);

    var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, game, x, y, 'trees', game.rnd.integerInRange(2, 3)));

    _this.initScale = initScale;

    _this.sentSignal = false;
    _this.onCollisionZoneEnter = new Phaser.Signal();

    _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
    _this.game.physics.setBoundsToWorld();

    _this.anchor.setTo(0.5, 0);

    _this.scale.setTo(_this.initScale);

    _this.body.acceleration.y = velocity.y;
    _this.body.acceleration.x = velocity.x;

    _this.checkWorldBounds = true;

    _this.events.onOutOfBounds.add(function () {
      _this.destroy();
    }, _this);

    _this.game.world.add(_this);
    return _this;
  }

  _createClass(Tree, [{
    key: 'update',
    value: function update() {
      this.scale.setTo(((1 - this.initScale) * (this.body.y / this.game.world.height) + this.initScale) * 0.8 * 2);

      if (!this.sentSignal && this.body.y >= _NinjaConstants.NINJA_COLLISION_Y) {
        this.sentSignal = true;
        this.onCollisionZoneEnter.dispatch(this);
        this.game.world.bringToTop(this);
        this.destroy();
      }
    }
  }]);

  return Tree;
}(Phaser.Sprite);

exports.default = Tree;

},{"../constants/NinjaConstants":3}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _UIConstants = require('../constants/UIConstants');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Boot = function (_Phaser$State) {
  _inherits(Boot, _Phaser$State);

  function Boot() {
    _classCallCheck(this, Boot);

    return _possibleConstructorReturn(this, (Boot.__proto__ || Object.getPrototypeOf(Boot)).apply(this, arguments));
  }

  _createClass(Boot, [{
    key: 'preload',
    value: function preload() {
      this.game.stage.backgroundColor = _UIConstants.BACKGROUND_COLOR;
      this.game.load.image('loading-background', 'img/loading-background.png');
      this.game.load.image('loading-progress', 'img/loading-progress.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      this.game.state.start('Preloader');
    }
  }]);

  return Boot;
}(Phaser.State);

exports.default = Boot;

},{"../constants/UIConstants":5}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _UIConstants = require('../constants/UIConstants');

var _AudioManager = require('../utils/AudioManager');

var _Text = require('../UI/Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Wiki = function (_Phaser$State) {
  _inherits(Wiki, _Phaser$State);

  function Wiki() {
    _classCallCheck(this, Wiki);

    return _possibleConstructorReturn(this, (Wiki.__proto__ || Object.getPrototypeOf(Wiki)).apply(this, arguments));
  }

  _createClass(Wiki, [{
    key: 'create',
    value: function create() {
      this.camera.resetFX();
      this.camera.flash(0x000000, 500, false);

      var textGroup = this.game.add.group();

      var creditsTitle = new _Text2.default(this.game, 'center', 0, 'Credits:', _UIConstants.CREDITS_TITLE_FONT);
      var creditsText = new _Text2.default(this.game, 'center', 0, 'Bartek „bibixx” Legięć\nKacper Pietrzak', _UIConstants.CREDITS_FONT);
      var creditsTextSound = new _Text2.default(this.game, 'center', 0, '\nSounds\n„Farty McSty”\nby Eric Matyas\nwww.soundimage.org\n\n„Click2 Sound”\nby Sebastian\nwww.soundbible.com', _UIConstants.CREDITS_FONT_SOUNDS);

      var heightSum = creditsTitle.height + creditsText.height + creditsTextSound.height;
      var heightDelta = (this.game.height - heightSum) / 2;

      creditsTitle.y += heightDelta;
      creditsText.y += creditsTitle.height + creditsTitle.y;
      creditsTextSound.y += creditsText.y + creditsText.height;

      textGroup.add(creditsText);
      textGroup.add(creditsTextSound);

      textGroup.x = 0;

      var buttonMainMenu = this.add.button(this.world.width - 20, this.world.height - 20, 'button-mainmenu', this.clickBack, this, 1, 0, 2);
      buttonMainMenu.anchor.set(1);

      buttonMainMenu.x = this.world.width + buttonMainMenu.width + _UIConstants.BUTTON_PADDING;
      this.add.tween(buttonMainMenu).to({ x: this.world.width - _UIConstants.BUTTON_PADDING }, 500, Phaser.Easing.Exponential.Out, true);
    }
  }, {
    key: 'clickBack',
    value: function clickBack() {
      var _this2 = this;

      (0, _AudioManager.playAudio)('click');
      this.camera.fade(0x000000, 200, false);
      this.time.events.add(200, function () {
        _this2.game.state.start('MainMenu');
      });
    }
  }]);

  return Wiki;
}(Phaser.State);

exports.default = Wiki;

},{"../UI/Text":2,"../constants/UIConstants":5,"../utils/AudioManager":22}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _GameUI = require('../UI/GameUI');

var _GameUI2 = _interopRequireDefault(_GameUI);

var _Ninja = require('../objects/Ninja');

var _Ninja2 = _interopRequireDefault(_Ninja);

var _JumpscareNinja = require('../objects/JumpscareNinja');

var _JumpscareNinja2 = _interopRequireDefault(_JumpscareNinja);

var _ShurikenSpawner = require('../objects/ShurikenSpawner');

var _ShurikenSpawner2 = _interopRequireDefault(_ShurikenSpawner);

var _NinjaConstants = require('../constants/NinjaConstants');

var _ObstacleSpawner = require('../objects/ObstacleSpawner');

var _ObstacleSpawner2 = _interopRequireDefault(_ObstacleSpawner);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$State) {
  _inherits(Game, _Phaser$State);

  function Game() {
    _classCallCheck(this, Game);

    return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
  }

  _createClass(Game, [{
    key: 'create',
    value: function create() {
      var _this2 = this;

      window.REVOLUTION_SPEED_SAFE_ZONE = 50;
      window.TARGET_REVOLUTION_SPEED = 200;
      window.CURRENT_REVOLUTION_SPEED = 200;

      this.game.add.sprite(0, 0, 'background');

      this.gameUI = new _GameUI2.default(this);

      this.camera.resetFX();
      this.camera.flash(0x000000, 500, false);

      this.game.onResume.add(function () {
        if (_this2.gameUI.stateStatus !== 'playing') {
          _this2.game.time.events.pause();
        }
      });

      this.ninja = new _Ninja2.default(this.game, 500, _NinjaConstants.NINJA_COLLISION_Y + 400, 'ninja', this.fallOff.bind(this));

      this.jumpscareNinja = new _JumpscareNinja2.default(this.game);

      this.ShurikenSpawner = new _ShurikenSpawner2.default(this.game, this.ninja, this.jumpscareNinja);

      this.ObstacleSpawner = new _ObstacleSpawner2.default(this.game, this.ninja.checkForCollision.bind(this.ninja));
      this.ObstacleSpawner.onObstacleSpawn.add(function () {
        return _this2.game.world.bringToTop(_this2.ninja);
      });
      this.ObstacleSpawner.initSpawning();

      this.ObstacleSpawner.addPoints.add(this.gameUI.handlePointsAddition.bind(this.gameUI));

      this.ninja.onDeath.add(function () {
        return _this2.fallOff('WATCH OUT!');
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      this.gameUI.updateUI();

      if (CURRENT_REVOLUTION_SPEED < TARGET_REVOLUTION_SPEED - REVOLUTION_SPEED_SAFE_ZONE) {
        this.jumpscareNinja.showNinja();
        this.ShurikenSpawner.throwShuriken('jumpscareNinja');
        this.gameUI.showSlowDownText('SPEED UP!');
        this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
          _this3.gameUI.hideSlowDownText();
          _this3.jumpscareNinja.destroy();
        });

        this.gameUI.handlePointsSubstraction();
        CURRENT_REVOLUTION_SPEED = TARGET_REVOLUTION_SPEED;
      } else if (CURRENT_REVOLUTION_SPEED > TARGET_REVOLUTION_SPEED + REVOLUTION_SPEED_SAFE_ZONE) {
        this.fallOff('SLOW DOWN!');
      }
    }
  }, {
    key: 'fallOff',
    value: function fallOff(msg) {
      var _this4 = this;

      if (this.ninja.isOnBoard === false) {
        return;
      }

      this.ObstacleSpawner.pauseObstacles();

      this.game.time.events.pause();
      this.gameUI.showSlowDownText(msg);
      this.gameUI.handlePointsSubstraction();

      this.ninja.fallOff(function () {
        _this4.gameUI.hideSlowDownText();
        _this4.ObstacleSpawner.resumeObstacles();
        _this4.game.time.events.resume();
        CURRENT_REVOLUTION_SPEED = TARGET_REVOLUTION_SPEED;
      });
    }
  }]);

  return Game;
}(Phaser.State);

exports.default = Game;

},{"../UI/GameUI":1,"../constants/NinjaConstants":3,"../objects/JumpscareNinja":8,"../objects/Ninja":9,"../objects/ObstacleSpawner":11,"../objects/ShurikenSpawner":13}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _AudioManager = require('../utils/AudioManager');

var _StorageManager = require('../utils/StorageManager');

var _Text = require('../UI/Text');

var _Text2 = _interopRequireDefault(_Text);

var _UIConstants = require('../constants/UIConstants');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MainMenu = function (_Phaser$State) {
  _inherits(MainMenu, _Phaser$State);

  function MainMenu() {
    _classCallCheck(this, MainMenu);

    return _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).apply(this, arguments));
  }

  _createClass(MainMenu, [{
    key: 'create',
    value: function create() {
      var title = this.add.sprite(this.world.width * 0.5, (this.world.height - 100) * 0.5, 'title');
      title.anchor.set(0.5);

      (0, _StorageManager.setStorage)(this.game.plugins.add(Phaser.Plugin.Storage));

      _StorageManager.PPTStorage.initUnset('PPT-highscore', 0);
      var highscore = _StorageManager.PPTStorage.get('PPT-highscore') || 0;

      var buttonPiGames = this.add.button(_UIConstants.BUTTON_PADDING, _UIConstants.BUTTON_PADDING, 'logo-pigames', this.clickPiGames, this);
      var buttonStart = this.add.button(this.world.width - _UIConstants.BUTTON_PADDING, this.world.height - _UIConstants.BUTTON_PADDING, 'button-start', this.clickStart, this, 1, 0, 2);
      buttonStart.anchor.set(1);

      this.buttonAudio = this.add.button(this.world.width - _UIConstants.BUTTON_PADDING, _UIConstants.BUTTON_PADDING, 'button-audio', this.clickAudio, this, 1, 0, 2);
      this.buttonAudio.anchor.set(1, 0);

      var buttonCredits = this.add.button(_UIConstants.BUTTON_PADDING, this.world.height - _UIConstants.BUTTON_PADDING, 'button-credits', this.clickCredits, this, 1, 0, 2);
      buttonCredits.anchor.set(0, 1);

      var highscoreText = new _Text2.default(this.game, 'center', this.world.height - 50, 'Highscore: ' + highscore, _UIConstants.MENU_HIGHSCORE_FONT, [null, 1]);
      highscoreText.padding.set(0, 15);

      (0, _AudioManager.manageAudio)('init', this);

      if ((0, _AudioManager.getStatusAudio)() !== true) {
        // Turn the music off at the start:
        (0, _AudioManager.manageAudio)('off', this);
      }

      buttonStart.x = this.world.width + buttonStart.width + _UIConstants.BUTTON_PADDING;
      this.add.tween(buttonStart).to({ x: this.world.width - _UIConstants.BUTTON_PADDING }, 500, Phaser.Easing.Exponential.Out, true);
      this.buttonAudio.y = -this.buttonAudio.height - _UIConstants.BUTTON_PADDING;
      this.add.tween(this.buttonAudio).to({ y: _UIConstants.BUTTON_PADDING }, 500, Phaser.Easing.Exponential.Out, true);
      buttonPiGames.x = -buttonPiGames.width - _UIConstants.BUTTON_PADDING;
      this.add.tween(buttonPiGames).to({ x: _UIConstants.BUTTON_PADDING }, 500, Phaser.Easing.Exponential.Out, true);
      buttonCredits.y = this.world.height + buttonCredits.height + _UIConstants.BUTTON_PADDING;
      this.add.tween(buttonCredits).to({ y: this.world.height - _UIConstants.BUTTON_PADDING }, 500, Phaser.Easing.Exponential.Out, true);

      this.camera.flash(0x000000, 500, false);
    }
  }, {
    key: 'clickAudio',
    value: function clickAudio() {
      (0, _AudioManager.playAudio)('click');
      (0, _AudioManager.manageAudio)('switch', this);
    }
  }, {
    key: 'clickPiGames',
    value: function clickPiGames() {
      (0, _AudioManager.playAudio)('click');
      window.open('http://pigam.es/', '_blank');
    }
  }, {
    key: 'clickStart',
    value: function clickStart() {
      var _this2 = this;

      (0, _AudioManager.playAudio)('click');
      this.camera.fade(0x000000, 200, false);
      this.time.events.add(200, function () {
        // this.game.state.start( 'Story' );
        _this2.game.state.start('Game');
      });
    }
  }, {
    key: 'clickCredits',
    value: function clickCredits() {
      var _this3 = this;

      (0, _AudioManager.playAudio)('click');
      this.camera.fade(0x000000, 200, false);
      this.time.events.add(200, function () {
        _this3.game.state.start('Credits');
      });
    }
  }]);

  return MainMenu;
}(Phaser.State);

exports.default = MainMenu;

},{"../UI/Text":2,"../constants/UIConstants":5,"../utils/AudioManager":22,"../utils/StorageManager":24}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var resources = {
  'image': [['background', 'img/background.png'], ['title', 'img/title.png'], ['head', 'img/head.png'], ['logo-pigames', 'img/logo-pigames.png'], ['overlay', 'img/ui/overlay.png'], ['nutrition-bar-background', 'img/ui/nutrition-bar-background.png'], ['bush', 'img/assets/bush.png'], ['jumping-ninja', 'img/assets/jumping-ninja.png'], ['katana', 'img/assets/katana.png'], ['shuriken', 'img/assets/shuriken.png']],
  'spritesheet': [['trees', 'img/assets/trees.png', 766, 1129], ['ninja', 'img/assets/ninja.png', 1272, 1340], ['button-start', 'img/ui/button-start.png', 160, 160], ['button-continue', 'img/ui/button-start.png', 160, 160], ['button-mainmenu', 'img/ui/button-mainmenu.png', 160, 160], ['button-restart', 'img/ui/button-tryagain.png', 160, 160], ['button-credits', 'img/ui/button-credits.png', 160, 160], ['button-pause', 'img/ui/button-pause.png', 160, 160], ['button-audio', 'img/ui/button-sound.png', 160, 160], ['button-back', 'img/button-back.png', 70, 70], ['button-next', 'img/button-next.png', 70, 70], ['nutrition-bar', 'img/ui/nutrition-bar.png', 680, 56]],
  'audio': [['audio-click', ['sfx/click.mp3', 'sfx/click.ogg']], ['audio-theme', ['sfx/jbm.mp3']]]
};

var Preloader = function (_Phaser$State) {
  _inherits(Preloader, _Phaser$State);

  function Preloader() {
    _classCallCheck(this, Preloader);

    return _possibleConstructorReturn(this, (Preloader.__proto__ || Object.getPrototypeOf(Preloader)).apply(this, arguments));
  }

  _createClass(Preloader, [{
    key: 'preload',
    value: function preload() {
      this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
      var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
      this.load.setPreloadSprite(preloadProgress);

      this._preloadResources();
    }
  }, {
    key: '_preloadResources',
    value: function _preloadResources() {
      var _this2 = this;

      this.span = document.createElement('span');
      this.span.innerHTML = 'Zażółć';
      this.span.setAttribute('style', 'position: absolute; font-family: Arial,  monospace; font-size: 300px; top: -99999px; left: -99999px; opacity: 0;');
      document.body.appendChild(this.span);
      this.initialFontSize = this.span.clientHeight;
      this.span.style.fontFamily = '"Bromine"';

      var _loop = function _loop(method) {
        resources[method].forEach(function (args) {
          var loader = _this2.load[method];
          loader && loader.apply(_this2.load, args);
        }, _this2);
      };

      for (var method in resources) {
        _loop(method);
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.initialFontSize !== this.span.clientHeight) {
        document.body.removeChild(this.span);
        this.state.start('MainMenu');
        // this.state.start( 'Game' );
      }
    }
  }]);

  return Preloader;
}(Phaser.State);

exports.default = Preloader;

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _AudioManager = require('../utils/AudioManager');

var _Text = require('../UI/Text');

var _Text2 = _interopRequireDefault(_Text);

var _UIConstants = require('../constants/UIConstants');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Story = function (_Phaser$State) {
  _inherits(Story, _Phaser$State);

  function Story() {
    _classCallCheck(this, Story);

    return _possibleConstructorReturn(this, (Story.__proto__ || Object.getPrototypeOf(Story)).apply(this, arguments));
  }

  _createClass(Story, [{
    key: 'create',
    value: function create() {

      new _Text2.default(this.game, 'center', 'center', 'Avoid heads to stay alive.', _UIConstants.STORY_FONT);

      var buttonContinue = this.add.button(this.world.width - 20, this.game.world.height - 20, 'button-continue', this.clickContinue, this, 1, 0, 2);

      buttonContinue.anchor.set(1, 1);
      buttonContinue.x = this.world.width + buttonContinue.width + 20;

      this.add.tween(buttonContinue).to({ x: this.world.width - 20 }, 500, Phaser.Easing.Exponential.Out, true);

      this.camera.flash(0x000000, 500, false);
    }
  }, {
    key: 'clickContinue',
    value: function clickContinue() {
      var _this2 = this;

      (0, _AudioManager.playAudio)('click');
      this.camera.fade(0x000000, 200, false);
      this.camera.onFadeComplete.add(function () {
        _this2.game.state.start('Game');
      }, this);
    }
  }]);

  return Story;
}(Phaser.State);

exports.default = Story;

},{"../UI/Text":2,"../constants/UIConstants":5,"../utils/AudioManager":22}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Credits = require('./Credits');

var _Credits2 = _interopRequireDefault(_Credits);

var _Boot = require('./Boot');

var _Boot2 = _interopRequireDefault(_Boot);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _MainMenu = require('./MainMenu');

var _MainMenu2 = _interopRequireDefault(_MainMenu);

var _Preloader = require('./Preloader');

var _Preloader2 = _interopRequireDefault(_Preloader);

var _Story = require('./Story');

var _Story2 = _interopRequireDefault(_Story);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  Credits: _Credits2.default, Boot: _Boot2.default, Game: _Game2.default, MainMenu: _MainMenu2.default, Preloader: _Preloader2.default, Story: _Story2.default
};

},{"./Boot":15,"./Credits":16,"./Game":17,"./MainMenu":18,"./Preloader":19,"./Story":20}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAudioOffset = undefined;
exports.manageAudio = manageAudio;
exports.playAudio = playAudio;
exports.getStatusAudio = getStatusAudio;

var _StorageManager = require('./StorageManager');

var _audioStatus = void 0;
var _sound = void 0;
var _soundMusic = void 0;
var _audioOffset = void 0;

function manageAudio(mode, game) {
  switch (mode) {
    case 'init':
      {
        _StorageManager.PPTStorage.initUnset('PPT-audio', true);
        _audioStatus = _StorageManager.PPTStorage.get('PPT-audio');
        // PPT._soundClick = game.add.audio('audio-click');
        _sound = [];
        _sound['click'] = game.add.audio('audio-click');
        if (!_soundMusic) {
          _soundMusic = game.add.audio('audio-theme', 1, true);
          _soundMusic.volume = 0.5;
        }
        break;
      }
    case 'on':
      {
        _audioStatus = true;
        break;
      }
    case 'off':
      {
        _audioStatus = false;
        break;
      }
    case 'switch':
      {
        _audioStatus = !_audioStatus;
        break;
      }
  }
  if (_audioStatus) {
    _audioOffset = 0;
    if (_soundMusic) {
      if (!_soundMusic.isPlaying) {
        _soundMusic.play('', 0, 1, true);
      }
    }
  } else {
    _audioOffset = 4;
    if (_soundMusic) {
      _soundMusic.stop();
    }
  }
  _StorageManager.PPTStorage.set('PPT-audio', _audioStatus);
  game.buttonAudio.setFrames(_audioOffset + 1, _audioOffset + 0, _audioOffset + 2);
}
function playAudio(sound) {
  if (_audioStatus) {
    if (_sound && _sound[sound]) {
      _sound[sound].play();
    }
  }
}

function getStatusAudio() {
  return _audioStatus;
}

var getAudioOffset = exports.getAudioOffset = function getAudioOffset() {
  return _audioOffset;
};

},{"./StorageManager":24}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRailNumberBasedOnPosition = getRailNumberBasedOnPosition;

var _ObstacleConstants = require('../constants/ObstacleConstants');

var _NinjaConstants = require('../constants/NinjaConstants');

function getRailNumberBasedOnPosition(x) {
  console.log(_ObstacleConstants.LEFT_RAIL_POSITION_X, _ObstacleConstants.CENTER_RAIL_POSITION_X, _ObstacleConstants.RIGHT_RAIL_POSITION_X);
  if (x >= _ObstacleConstants.RIGHT_RAIL_POSITION_X) {
    return _NinjaConstants.RIGHT;
  } else if (x < _ObstacleConstants.RIGHT_RAIL_POSITION_X && x >= _ObstacleConstants.CENTER_RAIL_POSITION_X) {
    return _NinjaConstants.CENTER;
  } else {
    return _NinjaConstants.LEFT;
  }
}

},{"../constants/NinjaConstants":3,"../constants/ObstacleConstants":4}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStorage = setStorage;
var PPTStorage = exports.PPTStorage = void 0;

function setStorage(storage) {
  exports.PPTStorage = PPTStorage = storage;
}

},{}]},{},[6])
//# sourceMappingURL=game.js.map
