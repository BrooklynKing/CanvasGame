import utils from './../../engine/utils';
import gameConfigs from '../../configs/index';

var config = {
    fireball : {
        update: function () {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'fireball') {
                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
                    if (!fireCooldown) {
                        var destination  = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
                        var spellPower = player.getParameter('spellPower');
                        var startDegree = 10 * (spellPower - 1);

                        destination.x -= obj.layer.translate.x;
                        destination.y -= obj.layer.translate.y;

                        for (var i = 0; i < spellPower; i++) {
                            let movedPoint = destination.clone().rotate(player.pos.x, player.pos.y, startDegree, true);

                            createBullet(Phaser.Point.subtract(movedPoint, player.pos), movedPoint.clone());

                            startDegree -= 20;
                        }

                        obj.setParameter('cooldown', obj.getDefaultParameter('cooldown'));
                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));

                        function createBullet(direction, destination) {
                            var bulletConfig = gameConfigs.getConfig('bullet');
                            bulletConfig.pos = player.pos.clone();

                            var bull = obj.layer.addObject(bulletConfig);
                            bull.setParameter('direction', direction);
                            bull.setParameter('power', bull.getParameter('power') + 5 * (spellPower - 1));
                            bull.sprite.setDegree(player.pos.angle(destination));
                        }
                    }
                }
            }
            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }

    },
    hellfire : {
        update: function () {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'hellfire') {
                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
                    if (!fireCooldown) {
                        var destination  = new Phaser.Point(0, 1),
                            point1 = utils.moveWithSpeed(player.pos, destination, 100),
                            spellPower = player.getParameter('spellPower');

                        for (var i = -10; i < 10; i++) {
                            let movedPoint = point1.clone().rotate(player.pos.x, player.pos.y, 18 * i, true);

                            createTube(movedPoint);
                        }

                        obj.setParameter('cooldown', obj.getDefaultParameter('cooldown'));
                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));

                        function createTube(pos) {

                            var tubeConfig = gameConfigs.getConfig('hellfireTube');
                            tubeConfig.pos = pos;

                            var tube = obj.layer.addObject(tubeConfig);
                            tube.setParameter('power', tube.getParameter('power') + 5 * (spellPower - 1));
                        }
                    }
                }
            }
            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }

    },
    slowEnemies : {
        update: function () {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].type == 'monster') {
                    var speed = objects[i].getParameter('speed');
                    var power = obj.getParameter('power');
                    var effects = objects[i].getParameter('effects') || [];

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
    teleport : {
        update: function () {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'teleport') {
                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
                    if (!fireCooldown) {
                        var mouse  = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);

                        mouse.x -= obj.layer.translate.x;
                        mouse.y -= obj.layer.translate.y;

                        var direction = Phaser.Point.subtract(mouse, player.pos);
                        var spellPower = player.getParameter('spellPower');
                        var destination = utils.moveWithSpeed(player.pos, direction, obj.getParameter('power'));
                        var cooldown = obj.getDefaultParameter('cooldown', cooldown) - (30 * (spellPower - 1));
                        var teleportGate;

                        teleportGate = gameConfigs.getConfig('teleportGate');
                        teleportGate.pos = player.pos.clone();

                        obj.layer.addObject(teleportGate);

                        teleportGate = gameConfigs.getConfig('teleportGate');
                        teleportGate.pos = destination.clone();

                        obj.layer.addObject(teleportGate);

                        player.setPosition(destination);

                        obj.setParameter('cooldown', (cooldown > 50) ? cooldown : 50);
                        obj.setParameter('fireCooldown', obj.getParameter('cooldown'));
                    }
                }
            }
            fireCooldown && obj.setParameter('fireCooldown', fireCooldown - 1);
        }
    },
    frostShard : {
        update: function () {
            var obj = this.context;
            var player = obj.layer.getObjectsByType('player')[0];
            var fireCooldown = obj.getParameter('fireCooldown');

            if (player.getParameter('currentSpell') == 'frostShard') {
                if (obj.layer.game.input.mousePointer.isDown || obj.layer.game.input.keyboard.isDown(32)) {
                    if (!fireCooldown) {
                        var frostShard = gameConfigs.getConfig('frostShard');
                        var mousePosition = new Phaser.Point(obj.layer.game.input.mousePointer.x, obj.layer.game.input.mousePointer.y);
                        var spellPower = player.getParameter('spellPower');
                        var destination = mousePosition.clone();

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
        update: function () {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0, l = objects.length; i < l; i++) {
                if (objects[i].type == 'monster') {
                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

                    var blood = gameConfigs.getConfig('bloodSpray');

                    blood.pos = objects[i].pos.clone();
                    blood.pos.x += 2;
                    blood.pos.y += - 10;
                    obj.layer.addObject(blood);

                    obj._removeInNextTick = true;

                    break;
                }
            }
        }
    },
    hellTubeMonsterCollision: {
        update: function () {
            var obj = this.context;
            var objects = obj.getParameter('collisions');

            for (var i = 0, l = objects.length; i < l; i++) {
                if (objects[i].type == 'monster') {
                    objects[i].setParameter('health', objects[i].getParameter('health') - obj.getParameter('power'));

                    var blood = gameConfigs.getConfig('bloodSpray');

                    blood.pos = objects[i].pos.clone();
                    blood.pos.x += 2;
                    blood.pos.y += - 10;
                    
                    obj.layer.addObject(blood);

                    break;
                }
            }
        }
    }
};

export default config;