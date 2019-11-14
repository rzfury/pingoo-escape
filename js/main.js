let allKeys = 8;
let keysFound = 0;

function Init() {
    loadImages();

    initCanvas();
    initKeyHandle();
    initPlayer(1, 1);
    generateGameAreaFromMap(map);

    // ================

    CreateInteractibleObjects();

    // ================
}

function Update() {
    // drawRect(10, 10, 100, 100);
    drawText(`${keysFound} Keys Found`, 4, 19);

    if(player.samePosWithInteractible()) {
        drawText(`Press Z to take the Key`, 4, 400);
    }
}

function LateUpdate() {

}

function CreateInteractibleObjects() {
    // Create Keys
    for(let i=0; i<allKeys; i++) {
        const node = SelectRandomWalkableNode();
        createInteractible(node.x, node.y, images.key, {
            playerAbove: () => keysFound += 1,
        }, false, true, true);
    }
}

function SelectRandomWalkableNode() {
    let node = {
        x: Math.floor(Math.random() * gameAreaSize.w),
        y: Math.floor(Math.random() * gameAreaSize.h)
    };
    
    while(!isNodeWalkable(node.x, node.y) || hasInteractible(node.x, node.y)) {
        node = {
            x: Math.floor(Math.random() * gameAreaSize.w),
            y: Math.floor(Math.random() * gameAreaSize.h)
        };
    };

    return node;
}

setInterval(() => {
    drawFrame(Update, LateUpdate);
}, 100/3);
