function generate(config) {
    var n = config.n || 6;
    var width = config.width || 800;
    var height = config.height || 600;
    var sizeX = (width) >> n;
    var sizeY = (height) >> n;
    var cellGrid = new Array(sizeX * sizeY);

    generateMap();

    function generateMap() {
        for (var i = 0; i < cellGrid.length; i++) {
            cellGrid[i] = [];
        }
    }

    function getCell(point) {
        return (point[0]) + point[1] * sizeY;
    }

    function removeObject(object){
        var oldCells = object.getParameter('collisions').cells;

        for (var i = 0; i < oldCells.length; i++) {
            cellGrid[oldCells[i]] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
        }
    }
    
    function getPointsOfObject(object) {
        var pos = object.pos;
        var size = object.size;
        var cells = [];
        var xIndex = size[0] >> n;
        var yIndex = size[1] >> n;

        for (var i = 0; i < 2 + xIndex; i++) {
            for (var j = 0; j < 2 + yIndex; j++) {
                cells.push(getCell([
                    (pos.x - size[0] / 2 + i * (size[0] / (1 + xIndex))) >> n,
                    (pos.y - size[1] / 2 + j * (size[1] / (1 + yIndex))) >> n
                ]));
            }
        }

        return cells;
    }
    
    function updateObject(object) {
        var cells = getPointsOfObject(object);
        var oldCells = object.getParameter('collisions').cells;

        for (var i = 0; i < cells.length; i++) {
            if (oldCells[i] != cells[i]) {
                cellGrid[oldCells[i]] && cellGrid[oldCells[i]].splice(cellGrid[oldCells[i]].indexOf(object), 1);
                cellGrid[cells[i]] && (cellGrid[cells[i]].indexOf(object) == -1) && cellGrid[cells[i]].push(object);
                oldCells[i] = cells[i];
            } else {
                cellGrid[cells[i]] && (cellGrid[cells[i]].indexOf(object) == -1) && cellGrid[cells[i]].push(object);
            }
        }
    }

    function checkCollisions() {
        for (var i = 0; i <= sizeX; i++) {
            for (var j = 0; j <= sizeY; j++) {
                if (cellGrid[getCell([i, j])]) {
                    var objects = cellGrid[getCell([i, j])];
                    var length = objects.length;

                    for (var k = 0; k < length; k++) {
                        for (var l = k + 1; l < length; l++) {
                            if (boxCollides(objects[k].pos, objects[k].size, objects[l].pos, objects[l].size)) {
                                (objects[k].getParameter('collisions').indexOf(objects[l]) == -1 ) && objects[k].getParameter('collisions').push(objects[l]);
                                (objects[l].getParameter('collisions').indexOf(objects[k]) == -1 ) && objects[l].getParameter('collisions').push(objects[k]);
                            }
                        }
                    }
                }
            }
        }
    }

    function boxCollides(pos, size, pos2, size2) {
        function collides(x, y, r, b, x2, y2, r2, b2) {
            return !(r >= x2 || x < r2 ||
            b >= y2 || y < b2);
        }

        return collides(
            pos.x + size[0] / 2, pos.y + size[1] / 2,
            pos.x  - size[0] / 2, pos.y  - size[1] / 2,
            pos2.x  + size2[0] / 2, pos2.y  + size2[1] / 2,
            pos2.x  - size2[0] / 2, pos2.y  - size2[1] / 2
        );
    }

    return {
        cellGrid: cellGrid,
        updateObject: updateObject,
        removeObject: removeObject,
        check: checkCollisions,
        clear: generateMap
    };
}

export default generate;