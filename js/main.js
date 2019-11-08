function Init() {
    loadImages();

    initCanvas();
    initKeyHandle();
    initPlayer();
    generateGameAreaFromMap(map);
    // generateGameArea(15, 15);

    // ================

    createInteractible(8, 12, {
        // playerOnTop: () => console.log('you are on top'),
        // playerOnBottom: () => console.log('you are on bottom'),
        // playerOnLeft: () => console.log('you are on Left'),
        // playerOnRight: () => console.log('you are on Right'),
        playerAbove: () => console.log('you are above!'),
        playerBelow: () => console.log('you are below!'),
    }, false, false, images.pingoo);

    // ================
}

function Update() {
    // drawRect(10, 10, 100, 100);
}

function LateUpdate() {

}

setInterval(() => {
    drawFrame(Update, LateUpdate);
}, 100/3);
