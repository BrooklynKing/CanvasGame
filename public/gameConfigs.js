var gameConfigs =
webpackJsonp_name_([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getLayerConfig = exports.getConfig = exports.getRuleConfig = undefined;

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(7);

	var _index4 = _interopRequireDefault(_index3);

	var _layers = __webpack_require__(16);

	var _layers2 = _interopRequireDefault(_layers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getRuleConfig(id) {
	    return _index4.default[id];
	}
	function getConfig(id) {
	    var config = JSON.parse(JSON.stringify(_index2.default[id]));

	    !config.id && (config.id = id);

	    return config;
	}
	function getLayerConfig(id) {
	    return _layers2.default[id];
	}
	exports.getRuleConfig = getRuleConfig;
	exports.getConfig = getConfig;
	exports.getLayerConfig = getLayerConfig;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _spells = __webpack_require__(2);

	var _spells2 = _interopRequireDefault(_spells);

	var _units = __webpack_require__(3);

	var _units2 = _interopRequireDefault(_units);

	var _effects = __webpack_require__(4);

	var _effects2 = _interopRequireDefault(_effects);

	var _terrain = __webpack_require__(5);

	var _terrain2 = _interopRequireDefault(_terrain);

	var _ui = __webpack_require__(6);

	var _ui2 = _interopRequireDefault(_ui);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var objects = {};

	Object.assign(objects, _spells2.default);
	Object.assign(objects, _units2.default);
	Object.assign(objects, _effects2.default);
	Object.assign(objects, _ui2.default);
	Object.assign(objects, _terrain2.default);

	exports.default = objects;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    fireballSpell: {
	        zIndex: 5000,
	        sprite: ['spellIcons', [0, 0], [32, 32]],
	        pos: [470, 748],

	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            bulletsFired: 0,
	            cooldown: 10
	        },
	        type: 'spell',
	        rules: ['fireball']
	    },
	    frostShardSpell: {
	        zIndex: 5000,
	        sprite: ['spellIcons', [224, 96], [32, 32]],
	        pos: [512, 748],
	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            shardsFired: 0,
	            cooldown: 2000
	        },
	        type: 'spell',
	        rules: ['frostShard']
	    },
	    teleportSpell: {
	        zIndex: 5000,
	        sprite: ['spellIcons', [64, 32], [32, 32]],
	        pos: [554, 748],
	        size: [32, 32],
	        render: 'spell',
	        parameters: {
	            power: 200,
	            teleportGates: 0,
	            cooldown: 200
	        },
	        type: 'spell',
	        rules: ['teleport']
	    },
	    teleportGate: {
	        zIndex: 0,
	        render: 'object',
	        sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0, 1]],
	        pos: [466, 580],
	        size: [32, 32],
	        parameters: {
	            cooldown: 200
	        },
	        type: 'spellElement',
	        rules: ['removeOnCooldown', 'dynamicZIndex']
	    },

	    bullet: {
	        zIndex: 3,
	        collisions: true,
	        render: 'object',
	        sprite: ['fireball', [0, 0], [33, 33], 16, [0, 1, 2, 3]],
	        size: [25, 25],
	        type: 'spellElement',
	        parameters: {
	            power: 10,
	            cooldown: 100,
	            speed: 300
	        },
	        conditions: ['bulletMonsterCollision'],
	        rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex', 'explosionOnCooldown']
	    },
	    frostShard: {
	        zIndex: 3,
	        render: 'object',
	        collisions: true,
	        sprite: ['effects', [96, 0], [32, 32], 10, [0, 1, 2]],
	        type: 'spellElement',
	        size: [500, 500],
	        parameters: {
	            power: 60,
	            cooldown: 500
	        },
	        conditions: ['slowEnemies'],
	        rules: ['removeOnCooldown', 'dynamicZIndex']
	    }
	};

	exports.default = config;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    player: {
	        zIndex: 20,
	        sprite: ['hero', [0, 0], [32, 32], 6, [0, 1, 2]],
	        pos: [612, 484],
	        size: [25, 32],
	        render: 'unit',
	        collisions: true,
	        parameters: {
	            speed: 150,
	            health: 50,
	            spellPower: 1,
	            level: 1,
	            exp: 0,
	            effects: [],
	            currentSpell: 'fireball',
	            direction: {},
	            levelTable: {
	                1: 600,
	                2: 1200,
	                3: 2000,
	                4: 3000,
	                5: 4500,
	                6: 6500,
	                7: 8000,
	                8: 10000,
	                9: 15000
	            }
	        },
	        type: 'player',
	        conditions: ['selectSpellWithKeyboard'],
	        rules: ['moveWithKeyboard', 'rotateToMouse', 'bindPositionToLayer', 'playerDeath', 'moveToDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'playerLevelUp']
	    },
	    summonGate: {
	        zIndex: 0,
	        render: 'object',
	        sprite: ['arcaneGate', [0, 0], [32, 32], 7, [0, 1]],
	        pos: [466, 580],
	        size: [25, 30],
	        collisions: true,
	        parameters: {
	            cooldown: 80,
	            exp: 3,
	            chanceOfBoss: 5,
	            chanceOfBoss2: 8,
	            chanceOfBoomer: 20,
	            health: 10
	        },
	        conditions: ['monsterHealthStatus'],
	        type: 'monster',
	        rules: ['summonOnCooldown', 'dynamicZIndex']
	    },
	    monster: {
	        zIndex: 1,
	        sprite: ['demons', [0, 128], [32, 32], 6, [0, 1, 2]],
	        size: [20, 28],
	        collisions: true,
	        render: 'unit',
	        parameters: {
	            speed: 25,
	            cooldown: 70,
	            scentSpeed: 120,
	            scentRange: 600,
	            exp: 15,
	            wanderCooldown: 500,
	            effects: [],
	            health: 20,
	            power: 5
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['moveToDirection', 'wandererAI', 'rotateByDirection', 'meleeAttack', 'dynamicZIndex', 'resetEffects', 'resetMeleeCooldown']
	    },
	    monsterBoomer: {
	        zIndex: 1,
	        sprite: ['demons', [96, 128], [32, 32], 6, [0, 1, 2]],
	        size: [20, 28],
	        collisions: true,
	        render: 'unit',
	        parameters: {
	            speed: 100,
	            exp: 30,
	            effects: [],
	            health: 10,
	            power: 10
	        },
	        conditions: ['monsterHealthStatus', 'monsterExplosionCondition'],
	        type: 'monster',
	        rules: ['moveToDirection', 'rotateByPlayer', 'setDirectionToPlayerAdvance', 'dynamicZIndex', 'resetSpeed', 'resetEffects']
	    },
	    monsterBoss: {
	        zIndex: 1,
	        collisions: true,
	        sprite: ['bigMonsters', [0, 0], [32, 50], 6, [0, 1, 2]],
	        size: [25, 40],
	        render: 'unit',
	        parameters: {
	            speed: 50,
	            exp: 60,
	            cooldown: 75,
	            power: 10,
	            health: 50,
	            effects: []
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['setDirectionToPlayer', 'monsterBossLogic', 'moveToDirection', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
	    },
	    monsterBoss2: {
	        zIndex: 1,
	        collisions: true,
	        sprite: ['boss', [0, 0], [96, 48], 6, [0, 1, 2]],
	        size: [40, 45],
	        render: 'unit',
	        parameters: {
	            speed: 15,
	            cooldown: 200,
	            exp: 120,
	            fireRange: 300,
	            power: 10,
	            health: 30,
	            effects: []
	        },
	        conditions: ['monsterHealthStatus', 'stopOnCollisionWithPlayer'],
	        type: 'monster',
	        rules: ['setDirectionToPlayer', 'monsterBoss2Logic', 'rotateByDirection', 'dynamicZIndex', 'resetSpeed', 'resetEffects', 'resetRangeCooldown']
	    },
	    heart: {
	        zIndex: 3,
	        render: 'object',
	        collisions: true,
	        size: [25, 25],
	        sprite: ['pumpkin', [0, 0], [32, 32], 5, [0, 1]],
	        conditions: ['triggerOnPlayerCollision'],
	        parameters: {
	            power: 10
	        }
	    },
	    powerup: {
	        zIndex: 2,
	        size: [25, 25],
	        //render: 'object',
	        collisions: true,
	        sprite: ['powerUp', [0, 0], [72, 65], 15, [0, 1, 2, 1]],
	        conditions: ['triggerOnPlayerCollisionPowerUp'],
	        parameters: {
	            exp: 250
	            //power : 1
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    mbullet: {
	        zIndex: 3,
	        collisions: true,
	        sprite: ['darkblast', [0, 0], [38, 38], 12, [0, 1, 2, 3]],
	        type: 'monsterSpellElement',
	        render: 'object',
	        size: [32, 32],
	        conditions: ['damageOnPlayerCollision', 'destroyOnPlayerCollision'],
	        parameters: {
	            power: 1,
	            speed: 100
	        },
	        rules: ['destroyAfterLeavingLayer', 'moveToDirection', 'dynamicZIndex']
	    },
	    mbullet2: {
	        zIndex: 3,
	        collisions: true,
	        sprite: ['bossSpell', [0, 0], [30, 26], 10, [0, 1, 2]],
	        type: 'monsterSpellElement',
	        render: 'object',
	        size: [28, 24],
	        conditions: ['monsterBoss2Bullet'],
	        parameters: {
	            power: 15,
	            cooldown: 100,
	            speed: 200
	        },
	        rules: ['destroyAfterLeavingLayer', 'setDirectionToPlayer', 'rotateByDirection', 'moveToDirection', 'dynamicZIndex']
	    },
	    blood: {
	        zIndex: 2,
	        sprite: ['monsterBlood', [0, 0], [32, 13]],
	        parameters: {
	            cooldown: 500
	        },
	        rules: ['removeOnCooldown']
	    },
	    bloodSpray: {
	        zIndex: 2,
	        sprite: ['bloodEffect', [0, 0], [64, 64], 15, [0, 1, 2, 3, 4], null, true, 0.785],
	        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
	    },
	    explosion: {
	        render: 'object',
	        size: [39, 39],
	        sprite: ['explosions', [0, 0], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], null, true],
	        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
	    },
	    monsterExplosion: {
	        render: 'object',
	        collisions: true,
	        type: 'spellEffect',
	        conditions: ['monsterExplosion'],
	        size: [39, 39],
	        sprite: ['explosions', [0, 0], [39, 39], 16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], null, true],
	        rules: ['destroyAfterSpriteDone', 'dynamicZIndex']
	    }
	};

	exports.default = config;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    tree: {
	        sprite: ['tree', [0, 0], [76, 76]],
	        size: [70, 70],
	        rules: ['dynamicZIndex']
	    },
	    stones: {
	        render: 'object',
	        sprite: ['stone', [0, 0], [25, 22]],
	        size: [15, 22],
	        rules: ['dynamicZIndex']
	    }
	};

	exports.default = config;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    cursor: {
	        zIndex: 2000,
	        render: 'cursor',
	        pos: [400, 350],
	        sprite: ['cursor', [0, 0], [30, 30]],
	        rules: ['bindPositionToMouse']
	    },
	    counter: {
	        zIndex: 2000,
	        pos: [5, 13],
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            template: "SCORE: {kills}",
	            size: 14
	        },
	        rules: ['countMonsterKilled']
	    },
	    leftOnWave: {
	        zIndex: 2000,
	        pos: [5, 100],
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            template: "LEFT ON THIS WAVE: {count}",
	            size: 14
	        }
	    },
	    level: {
	        zIndex: 2000,
	        pos: [35, 45],
	        render: "expBar",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            template: "LEVEL: {level}",
	            size: 14
	        },
	        rules: ['level']
	    },
	    timer: {
	        zIndex: 2000,
	        pos: [5, 23],
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            template: "TIMER: {time}",
	            size: 14
	        },
	        rules: ['timer']
	    },
	    bestTime: {
	        pos: [5, 370],
	        zIndex: 2000,
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            size: 14,
	            template: "BEST TIME: {time}"
	        },
	        rules: ['bestTime']
	    },
	    bestScore: {
	        pos: [5, 380],
	        zIndex: 2000,
	        render: "text",
	        parameters: {
	            weight: "bold",
	            color: "#EFEFEF",
	            size: 14,
	            template: "BEST SCORE: {score}"
	        },
	        rules: ['bestScore']
	    }
	};

	exports.default = config;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _spells = __webpack_require__(8);

	var _spells2 = _interopRequireDefault(_spells);

	var _units = __webpack_require__(11);

	var _units2 = _interopRequireDefault(_units);

	var _layers = __webpack_require__(12);

	var _layers2 = _interopRequireDefault(_layers);

	var _ui = __webpack_require__(14);

	var _ui2 = _interopRequireDefault(_ui);

	var _etc = __webpack_require__(15);

	var _etc2 = _interopRequireDefault(_etc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rules = {};

	Object.assign(rules, _spells2.default);
	Object.assign(rules, _units2.default);
	Object.assign(rules, _layers2.default);
	Object.assign(rules, _ui2.default);
	Object.assign(rules, _etc2.default);

	exports.default = rules;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    fireball: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                fireCooldown = obj.getParameter('fireCooldown');

	            if (player.getParameter('currentSpell') == 'fireball') {
	                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
	                    if (!fireCooldown) {
	                        var createBullet = function createBullet(direction, destination) {

	                            var bulletConfig = gameConfigs.getConfig('bullet');
	                            bulletConfig.pos = player.pos.clone();

	                            var bull = obj.layer.addObject(bulletConfig);
	                            bull.setParameter('direction', direction);
	                            bull.setParameter('power', bull.getParameter('power') + 5 * (spellPower - 1));

	                            bull.sprite.setDegree(_utils2.default.getDegree(player.pos, destination)[0]);
	                        };

	                        var destination = new _utils2.default.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y),
	                            spellPower = player.getParameter('spellPower'),
	                            startDegree = 10 * (spellPower - 1);

	                        destination.x -= obj.layer.translate.x;
	                        destination.y -= obj.layer.translate.y;

	                        for (var i = 0; i < spellPower; i++) {
	                            var direction = new _utils2.default.Line(player.pos, _utils2.default.getMovedPointByDegree(player.pos, destination, startDegree));
	                            createBullet(direction, _utils2.default.getMovedPointByDegree(player.pos, destination, startDegree));
	                            startDegree -= 20;
	                        }
	                        if (obj.getDefaultParameter('cooldown') + 3 * (spellPower - 1) > 30) {
	                            obj.setParameter('cooldown', 30);
	                        } else {
	                            obj.setParameter('cooldown', obj.getDefaultParameter('cooldown') + 5 * (spellPower - 1));
	                        }

	                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	                    }
	                }
	            }
	            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
	        }

	    },
	    slowEnemies: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');
	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'monster') {
	                    var speed = objects[i].getParameter('speed'),
	                        power = obj.getParameter('power'),
	                        effects = objects[i].getParameter('effects') || [];

	                    if (speed < power) {
	                        objects[i].setParameter('speed', 0);
	                    } else {
	                        objects[i].setParameter('speed', speed - power);
	                    }

	                    if (effects.indexOf('frozen') == -1) {
	                        effects.push('frozen');
	                    }
	                }
	            }
	        }
	    },
	    teleport: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                fireCooldown = obj.getParameter('fireCooldown');

	            if (player.getParameter('currentSpell') == 'teleport') {
	                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
	                    if (!fireCooldown) {
	                        var mouse = new _utils2.default.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

	                        mouse.x -= obj.layer.translate.x;
	                        mouse.y -= obj.layer.translate.y;

	                        var direction = new _utils2.default.Line(player.pos, _utils2.default.getMovedPointByDegree(player.pos, mouse, 0)),
	                            spellPower = player.getParameter('spellPower'),
	                            destination = direction.getDestination(player.pos, obj.getParameter('power')),
	                            cooldown = obj.getDefaultParameter('cooldown', cooldown) - 30 * (spellPower - 1),
	                            teleportGate;

	                        teleportGate = gameConfigs.getConfig('teleportGate');
	                        teleportGate.pos = player.pos.clone();

	                        obj.layer.addObject(teleportGate);

	                        teleportGate = gameConfigs.getConfig('teleportGate');
	                        teleportGate.pos = destination.clone();

	                        obj.layer.addObject(teleportGate);

	                        player.setPosition(destination);

	                        obj.setParameter('cooldown', cooldown > 50 ? cooldown : 50);
	                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	                    }
	                }
	            }
	            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
	        }
	    },
	    frostShard: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                fireCooldown = obj.getParameter('fireCooldown');

	            if (player.getParameter('currentSpell') == 'frostShard') {
	                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
	                    if (!fireCooldown) {
	                        var frostShard = gameConfigs.getConfig('frostShard'),
	                            mousePosition = new _utils2.default.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y),
	                            spellPower = player.getParameter('spellPower'),
	                            destination = mousePosition.clone();

	                        destination.x -= obj.layer.translate.x;
	                        destination.y -= obj.layer.translate.y;

	                        frostShard.pos = destination.clone();

	                        var spellPowerBoost = 0;

	                        for (var i = 1; i < spellPower; i++) {
	                            spellPowerBoost += 50;
	                        }

	                        var fs = obj.layer.addObject(frostShard);

	                        fs.setParameter('cooldown', fs.getParameter('cooldown') + spellPowerBoost);

	                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	                    }
	                }
	            }
	            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
	        }
	    },
	    bulletMonsterCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');
	            for (var i = 0, l = objects.length; i < l; i++) {
	                if (objects[i].type == 'monster') {
	                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

	                    var blood = gameConfigs.getConfig('bloodSpray');
	                    blood.pos = objects[i].pos.clone();
	                    blood.pos.x += 2;
	                    blood.pos.y += -10;
	                    obj.layer.addObject(blood);

	                    obj._removeInNextTick = true;

	                    break;
	                }
	            }
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    playerDeath: {
	        update: function update(dt, obj) {
	            if (obj.getParameter('health') <= 0) {
	                obj.layer.state.showRestartMenu();
	            }
	        }
	    },
	    damageOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');
	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));
	                    break;
	                }
	            }
	        }
	    },
	    destroyOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    var explosionConfig = gameConfigs.getConfig('explosion');
	                    explosionConfig.pos = obj.pos.clone();

	                    obj.layer.addObject(explosionConfig);

	                    obj._removeInNextTick = true;
	                    break;
	                }
	            }
	        }
	    },
	    triggerOnPlayerCollision: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    if (objects[i].getParameter('health') < objects[i].getDefaultParameter('health')) {
	                        if (objects[i].getParameter('health') + obj.getParameter('power') <= objects[i].getDefaultParameter('health')) {
	                            objects[i].setParameter('health', objects[i].getParameter('health') + obj.getParameter('power'));
	                        } else {
	                            objects[i].setParameter('health', objects[i].getDefaultParameter('health'));
	                        }
	                    }

	                    obj._removeInNextTick = true;
	                    break;
	                }
	            }
	        }
	    },
	    meleeAttack: {
	        update: function update(dt, obj) {
	            if (!obj.getParameter('meleeCooldown')) {
	                var objects = obj.getParameter('collisions');
	                for (var i = 0; i < objects.length; i++) {
	                    if (objects[i].type == 'player') {
	                        objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

	                        var blood = gameConfigs.getConfig('bloodSpray');
	                        blood.pos = objects[i].pos.clone();
	                        blood.pos.x += 2;
	                        blood.pos.y += -10;
	                        obj.layer.addObject(blood);

	                        obj.setParameter('meleeCooldown', obj.getParameter('cooldown'));
	                        break;
	                    }
	                }
	            }
	        }
	    },
	    monsterExplosion: {
	        update: function update(dt, obj) {
	            if (!obj.getParameter('exploded')) {
	                var objects = obj.getParameter('collisions');
	                for (var i = 0, l = objects.length; i < l; i++) {
	                    if (objects[i].getParameter('health')) {
	                        objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));
	                        break;
	                    }
	                }

	                obj.setParameter('exploded', true);
	            }
	        }
	    },
	    monsterExplosionCondition: {
	        update: function update(dt, obj) {
	            function generateExplosions() {
	                var pos = obj.pos.clone(),
	                    explosionConfig,
	                    power = obj.getParameter('power'),
	                    expl;

	                obj._removeInNextTick = true;

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x - obj.size[0], pos.y - obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x + obj.size[0], pos.y - obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x - obj.size[0], pos.y + obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x + obj.size[0], pos.y + obj.size[1]]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x - 3 / 2 * obj.size[0], pos.y]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x + 3 / 2 * obj.size[0], pos.y]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);
	            }

	            if (obj.getParameter('health') <= 0) {
	                generateExplosions();
	            } else {
	                var objects = obj.getParameter('collisions');
	                for (var i = 0; i < objects.length; i++) {
	                    if (objects[i].type == 'player') {
	                        generateExplosions();

	                        break;
	                    }
	                }
	            }
	        }
	    },
	    stopOnCollisionWithPlayer: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');
	            for (var i = 0, l = objects.length; i < l; i++) {
	                if (objects[i].type == 'player') {
	                    obj.setParameter('speed', 0);
	                    break;
	                }
	            }
	        }
	    },
	    resetSpeed: {
	        update: function update(dt, obj) {
	            obj.setParameter('speed', obj.getDefaultParameter('speed'));
	        }
	    },
	    resetEffects: {
	        update: function update(dt, obj) {
	            obj.getParameter('effects').splice(0);
	        }
	    },
	    moveToDirection: {
	        update: function update(dt, obj) {
	            var direction = obj.getParameter('direction');

	            if (direction && direction.dir) {
	                obj.setPosition(direction.getDestination(obj.pos, obj.getParameter('speed') * dt));
	            }
	        }
	    },
	    playerLevelUp: {
	        update: function update(dt, obj) {
	            var levelExp = obj.getParameter('levelTable')[obj.getParameter('level')];
	            if (obj.getParameter('levelTable')[obj.getParameter('level')]) {
	                if (obj.getParameter('exp') > obj.getParameter('levelTable')[obj.getParameter('level')]) {
	                    obj.setParameter('exp', obj.getParameter('exp') - levelExp);
	                    obj.setParameter('level', obj.getParameter('level') + 1);
	                    obj.setParameter('spellPower', obj.getParameter('spellPower') + 1);
	                }
	            } else {
	                obj.setParameter('level', 'MAX');
	            }
	        }
	    },
	    monsterHealthStatus: {
	        update: function update(dt, obj) {
	            if (obj.getParameter('health') <= 0) {
	                obj._removeInNextTick = true;

	                var explosionConfig = gameConfigs.getConfig('explosion');
	                explosionConfig.pos = obj.pos.clone();

	                obj.layer.addObject(explosionConfig);

	                var blood = gameConfigs.getConfig('blood');
	                blood.pos = obj.pos.clone();
	                obj.layer.addObject(blood);

	                if (!obj.layer.state.parameters.monstersKilled) {
	                    obj.layer.state.parameters.monstersKilled = 0;
	                }
	                obj.layer.state.parameters.monstersKilled++;
	                var player = obj.layer.getObjectsByType('player')[0];
	                player.setParameter('exp', player.getParameter('exp') + obj.getParameter('exp'));
	            }
	        }
	    },
	    resetRangeCooldown: {
	        update: function update(dt, obj) {
	            var fireCooldown = obj.getParameter('fireCooldown');

	            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
	        }
	    },
	    resetMeleeCooldown: {
	        update: function update(dt, obj) {
	            var meleeCooldown = obj.getParameter('meleeCooldown');
	            meleeCooldown && obj.setParameter('meleeCooldown', meleeCooldown - 1);
	        }
	    },
	    monsterBossLogic: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];
	            if (!obj.getParameter('fireCooldown')) {
	                var bulletConfig = gameConfigs.getConfig('mbullet'),
	                    direction = new _utils2.default.Line(obj.pos, player.pos);

	                bulletConfig.pos = obj.pos.clone();
	                var bull = obj.layer.addObject(bulletConfig);
	                bull.setParameter('direction', direction);
	                bull.sprite.setDegree(_utils2.default.getDegree(obj.pos, player.pos)[0]);

	                obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	            }
	        }
	    },
	    monsterBoss2Logic: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                directionToPlayer = obj.getParameter('direction');

	            if (_utils2.default.getDistance(obj.pos, player.pos) < obj.getParameter('fireRange')) {
	                if (!obj.getParameter('fireCooldown')) {
	                    var bulletConfig = gameConfigs.getConfig('mbullet2');
	                    bulletConfig.pos = obj.pos.clone();

	                    var bull = obj.layer.addObject(bulletConfig);

	                    bull.setParameter('direction', directionToPlayer);
	                    //bull.sprite.setDegree(utils.getDegree(obj.pos, player.pos)[0]);

	                    obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
	                }
	            } else {
	                obj.setPosition(directionToPlayer.getDestination(obj.pos, obj.getParameter('speed') * dt));
	            }
	        }
	    },
	    monsterBoss2Bullet: {
	        update: function update(dt, obj) {
	            var cooldown = obj.getParameter('cooldown');
	            var objects = obj.getParameter('collisions');

	            if (cooldown == 0) {
	                obj._removeInNextTick = true;

	                createExplosion();
	                return;
	            } else {
	                obj.setParameter('cooldown', cooldown - 1);
	            }

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    obj._removeInNextTick = true;

	                    createExplosion();
	                    break;
	                }
	            }

	            function createExplosion() {
	                var pos = obj.pos.clone(),
	                    explosionConfig,
	                    power = obj.getParameter('power'),
	                    expl;

	                explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([pos.x, pos.y]);
	                expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', power);
	            }
	        }
	    },
	    moveWithKeyboard: {
	        update: function update(dt, obj) {
	            var pos = obj.pos.clone();
	            var direction = {};
	            direction.left = obj.layer.game.input.keyboard.isDown(65);
	            direction.up = obj.layer.game.input.keyboard.isDown(87);
	            direction.down = obj.layer.game.input.keyboard.isDown(83);
	            direction.right = obj.layer.game.input.keyboard.isDown(68);
	            if (direction.right) {
	                pos.x = obj.pos.x + 1;
	            }
	            if (direction.left) {
	                pos.x = obj.pos.x - 1;
	            }
	            if (direction.down) {
	                pos.y = obj.pos.y + 1;
	            }
	            if (direction.up) {
	                pos.y = obj.pos.y - 1;
	            }

	            if (obj.pos.x == pos.x && obj.pos.y == pos.y) {
	                obj.getParameter('direction').dir = null;
	            } else {
	                //var direction = utils.getDirection(obj.pos, pos);
	                obj.setParameter('direction', new _utils2.default.Line(obj.pos, pos));
	            }
	        }
	    },
	    selectSpellWithKeyboard: {
	        update: function update(dt, obj) {
	            obj.layer.game.input.keyboard.isDown(49) && obj.setParameter('currentSpell', 'fireball');
	            obj.layer.game.input.keyboard.isDown(50) && obj.setParameter('currentSpell', 'frostShard');
	            obj.layer.game.input.keyboard.isDown(51) && obj.setParameter('currentSpell', 'teleport');
	        }
	    },
	    triggerOnPlayerCollisionPowerUp: {
	        update: function update(dt, obj) {
	            var objects = obj.getParameter('collisions');

	            for (var i = 0; i < objects.length; i++) {
	                if (objects[i].type == 'player') {
	                    //objects[i].setParameter('spellPower', objects[i].getParameter('spellPower') + obj.getParameter('power'));
	                    objects[i].setParameter('exp', objects[i].getParameter('exp') + obj.getParameter('exp'));
	                    obj._removeInNextTick = true;
	                    break;
	                }
	            }
	        }
	    },
	    summonOnCooldown: {
	        update: function update(dt, obj) {
	            var cooldown = obj.getParameter('cooldown');
	            function getProperMonster() {
	                var random = Math.random() * 100,
	                    config;

	                if (random <= obj.getParameter('chanceOfBoss')) {
	                    config = gameConfigs.getConfig('monsterBoss');
	                } else {
	                    random -= obj.getParameter('chanceOfBoss');
	                }
	                if (!config && random <= obj.getParameter('chanceOfBoss2')) {
	                    config = gameConfigs.getConfig('monsterBoss2');
	                } else {
	                    random -= obj.getParameter('chanceOfBoss2');
	                }
	                if (!config && random <= obj.getParameter('chanceOfBoomer')) {
	                    config = gameConfigs.getConfig('monsterBoomer');
	                } else {
	                    random -= obj.getParameter('monsterBoomer');
	                }

	                if (!config) {
	                    config = gameConfigs.getConfig('monster');
	                }

	                return config;
	            }
	            if (cooldown == 0) {
	                obj._removeInNextTick = true;

	                var monsterConfig = getProperMonster(),
	                    player = obj.layer.getObjectsByType('player')[0];

	                monsterConfig.pos = obj.pos.clone();

	                var monster = obj.layer.addObject(monsterConfig);

	                if (player.getParameter('level') > 1) {
	                    monster.setParameter('health', monster.getParameter('health') * 0.75 * player.getParameter('level'));
	                }
	            } else {
	                obj.setParameter('cooldown', cooldown - 1);
	            }
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(13);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Victor = __webpack_require__(10);

	var config = {
	    random_trees: {
	        init: function init() {
	            var obj = this.context;

	            function getRandomPointInArea() {
	                return [Math.round(Math.random() * obj.size[0]), Math.round(Math.random() * obj.size[1])];
	            }

	            for (var i = 0; i < this.parameters.trees; i++) {
	                var _config = gameConfigs.getConfig('tree');

	                _config.pos = new _utils2.default.Point(getRandomPointInArea(this.parameters.area));

	                this.context.addObject(_config);
	            }

	            for (var i = 0; i < this.parameters.stones; i++) {
	                var _config2 = gameConfigs.getConfig('stones');

	                _config2.pos = new _utils2.default.Point(getRandomPointInArea(this.parameters.area));

	                /*var stone = */this.context.addObject(_config2);
	                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
	            }
	        },
	        parameters: {
	            trees: 40,
	            stones: 40
	        }
	    },
	    spawn_monster: {
	        init: function init() {
	            this.parameters.currentWave = 1;
	            this.parameters.monseterOnWave = this.parameters.waveMultiplier * this.parameters.currentWave;
	            this.parameters.monsterLeft = 0;
	            this.parameters.lastWaveMonsters = 0;
	            this.parameters.monsterSpawned = 0;
	            this.leftOnWave = this.context.addObject(gameConfigs.getConfig('leftOnWave'));
	        },
	        update: function update(dt, obj) {
	            this.parameters.monsterLeft = obj.state.parameters.monstersKilled - this.parameters.lastWaveMonsters;
	            if (this.parameters.monsterSpawned < this.parameters.waveMultiplier * this.parameters.currentWave) {
	                if (!this.parameters.currentMonsterCooldown) {
	                    var topLeft = new Victor(50 - obj.translate.x, 50 - obj.translate.y);
	                    var bottomRight = new Victor(900 - obj.translate.x, 650 - obj.translate.y);
	                    var summonGate = gameConfigs.getConfig('summonGate');

	                    summonGate.pos = new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());
	                    summonGate.pos.x = Math.min(1150, Math.max(50, summonGate.pos.x));
	                    summonGate.pos.y = Math.min(968, Math.max(50, summonGate.pos.y));
	                    this.context.addObject(summonGate);

	                    this.parameters.monsterSpawned++;
	                    this.parameters.currentMonsterCooldown = this.parameters.monsterCooldown;
	                } else {
	                    this.parameters.currentMonsterCooldown && this.parameters.currentMonsterCooldown--;
	                }
	            } else {
	                if (this.parameters.monsterLeft == this.parameters.monseterOnWave) {
	                    this.parameters.currentWave++;
	                    this.parameters.monsterSpawned = 0;
	                    this.parameters.monseterOnWave = this.parameters.waveMultiplier * this.parameters.currentWave;
	                    this.parameters.lastWaveMonsters = obj.state.parameters.monstersKilled;
	                }
	            }
	            this.leftOnWave.setParameter('text', (0, _stringTemplate2.default)(this.leftOnWave.getParameter('template'), {
	                count: this.parameters.monsterLeft + '/' + this.parameters.monseterOnWave
	            }));
	        },
	        parameters: {
	            waveMultiplier: 25,
	            monsterCooldown: 10
	        }
	    },
	    spawn_heart: {
	        update: function update(dt, obj) {
	            if (!this.parameters.currentCooldown) {
	                var config = gameConfigs.getConfig('heart');

	                var topLeft = new Victor(50, 50);
	                var bottomRight = new Victor(1154, 918);

	                config.pos = new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());

	                this.context.addObject(config);

	                this.parameters.currentCooldown = this.parameters.cooldown;
	            } else {
	                this.parameters.currentCooldown--;
	            }
	        },
	        parameters: {
	            area: [[50, 50], [1154, 918]],
	            cooldown: 400
	        }
	    },
	    spawn_powerup: {
	        update: function update(dt, obj) {
	            if (!this.parameters.currentCooldown) {
	                var config = gameConfigs.getConfig('powerup');

	                var topLeft = new Victor(100, 100);
	                var bottomRight = new Victor(1100, 850);

	                config.pos = new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray());

	                this.context.addObject(config);

	                this.parameters.currentCooldown = this.parameters.cooldown;
	            } else {
	                this.parameters.currentCooldown--;
	            }
	        },
	        parameters: {
	            area: [[100, 100], [1100, 850]],
	            currentCooldown: 1100,
	            cooldown: 1100
	        }
	    },
	    spawn_terrain: {
	        init: function init() {
	            var obj = this.context,
	                gateConfig = gameConfigs.getConfig('gate'),
	                wallConfig;

	            for (var i = 0; i < 7; i++) {
	                wallConfig = gameConfigs.getConfig('wall');
	                wallConfig.pos = [wallConfig.size[0] * i + wallConfig.size[0] / 2, wallConfig.size[1] / 2];
	                var wall = this.context.addObject(wallConfig);
	                //stone.sprite.setDegree(utils.getDegree(obj.pos, getRandomPointInArea(this.parameters.area))[0]);
	            }
	            gateConfig.pos = [wallConfig.pos.x + wallConfig.size[0] / 2 + gateConfig.size[0] / 2, (gateConfig.size[1] - 3) / 2];
	            var gate = this.context.addObject(gateConfig);
	        }
	    },
	    goWithPlayer: {
	        update: function update(dt, obj) {
	            var player = obj.getObjectsByType('player')[0],
	                px = (player.pos.x + obj.translate.x) / 1024 * 100,
	                py = (player.pos.y + obj.translate.y) / 768 * 100;

	            if (px < 30) {
	                if (obj.translate.x < 0) {
	                    obj.translate.x += Math.round(player.getParameter('speed') * dt);
	                }
	            }
	            if (px > 70) {
	                if (obj.translate.x > -200) {
	                    obj.translate.x -= Math.round(player.getParameter('speed') * dt);
	                }
	            }

	            if (py < 25) {
	                if (obj.translate.y < 0) {
	                    obj.translate.y += Math.round(player.getParameter('speed') * dt);
	                }
	            }
	            if (py > 75) {
	                if (obj.translate.y > -200) {
	                    obj.translate.y -= Math.round(player.getParameter('speed') * dt);
	                }
	            }
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 13 */
/***/ function(module, exports) {

	var nargs = /\{([0-9a-zA-Z]+)\}/g
	var slice = Array.prototype.slice

	module.exports = template

	function template(string) {
	    var args

	    if (arguments.length === 2 && typeof arguments[1] === "object") {
	        args = arguments[1]
	    } else {
	        args = slice.call(arguments, 1)
	    }

	    if (!args || !args.hasOwnProperty) {
	        args = {}
	    }

	    return string.replace(nargs, function replaceArg(match, i, index) {
	        var result

	        if (string[index - 1] === "{" &&
	            string[index + match.length] === "}") {
	            return i
	        } else {
	            result = args.hasOwnProperty(i) ? args[i] : null
	            if (result === null || result === undefined) {
	                return ""
	            }

	            return result
	        }
	    })
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(13);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	    countMonsterKilled: {
	        update: function update(dt, obj) {
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                kills: obj.layer.state.parameters.monstersKilled || 0
	            }));
	        }
	    },
	    timer: {
	        update: function update(dt, obj) {
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                time: (obj.layer.state.parameters.gameTimer++ / 60).toFixed(2)
	            }));
	        }
	    },
	    health: {
	        update: function update(dt, obj) {
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                health: obj.layer.getObjectsByType('player')[0].parameters.health
	            }));
	        }
	    },
	    level: {
	        update: function update(dt, obj) {
	            var template = obj.getParameter('template');
	            var player = obj.layer.getObjectsByType('player')[0];

	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                level: player.getParameter('level'),
	                exp: player.getParameter('exp'),
	                levelExp: player.getParameter('levelTable')[player.getParameter('level')]
	            }));
	        }
	    },
	    bestTime: {
	        init: function init() {
	            var obj = this.context;
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                time: (obj.layer.state.parameters.bestTime / 60).toFixed(2)
	            }));
	        }
	    },
	    bestScore: {
	        init: function init() {
	            var obj = this.context;
	            var template = obj.getParameter('template');
	            obj.setParameter('text', (0, _stringTemplate2.default)(template, {
	                score: obj.layer.state.parameters.bestScore
	            }));
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(9);

	var _utils2 = _interopRequireDefault(_utils);

	var _stringTemplate = __webpack_require__(13);

	var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Victor = __webpack_require__(10);

	var config = {
	    bindPositionToLayer: {
	        update: function update(dt, obj) {
	            if (obj.pos.x - obj.sprite.size[0] / 2 < obj.layer.pos.x) {
	                obj.pos.x = obj.sprite.size[0] / 2;
	            } else if (obj.pos.x + obj.sprite.size[0] / 2 > obj.layer.pos.x + obj.layer.size[0]) {
	                obj.pos.x = obj.layer.pos.x + obj.layer.size[0] - obj.sprite.size[0] / 2;
	            }

	            if (obj.pos.y - obj.sprite.size[1] / 2 < obj.layer.pos.y) {
	                obj.pos.y = obj.sprite.size[1] / 2;
	            } else if (obj.pos.y + obj.sprite.size[1] / 2 > obj.layer.pos.y + obj.layer.size[1]) {
	                obj.pos.y = obj.layer.pos.y + obj.layer.size[1] - obj.sprite.size[1] / 2;
	            }
	        }
	    },
	    destroyAfterLeavingLayer: {
	        update: function update(dt, obj) {
	            if (obj.pos.y < -100 || obj.pos.y - obj.sprite.size[1] - 100 > obj.layer.pos.y + obj.layer.size[1] || obj.pos.x - obj.sprite.size[0] - 100 > obj.layer.pos.x + obj.layer.size[0] || obj.pos.x < -100) {
	                obj._removeInNextTick = true;
	                return false;
	            }
	        }
	    },
	    setDirectionToPlayer: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            obj.setParameter('direction', new _utils2.default.Line(obj.pos, player.pos));
	        }
	    },
	    setDirectionToPlayerAdvance: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                playerDirection = player.getParameter('direction'),
	                oldDirection = obj.getParameter('direction');

	            if (!oldDirection) {
	                oldDirection = new _utils2.default.Line(obj.pos, player.pos);
	            }

	            if (playerDirection.dir == null) {
	                obj.setParameter('direction', new _utils2.default.Line(obj.pos, player.pos));
	            } else {
	                var speed = Math.abs(Math.min(player.getParameter('speed'), _utils2.default.getDistance(obj.pos, player.pos)) - 10),
	                    playerNextPlace = playerDirection.getDestination(player.pos, speed),
	                    directionToPlayerNextPlace = new _utils2.default.Line(obj.pos, playerNextPlace),
	                    directionToPlayerNextPlaceVector = directionToPlayerNextPlace.vector.clone().normalize(),
	                    oldDirectionVector = oldDirection.vector.clone().normalize(),
	                    newDirectionVector = directionToPlayerNextPlaceVector.add(oldDirectionVector).normalize(),
	                    newDirection = new _utils2.default.Line(obj.pos, newDirectionVector);

	                obj.setParameter('direction', newDirection);
	            }
	        }
	    },
	    wandererAI: {
	        init: function init(dt) {
	            var topLeft = new Victor(100, 100);
	            var bottomRight = new Victor(1100, 850);

	            this.context.setParameter('direction', new _utils2.default.Line(this.context.pos, new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray())));
	        },
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0],
	                distance = _utils2.default.getDistance(obj.pos, player.pos);

	            if (distance <= obj.getParameter('scentRange')) {
	                obj.setParameter('scent', true);
	                obj.setParameter('speed', obj.getDefaultParameter('scentSpeed'));
	                obj.setParameter('wanderCooldown', 0);
	                obj.setParameter('direction', new _utils2.default.Line(obj.pos, player.pos));
	            } else {
	                obj.setParameter('speed', obj.getDefaultParameter('speed'));
	                if (!obj.getParameter('wanderCooldown')) {
	                    var topLeft = new Victor(100, 100);
	                    var bottomRight = new Victor(1100, 850);

	                    obj.setParameter('direction', new _utils2.default.Line(obj.pos, new _utils2.default.Point(Victor(10, 20).randomize(topLeft, bottomRight).toArray())));
	                    obj.setParameter('wanderCooldown', Math.round(Math.random() * (obj.getDefaultParameter('wanderCooldown') - 100) + 100));
	                } else {
	                    obj.getParameter('wanderCooldown') && obj.setParameter('wanderCooldown', obj.getParameter('wanderCooldown') - 1);
	                }
	            }
	        }
	    },
	    dynamicZIndex: {
	        update: function update(dt, obj) {
	            var newZIndex = 0;
	            obj.pos && (newZIndex += obj.pos.y);
	            obj.sprite && (newZIndex += obj.sprite.size[1] / 2);

	            obj.zIndex = obj.pos.y > 0 ? Math.round(newZIndex) : 0;
	        }
	    },
	    collisions: {
	        init: function init() {
	            var obj = this.context,
	                collisions = obj.setParameter('collisions', []);

	            collisions.cells = new Array();
	            obj.layer.state.collisions.updateObject(obj);
	        },
	        update: function update(dt, obj) {
	            obj.getParameter('collisions').splice(0);
	            obj.layer.state.collisions.updateObject(obj);
	        }
	    },
	    rotateToMouse: {
	        update: function update(dt, obj) {
	            var destination = new _utils2.default.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

	            destination.x -= obj.layer.translate.x;
	            destination.y -= obj.layer.translate.y;

	            var directionToMouse = new _utils2.default.Line(obj.pos, destination);
	            obj.sprite.rotateToDirection(directionToMouse);
	        }
	    },
	    bindPositionToMouse: {
	        update: function update(dt, obj) {
	            var mousePosition = new _utils2.default.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
	            obj.setPosition(mousePosition.clone());
	        }
	    },
	    removeOnCooldown: {
	        update: function update(dt, obj) {
	            var cooldown = obj.getParameter('cooldown');

	            if (cooldown == 0) {
	                obj._removeInNextTick = true;
	            } else {
	                obj.setParameter('cooldown', cooldown - 1);
	            }
	        }
	    },
	    explosionOnCooldown: {
	        update: function update(dt, obj) {
	            var cooldown = obj.getParameter('cooldown');

	            if (cooldown == 0) {
	                obj._removeInNextTick = true;

	                var explosionConfig = gameConfigs.getConfig('monsterExplosion');
	                explosionConfig.pos = new _utils2.default.Point([obj.pos.x, obj.pos.y]);
	                var expl = obj.layer.addObject(explosionConfig);
	                expl.setParameter('power', obj.getParameter('power'));

	                return;
	            } else {
	                obj.setParameter('cooldown', cooldown - 1);
	            }
	        }
	    },
	    destroyAfterSpriteDone: {
	        update: function update(dt, obj) {
	            if (obj.sprite.done) {
	                obj._removeInNextTick = true;
	            }
	        }
	    },
	    rotateByDirection: {
	        update: function update(dt, obj) {
	            obj.sprite.rotateToDirection(obj.getParameter('direction'));
	        }
	    },
	    rotateByPlayer: {
	        update: function update(dt, obj) {
	            var player = obj.layer.getObjectsByType('player')[0];

	            obj.sprite.rotateToDirection(new _utils2.default.Line(obj.pos, player.pos));
	        }
	    }
	};

	exports.default = config;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var config = {
		mainLayer: {
			id: 'mainLayer',
			size: [1224, 968],
			background: 'terrain',
			initList: ['player', 'cursor', 'counter', 'timer', 'bestTime', 'fireballSpell', 'frostShardSpell', 'teleportSpell', 'bestScore', 'level'],
			init: function init() {
				this.state.parameters.monstersKilled = 0;
				this.state.parameters.gameTimer = 0;
			},
			translate: {
				x: -100,
				y: -100
			},
			rules: ['spawn_monster', 'random_trees', 'spawn_heart', 'spawn_powerup', 'goWithPlayer']
		}
	};

	exports.default = config;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZUNvbmZpZ3MuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vanMvY29uZmlncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvc3BlbGxzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdW5pdHMuanMiLCJ3ZWJwYWNrOi8vL2pzL2NvbmZpZ3Mvb2JqZWN0cy9lZmZlY3RzLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL29iamVjdHMvdGVycmFpbi5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9vYmplY3RzL3VpLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3NwZWxscy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy91bml0cy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9ydWxlcy9sYXllcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vc3RyaW5nLXRlbXBsYXRlL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL3VpLmpzIiwid2VicGFjazovLy9qcy9jb25maWdzL3J1bGVzL2V0Yy5qcyIsIndlYnBhY2s6Ly8vanMvY29uZmlncy9sYXllcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9iamVjdHMgZnJvbSAnLi9vYmplY3RzL2luZGV4JztcclxuaW1wb3J0IHJ1bGVzIGZyb20gJy4vcnVsZXMvaW5kZXgnO1xyXG5pbXBvcnQgbGF5ZXJzIGZyb20gJy4vbGF5ZXJzJztcclxuXHJcbmZ1bmN0aW9uIGdldFJ1bGVDb25maWcoaWQpIHtcclxuICAgIHJldHVybiBydWxlc1tpZF1cclxufVxyXG5mdW5jdGlvbiBnZXRDb25maWcoaWQpIHtcclxuICAgIHZhciBjb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iamVjdHNbaWRdKSk7XHJcblxyXG4gICAgKCFjb25maWcuaWQpICYmIChjb25maWcuaWQgPSBpZCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbmZpZztcclxufVxyXG5mdW5jdGlvbiBnZXRMYXllckNvbmZpZyhpZCkge1xyXG4gICAgcmV0dXJuIGxheWVyc1tpZF07XHJcbn1cclxuZXhwb3J0IHtcclxuICAgIGdldFJ1bGVDb25maWcsXHJcbiAgICBnZXRDb25maWcsXHJcbiAgICBnZXRMYXllckNvbmZpZ1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgc3BlbGxzIGZyb20gJy4vc3BlbGxzJztcclxuaW1wb3J0IHVuaXRzIGZyb20gJy4vdW5pdHMnO1xyXG5pbXBvcnQgZWZmZWN0cyBmcm9tICcuL2VmZmVjdHMnO1xyXG5pbXBvcnQgdGVycmFpbiBmcm9tICcuL3RlcnJhaW4nO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aSc7XHJcblxyXG52YXIgb2JqZWN0cyA9IHt9O1xyXG5cclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCBzcGVsbHMpO1xyXG5PYmplY3QuYXNzaWduKG9iamVjdHMsIHVuaXRzKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCBlZmZlY3RzKTtcclxuT2JqZWN0LmFzc2lnbihvYmplY3RzLCB1aSk7XHJcbk9iamVjdC5hc3NpZ24ob2JqZWN0cywgdGVycmFpbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3RzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy9pbmRleC5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBmaXJlYmFsbFNwZWxsOiB7XHJcbiAgICAgICAgekluZGV4IDogNTAwMCxcclxuICAgICAgICBzcHJpdGU6IFsnc3BlbGxJY29ucycsIFswLCAwXSwgWzMyLCAzMl1dLFxyXG4gICAgICAgIHBvcyA6IFs0NzAsIDc0OF0sXHJcblxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICByZW5kZXIgOiAnc3BlbGwnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGJ1bGxldHNGaXJlZDogMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsJyxcclxuICAgICAgICBydWxlcyA6IFsnZmlyZWJhbGwnXVxyXG4gICAgfSxcclxuICAgIGZyb3N0U2hhcmRTcGVsbDoge1xyXG4gICAgICAgIHpJbmRleCA6IDUwMDAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ3NwZWxsSWNvbnMnLCBbMjI0LCA5Nl0sIFszMiwgMzJdXSxcclxuICAgICAgICBwb3MgOiBbNTEyLCA3NDhdLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICByZW5kZXIgOiAnc3BlbGwnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNoYXJkc0ZpcmVkOiAwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogMjAwMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGwnLFxyXG4gICAgICAgIHJ1bGVzIDogWydmcm9zdFNoYXJkJ11cclxuICAgIH0sXHJcbiAgICB0ZWxlcG9ydFNwZWxsOiB7XHJcbiAgICAgICAgekluZGV4IDogNTAwMCxcclxuICAgICAgICBzcHJpdGU6IFsnc3BlbGxJY29ucycsIFs2NCwgMzJdLCBbMzIsIDMyXV0sXHJcbiAgICAgICAgcG9zIDogWzU1NCwgNzQ4XSxcclxuICAgICAgICBzaXplIDogWzMyLCAzMl0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3NwZWxsJyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDIwMCxcclxuICAgICAgICAgICAgdGVsZXBvcnRHYXRlcyA6IDAsXHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAyMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGwnLFxyXG4gICAgICAgIHJ1bGVzIDogWyd0ZWxlcG9ydCddXHJcbiAgICB9LFxyXG4gICAgdGVsZXBvcnRHYXRlOiB7XHJcbiAgICAgICAgekluZGV4IDogMCxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNwcml0ZTogWydhcmNhbmVHYXRlJywgWzAsIDBdLCBbMzIsIDMyXSwgNywgWzAsMV1dLFxyXG4gICAgICAgIHBvcyA6IFs0NjYsIDU4MF0sXHJcbiAgICAgICAgc2l6ZSA6IFszMiwgMzJdLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGNvb2xkb3duOiAyMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBydWxlcyA6IFsncmVtb3ZlT25Db29sZG93bicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcblxyXG4gICAgYnVsbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNwcml0ZTogWydmaXJlYmFsbCcsWyAwLCAwXSwgWzMzLCAzM10sIDE2LCBbMCwgMSwgMiwgM11dLFxyXG4gICAgICAgIHNpemUgOiBbMjUsIDI1XSxcclxuICAgICAgICB0eXBlIDogJ3NwZWxsRWxlbWVudCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgcG93ZXIgOiAxMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDEwMCxcclxuICAgICAgICAgICAgc3BlZWQ6IDMwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9uczogWydidWxsZXRNb25zdGVyQ29sbGlzaW9uJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ2Rlc3Ryb3lBZnRlckxlYXZpbmdMYXllcicsICdtb3ZlVG9EaXJlY3Rpb24nLCAnZHluYW1pY1pJbmRleCcgLCAnZXhwbG9zaW9uT25Db29sZG93biddXHJcbiAgICB9LFxyXG4gICAgZnJvc3RTaGFyZCA6IHtcclxuICAgICAgICB6SW5kZXggOiAzLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnZWZmZWN0cycsWzk2LCAwXSwgWzMyLCAzMl0sIDEwLCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHR5cGUgOiAnc3BlbGxFbGVtZW50JyxcclxuICAgICAgICBzaXplIDogWzUwMCwgNTAwXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDYwLFxyXG4gICAgICAgICAgICBjb29sZG93bjogNTAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ3Nsb3dFbmVtaWVzJ10sXHJcbiAgICAgICAgcnVsZXMgOiBbJ3JlbW92ZU9uQ29vbGRvd24nLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3NwZWxscy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBwbGF5ZXIgOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2hlcm8nLCBbMCwgMF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHBvcyA6IFs2MTIsIDQ4NF0sXHJcbiAgICAgICAgc2l6ZSA6IFsyNSwgMzJdLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMTUwLFxyXG4gICAgICAgICAgICBoZWFsdGggOiA1MCxcclxuICAgICAgICAgICAgc3BlbGxQb3dlcjogMSxcclxuICAgICAgICAgICAgbGV2ZWwgOiAxLFxyXG4gICAgICAgICAgICBleHA6IDAsXHJcbiAgICAgICAgICAgIGVmZmVjdHMgOiBbXSxcclxuICAgICAgICAgICAgY3VycmVudFNwZWxsOiAnZmlyZWJhbGwnLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gOiB7fSxcclxuICAgICAgICAgICAgbGV2ZWxUYWJsZToge1xyXG4gICAgICAgICAgICAgICAgMSA6IDYwMCxcclxuICAgICAgICAgICAgICAgIDIgOiAxMjAwLFxyXG4gICAgICAgICAgICAgICAgMyA6IDIwMDAsXHJcbiAgICAgICAgICAgICAgICA0IDogMzAwMCxcclxuICAgICAgICAgICAgICAgIDUgOiA0NTAwLFxyXG4gICAgICAgICAgICAgICAgNiA6IDY1MDAsXHJcbiAgICAgICAgICAgICAgICA3IDogODAwMCxcclxuICAgICAgICAgICAgICAgIDggOiAxMDAwMCxcclxuICAgICAgICAgICAgICAgIDkgOiAxNTAwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlIDogJ3BsYXllcicsXHJcbiAgICAgICAgY29uZGl0aW9uczogWydzZWxlY3RTcGVsbFdpdGhLZXlib2FyZCddLFxyXG4gICAgICAgIHJ1bGVzIDogWydtb3ZlV2l0aEtleWJvYXJkJywgJ3JvdGF0ZVRvTW91c2UnLCAnYmluZFBvc2l0aW9uVG9MYXllcicsICdwbGF5ZXJEZWF0aCcsICdtb3ZlVG9EaXJlY3Rpb24nLCdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJywgJ3BsYXllckxldmVsVXAnXVxyXG4gICAgfSxcclxuICAgIHN1bW1vbkdhdGU6IHtcclxuICAgICAgICB6SW5kZXggOiAwLFxyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2FyY2FuZUdhdGUnLCBbMCwgMF0sIFszMiwgMzJdLCA3LCBbMCwxXV0sXHJcbiAgICAgICAgcG9zIDogWzQ2NiwgNTgwXSxcclxuICAgICAgICBzaXplIDogWzI1LCAzMF0sXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBjb29sZG93bjogODAsXHJcbiAgICAgICAgICAgIGV4cDogMyxcclxuICAgICAgICAgICAgY2hhbmNlT2ZCb3NzIDogNSxcclxuICAgICAgICAgICAgY2hhbmNlT2ZCb3NzMiA6IDgsXHJcbiAgICAgICAgICAgIGNoYW5jZU9mQm9vbWVyIDogMjAsXHJcbiAgICAgICAgICAgIGhlYWx0aCA6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVySGVhbHRoU3RhdHVzJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnc3VtbW9uT25Db29sZG93bicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDEsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2RlbW9ucycsIFswLCAxMjhdLCBbMzIsIDMyXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBzaXplIDogWzIwLDI4XSxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHJlbmRlciA6ICd1bml0JyxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBzcGVlZCA6IDI1LFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDcwICxcclxuICAgICAgICAgICAgc2NlbnRTcGVlZDogMTIwLFxyXG4gICAgICAgICAgICBzY2VudFJhbmdlOiA2MDAsXHJcbiAgICAgICAgICAgIGV4cDogMTUsXHJcbiAgICAgICAgICAgIHdhbmRlckNvb2xkb3duOiA1MDAsXHJcbiAgICAgICAgICAgIGVmZmVjdHMgOiBbXSxcclxuICAgICAgICAgICAgaGVhbHRoIDogMjAsXHJcbiAgICAgICAgICAgIHBvd2VyIDogNVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsgJ21vbnN0ZXJIZWFsdGhTdGF0dXMnLCAnc3RvcE9uQ29sbGlzaW9uV2l0aFBsYXllciddLFxyXG4gICAgICAgIHR5cGUgOiAnbW9uc3RlcicsXHJcbiAgICAgICAgcnVsZXMgOiBbJ21vdmVUb0RpcmVjdGlvbicsICd3YW5kZXJlckFJJywgJ3JvdGF0ZUJ5RGlyZWN0aW9uJywgJ21lbGVlQXR0YWNrJywgJ2R5bmFtaWNaSW5kZXgnLCAncmVzZXRFZmZlY3RzJywgJ3Jlc2V0TWVsZWVDb29sZG93biddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvb21lciA6IHtcclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIHNwcml0ZTogWydkZW1vbnMnLCBbOTYsIDEyOF0sIFszMiwgMzJdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMjAsMjhdLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogMTAwLFxyXG4gICAgICAgICAgICBleHAgOiAzMCxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdLFxyXG4gICAgICAgICAgICBoZWFsdGggOiAxMCxcclxuICAgICAgICAgICAgcG93ZXIgOiAxMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsnbW9uc3RlckhlYWx0aFN0YXR1cycsICdtb25zdGVyRXhwbG9zaW9uQ29uZGl0aW9uJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnbW92ZVRvRGlyZWN0aW9uJywgJ3JvdGF0ZUJ5UGxheWVyJywgJ3NldERpcmVjdGlvblRvUGxheWVyQWR2YW5jZScsICdkeW5hbWljWkluZGV4JywgJ3Jlc2V0U3BlZWQnLCAncmVzZXRFZmZlY3RzJ11cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zcyA6IHtcclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2JpZ01vbnN0ZXJzJywgWzAsIDBdLCBbMzIsIDUwXSwgNiwgWzAsIDEsIDJdXSxcclxuICAgICAgICBzaXplIDogWzI1LCA0MF0sXHJcbiAgICAgICAgcmVuZGVyIDogJ3VuaXQnLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHNwZWVkIDogNTAsXHJcbiAgICAgICAgICAgIGV4cCA6IDYwLFxyXG4gICAgICAgICAgICBjb29sZG93biA6IDc1LFxyXG4gICAgICAgICAgICBwb3dlciA6IDEwLFxyXG4gICAgICAgICAgICBoZWFsdGggOiA1MCxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVySGVhbHRoU3RhdHVzJyAsICdzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW9uc3RlckJvc3NMb2dpYycsICdtb3ZlVG9EaXJlY3Rpb24nLCAncm90YXRlQnlEaXJlY3Rpb24nLCAnZHluYW1pY1pJbmRleCcsICdyZXNldFNwZWVkJywgJ3Jlc2V0RWZmZWN0cycsICdyZXNldFJhbmdlQ29vbGRvd24nXVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJCb3NzMiA6IHtcclxuICAgICAgICB6SW5kZXggOiAxLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgc3ByaXRlOiBbJ2Jvc3MnLCBbMCwgMF0sIFs5NiwgNDhdLCA2LCBbMCwgMSwgMl1dLFxyXG4gICAgICAgIHNpemUgOiBbNDAsIDQ1XSxcclxuICAgICAgICByZW5kZXIgOiAndW5pdCcsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgc3BlZWQgOiAxNSxcclxuICAgICAgICAgICAgY29vbGRvd24gOiAyMDAgLFxyXG4gICAgICAgICAgICBleHA6IDEyMCxcclxuICAgICAgICAgICAgZmlyZVJhbmdlIDogMzAwLFxyXG4gICAgICAgICAgICBwb3dlciA6IDEwLFxyXG4gICAgICAgICAgICBoZWFsdGggOiAzMCxcclxuICAgICAgICAgICAgZWZmZWN0cyA6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVySGVhbHRoU3RhdHVzJyAsICdzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyJ10sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyJyxcclxuICAgICAgICBydWxlcyA6IFsnc2V0RGlyZWN0aW9uVG9QbGF5ZXInLCAnbW9uc3RlckJvc3MyTG9naWMnLCAncm90YXRlQnlEaXJlY3Rpb24nLCAnZHluYW1pY1pJbmRleCcsICdyZXNldFNwZWVkJywgJ3Jlc2V0RWZmZWN0cycsICdyZXNldFJhbmdlQ29vbGRvd24nXVxyXG4gICAgfSxcclxuICAgIGhlYXJ0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNpemU6IFsyNSwgMjVdLFxyXG4gICAgICAgIHNwcml0ZSA6IFsncHVtcGtpbicsIFswLCAwXSwgWzMyLCAzMl0sIDUsIFswLDFdXSxcclxuICAgICAgICBjb25kaXRpb25zOiBbJ3RyaWdnZXJPblBsYXllckNvbGxpc2lvbiddLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHBvd2VyIDogMTBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcG93ZXJ1cCA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIHNpemU6IFsyNSwgMjVdLFxyXG4gICAgICAgIC8vcmVuZGVyOiAnb2JqZWN0JyxcclxuICAgICAgICBjb2xsaXNpb25zOiB0cnVlLFxyXG4gICAgICAgIHNwcml0ZSA6IFsncG93ZXJVcCcsIFswLCAwXSwgWzcyLCA2NV0sIDE1LCBbMCwgMSwgMiwgMV1dLFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IFsndHJpZ2dlck9uUGxheWVyQ29sbGlzaW9uUG93ZXJVcCddLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIGV4cDogMjUwXHJcbiAgICAgICAgICAgIC8vcG93ZXIgOiAxXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy91bml0cy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcbiAgICBtYnVsbGV0IDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnZGFya2JsYXN0JywgWzAsIDBdLCBbMzgsIDM4XSwgMTIsIFswLCAxLCAyICwzXV0sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNpemUgOiBbMzIsIDMyXSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydkYW1hZ2VPblBsYXllckNvbGxpc2lvbicsICdkZXN0cm95T25QbGF5ZXJDb2xsaXNpb24nXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDEsXHJcbiAgICAgICAgICAgIHNwZWVkOiAxMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzIDogWydkZXN0cm95QWZ0ZXJMZWF2aW5nTGF5ZXInLCAnbW92ZVRvRGlyZWN0aW9uJywgJ2R5bmFtaWNaSW5kZXgnXVxyXG4gICAgfSxcclxuICAgIG1idWxsZXQyIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDMsXHJcbiAgICAgICAgY29sbGlzaW9uczogdHJ1ZSxcclxuICAgICAgICBzcHJpdGU6IFsnYm9zc1NwZWxsJywgWzAsIDBdLCBbMzAsIDI2XSwgMTAsIFswLCAxLCAyXV0sXHJcbiAgICAgICAgdHlwZSA6ICdtb25zdGVyU3BlbGxFbGVtZW50JyxcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIHNpemUgOiBbMjgsIDI0XSxcclxuICAgICAgICBjb25kaXRpb25zIDogWydtb25zdGVyQm9zczJCdWxsZXQnXSxcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICBwb3dlciA6IDE1LFxyXG4gICAgICAgICAgICBjb29sZG93bjogMTAwLFxyXG4gICAgICAgICAgICBzcGVlZDogMjAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlcyA6IFsnZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyJywgJ3NldERpcmVjdGlvblRvUGxheWVyJywgJ3JvdGF0ZUJ5RGlyZWN0aW9uJywgJ21vdmVUb0RpcmVjdGlvbicsICdkeW5hbWljWkluZGV4J11cclxuICAgIH0sXHJcbiAgICBibG9vZCA6IHtcclxuICAgICAgICB6SW5kZXggOiAyLFxyXG4gICAgICAgIHNwcml0ZSA6IFsnbW9uc3RlckJsb29kJywgWzAsIDBdLCBbMzIsIDEzXV0sXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgY29vbGRvd24gOiA1MDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ3JlbW92ZU9uQ29vbGRvd24nXVxyXG4gICAgfSxcclxuICAgIGJsb29kU3ByYXkgOiB7XHJcbiAgICAgICAgekluZGV4IDogMixcclxuICAgICAgICBzcHJpdGUgOiBbJ2Jsb29kRWZmZWN0JywgWzAsIDBdLCBbNjQsIDY0XSwgMTUsIFswLCAxLCAyLCAzLCA0XSwgbnVsbCwgdHJ1ZSwgMC43ODVdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Rlc3Ryb3lBZnRlclNwcml0ZURvbmUnLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgZXhwbG9zaW9uIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc2l6ZSA6IFszOSwgMzldLFxyXG4gICAgICAgIHNwcml0ZTogWydleHBsb3Npb25zJywgWzAsIDBdLCBbMzksIDM5XSwgMTYsIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF0sIG51bGwsIHRydWVdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Rlc3Ryb3lBZnRlclNwcml0ZURvbmUnLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckV4cGxvc2lvbiA6IHtcclxuICAgICAgICByZW5kZXI6ICdvYmplY3QnLFxyXG4gICAgICAgIGNvbGxpc2lvbnM6IHRydWUsXHJcbiAgICAgICAgdHlwZSA6ICdzcGVsbEVmZmVjdCcsXHJcbiAgICAgICAgY29uZGl0aW9ucyA6IFsnbW9uc3RlckV4cGxvc2lvbiddLFxyXG4gICAgICAgIHNpemUgOiBbMzksIDM5XSxcclxuICAgICAgICBzcHJpdGU6IFsnZXhwbG9zaW9ucycsIFswLCAwXSwgWzM5LCAzOV0sIDE2LCBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl0sIG51bGwsIHRydWVdLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2Rlc3Ryb3lBZnRlclNwcml0ZURvbmUnLCAnZHluYW1pY1pJbmRleCddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL2VmZmVjdHMuanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG4gICAgdHJlZSA6IHtcclxuICAgICAgICBzcHJpdGUgOiBbJ3RyZWUnLCBbMCwgMF0sIFs3NiwgNzZdXSxcclxuICAgICAgICBzaXplIDogWzcwLCA3MF0sXHJcbiAgICAgICAgcnVsZXM6IFsnZHluYW1pY1pJbmRleCddXHJcbiAgICB9LFxyXG4gICAgc3RvbmVzIDoge1xyXG4gICAgICAgIHJlbmRlcjogJ29iamVjdCcsXHJcbiAgICAgICAgc3ByaXRlIDogWydzdG9uZScsIFswLCAwXSwgWzI1LCAyMl1dLFxyXG4gICAgICAgIHNpemUgOiBbMTUsIDIyXSxcclxuICAgICAgICBydWxlcyA6IFsnZHluYW1pY1pJbmRleCddXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9vYmplY3RzL3RlcnJhaW4uanNcbiAqKi8iLCJ2YXIgY29uZmlnID0ge1xyXG4gICAgY3Vyc29yIDoge1xyXG4gICAgICAgIHpJbmRleCA6IDIwMDAsXHJcbiAgICAgICAgcmVuZGVyOiAnY3Vyc29yJyxcclxuICAgICAgICBwb3M6IFs0MDAsMzUwXSxcclxuICAgICAgICBzcHJpdGUgOiBbJ2N1cnNvcicsIFswLCAwXSwgWzMwLCAzMF1dLFxyXG4gICAgICAgIHJ1bGVzOiBbJ2JpbmRQb3NpdGlvblRvTW91c2UnXVxyXG4gICAgfSxcclxuICAgIGNvdW50ZXI6IHtcclxuICAgICAgICB6SW5kZXggOiAyMDAwLFxyXG4gICAgICAgIHBvczogWzUsIDEzXSxcclxuICAgICAgICByZW5kZXIgOiBcInRleHRcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNFRkVGRUZcIixcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiBcIlNDT1JFOiB7a2lsbHN9XCIsXHJcbiAgICAgICAgICAgIHNpemUgOiAxNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsnY291bnRNb25zdGVyS2lsbGVkJ11cclxuICAgIH0sXHJcbiAgICBsZWZ0T25XYXZlOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICBwb3M6IFs1LCAxMDBdLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiTEVGVCBPTiBUSElTIFdBVkU6IHtjb3VudH1cIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxldmVsOiB7XHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICBwb3M6IFszNSwgNDVdLFxyXG4gICAgICAgIHJlbmRlciA6IFwiZXhwQmFyXCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IHtcclxuICAgICAgICAgICAgd2VpZ2h0IDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGNvbG9yIDogXCIjRUZFRkVGXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlIDogXCJMRVZFTDoge2xldmVsfVwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ2xldmVsJ11cclxuICAgIH0sXHJcbiAgICB0aW1lcjoge1xyXG4gICAgICAgIHpJbmRleCA6IDIwMDAsXHJcbiAgICAgICAgcG9zOiBbNSwgMjNdLFxyXG4gICAgICAgIHJlbmRlciA6IFwidGV4dFwiLFxyXG4gICAgICAgIHBhcmFtZXRlcnMgOiB7XHJcbiAgICAgICAgICAgIHdlaWdodCA6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICBjb2xvciA6IFwiI0VGRUZFRlwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiVElNRVI6IHt0aW1lfVwiLFxyXG4gICAgICAgICAgICBzaXplIDogMTRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bGVzOiBbJ3RpbWVyJ11cclxuICAgIH0sXHJcbiAgICBiZXN0VGltZToge1xyXG4gICAgICAgIHBvczogWzUsIDM3MF0sXHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICByZW5kZXIgOiBcInRleHRcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNFRkVGRUZcIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiQkVTVCBUSU1FOiB7dGltZX1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnVsZXM6IFsnYmVzdFRpbWUnXVxyXG4gICAgfSxcclxuICAgIGJlc3RTY29yZToge1xyXG4gICAgICAgIHBvczogWzUsIDM4MF0sXHJcbiAgICAgICAgekluZGV4IDogMjAwMCxcclxuICAgICAgICByZW5kZXIgOiBcInRleHRcIixcclxuICAgICAgICBwYXJhbWV0ZXJzIDoge1xyXG4gICAgICAgICAgICB3ZWlnaHQgOiBcImJvbGRcIixcclxuICAgICAgICAgICAgY29sb3IgOiBcIiNFRkVGRUZcIixcclxuICAgICAgICAgICAgc2l6ZSA6IDE0LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA6IFwiQkVTVCBTQ09SRToge3Njb3JlfVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBydWxlczogWydiZXN0U2NvcmUnXVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3Mvb2JqZWN0cy91aS5qc1xuICoqLyIsImltcG9ydCBzcGVsbHMgZnJvbSAnLi9zcGVsbHMnO1xyXG5pbXBvcnQgdW5pdHMgZnJvbSAnLi91bml0cyc7XHJcbmltcG9ydCBsYXllcnMgZnJvbSAnLi9sYXllcnMnO1xyXG5pbXBvcnQgdWkgZnJvbSAnLi91aSc7XHJcbmltcG9ydCBldGMgZnJvbSAnLi9ldGMnO1xyXG5cclxudmFyIHJ1bGVzID0ge307XHJcblxyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCBzcGVsbHMpO1xyXG5PYmplY3QuYXNzaWduKHJ1bGVzLCB1bml0cyk7XHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIGxheWVycyk7XHJcbk9iamVjdC5hc3NpZ24ocnVsZXMsIHVpKTtcclxuT2JqZWN0LmFzc2lnbihydWxlcywgZXRjKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJ1bGVzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIGZpcmViYWxsIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIGZpcmVDb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5nZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcpID09ICdmaXJlYmFsbCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIuaXNEb3duIHx8IG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93bigzMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpcmVDb29sZG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVzdGluYXRpb24gID0gbmV3IHV0aWxzLlBvaW50KG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci54LCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVsbFBvd2VyID0gcGxheWVyLmdldFBhcmFtZXRlcignc3BlbGxQb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREZWdyZWUgPSAxMCAqIChzcGVsbFBvd2VyIC0gMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi54IC09IG9iai5sYXllci50cmFuc2xhdGUueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24ueSAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwZWxsUG93ZXI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IG5ldyB1dGlscy5MaW5lKHBsYXllci5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShwbGF5ZXIucG9zLCBkZXN0aW5hdGlvbiwgc3RhcnREZWdyZWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUJ1bGxldChkaXJlY3Rpb24sIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShwbGF5ZXIucG9zLCBkZXN0aW5hdGlvbiwgc3RhcnREZWdyZWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGVncmVlIC09IDIwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignY29vbGRvd24nKSArIDMgKiAoc3BlbGxQb3dlciAtIDEpID4gMzApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgMzApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignY29vbGRvd24nKSArIDUgKiAoc3BlbGxQb3dlciAtIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVCdWxsZXQoZGlyZWN0aW9uLCBkZXN0aW5hdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWxsZXRDb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2J1bGxldCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IHBsYXllci5wb3MuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVsbCA9IG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bGwuc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgYnVsbC5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykgKyA1ICogKHNwZWxsUG93ZXIgLSAxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVsbC5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShwbGF5ZXIucG9zLCBkZXN0aW5hdGlvbilbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmVDb29sZG93biAmJiBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBmaXJlQ29vbGRvd24gLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHNsb3dFbmVtaWVzIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIG9iamVjdHMgPSBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAnbW9uc3RlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3BlZWQgPSBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignc3BlZWQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG93ZXIgPSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3RzID0gb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2VmZmVjdHMnKSB8fCBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWVkIDwgcG93ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgc3BlZWQgLSBwb3dlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWZmZWN0cy5pbmRleE9mKCdmcm96ZW4nKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3RzLnB1c2goJ2Zyb3plbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0ZWxlcG9ydCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF0sXHJcbiAgICAgICAgICAgICAgICBmaXJlQ29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnKSA9PSAndGVsZXBvcnQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLmlzRG93biB8fCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oMzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJlQ29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vdXNlICA9IG5ldyB1dGlscy5Qb2ludChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueCwgb2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLnkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2UueCAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlLnkgLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IG5ldyB1dGlscy5MaW5lKHBsYXllci5wb3MsIHV0aWxzLmdldE1vdmVkUG9pbnRCeURlZ3JlZShwbGF5ZXIucG9zLCBtb3VzZSwgMCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlbGxQb3dlciA9IHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gZGlyZWN0aW9uLmdldERlc3RpbmF0aW9uKHBsYXllci5wb3MsIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29vbGRvd24gPSBvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignY29vbGRvd24nLCBjb29sZG93bikgLSAoMzAgKiAoc3BlbGxQb3dlciAtIDEpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZSA9IGdhbWVDb25maWdzLmdldENvbmZpZygndGVsZXBvcnRHYXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0R2F0ZS5wb3MgPSBwbGF5ZXIucG9zLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KHRlbGVwb3J0R2F0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWxlcG9ydEdhdGUgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ3RlbGVwb3J0R2F0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWxlcG9ydEdhdGUucG9zID0gZGVzdGluYXRpb24uY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QodGVsZXBvcnRHYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zZXRQb3NpdGlvbihkZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIChjb29sZG93biA+IDUwKSA/IGNvb2xkb3duIDogNTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdmaXJlQ29vbGRvd24nLCBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duICYmIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIGZpcmVDb29sZG93biAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBmcm9zdFNoYXJkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIGZpcmVDb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5nZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcpID09ICdmcm9zdFNoYXJkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci5pc0Rvd24gfHwgb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDMyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlyZUNvb2xkb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcm9zdFNoYXJkID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdmcm9zdFNoYXJkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZVBvc2l0aW9uID0gbmV3IHV0aWxzLlBvaW50KG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci54LCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVsbFBvd2VyID0gcGxheWVyLmdldFBhcmFtZXRlcignc3BlbGxQb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSBtb3VzZVBvc2l0aW9uLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi54IC09IG9iai5sYXllci50cmFuc2xhdGUueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24ueSAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9zdFNoYXJkLnBvcyA9IGRlc3RpbmF0aW9uLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BlbGxQb3dlckJvb3N0ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc3BlbGxQb3dlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVsbFBvd2VyQm9vc3QgKz0gNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcyA9IG9iai5sYXllci5hZGRPYmplY3QoZnJvc3RTaGFyZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcy5zZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJywgZnMuZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpICsgc3BlbGxQb3dlckJvb3N0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyZUNvb2xkb3duICYmIG9iai5zZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicsIGZpcmVDb29sZG93biAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWxsZXRNb25zdGVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAnbW9uc3RlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignaGVhbHRoJywgb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIC0gb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBibG9vZCA9IGdhbWVDb25maWdzLmdldENvbmZpZygnYmxvb2RTcHJheScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcyA9IG9iamVjdHNbaV0ucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvb2QucG9zLnggKz0gMjtcclxuICAgICAgICAgICAgICAgICAgICBibG9vZC5wb3MueSArPSAtIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYmxvb2QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL3NwZWxscy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgcGxheWVyRGVhdGg6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuc3RhdGUuc2hvd1Jlc3RhcnRNZW51KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGFtYWdlT25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzW2ldLnNldFBhcmFtZXRlcignaGVhbHRoJywgb2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpIC0gb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveU9uUGxheWVyQ29sbGlzaW9uOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2V4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0cmlnZ2VyT25QbGF5ZXJDb2xsaXNpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS50eXBlID09ICdwbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSA8IG9iamVjdHNbaV0uZ2V0RGVmYXVsdFBhcmFtZXRlcignaGVhbHRoJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgKyBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpIDw9IG9iamVjdHNbaV0uZ2V0RGVmYXVsdFBhcmFtZXRlcignaGVhbHRoJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgKyBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBvYmplY3RzW2ldLmdldERlZmF1bHRQYXJhbWV0ZXIoJ2hlYWx0aCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZWxlZUF0dGFjayA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmICghb2JqLmdldFBhcmFtZXRlcignbWVsZWVDb29sZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2hlYWx0aCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSAtIG9iai5nZXRQYXJhbWV0ZXIoJ3Bvd2VyJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJsb29kID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdibG9vZFNwcmF5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcyA9IG9iamVjdHNbaV0ucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcy54ICs9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb29kLnBvcy55ICs9IC0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5hZGRPYmplY3QoYmxvb2QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignbWVsZWVDb29sZG93bicsIG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckV4cGxvc2lvbjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgaWYgKCFvYmouZ2V0UGFyYW1ldGVyKCdleHBsb2RlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqZWN0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0c1tpXS5nZXRQYXJhbWV0ZXIoJ2hlYWx0aCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHNbaV0uc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignaGVhbHRoJykgLSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2V4cGxvZGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckV4cGxvc2lvbkNvbmRpdGlvbiA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlRXhwbG9zaW9ucygpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBvYmoucG9zLmNsb25lKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvd2VyID0gb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSxcclxuICAgICAgICAgICAgICAgICAgICBleHBsO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCAtIG9iai5zaXplWzBdLCBwb3MueSAtIG9iai5zaXplWzFdXSk7XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgcG93ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckV4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChbcG9zLnggKyBvYmouc2l6ZVswXSwgcG9zLnkgLSBvYmouc2l6ZVsxXV0pO1xyXG4gICAgICAgICAgICAgICAgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIHBvd2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoW3Bvcy54IC0gb2JqLnNpemVbMF0sIHBvcy55ICsgb2JqLnNpemVbMV1dKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCArIG9iai5zaXplWzBdLCBwb3MueSArIG9iai5zaXplWzFdXSk7XHJcbiAgICAgICAgICAgICAgICBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgcG93ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckV4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChbcG9zLnggLSAzIC8gMiAqIG9iai5zaXplWzBdLCBwb3MueV0pO1xyXG4gICAgICAgICAgICAgICAgZXhwbCA9IG9iai5sYXllci5hZGRPYmplY3QoZXhwbG9zaW9uQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGV4cGwuc2V0UGFyYW1ldGVyKCdwb3dlcicsIHBvd2VyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21vbnN0ZXJFeHBsb3Npb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGxvc2lvbkNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoW3Bvcy54ICsgMyAvIDIgKiBvYmouc2l6ZVswXSwgcG9zLnldKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmouZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUV4cGxvc2lvbnMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmplY3RzID0gb2JqLmdldFBhcmFtZXRlcignY29sbGlzaW9ucycpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUV4cGxvc2lvbnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdG9wT25Db2xsaXNpb25XaXRoUGxheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmplY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRTcGVlZCA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgb2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ3NwZWVkJykpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXNldEVmZmVjdHMgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmouZ2V0UGFyYW1ldGVyKCdlZmZlY3RzJykuc3BsaWNlKDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3ZlVG9EaXJlY3Rpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBvYmouZ2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gJiYgZGlyZWN0aW9uLmRpcikge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKGRpcmVjdGlvbi5nZXREZXN0aW5hdGlvbihvYmoucG9zLCBvYmouZ2V0UGFyYW1ldGVyKCdzcGVlZCcpICogZHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbGF5ZXJMZXZlbFVwOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbGV2ZWxFeHAgPSBvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbFRhYmxlJylbb2JqLmdldFBhcmFtZXRlcignbGV2ZWwnKV07XHJcbiAgICAgICAgICAgIGlmIChvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbFRhYmxlJylbb2JqLmdldFBhcmFtZXRlcignbGV2ZWwnKV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouZ2V0UGFyYW1ldGVyKCdleHAnKSA+IG9iai5nZXRQYXJhbWV0ZXIoJ2xldmVsVGFibGUnKVtvYmouZ2V0UGFyYW1ldGVyKCdsZXZlbCcpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2V4cCcsIG9iai5nZXRQYXJhbWV0ZXIoJ2V4cCcpIC0gbGV2ZWxFeHApO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2xldmVsJywgb2JqLmdldFBhcmFtZXRlcignbGV2ZWwnKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInLCBvYmouZ2V0UGFyYW1ldGVyKCdzcGVsbFBvd2VyJykgKyAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2xldmVsJywgJ01BWCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vbnN0ZXJIZWFsdGhTdGF0dXM6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouZ2V0UGFyYW1ldGVyKCdoZWFsdGgnKSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBleHBsb3Npb25Db25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2V4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJsb29kID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdibG9vZCcpO1xyXG4gICAgICAgICAgICAgICAgYmxvb2QucG9zID0gb2JqLnBvcy5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgb2JqLmxheWVyLmFkZE9iamVjdChibG9vZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvYmoubGF5ZXIuc3RhdGUucGFyYW1ldGVycy5tb25zdGVyc0tpbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5sYXllci5zdGF0ZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9iai5sYXllci5zdGF0ZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkKys7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLnNldFBhcmFtZXRlcignZXhwJywgcGxheWVyLmdldFBhcmFtZXRlcignZXhwJykgKyBvYmouZ2V0UGFyYW1ldGVyKCdleHAnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRSYW5nZUNvb2xkb3duOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgZmlyZUNvb2xkb3duID0gb2JqLmdldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBmaXJlQ29vbGRvd24gJiYgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgZmlyZUNvb2xkb3duIC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzZXRNZWxlZUNvb2xkb3duOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgbWVsZWVDb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ21lbGVlQ29vbGRvd24nKTtcclxuICAgICAgICAgICAgbWVsZWVDb29sZG93biAmJiBvYmouc2V0UGFyYW1ldGVyKCdtZWxlZUNvb2xkb3duJywgbWVsZWVDb29sZG93biAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb25zdGVyQm9zc0xvZ2ljOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdO1xyXG4gICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcdGJ1bGxldENvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbWJ1bGxldCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1bGxldENvbmZpZy5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbCA9IG9iai5sYXllci5hZGRPYmplY3QoYnVsbGV0Q29uZmlnKTtcclxuICAgICAgICAgICAgICAgIGJ1bGwuc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnVsbC5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBwbGF5ZXIucG9zKVswXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3MyTG9naWMgOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uVG9QbGF5ZXIgPSBvYmouZ2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh1dGlscy5nZXREaXN0YW5jZShvYmoucG9zLCBwbGF5ZXIucG9zKSA8IG9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVSYW5nZScpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5nZXRQYXJhbWV0ZXIoJ2ZpcmVDb29sZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyXHRidWxsZXRDb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ21idWxsZXQyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Q29uZmlnLnBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGJ1bGxldENvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGwuc2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nLCBkaXJlY3Rpb25Ub1BsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9idWxsLnNwcml0ZS5zZXREZWdyZWUodXRpbHMuZ2V0RGVncmVlKG9iai5wb3MsIHBsYXllci5wb3MpWzBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZmlyZUNvb2xkb3duJywgb2JqLmdldFBhcmFtZXRlcignY29vbGRvd24nKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UG9zaXRpb24oZGlyZWN0aW9uVG9QbGF5ZXIuZ2V0RGVzdGluYXRpb24ob2JqLnBvcywgb2JqLmdldFBhcmFtZXRlcignc3BlZWQnKSAqIGR0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9uc3RlckJvc3MyQnVsbGV0IDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgY29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpO1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNyZWF0ZUV4cGxvc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBjb29sZG93biAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLnR5cGUgPT0gJ3BsYXllcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFeHBsb3Npb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlRXhwbG9zaW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IG9iai5wb3MuY2xvbmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG93ZXIgPSBvYmouZ2V0UGFyYW1ldGVyKCdwb3dlcicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGw7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyRXhwbG9zaW9uJyk7XHJcbiAgICAgICAgICAgICAgICBleHBsb3Npb25Db25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KFtwb3MueCwgcG9zLnldKTtcclxuICAgICAgICAgICAgICAgIGV4cGwgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KGV4cGxvc2lvbkNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICBleHBsLnNldFBhcmFtZXRlcigncG93ZXInLCBwb3dlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW92ZVdpdGhLZXlib2FyZDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IG9iai5wb3MuY2xvbmUoKTtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHt9O1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24ubGVmdCA9IG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big2NSk7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbi51cCA9IG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big4Nyk7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbi5kb3duID0gb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDgzKTtcclxuICAgICAgICAgICAgZGlyZWN0aW9uLnJpZ2h0ID0gb2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDY4KTtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbi5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcG9zLnggPSBvYmoucG9zLnggKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24ubGVmdCkge1xyXG4gICAgICAgICAgICAgICAgcG9zLnggPSBvYmoucG9zLnggLSAxICAgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24uZG93bikge1xyXG4gICAgICAgICAgICAgICAgcG9zLnkgPSBvYmoucG9zLnkgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24udXApIHtcclxuICAgICAgICAgICAgICAgIHBvcy55ID0gb2JqLnBvcy55IC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wb3MueCA9PSBwb3MueCAmJiBvYmoucG9zLnkgPT0gcG9zLnkpIHtcclxuICAgICAgICAgICAgICAgIG9iai5nZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicpLmRpciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBkaXJlY3Rpb24gPSB1dGlscy5nZXREaXJlY3Rpb24ob2JqLnBvcywgcG9zKTtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBvcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlbGVjdFNwZWxsV2l0aEtleWJvYXJkOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICAob2JqLmxheWVyLmdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKDQ5KSkgJiYgKG9iai5zZXRQYXJhbWV0ZXIoJ2N1cnJlbnRTcGVsbCcsICdmaXJlYmFsbCcpKTtcclxuICAgICAgICAgICAgKG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big1MCkpICYmIChvYmouc2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnLCAnZnJvc3RTaGFyZCcpKTtcclxuICAgICAgICAgICAgKG9iai5sYXllci5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93big1MSkpICYmIChvYmouc2V0UGFyYW1ldGVyKCdjdXJyZW50U3BlbGwnLCAndGVsZXBvcnQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRyaWdnZXJPblBsYXllckNvbGxpc2lvblBvd2VyVXAgOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgb2JqZWN0cyA9IG9iai5nZXRQYXJhbWV0ZXIoJ2NvbGxpc2lvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0udHlwZSA9PSAncGxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ3NwZWxsUG93ZXInLCBvYmplY3RzW2ldLmdldFBhcmFtZXRlcignc3BlbGxQb3dlcicpICsgb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c1tpXS5zZXRQYXJhbWV0ZXIoJ2V4cCcsIG9iamVjdHNbaV0uZ2V0UGFyYW1ldGVyKCdleHAnKSArIG9iai5nZXRQYXJhbWV0ZXIoJ2V4cCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouX3JlbW92ZUluTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN1bW1vbk9uQ29vbGRvd24gOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBjb29sZG93biA9IG9iai5nZXRQYXJhbWV0ZXIoJ2Nvb2xkb3duJyk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFByb3Blck1vbnN0ZXIoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5yYW5kb20oKSAqIDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJhbmRvbSA8PSBvYmouZ2V0UGFyYW1ldGVyKCdjaGFuY2VPZkJvc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckJvc3MnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tIC09IG9iai5nZXRQYXJhbWV0ZXIoJ2NoYW5jZU9mQm9zcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb25maWcgJiYgcmFuZG9tIDw9IG9iai5nZXRQYXJhbWV0ZXIoJ2NoYW5jZU9mQm9zczInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckJvc3MyJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmRvbSAtPSBvYmouZ2V0UGFyYW1ldGVyKCdjaGFuY2VPZkJvc3MyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbmZpZyAmJiByYW5kb20gPD0gb2JqLmdldFBhcmFtZXRlcignY2hhbmNlT2ZCb29tZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckJvb21lcicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByYW5kb20gLT0gb2JqLmdldFBhcmFtZXRlcignbW9uc3RlckJvb21lcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdtb25zdGVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29vbGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlckNvbmZpZyA9IGdldFByb3Blck1vbnN0ZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIgPSBvYmoubGF5ZXIuZ2V0T2JqZWN0c0J5VHlwZSgncGxheWVyJylbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgbW9uc3RlckNvbmZpZy5wb3MgPSBvYmoucG9zLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG1vbnN0ZXIgPSBvYmoubGF5ZXIuYWRkT2JqZWN0KG1vbnN0ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdsZXZlbCcpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuc2V0UGFyYW1ldGVyKCdoZWFsdGgnLCBtb25zdGVyLmdldFBhcmFtZXRlcignaGVhbHRoJykgKiAwLjc1ICogcGxheWVyLmdldFBhcmFtZXRlcignbGV2ZWwnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIGNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy91bml0cy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uLy4uL2VuZ2luZS91dGlscyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnc3RyaW5nLXRlbXBsYXRlJztcclxudmFyIFZpY3RvciA9IHJlcXVpcmUoJ3ZpY3RvcicpO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIHJhbmRvbV90cmVlczoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tUG9pbnRJbkFyZWEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIG9iai5zaXplWzBdKSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogb2JqLnNpemVbMV0pXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcmFtZXRlcnMudHJlZXM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygndHJlZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXJhbWV0ZXJzLnN0b25lczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdzdG9uZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25maWcucG9zID0gbmV3IHV0aWxzLlBvaW50KGdldFJhbmRvbVBvaW50SW5BcmVhKHRoaXMucGFyYW1ldGVycy5hcmVhKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLyp2YXIgc3RvbmUgPSAqL3RoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIC8vc3RvbmUuc3ByaXRlLnNldERlZ3JlZSh1dGlscy5nZXREZWdyZWUob2JqLnBvcywgZ2V0UmFuZG9tUG9pbnRJbkFyZWEodGhpcy5wYXJhbWV0ZXJzLmFyZWEpKVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIHRyZWVzOiA0MCxcclxuICAgICAgICAgICAgc3RvbmVzOiA0MFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9tb25zdGVyOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50V2F2ZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tb25zZXRlck9uV2F2ZSA9IHRoaXMucGFyYW1ldGVycy53YXZlTXVsdGlwbGllciAqICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudFdhdmUpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckxlZnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubGFzdFdhdmVNb25zdGVycyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tb25zdGVyU3Bhd25lZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdE9uV2F2ZSA9IHRoaXMuY29udGV4dC5hZGRPYmplY3QoZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCdsZWZ0T25XYXZlJykpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckxlZnQgPSAob2JqLnN0YXRlLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQgLSB0aGlzLnBhcmFtZXRlcnMubGFzdFdhdmVNb25zdGVycyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQgPCB0aGlzLnBhcmFtZXRlcnMud2F2ZU11bHRpcGxpZXIgKiAodGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRXYXZlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCghdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcExlZnQgPSBuZXcgVmljdG9yKDUwIC0gb2JqLnRyYW5zbGF0ZS54LCA1MCAtIG9iai50cmFuc2xhdGUueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3Rvcig5MDAgLSBvYmoudHJhbnNsYXRlLngsIDY1MCAtIG9iai50cmFuc2xhdGUueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1bW1vbkdhdGUgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ3N1bW1vbkdhdGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbW9uR2F0ZS5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoVmljdG9yKDEwLCAyMCkucmFuZG9taXplKHRvcExlZnQsIGJvdHRvbVJpZ2h0KS50b0FycmF5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1vbkdhdGUucG9zLnggPSBNYXRoLm1pbigxMTUwLCBNYXRoLm1heCg1MCwgc3VtbW9uR2F0ZS5wb3MueCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1vbkdhdGUucG9zLnkgPSBNYXRoLm1pbig5NjgsIE1hdGgubWF4KDUwLCBzdW1tb25HYXRlLnBvcy55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChzdW1tb25HYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJTcGF3bmVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMubW9uc3RlckNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24gJiYgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRNb25zdGVyQ29vbGRvd24tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubW9uc3RlckxlZnQgPT0gdGhpcy5wYXJhbWV0ZXJzLm1vbnNldGVyT25XYXZlICApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudFdhdmUrKztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMubW9uc3RlclNwYXduZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5tb25zZXRlck9uV2F2ZSA9IHRoaXMucGFyYW1ldGVycy53YXZlTXVsdGlwbGllciAqICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudFdhdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5sYXN0V2F2ZU1vbnN0ZXJzID0gb2JqLnN0YXRlLnBhcmFtZXRlcnMubW9uc3RlcnNLaWxsZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sZWZ0T25XYXZlLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0aGlzLmxlZnRPbldhdmUuZ2V0UGFyYW1ldGVyKCd0ZW1wbGF0ZScpLCB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogdGhpcy5wYXJhbWV0ZXJzLm1vbnN0ZXJMZWZ0ICsgJy8nICsgdGhpcy5wYXJhbWV0ZXJzLm1vbnNldGVyT25XYXZlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgd2F2ZU11bHRpcGxpZXI6IDI1LFxyXG4gICAgICAgICAgICBtb25zdGVyQ29vbGRvd246IDEwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNwYXduX2hlYXJ0OiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ2hlYXJ0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRvcExlZnQgPSBuZXcgVmljdG9yKDUwLCA1MCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYm90dG9tUmlnaHQgPSBuZXcgVmljdG9yKDExNTQsIDkxOCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChWaWN0b3IoMTAsIDIwKS5yYW5kb21pemUodG9wTGVmdCwgYm90dG9tUmlnaHQpLnRvQXJyYXkoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmFkZE9iamVjdChjb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24gPSB0aGlzLnBhcmFtZXRlcnMuY29vbGRvd247XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRDb29sZG93bi0tO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICBhcmVhOiBbWzUwLCA1MF0sIFsxMTU0LCA5MThdXSxcclxuICAgICAgICAgICAgY29vbGRvd246IDQwMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzcGF3bl9wb3dlcnVwOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBnYW1lQ29uZmlncy5nZXRDb25maWcoJ3Bvd2VydXAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wTGVmdCA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3RvcigxMTAwLCA4NTApO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbmZpZy5wb3MgPSBuZXcgdXRpbHMuUG9pbnQoVmljdG9yKDEwLCAyMCkucmFuZG9taXplKHRvcExlZnQsIGJvdHRvbVJpZ2h0KS50b0FycmF5KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRPYmplY3QoY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuY3VycmVudENvb2xkb3duID0gdGhpcy5wYXJhbWV0ZXJzLmNvb2xkb3duO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5jdXJyZW50Q29vbGRvd24tLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgYXJlYTogW1sxMDAsIDEwMF0sIFsxMTAwLCA4NTBdXSxcclxuICAgICAgICAgICAgY3VycmVudENvb2xkb3duIDogMTEwMCxcclxuICAgICAgICAgICAgY29vbGRvd246IDExMDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3Bhd25fdGVycmFpbjoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0LFxyXG4gICAgICAgICAgICAgICAgZ2F0ZUNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnZ2F0ZScpLFxyXG4gICAgICAgICAgICAgICAgd2FsbENvbmZpZztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB3YWxsQ29uZmlnID0gZ2FtZUNvbmZpZ3MuZ2V0Q29uZmlnKCd3YWxsJyk7XHJcbiAgICAgICAgICAgICAgICB3YWxsQ29uZmlnLnBvcyA9IFt3YWxsQ29uZmlnLnNpemVbMF0gKiBpICsgd2FsbENvbmZpZy5zaXplWzBdIC8gMiwgd2FsbENvbmZpZy5zaXplWzFdLzJdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHdhbGwgPSB0aGlzLmNvbnRleHQuYWRkT2JqZWN0KHdhbGxDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgLy9zdG9uZS5zcHJpdGUuc2V0RGVncmVlKHV0aWxzLmdldERlZ3JlZShvYmoucG9zLCBnZXRSYW5kb21Qb2ludEluQXJlYSh0aGlzLnBhcmFtZXRlcnMuYXJlYSkpWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnYXRlQ29uZmlnLnBvcyA9IFt3YWxsQ29uZmlnLnBvcy54ICsgd2FsbENvbmZpZy5zaXplWzBdLyAyICsgZ2F0ZUNvbmZpZy5zaXplWzBdLzIsIChnYXRlQ29uZmlnLnNpemVbMV0gLSAzKS8yIF07XHJcbiAgICAgICAgICAgIHZhciBnYXRlID0gdGhpcy5jb250ZXh0LmFkZE9iamVjdChnYXRlQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ29XaXRoUGxheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCxvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXSxcclxuICAgICAgICAgICAgICAgIHB4ID0gKHBsYXllci5wb3MueCArIG9iai50cmFuc2xhdGUueCkgLyAxMDI0ICogMTAwLFxyXG4gICAgICAgICAgICAgICAgcHkgPSAocGxheWVyLnBvcy55ICsgb2JqLnRyYW5zbGF0ZS55KSAvIDc2OCAqIDEwMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChweCA8IDMwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnRyYW5zbGF0ZS54IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai50cmFuc2xhdGUueCArPSBNYXRoLnJvdW5kKHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHB4ID4gNzApIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoudHJhbnNsYXRlLnggPiAtIDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai50cmFuc2xhdGUueCAtPSBNYXRoLnJvdW5kKHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChweSA8IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnRyYW5zbGF0ZS55IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai50cmFuc2xhdGUueSArPSBNYXRoLnJvdW5kKHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHB5ID4gNzUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoudHJhbnNsYXRlLnkgPiAtIDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai50cmFuc2xhdGUueSAtPSBNYXRoLnJvdW5kKHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWVkJykgKiBkdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9ydWxlcy9sYXllcnMuanNcbiAqKi8iLCJ2YXIgbmFyZ3MgPSAvXFx7KFswLTlhLXpBLVpdKylcXH0vZ1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGVcblxuZnVuY3Rpb24gdGVtcGxhdGUoc3RyaW5nKSB7XG4gICAgdmFyIGFyZ3NcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50c1sxXVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICB9XG5cbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuaGFzT3duUHJvcGVydHkpIHtcbiAgICAgICAgYXJncyA9IHt9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKG5hcmdzLCBmdW5jdGlvbiByZXBsYWNlQXJnKG1hdGNoLCBpLCBpbmRleCkge1xuICAgICAgICB2YXIgcmVzdWx0XG5cbiAgICAgICAgaWYgKHN0cmluZ1tpbmRleCAtIDFdID09PSBcIntcIiAmJlxuICAgICAgICAgICAgc3RyaW5nW2luZGV4ICsgbWF0Y2gubGVuZ3RoXSA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBhcmdzLmhhc093blByb3BlcnR5KGkpID8gYXJnc1tpXSA6IG51bGxcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3N0cmluZy10ZW1wbGF0ZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ3N0cmluZy10ZW1wbGF0ZSc7XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgY291bnRNb25zdGVyS2lsbGVkIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAga2lsbHM6IG9iai5sYXllci5zdGF0ZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkIHx8IDBcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0aW1lciA6IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IG9iai5nZXRQYXJhbWV0ZXIoJ3RlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3RleHQnLCBmb3JtYXQodGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIHRpbWU6ICgob2JqLmxheWVyLnN0YXRlLnBhcmFtZXRlcnMuZ2FtZVRpbWVyKyspIC8gNjApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBoZWFsdGggOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBvYmouZ2V0UGFyYW1ldGVyKCd0ZW1wbGF0ZScpO1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd0ZXh0JywgZm9ybWF0KHRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFsdGg6IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXS5wYXJhbWV0ZXJzLmhlYWx0aFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxldmVsIDoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3RleHQnLCBmb3JtYXQodGVtcGxhdGUsIHtcclxuICAgICAgICAgICAgICAgIGxldmVsOiBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdsZXZlbCcpLFxyXG4gICAgICAgICAgICAgICAgZXhwOiBwbGF5ZXIuZ2V0UGFyYW1ldGVyKCdleHAnKSxcclxuICAgICAgICAgICAgICAgIGxldmVsRXhwIDogcGxheWVyLmdldFBhcmFtZXRlcignbGV2ZWxUYWJsZScpW3BsYXllci5nZXRQYXJhbWV0ZXIoJ2xldmVsJyldXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmVzdFRpbWUgOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBvYmouZ2V0UGFyYW1ldGVyKCd0ZW1wbGF0ZScpO1xyXG4gICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd0ZXh0JywgZm9ybWF0KHRlbXBsYXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAoKG9iai5sYXllci5zdGF0ZS5wYXJhbWV0ZXJzLmJlc3RUaW1lKSAvIDYwKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmVzdFNjb3JlIDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gb2JqLmdldFBhcmFtZXRlcigndGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcigndGV4dCcsIGZvcm1hdCh0ZW1wbGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgc2NvcmU6IG9iai5sYXllci5zdGF0ZS5wYXJhbWV0ZXJzLmJlc3RTY29yZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2NvbmZpZ3MvcnVsZXMvdWkuanNcbiAqKi8iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi8uLi9lbmdpbmUvdXRpbHMnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ3N0cmluZy10ZW1wbGF0ZSc7XHJcbnZhciBWaWN0b3IgPSByZXF1aXJlKCd2aWN0b3InKTtcclxuXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBiaW5kUG9zaXRpb25Ub0xheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBvcy54IC0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMiA8IG9iai5sYXllci5wb3MueCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnBvcy54ID0gb2JqLnNwcml0ZS5zaXplWzBdIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvYmoucG9zLnggKyBvYmouc3ByaXRlLnNpemVbMF0gLyAyID4gb2JqLmxheWVyLnBvcy54ICsgb2JqLmxheWVyLnNpemVbMF0pIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3MueCAgPSBvYmoubGF5ZXIucG9zLnggICsgb2JqLmxheWVyLnNpemVbMF0gLSBvYmouc3ByaXRlLnNpemVbMF0gLyAyIDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5wb3MueSAtIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIgPCBvYmoubGF5ZXIucG9zLnkpIHtcclxuICAgICAgICAgICAgICAgIG9iai5wb3MueSA9IG9iai5zcHJpdGUuc2l6ZVsxXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob2JqLnBvcy55ICsgb2JqLnNwcml0ZS5zaXplWzFdIC8gMiA+IG9iai5sYXllci5wb3MueSArIG9iai5sYXllci5zaXplWzFdKSB7XHJcbiAgICAgICAgICAgICAgICBvYmoucG9zLnkgPSBvYmoubGF5ZXIucG9zLnkgKyBvYmoubGF5ZXIuc2l6ZVsxXSAtIG9iai5zcHJpdGUuc2l6ZVsxXSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveUFmdGVyTGVhdmluZ0xheWVyOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZiAob2JqLnBvcy55IDwgLTEwMCB8fCBvYmoucG9zLnkgLSBvYmouc3ByaXRlLnNpemVbMV0gLSAxMDA+IG9iai5sYXllci5wb3MueSArIG9iai5sYXllci5zaXplWzFdIHx8IG9iai5wb3MueCAtIG9iai5zcHJpdGUuc2l6ZVswXSAtIDEwMD4gb2JqLmxheWVyLnBvcy54ICsgb2JqLmxheWVyLnNpemVbMF0gfHwgb2JqLnBvcy54IDwgLTEwMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9yZW1vdmVJbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXREaXJlY3Rpb25Ub1BsYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0RGlyZWN0aW9uVG9QbGF5ZXJBZHZhbmNlOiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyRGlyZWN0aW9uID0gcGxheWVyLmdldFBhcmFtZXRlcignZGlyZWN0aW9uJyksXHJcbiAgICAgICAgICAgICAgICBvbGREaXJlY3Rpb24gPSBvYmouZ2V0UGFyYW1ldGVyKCdkaXJlY3Rpb24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghb2xkRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBvbGREaXJlY3Rpb24gPSBuZXcgdXRpbHMuTGluZShvYmoucG9zLCBwbGF5ZXIucG9zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllckRpcmVjdGlvbi5kaXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgcGxheWVyLnBvcykpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcGVlZCA9IE1hdGguYWJzKE1hdGgubWluKHBsYXllci5nZXRQYXJhbWV0ZXIoJ3NwZWVkJyksIHV0aWxzLmdldERpc3RhbmNlKG9iai5wb3MsIHBsYXllci5wb3MpKSAtIDEwKSxcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJOZXh0UGxhY2UgPSBwbGF5ZXJEaXJlY3Rpb24uZ2V0RGVzdGluYXRpb24ocGxheWVyLnBvcywgc3BlZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvblRvUGxheWVyTmV4dFBsYWNlID0gbmV3IHV0aWxzLkxpbmUob2JqLnBvcywgcGxheWVyTmV4dFBsYWNlKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25Ub1BsYXllck5leHRQbGFjZVZlY3RvciA9IGRpcmVjdGlvblRvUGxheWVyTmV4dFBsYWNlLnZlY3Rvci5jbG9uZSgpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9sZERpcmVjdGlvblZlY3RvciA9IG9sZERpcmVjdGlvbi52ZWN0b3IuY2xvbmUoKS5ub3JtYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXdEaXJlY3Rpb25WZWN0b3IgPSBkaXJlY3Rpb25Ub1BsYXllck5leHRQbGFjZVZlY3Rvci5hZGQob2xkRGlyZWN0aW9uVmVjdG9yKS5ub3JtYWxpemUoKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXdEaXJlY3Rpb24gPSBuZXcgdXRpbHMuTGluZShvYmoucG9zLCBuZXdEaXJlY3Rpb25WZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIG5ld0RpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgd2FuZGVyZXJBSSA6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICAgICAgdmFyIHRvcExlZnQgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcclxuICAgICAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gbmV3IFZpY3RvcigxMTAwLCA4NTApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNldFBhcmFtZXRlcignZGlyZWN0aW9uJywgbmV3IHV0aWxzLkxpbmUodGhpcy5jb250ZXh0LnBvcywgbmV3IHV0aWxzLlBvaW50KFZpY3RvcigxMCwgMjApLnJhbmRvbWl6ZSh0b3BMZWZ0LCBib3R0b21SaWdodCkudG9BcnJheSgpKSkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gb2JqLmxheWVyLmdldE9iamVjdHNCeVR5cGUoJ3BsYXllcicpWzBdLFxyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSB1dGlscy5nZXREaXN0YW5jZShvYmoucG9zLCBwbGF5ZXIucG9zKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSBvYmouZ2V0UGFyYW1ldGVyKCdzY2VudFJhbmdlJykpIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3NjZW50JywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdzcGVlZCcsIG9iai5nZXREZWZhdWx0UGFyYW1ldGVyKCdzY2VudFNwZWVkJykpO1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nLCAwKTtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIHBsYXllci5wb3MpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ3NwZWVkJywgb2JqLmdldERlZmF1bHRQYXJhbWV0ZXIoJ3NwZWVkJykpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvYmouZ2V0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcExlZnQgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYm90dG9tUmlnaHQgPSBuZXcgVmljdG9yKDExMDAsIDg1MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5zZXRQYXJhbWV0ZXIoJ2RpcmVjdGlvbicsIG5ldyB1dGlscy5MaW5lKG9iai5wb3MsIG5ldyB1dGlscy5Qb2ludChWaWN0b3IoMTAsIDIwKS5yYW5kb21pemUodG9wTGVmdCwgYm90dG9tUmlnaHQpLnRvQXJyYXkoKSkpKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicsIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChvYmouZ2V0RGVmYXVsdFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nKSAtIDEwMCkgKyAxMDApKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmdldFBhcmFtZXRlcignd2FuZGVyQ29vbGRvd24nKSAmJiBvYmouc2V0UGFyYW1ldGVyKCd3YW5kZXJDb29sZG93bicsIG9iai5nZXRQYXJhbWV0ZXIoJ3dhbmRlckNvb2xkb3duJykgLSAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkeW5hbWljWkluZGV4OiB7XHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdaSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBvYmoucG9zICYmIChuZXdaSW5kZXggKz0gb2JqLnBvcy55KTtcclxuICAgICAgICAgICAgb2JqLnNwcml0ZSAmJiAobmV3WkluZGV4ICs9IG9iai5zcHJpdGUuc2l6ZVsxXSAvIDIpO1xyXG5cclxuICAgICAgICAgICAgb2JqLnpJbmRleCA9IChvYmoucG9zLnkgPiAwKSA/IE1hdGgucm91bmQobmV3WkluZGV4KSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbGxpc2lvbnM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuY29udGV4dCxcclxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMgPSBvYmouc2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJywgW10pO1xyXG5cclxuICAgICAgICAgICAgY29sbGlzaW9ucy5jZWxscyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICBvYmoubGF5ZXIuc3RhdGUuY29sbGlzaW9ucy51cGRhdGVPYmplY3Qob2JqKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICBvYmouZ2V0UGFyYW1ldGVyKCdjb2xsaXNpb25zJykuc3BsaWNlKDApO1xyXG4gICAgICAgICAgICBvYmoubGF5ZXIuc3RhdGUuY29sbGlzaW9ucy51cGRhdGVPYmplY3Qob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlVG9Nb3VzZToge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uICA9IG5ldyB1dGlscy5Qb2ludChvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueCwgb2JqLmxheWVyLmdhbWUuaW5wdXQubW91c2VQb2ludGVyLnkpO1xyXG5cclxuICAgICAgICAgICAgZGVzdGluYXRpb24ueCAtPSBvYmoubGF5ZXIudHJhbnNsYXRlLng7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLnkgLT0gb2JqLmxheWVyLnRyYW5zbGF0ZS55O1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvblRvTW91c2UgPSBuZXcgdXRpbHMuTGluZShvYmoucG9zLCBkZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24oZGlyZWN0aW9uVG9Nb3VzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJpbmRQb3NpdGlvblRvTW91c2U6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbihkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBtb3VzZVBvc2l0aW9uID0gbmV3IHV0aWxzLlBvaW50KG9iai5sYXllci5nYW1lLmlucHV0Lm1vdXNlUG9pbnRlci54LCBvYmoubGF5ZXIuZ2FtZS5pbnB1dC5tb3VzZVBvaW50ZXIueSk7XHJcbiAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbihtb3VzZVBvc2l0aW9uLmNsb25lKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVPbkNvb2xkb3duOiB7XHJcbiAgICAgICAgdXBkYXRlIDogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgY29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmouc2V0UGFyYW1ldGVyKCdjb29sZG93bicsIGNvb2xkb3duIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXhwbG9zaW9uT25Db29sZG93bjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZHQsIG9iaikge1xyXG4gICAgICAgICAgICB2YXIgY29vbGRvd24gPSBvYmouZ2V0UGFyYW1ldGVyKCdjb29sZG93bicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvb2xkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGV4cGxvc2lvbkNvbmZpZyA9IGdhbWVDb25maWdzLmdldENvbmZpZygnbW9uc3RlckV4cGxvc2lvbicpO1xyXG4gICAgICAgICAgICAgICAgZXhwbG9zaW9uQ29uZmlnLnBvcyA9IG5ldyB1dGlscy5Qb2ludChbb2JqLnBvcy54LCBvYmoucG9zLnldKTtcclxuICAgICAgICAgICAgICAgIHZhciBleHBsID0gb2JqLmxheWVyLmFkZE9iamVjdChleHBsb3Npb25Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgZXhwbC5zZXRQYXJhbWV0ZXIoJ3Bvd2VyJywgb2JqLmdldFBhcmFtZXRlcigncG93ZXInKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLnNldFBhcmFtZXRlcignY29vbGRvd24nLCBjb29sZG93biAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRlc3Ryb3lBZnRlclNwcml0ZURvbmU6IHtcclxuICAgICAgICB1cGRhdGUgOiBmdW5jdGlvbiAoZHQsIG9iaikge1xyXG4gICAgICAgICAgICBpZihvYmouc3ByaXRlLmRvbmUpIHtcclxuICAgICAgICAgICAgICAgIG9iai5fcmVtb3ZlSW5OZXh0VGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcm90YXRlQnlEaXJlY3Rpb246IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCwgb2JqKSB7XHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24ob2JqLmdldFBhcmFtZXRlcignZGlyZWN0aW9uJykpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByb3RhdGVCeVBsYXllcjoge1xyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0LCBvYmopIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG9iai5sYXllci5nZXRPYmplY3RzQnlUeXBlKCdwbGF5ZXInKVswXTtcclxuXHJcbiAgICAgICAgICAgIG9iai5zcHJpdGUucm90YXRlVG9EaXJlY3Rpb24obmV3IHV0aWxzLkxpbmUob2JqLnBvcywgcGxheWVyLnBvcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jb25maWdzL3J1bGVzL2V0Yy5qc1xuICoqLyIsInZhciBjb25maWcgPSB7XHJcblx0bWFpbkxheWVyIDoge1xyXG5cdFx0aWQ6ICdtYWluTGF5ZXInLFxyXG5cdFx0c2l6ZSA6IFsxMjI0LDk2OF0sXHJcblx0XHRiYWNrZ3JvdW5kOiAndGVycmFpbicsXHJcblx0XHRpbml0TGlzdCA6IFsncGxheWVyJywgJ2N1cnNvcicsICdjb3VudGVyJywgJ3RpbWVyJywgJ2Jlc3RUaW1lJywgJ2ZpcmViYWxsU3BlbGwnLCAnZnJvc3RTaGFyZFNwZWxsJywgJ3RlbGVwb3J0U3BlbGwnLCAnYmVzdFNjb3JlJywgJ2xldmVsJ10sXHJcblx0XHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dGhpcy5zdGF0ZS5wYXJhbWV0ZXJzLm1vbnN0ZXJzS2lsbGVkID0gMDtcclxuXHRcdFx0dGhpcy5zdGF0ZS5wYXJhbWV0ZXJzLmdhbWVUaW1lciA9IDA7XHJcblx0XHR9LFxyXG5cdFx0dHJhbnNsYXRlOiB7XHJcblx0XHRcdHg6IC0xMDAsXHJcblx0XHRcdHk6IC0xMDBcclxuXHRcdH0sXHJcblx0XHRydWxlczogWydzcGF3bl9tb25zdGVyJywgJ3JhbmRvbV90cmVlcycgLCdzcGF3bl9oZWFydCcsJ3NwYXduX3Bvd2VydXAnLCAnZ29XaXRoUGxheWVyJ11cclxuXHR9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY29uZmlncy9sYXllcnMuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUdBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7O0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=