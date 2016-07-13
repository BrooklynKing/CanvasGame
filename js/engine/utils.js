"use strict";
function moveWithSpeed(point, destination, speed) {
    if (!point || !destination) {
        return null;
    }
    var _destination = destination.clone().normalize().multiply(speed, speed);
    return Phaser.Point.add(point, _destination);
}
function clone(obj) {
    (!obj) && (obj = {});
    return JSON.parse(JSON.stringify(obj));
}
exports.__esModule = true;
exports["default"] = {
    clone: clone,
    moveWithSpeed: moveWithSpeed
};
//# sourceMappingURL=utils.js.map