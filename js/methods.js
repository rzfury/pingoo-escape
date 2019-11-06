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

function drawFrame(update, lateUpdate) {
    clearCanvas();
    if (gameArea.length > 0) {
        drawGameArea();
    }

    player.update();
    player.draw();

    update();
    lateUpdate();

    playerCenterScreen();
}

function generateGameAreaFromMap(map = []) {
    if(map.length === 0) return;

    map.forEach((mapW) => {
        let wNodes = [];

        mapW.forEach((nodeInfo) => {
            wNodes.push(new areaNode(nodeInfo.x, nodeInfo.y, nodeInfo.walkable, nodeInfo.walkable ? '#aaa' : '#f00'));
        });

        gameArea.push(wNodes);
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
            fillColor(node.c);
            drawRect(node.x * unit_size, node.y * unit_size, 40, unit_size, unit_size);
        });
    });
}

function areaNode(x, y, walkable, color) {
    return {
        x: x,
        y: y,
        c: color,
        walkable: walkable,
        interact: [0]
    }
}

function playerCenterScreen() {
    const screenCenter = { x: 400, y: 240 };
    const playerCenter = player.getCenter();
    drawOffset = {
        x: screenCenter.x + (playerCenter.x * -1),
        y: screenCenter.y + (playerCenter.y * -1),
    }
}

function initPlayer() {
    player = new _player();

    function _player() {
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.gameAreaPos = {
            x: 0,
            y: 0
        }
        this.moveSpeed = 8;
        this.moveState = {
            up: false,
            down: false,
            left: false,
            right: false,
        };
        this.color = '#00F';
        this.unit_size = 30;
        this.getCenter = () => {
            return {
                x: this.x + unit_size/2,
                y: this.y + unit_size/2,
            }
        }
        this.draw = () => {
            fillColor(this.color);
            drawRect(this.x + 5, this.y + 5, this.unit_size, this.unit_size);
        };
        this.update = () => {
            if (this.x > this.dx) {
                // this.x -= this.moveSpeed;
                this.x = Math.max(this.x - (this.x - this.dx), this.x - this.moveSpeed);
            }
            else if (this.x < this.dx) {
                // this.x += this.moveSpeed;
                this.x = Math.min(this.x + (this.dx - this.x), this.x + this.moveSpeed);
            }

            if (this.y > this.dy) {
                // this.y -= this.moveSpeed;
                this.y = Math.max(this.y - (this.y - this.dy), this.y - this.moveSpeed);
            }
            else if (this.y < this.dy) {
                // this.y += this.moveSpeed;
                this.y = Math.min(this.y + (this.dy - this.y), this.y + this.moveSpeed);
            }

            if (this.x == this.dx && this.moveState.left) {
                if ((this.gameAreaPos.x > 0 || typeof gameArea[this.gameAreaPos.x - 1] !== 'undefined') && gameArea[this.gameAreaPos.x - 1][this.gameAreaPos.y].walkable) {
                    this.gameAreaPos.x--;
                    this.dx -= unit_size;
                }
            }
            else if (this.x == this.dx && this.moveState.right) {
                if (typeof gameArea[this.gameAreaPos.x + 1] !== 'undefined' && gameArea[this.gameAreaPos.x + 1][this.gameAreaPos.y].walkable) {
                    this.gameAreaPos.x++;
                    this.dx += unit_size;
                }
            }

            if (this.y == this.dy && this.moveState.up) {
                if ((this.gameAreaPos.y > 0 || typeof gameArea[this.gameAreaPos.x][this.gameAreaPos.y - 1] !== 'undefined') && gameArea[this.gameAreaPos.x][this.gameAreaPos.y - 1].walkable) {
                    this.gameAreaPos.y--;
                    this.dy -= unit_size;
                }
            }
            else if (this.y == this.dy && this.moveState.down) {
                if (typeof gameArea[this.gameAreaPos.x][this.gameAreaPos.y + 1] !== 'undefined' && gameArea[this.gameAreaPos.x][this.gameAreaPos.y + 1].walkable) {
                    this.gameAreaPos.y++;
                    this.dy += unit_size;
                }
            }
        };
        this.changeMoveState = (move, state) => {
            switch (move.toUpperCase()) {
                case "W": this.moveState.up = state; break;
                case "S": this.moveState.down = state; break;
                case "A": this.moveState.left = state; break;
                case "D": this.moveState.right = state; break;
            }
        };
    };
}