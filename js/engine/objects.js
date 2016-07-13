"use strict";
var utils_1 = require('./utils');
var renderers_1 = require('./renderers');
var sprite_1 = require('./sprite');
var GameObject = (function () {
    function GameObject(config) {
        this.layer = config.layer;
        if (config.pos instanceof Phaser.Point) {
            this.pos = config.pos.clone();
        }
        else {
            if (config.pos) {
                this.pos = new Phaser.Point(config.pos[0], config.pos[1]);
            }
            else {
                this.pos = new Phaser.Point();
            }
        }
        this.id = config.id;
        if (config.sprite) {
            this.sprite = new sprite_1["default"](this.layer.game.cache, config.sprite[0], config.sprite[1], config.sprite[2], config.sprite[3], config.sprite[4], config.sprite[5], config.sprite[6], config.sprite[7]);
        }
        this.type = config.type;
        if (config.size || this.sprite) {
            this.size = config.size || this.sprite.size;
        }
        this.collision = !!config.collisions;
        this.zIndex = config.zIndex || 0;
        this.size = config.size;
        this._rules = config.rules || [];
        this._conditions = config.conditions || [];
        this._update = config.update;
        if (config.render) {
            if (renderers_1["default"][config.render]) {
                this._renderer = renderers_1["default"][config.render];
            }
            else {
                this._renderer = config.render;
            }
        }
        else {
            if (config.render === false) {
                this._isRenderNeeded = true;
            }
        }
        this._init = config.init;
        this._parameters = utils_1["default"].clone(config.parameters);
        this._defaultParameters = utils_1["default"].clone(config.parameters);
        this._isInitiated = false;
    }
    GameObject.prototype.getParameter = function (id) {
        return this._parameters[id];
    };
    GameObject.prototype.setParameter = function (id, value) {
        this._parameters[id] = value;
        return this._parameters[id];
    };
    GameObject.prototype.getDefaultParameter = function (id) {
        return this._defaultParameters[id];
    };
    GameObject.prototype.render = function (dt) {
        if (!this._isRenderNeeded) {
            if (this._renderer) {
                if (Array.isArray(this._renderer)) {
                    for (var i = 0; i < this._renderer.length; i++) {
                        this._renderer[i](this, dt);
                    }
                }
                else {
                    this._renderer(this, dt);
                }
            }
            else {
                renderers_1["default"].sprite(this, dt);
            }
        }
    };
    GameObject.prototype.init = function () {
        var _this = this;
        if (!this._isInitiated) {
            this._init && this._init();
            if (this.collision) {
                this.collision = new GameRule(gameConfigs.getRuleConfig('collisions'));
                this.collision.setContext(this);
                this.collision.init();
            }
            this._rules = this._rules.map(function (ruleConfig) {
                var rule = new GameRule(gameConfigs.getRuleConfig(ruleConfig));
                rule.setContext(_this);
                rule.init();
                return rule;
            });
            this._conditions = this._conditions.map(function (conditionConfig) {
                var condition = new GameRule(gameConfigs.getRuleConfig(conditionConfig));
                condition.setContext(_this);
                condition.init();
                return condition;
            });
            this._isInitiated = true;
        }
    };
    GameObject.prototype.update = function (dt) {
        this._update && this._update();
        for (var i = 0; i < this._rules.length; i++) {
            this._rules[i].update(dt);
        }
    };
    GameObject.prototype.updateConditions = function (dt) {
        for (var i = 0; i < this._conditions.length; i++) {
            this._conditions[i].update(dt);
        }
    };
    GameObject.prototype.setPosition = function (point) {
        this.pos.x = point.x;
        this.pos.y = point.y;
    };
    GameObject.prototype.updateCollisions = function (dt) {
        this.collision && this.collision.update(dt, this);
    };
    return GameObject;
}());
var GameRule = (function () {
    function GameRule(config) {
        this.id = config.id;
        this._update = config.update;
        this.parameters = (config.parameters && utils_1["default"].clone(config.parameters)) || {};
        this._init = config.init;
        this._isInitiated = false;
    }
    GameRule.prototype.init = function () {
        if (!this._isInitiated) {
            this._init && this._init();
            this._isInitiated = true;
        }
    };
    GameRule.prototype.update = function (dt) {
        this._update && this._update(dt);
    };
    GameRule.prototype.setContext = function (context) {
        this.context = context;
    };
    return GameRule;
}());
var GameLayer = (function () {
    function GameLayer(config) {
        this._objectCounter = 0;
        this.id = config.id;
        this.state = config.state;
        this.game = this.state.game;
        this.ctx = config.ctx;
        this._initObjectList = config.initList;
        this.background = this.ctx.createPattern(this.game.cache.getImage(config.background), 'repeat');
        this.pos = config.pos ? new Phaser.Point(config.pos[0], config.pos[1]) : new Phaser.Point(0, 0);
        this.size = config.size || [config.ctx.canvas.width, config.ctx.canvas.height];
        this.defaultTranslate = config.translate || {
            x: 0,
            y: 0
        };
        this._sortedObjects = {
            'default': []
        };
        this._objects = {};
        this._rules = config.rules || [];
        this._init = config.init;
        this._isInitiated = false;
    }
    GameLayer.prototype.init = function () {
        var _this = this;
        if (!this._isInitiated) {
            this.translate = utils_1["default"].clone(this.defaultTranslate);
            for (var i = 0; i < this._initObjectList.length; i++) {
                this.addObject(gameConfigs.getConfig(this._initObjectList[i]));
            }
            this._init && this._init();
            this._rules = this._rules.map(function (ruleConfig) {
                var rule = new GameRule(gameConfigs.getRuleConfig(ruleConfig));
                rule.setContext(_this);
                rule.init();
                return rule;
            });
            this._isInitiated = true;
        }
    };
    GameLayer.prototype.render = function (dt) {
        if (!this._isInitiated)
            return;
        var arr = {};
        var ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, this.size[0], this.size[1]);
        ctx.clip();
        ctx.translate(this.translate.x, this.translate.y);
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, this.size[0] + 5, this.size[1] + 5);
        for (var i in this._objects) {
            if (this._objects.hasOwnProperty(i)) {
                (arr[this._objects[i].zIndex]) || (arr[this._objects[i].zIndex] = []);
                arr[this._objects[i].zIndex].push(this._objects[i]);
            }
        }
        for (var i in arr) {
            if (arr[i]) {
                for (var j = 0, k = arr[i].length; j < k; j++) {
                    ctx.save();
                    ctx.translate(Math.round(arr[i][j].pos.x), Math.round(arr[i][j].pos.y));
                    arr[i][j].render(dt);
                    ctx.restore();
                }
            }
        }
        ctx.translate(-this.translate.x, -this.translate.y);
        ctx.restore();
    };
    GameLayer.prototype.update = function (dt) {
        if (!this._isInitiated)
            return;
        for (var i in this._rules) {
            this._rules.hasOwnProperty(i) && this._rules[i].update(dt);
        }
        for (var i in this._objects) {
            this._objects[i].update(dt);
        }
        for (var i in this._objects) {
            this._objects[i].updateCollisions(dt);
        }
        this.state.collisions.check();
        for (var i in this._objects) {
            this._objects[i].updateConditions(dt);
        }
        for (var i in this._objects) {
            if (this._objects[i]._removeInNextTick) {
                this._objects[i].collision && this.state.collisions.removeObject(this._objects[i]);
                this.removeObject(this._objects[i].id);
            }
        }
    };
    GameLayer.prototype.removeObject = function (id) {
        if (this._objects.hasOwnProperty(id)) {
            this._objects[id].layer = null;
            if (this._objects[id].type && this._objects[id].type != 'default') {
                this._sortedObjects[this._objects[id].type].splice(this._sortedObjects[this._objects[id].type].indexOf(id), 1);
            }
            else {
                this._sortedObjects['default'].splice(this._sortedObjects['default'].indexOf(id), 1);
            }
            this._objects[id] = null;
            delete this._objects[id];
        }
    };
    GameLayer.prototype.addObject = function (config) {
        if (this._objects.hasOwnProperty(config.id)) {
            console.error('Object with such id already exist in this layer: ', config.id);
            return false;
        }
        config.layer = this;
        config.id += (this._objectCounter++) + Math.round((new Date()).getTime() + Math.random() * 1000001);
        var _obj = new GameObject(config);
        _obj.init();
        if (config.type && config.type != 'default') {
            (!this._sortedObjects[config.type]) && (this._sortedObjects[config.type] = []);
            this._sortedObjects[config.type].push(_obj.id);
        }
        else {
            this._sortedObjects['default'].push(_obj.id);
        }
        this._objects[_obj.id] = _obj;
        return this._objects[_obj.id];
    };
    GameLayer.prototype.getObjectsByType = function (type) {
        var objectsId = this._sortedObjects[type] || [];
        var result = [];
        for (var i = 0, l = objectsId.length; i < l; i++) {
            result.push(this._objects[objectsId[i]]);
        }
        return result;
    };
    GameLayer.prototype.clearLayer = function () {
        for (var i in this._objects) {
            this._objects.hasOwnProperty(i) && delete this._objects[i];
        }
        this._sortedObjects = {
            default: []
        };
        for (var i in this._rules) {
            this._rules.hasOwnProperty(i) && delete this._rules[i];
        }
        this._isInitiated = false;
    };
    return GameLayer;
}());
exports.__esModule = true;
exports["default"] = GameLayer;
//# sourceMappingURL=objects.js.map