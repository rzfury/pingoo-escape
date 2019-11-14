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

    if (player.samePosWithInteractible()) {
        drawText(getInteractibleDialog(player.gameAreaPos.x, player.gameAreaPos.y), 4, 400);
    }
}

function LateUpdate() {

}

function CreateInteractibleObjects() {
    // Create Keys
    for (let i = 0; i < allKeys; i++) {
        const node = SelectRandomWalkableNode();
        const interactObj = createInteractible(node.x, node.y, images.key, {
            playerAbove: () => keysFound += 1,
        }, false, true, true);

        setInteractDialog(node.x, node.y, 'Press Z to take the Key');
    }

    // Create Door
    createInteractible(1, 0, images.doorClose, {
        playerOnBottom: () => {
            if (keysFound === allKeys) {
                destroyInteractible(1, 0);
                createInteractible(1, 0, images.doorOpen, {
                    playerAbove: () => {
                        console.log('WIN!');
                    },
                }, false, false, true);
                setInteractDialog(1, 0, 'Press Z to finish the Game');
            }
            else {
                console.log('Not Enough Keys!');
            }
        },
    }, false, false, false);
}

function SelectRandomWalkableNode() {
    let node = {
        x: Math.floor(Math.random() * gameAreaSize.w),
        y: Math.floor(Math.random() * gameAreaSize.h)
    };

    while (!isNodeWalkable(node.x, node.y) || hasInteractible(node.x, node.y)) {
        node = {
            x: Math.floor(Math.random() * gameAreaSize.w),
            y: Math.floor(Math.random() * gameAreaSize.h)
        };
    };

    return node;
}

setInterval(() => {
    drawFrame(Update, LateUpdate);
}, 100 / 3);
