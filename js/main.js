let allKeys = 8;
let keysFound = 0;

let allFlashlight = 5;
let flashlightFound = 0;

function Init() {
    loadImages();
    loadSFXs();

    initCanvas();
    initKeyHandle();
    initPlayer(1, 1);
    generateGameAreaFromMap(map);

    // ================

    CreateInteractibleObjects();

    // ================
}

function Update() {

}

function LateUpdate() {
    flashlightFound < 1 && DrawDarkness();

    drawTextR(`${getTimer()}`, 784, 27);

    if (player.samePosWithInteractible()) {
        drawText(getInteractibleDialog(player.gameAreaPos.x, player.gameAreaPos.y), 11, 468);
    }
    if (player.isFacingInteractible() && player.facing === 1) {
        drawText(getInteractibleDialog(player.facingPos.x, player.facingPos.y), 11, 468);
    }

    DrawKeysCount();
    DrawFlashlights();
}

function CreateInteractibleObjects() {
    // Create Keys
    for (let i = 0; i < allKeys; i++) {
        const node = i === 0 ? {x: 1, y:3} : SelectRandomWalkableNode();
        createInteractible(node.x, node.y, images.key, {
            playerAbove: () => {
                PlaySFX(sfx.pickupKey);
                if(keysFound === 0) {
                    showPopupDelay('Get all the keys to unlock the gate', 0);
                }
                keysFound += 1;
                if(keysFound === 8) {
                    showPopup(`All keys has been collected, return to the gate to escape`);
                }
                else {
                    showPopup(`Key Found! ${allKeys - keysFound} keys left.`);
                }
                destroyInteractible(node.x, node.y);
            },
        }, false, true, true);

        setInteractDialog(node.x, node.y, 'Press Z/Space to take the Key');
    }

    // Create Flashlights
    for (let i = 0; i < allFlashlight; i++) {
        const node = i === 0 ? {x: 1, y:1} : SelectRandomWalkableNode();
        createInteractible(node.x, node.y, images.flashlight, {
            playerAbove: () => {
                PlaySFX(sfx.getFlashlight);
                if(flashlightFound === 0) {
                    showPopupDelay('Get more flashlight to increase view range', 0);
                    gameStarted = true;
                }
                flashlightFound += 1;
                showPopup('Flashlight picked up.');
                destroyInteractible(node.x, node.y);
            },
        }, false, true, true);

        setInteractDialog(node.x, node.y, 'Press Z/Space to take the flashlight');
    }

    // Create Door
    createInteractible(1, 0, images.doorClose, {
        playerOnBottom: () => {
            if (keysFound === allKeys) {
                PlaySFX(sfx.doorOpen);
                destroyInteractible(1, 0);
                createInteractible(1, 0, images.doorOpen, {
                    playerAbove: () => {
                        PlaySFX(sfx.gameover);
                        gameOver = true;
                        document.getElementById('win-label-time').innerHTML = getTimer();
                        document.getElementById('win-overlay').style.display = 'initial';
                    },
                }, false, false, true);
                setInteractDialog(1, 0, 'Press Z/Space to finish the Game');
            }
            else {
                PlaySFX(sfx.locked);
                showPopup(`Need ${allKeys - keysFound} more keys to open the door.`);
            }
        },
    }, false, false, false);
    setInteractDialog(1, 0, 'Press Z/Space to open the door');
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

function DrawKeysCount() {
    drawUIImg(images.key, 0, 0, 40, 40);
    drawText(`${keysFound} / ${allKeys}`, 32, 27);
}

function DrawFlashlights() {
    drawUIImg(images.flashlight, 70, 0, 40, 40);
    drawText(`${flashlightFound}`, 102, 27);
}

function DrawDarkness() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

setInterval(() => {
    drawFrame(Update, LateUpdate);
}, 100 / 3);
