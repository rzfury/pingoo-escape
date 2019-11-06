function Init() {
    initCanvas();
    initKeyHandle();
    initPlayer();
    generateGameAreaFromMap(map);
    // generateGameArea(15, 15);
}

function Update() {
    // drawRect(10, 10, 100, 100);
}

function LateUpdate() {

}

setInterval(() => {
    drawFrame(Update, LateUpdate);
}, 100/3);
