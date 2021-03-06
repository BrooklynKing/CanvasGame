import Phaser from 'phaser';

import { ObjectTypes } from '../objects/constants';

import { moveWithSpeed } from './utils';

import type { GameObject, GameRule } from '../../engine';

export const bindPositionToLayer: GameRule = {
	update(obj: GameObject) {
		if (obj.pos.x - obj.sprite!.size[0] / 2 < 0) {
			obj.pos.x = obj.sprite!.size[0] / 2;
		} else if (obj.pos.x + obj.sprite!.size[0] / 2 > obj.layer.size[0]) {
			obj.pos.x = obj.layer.size[0] - obj.sprite!.size[0] / 2;
		}

		if (obj.pos.y - obj.sprite!.size[1] / 2 < 0) {
			obj.pos.y = obj.sprite!.size[1] / 2;
		} else if (obj.pos.y + obj.sprite!.size[1] / 2 > obj.layer.size[1]) {
			obj.pos.y = obj.layer.size[1] - obj.sprite!.size[1] / 2;
		}
	},
};

export const destroyAfterLeavingLayer: GameRule = {
	update(obj: GameObject) {
		if (
			obj.pos.y < -100 ||
			obj.pos.y - obj.sprite!.size[1] - 100 > obj.layer.size[1] ||
			obj.pos.x - obj.sprite!.size[0] - 100 > obj.layer.size[0] ||
			obj.pos.x < -100
		) {
			obj.layer.removeObjectOnNextTick(obj.id);
			return false;
		}
	},
};

export const setDirectionToPlayer: GameRule = {
	update(obj: GameObject) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];

		obj.parameters.direction = Phaser.Point.subtract(player.pos, obj.pos);
	},
};

export const setDirectionToPlayerAdvance: GameRule = {
	update(obj: GameObject) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];
		const playerDirection: Phaser.Point | null = player.parameters.direction;
		const direction =
			obj.parameters.direction || Phaser.Point.subtract(player.pos, obj.pos);

		if (playerDirection == null) {
			obj.parameters.direction = Phaser.Point.subtract(player.pos, obj.pos);
		} else {
			const speed = Math.abs(
				Math.min(
					player.parameters.speed,
					Phaser.Point.distance(obj.pos, player.pos)
				) - 10
			);
			const playerNextPlace = moveWithSpeed(player.pos, playerDirection, speed);
			const _dv = Phaser.Point.subtract(playerNextPlace, obj.pos).normalize();
			const _odv = direction.clone().normalize();
			const _ndv = Phaser.Point.add(_odv, _dv).normalize();

			obj.parameters.direction = _ndv;
		}
	},
};

export const wandererAI: GameRule = {
	init(obj: GameObject) {
		const rect = new Phaser.Rectangle(100, 100, 1000, 750);
		obj.parameters.direction = new Phaser.Point(rect.randomX, rect.randomY);
	},
	update(obj: GameObject) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];
		const distance = Phaser.Point.distance(obj.pos, player.pos);

		if (distance <= obj.parameters.scentRange) {
			obj.parameters.scent = true;
			obj.parameters.speed = obj.defaultParameters.scentSpeed;
			obj.parameters.wanderCooldown = 0;
			obj.parameters.direction = Phaser.Point.subtract(player.pos, obj.pos);
		} else {
			obj.parameters.speed = obj.defaultParameters.speed;
			if (!obj.parameters.wanderCooldown) {
				const rect = new Phaser.Rectangle(100, 100, 1000, 750);
				obj.parameters.direction = Phaser.Point.subtract(
					new Phaser.Point(rect.randomX, rect.randomY),
					obj.pos
				);
				obj.parameters.wanderCooldown = Math.round(
					Math.random() * (obj.defaultParameters.wanderCooldown - 100) + 100
				);
			} else {
				obj.parameters.wanderCooldown &&
					(obj.parameters.wanderCooldown = obj.parameters.wanderCooldown - 1);
			}
		}
	},
};

export const dynamicZIndex: GameRule = {
	update(obj: GameObject) {
		let newZIndex = 0;

		obj.pos && (newZIndex += obj.pos.y);
		obj.sprite && (newZIndex += obj.sprite!.size[1] / 2);

		obj.zIndex = obj.pos.y > 0 ? Math.round(newZIndex) : 0;
	},
};


export const rotateToMouse: GameRule = {
	update(obj: GameObject) {
		const destination = new Phaser.Point(
			obj.layer.game.input.mousePointer.x,
			obj.layer.game.input.mousePointer.y
		);

		destination.x -= obj.layer.translate.x;
		destination.y -= obj.layer.translate.y;

		const directionToMouse = Phaser.Point.subtract(destination, obj.pos);
		obj.sprite!.rotateToDirection(directionToMouse);
	},
};

export const removeOnCooldown: GameRule = {
	update(obj: GameObject) {
		const cooldown = obj.parameters.cooldown;

		if (cooldown == 0) {
			obj.layer.removeObjectOnNextTick(obj.id);
		} else {
			obj.parameters.cooldown = cooldown - 1;
		}
	},
};

export const explosionOnCooldown: GameRule = {
	update(obj: GameObject) {
		const cooldown = obj.parameters.cooldown;

		if (cooldown == 0) {
			obj.layer.removeObjectOnNextTick(obj.id);

			const expl = obj.layer.addObjectByID('spellExplosion');
			expl.setPosition(new Phaser.Point(obj.pos.x, obj.pos.y));
			expl.parameters.power = obj.parameters.power;
		} else {
			obj.parameters.cooldown = cooldown - 1;
		}
	},
};

export const explosionAfterSpriteDone: GameRule = {
	update(obj: GameObject) {
		if (obj.sprite!.done) {
			obj.layer.removeObjectOnNextTick(obj.id);

			const expl = obj.layer.addObjectByID('monsterExplosion');
			expl.setPosition(new Phaser.Point(obj.pos.x, obj.pos.y));
			expl.parameters.power = obj.parameters.power;
		}
	},
};

export const destroyAfterSpriteDone: GameRule = {
	update(obj: GameObject) {
		if (obj.sprite!.done) {
			obj.layer.removeObjectOnNextTick(obj.id);
		}
	},
};

export const rotateByDirection: GameRule = {
	update(obj: GameObject) {
		obj.sprite!.rotateToDirection(obj.parameters.direction);
	},
};

export const rotateByPlayer: GameRule = {
	update(obj: GameObject) {
		const player = obj.layer.getObjectsByType(ObjectTypes.Player)[0];

		obj.sprite!.rotateToDirection(Phaser.Point.subtract(player.pos, obj.pos));
	},
};
