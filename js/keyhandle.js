function keyDownHandler(event) {
    event.preventDefault();

    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            player.changeMoveState('w', true);
            break;
        case 's':
        case 'ArrowDown':
            player.changeMoveState('s', true);
            break;
        case 'a':
        case 'ArrowLeft':
            player.changeMoveState('a', true);
            break;
        case 'd':
        case 'ArrowRight':
            player.changeMoveState('d', true);
            break;
    }
}

function keyUpHandler(event) {
    event.preventDefault();

    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            player.changeMoveState('w', false);
            break;
        case 's':
        case 'ArrowDown':
            player.changeMoveState('s', false);
            break;
        case 'a':
        case 'ArrowLeft':
            player.changeMoveState('a', false);
            break;
        case 'd':
        case 'ArrowRight':
            player.changeMoveState('d', false);
            break;
    }
}

function initKeyHandle() {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
}