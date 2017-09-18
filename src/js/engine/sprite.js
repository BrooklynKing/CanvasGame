import utils from './utils';

class Sprite {
  constructor(cache, url, pos, size, speed, frames, dir, once, degree) {
    this.cache = cache;
    if (pos instanceof Phaser.Point) {
      this.pos = pos.clone();
    } else {
      this.pos = new Phaser.Point(pos[0], pos[1]);
    }
    this.defaultPosition = this.pos.clone();
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = utils.clone(frames);
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
    this.degree = degree || 0;
  }

  update(dt) {
    this._index += this.speed * dt;
  }

  setDegree(degree) {
    this.degree = degree;
  }

  updateConfig(config) {
    if (config) {
      config.pos && (this.pos = config.pos);
      config.size && (this.size = config.size);
      config.speed && (this.speed = typeof config.speed === 'number' ? config.speed : 0);
      config.frames && (this.frames = config.frames);
      config.url && (this.url = config.url);
      config.dir && (this.dir = config.dir);
      config.once && (this.once = config.once);
      config.degree && (this.degree = config.degree);
    }
  }

  rotateToDirection(direction) {
    const pos = this.defaultPosition;
    const config = {};
    const angle = direction.angle(new Phaser.Point(0,0), true);

    if (angle > 135 || angle < -135) {
      config.pos = [pos.x, pos.y + 2 * this.size[1]]
    } else if (angle < 135 && angle > 45) {
      config.pos =[pos.x, pos.y + 3 * this.size[1]]
    } else if (angle < 45 && angle > -45 ) {
      config.pos =[pos.x, pos.y + this.size[1]]
    } else {
      config.pos =[pos.x, pos.y]
    }

    config.pos = new Phaser.Point(config.pos[0], config.pos[1]);

    this.updateConfig(config);
  }

  render(ctx) {
    let frame;
    let x = this.pos.x;
    let y = this.pos.y;

    if (this.speed > 0) {
      const max = this.frames.length;
      const idx = Math.floor(this._index);

      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    if (this.dir === 'vertical') {
      y += frame * this.size[1];
    }
    else {
      x += frame * this.size[0];
    }

    ctx.rotate(this.degree);
    ctx.drawImage(
      this.cache.getImage(this.url),
      x, y,
      this.size[0], this.size[1],
      Math.round(-this.size[0] / 2), Math.round(-this.size[1] / 2),
      this.size[0], this.size[1]
    );
  }
}

export default Sprite;