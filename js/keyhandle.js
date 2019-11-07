function keyDownHandler(event) {
    if (!event.ctrlKey) {
        event.preventDefault();
    }

    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            keyState.UP = true;
            break;
        case 's':
        case 'ArrowDown':
            keyState.DOWN = true;
            break;
        case 'a':
        case 'ArrowLeft':
            keyState.LEFT = true;
            break;
        case 'd':
        case 'ArrowRight':
            keyState.RIGHT = true;
            break;
        case 'z':
            player.interact();
            keyState.Z = true;
            break;
    }
}

function keyUpHandler(event) {
    if (!event.ctrlKey) {
        event.preventDefault();
    }

    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            keyState.UP = false;
            break;
        case 's':
        case 'ArrowDown':
            keyState.DOWN = false;
            break;
        case 'a':
        case 'ArrowLeft':
            keyState.LEFT = false;
            break;
        case 'd':
        case 'ArrowRight':
            keyState.RIGHT = false;
            break;
        case 'z':
            keyState.Z = false;
            break;
    }
}

function initKeyHandle() {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
}