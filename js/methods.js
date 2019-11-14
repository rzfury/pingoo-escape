function initCanvas() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
};

function fillColor(str) {
    context.fillStyle = str;
}

function strokeColor(str) {
    context.strokeStyle = str;
}

function clearCanvas() {
    context.clearRect(0, 0, 800, 480);
}

function drawRect(x, y, w, h) {
    context.fillRect(x + drawOffset.x, y + drawOffset.y, w, h);
}

function drawImg(img, x, y, w, h) {
    context.drawImage(img, x + drawOffset.x, y + drawOffset.y, w, h);
}

function drawSprite(img, frameW, frameH, unitW, unitH, x, y, w, h) {
    context.drawImage(img, unitW * frameW, unitH * frameH, unitW, unitH, x + drawOffset.x, y + drawOffset.y, w, h);
}

function drawText(text, x, y, color = '#fff', font = 'Arial', size = '12pt') {
    context.fillStyle = color;
    context.font = `${size} ${font}`;
    context.fillText(text, x, y);
}

function drawFrame(update, lateUpdate) {
    clearCanvas();
    if (gameArea.length > 0) {
        drawGameArea();

        drawInteractible();
    
        player.draw();
    
        lateDrawInteractible();
    }

    // drawFog(1);

    update();
    player.update();
    lateUpdate();

    playerCenterScreen();
}

function generateGameAreaFromMap(map = []) {
    if (map.length === 0) return;

    gameAreaSize = {
        w: map.length,
        h: map[0].length,
    }

    map.forEach((mapW) => {
        let wNodes = [];
        let emptyInteractible = [];

        mapW.forEach((nodeInfo) => {
            wNodes.push(new areaNode(nodeInfo.x, nodeInfo.y, nodeInfo.walkable, nodeInfo.walkable ? '#aaa' : '#f00'));
            emptyInteractible.push({ x: nodeInfo.x, y: nodeInfo.y, empty: true });
        });

        gameArea.push(wNodes);
        interactible.push(emptyInteractible);
    });
}

function generateGameArea(width, height) {
    for (let w = 0; w < width; w++) {
        let wNodes = [];

        for (let h = 0; h < height; h++) {
            wNodes.push(new areaNode(w, h, '#aaa'));
        }

        gameArea.push(wNodes);
    }
}

function drawGameArea() {
    gameArea.forEach((horizontalNodes) => {
        horizontalNodes.forEach((node) => {
            const img = node.walkable ? images.floor1 : !interactible[node.x][node.y].empty ? images.floor1 : images.brick1;
            drawSprite(img, 0, 0, 128, 128, node.x * unit_size, node.y * unit_size, unit_size, unit_size);
        });
    });
}

function drawInteractible() {
    lateDrawInteractObj.length = 0;

    interactible.forEach((iW) => {
        iW.forEach((iobj) => {
            if (iobj.empty) {
                return;
            }
            if (iobj.isAbovePlayer) {
                lateDrawInteractObj.push({ x: iobj.gameAreaPos.x, y: iobj.gameAreaPos.y });
            } else {
               iobj.draw();
            }
        })
    });
}

function lateDrawInteractible() {
    lateDrawInteractObj.forEach((ipos) => {
        const iobj = interactible[ipos.x][ipos.y];
        iobj.draw();
    });
}

function areaNode(x, y, walkable, color) {
    return {
        x: x,
        y: y,
        c: color,
        walkable: walkable,
    }
}

function isNodeWalkable(x, y) {
    return gameArea[x][y].walkable;
}

function isNodeExists(x, y) {
    return typeof y === 'undefined' ? typeof gameArea[x] !== 'undefined' : typeof gameArea[x][y] !== 'undefined';
}

function hasInteractible(x, y) {
    return getInteractible(x, y) !== null;
}

function drawFog(viewDistance = 1) {
    const size = 820 * ((Math.max(1, viewDistance) + 1) / 2);
    const x = ((size/2*-1) + player.x + player.unit_size - 5);
    const y = ((size/2*-1) + player.y + player.unit_size - 5);
    drawImg(images.fog, x, y, size, size);
}
