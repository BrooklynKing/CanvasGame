import utils from './../../engine/utils';
import gameConfigs from '../index';
import GameObject from '../../engine/core/object';

const config: any = {
  bindPositionToLayer: {
    update: function() {
      const obj = this.context;

      if (obj.pos.x - obj.sprite.size[0] / 2 < 0) {
        obj.pos.x = obj.sprite.size[0] / 2;
      } else if (obj.pos.x + obj.sprite.size[0] / 2 > obj.layer.size[0]) {
        obj.pos.x = obj.layer.size[0] - obj.sprite.size[0] / 2;
      }

      if (obj.pos.y - obj.sprite.size[1] / 2 < 0) {
        obj.pos.y = obj.sprite.size[1] / 2;
      } else if (obj.pos.y + obj.sprite.size[1] / 2 > obj.layer.size[1]) {
        obj.pos.y = obj.layer.size[1] - obj.sprite.size[1] / 2;
      }
    },
  },
  destroyAfterLeavingLayer: {
    update: function() {
      const obj = this.context as GameObject;

      if (
        obj.pos.y < -100 ||
        obj.pos.y - obj.sprite.size[1] - 100 > obj.layer.size[1] ||
        obj.pos.x - obj.sprite.size[0] - 100 > obj.layer.size[0] ||
        obj.pos.x < -100
      ) {
        obj.layer.removeObjectOnNextTick(obj.id);
        return false;
      }
    },
  },
  setDirectionToPlayer: {
    update: function() {
      const obj = this.context;
      const player = obj.layer.getObjectsByType('player')[0];

      obj.setParameter('direction', Phaser.Point.subtract(player.pos, obj.pos));
    },
  },
  setDirectionToPlayerAdvance: {
    update: function() {
      const obj = this.context;
      const player = obj.layer.getObjectsByType('player')[0];
      const playerDirection = player.getParameter('direction');
      let oldDirection = obj.getParameter('direction');

      if (!oldDirection) {
        oldDirection = Phaser.Point.subtract(player.pos, obj.pos);
      }

      if (playerDirection == null) {
        obj.setParameter(
          'direction',
          Phaser.Point.subtract(player.pos, obj.pos),
        );
      } else {
        let speed = Math.abs(
          Math.min(
            player.getParameter('speed'),
            Phaser.Point.distance(obj.pos, player.pos),
          ) - 10,
        );
        let playerNextPlace = utils.moveWithSpeed(
          player.pos,
          playerDirection,
          speed,
        );
        let _dv = Phaser.Point.subtract(playerNextPlace, obj.pos).normalize();
        let _odv = oldDirection.clone().normalize();
        let _ndv = Phaser.Point.add(_odv, _dv).normalize();

        obj.setParameter('direction', _ndv);
      }
    },
  },
  wandererAI: {
    init: function() {
      const rect = new Phaser.Rectangle(100, 100, 1000, 750);
      this.context.setParameter(
        'direction',
        new Phaser.Point(rect.randomX, rect.randomY),
      );
    },
    update: function() {
      const obj = this.context;
      const player = obj.layer.getObjectsByType('player')[0];
      const distance = Phaser.Point.distance(obj.pos, player.pos);

      if (distance <= obj.getParameter('scentRange')) {
        obj.setParameter('scent', true);
        obj.parameters.speed = obj.defaultParameters.scentSpeed;
        obj.setParameter('wanderCooldown', 0);
        obj.setParameter(
          'direction',
          Phaser.Point.subtract(player.pos, obj.pos),
        );
      } else {
        obj.parameters.speed = obj.defaultParameters.speed;
        if (!obj.getParameter('wanderCooldown')) {
          const rect = new Phaser.Rectangle(100, 100, 1000, 750);
          obj.setParameter(
            'direction',
            Phaser.Point.subtract(
              new Phaser.Point(rect.randomX, rect.randomY),
              obj.pos,
            ),
          );
          obj.parameters.wanderCooldown = Math.round(
            Math.random() * (obj.defaultParameters.wanderCooldown - 100) + 100,
          );
        } else {
          obj.getParameter('wanderCooldown') &&
            obj.setParameter(
              'wanderCooldown',
              obj.getParameter('wanderCooldown') - 1,
            );
        }
      }
    },
  },
  dynamicZIndex: {
    update: function() {
      const obj = this.context;
      let newZIndex = 0;

      obj.pos && (newZIndex += obj.pos.y);
      obj.sprite && (newZIndex += obj.sprite.size[1] / 2);

      obj.zIndex = obj.pos.y > 0 ? Math.round(newZIndex) : 0;
    },
  },
  collisions: {
    init: function() {
      const obj = this.context;
      const collisions = obj.setParameter('collisions', []);

      collisions.cells = new Array();
      obj.layer.state.collisions.updateObject(obj);
    },
    update: function() {
      const obj = this.context;

      obj.getParameter('collisions').splice(0);
      obj.layer.state.collisions.updateObject(obj);
    },
  },
  rotateToMouse: {
    update: function() {
      const obj = this.context;
      const destination = new Phaser.Point(
        obj.layer.game.input.mousePointer.x,
        obj.layer.game.input.mousePointer.y,
      );

      destination.x -= obj.layer.translate.x;
      destination.y -= obj.layer.translate.y;

      const directionToMouse = Phaser.Point.subtract(destination, obj.pos);
      obj.sprite.rotateToDirection(directionToMouse);
    },
  },
  bindPositionToMouse: {
    update: function() {
      const obj = this.context;
      const mousePosition = new Phaser.Point(
        obj.layer.game.input.mousePointer.x,
        obj.layer.game.input.mousePointer.y,
      );

      obj.setPosition(mousePosition.clone());
    },
  },
  removeOnCooldown: {
    update: function() {
      const obj = this.context;
      const cooldown = obj.getParameter('cooldown');

      if (cooldown == 0) {
        obj.layer.removeObjectOnNextTick(obj.id);
      } else {
        obj.setParameter('cooldown', cooldown - 1);
      }
    },
  },
  explosionOnCooldown: {
    update: function() {
      const obj = this.context;
      const cooldown = obj.getParameter('cooldown');

      if (cooldown == 0) {
        obj.layer.removeObjectOnNextTick(obj.id);

        const explosionConfig = gameConfigs.getConfig('monsterExplosion');
        explosionConfig.pos = new Phaser.Point(obj.pos.x, obj.pos.y);
        const expl = obj.layer.addObject(explosionConfig);
        expl.setParameter('power', obj.getParameter('power'));
      } else {
        obj.setParameter('cooldown', cooldown - 1);
      }
    },
  },
  explosionAfterSpriteDone: {
    update: function() {
      const obj = this.context as GameObject;

      if (obj.sprite.done) {
        obj.layer.removeObjectOnNextTick(obj.id);

        const explosionConfig = gameConfigs.getConfig('monsterExplosion');
        explosionConfig.pos = new Phaser.Point(obj.pos.x, obj.pos.y);
        const expl = obj.layer.addObject(explosionConfig) as GameObject;
        expl.setParameter('power', obj.getParameter('power'));
      }
    },
  },
  destroyAfterSpriteDone: {
    update: function() {
      const obj = this.context;

      if (obj.sprite.done) {
        obj.layer.removeObjectOnNextTick(obj.id);
      }
    },
  },
  rotateByDirection: {
    update: function() {
      const obj = this.context;

      obj.sprite.rotateToDirection(obj.getParameter('direction'));
    },
  },
  rotateByPlayer: {
    update: function() {
      const obj = this.context;
      const player = obj.layer.getObjectsByType('player')[0];

      obj.sprite.rotateToDirection(Phaser.Point.subtract(player.pos, obj.pos));
    },
  },
};

export default config;
