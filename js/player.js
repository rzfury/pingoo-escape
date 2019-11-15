function initPlayer(startX = 0, startY = 0) {
    player = new _player(startX, startY);

    function _player(px, py) {
        this.x = px * unit_size;
        this.y = py * unit_size;
        this.dx = px * unit_size;
        this.dy = py * unit_size;
        this.gameAreaPos = {
            x: px,
            y: py
        }
        this.moveSpeed = 8;
        this.moveState = {
            UP: false,
            DOWN: false,
            LEFT: false,
            RIGHT: false,
            Z: false,
        };
        this.color = '#00F';
        this.unit_size = 30;
        this.frameW = 0;
        this.getDestDistance = () => {
            return Math.sqrt(Math.pow(this.dx - this.x, 2) + Math.pow(this.dy - this.y, 2));
        }
        this.getCenter = () => {
            return {
                x: this.x + unit_size / 2,
                y: this.y + unit_size / 2,
            }
        }
        this.draw = () => {
            fillColor(this.color);
            drawSprite(images.pingoo, Math.floor(this.frameW / 2), this.facing, 128, 128, this.x + 5, this.y + 5, this.unit_size, this.unit_size);
        };
        this.update = () => {
            this.moveState = keyState;
            if (this.y > this.dy) {
                this.y = Math.max(this.y - (this.y - this.dy), this.y - this.moveSpeed);
            }
            else if (this.y < this.dy) {
                this.y = Math.min(this.y + (this.dy - this.y), this.y + this.moveSpeed);
            }

            if (this.x > this.dx) {
                this.x = Math.max(this.x - (this.x - this.dx), this.x - this.moveSpeed);
            }
            else if (this.x < this.dx) {
                this.x = Math.min(this.x + (this.dx - this.x), this.x + this.moveSpeed);
            }

            if (this.y == this.dy && this.moveState.UP) {
                if (isNodeExists(this.gameAreaPos.x, this.gameAreaPos.y - 1) && isNodeWalkable(this.gameAreaPos.x, this.gameAreaPos.y - 1)) {
                    this.gameAreaPos.y--;
                    this.dy -= unit_size;
                }

                if (this.facing !== 1) {
                    this.facing = this.moveState.LEFT ? 2 : this.moveState.RIGHT ? 3 : 1;
                }
            }
            else if (this.y == this.dy && this.moveState.DOWN) {
                if (isNodeExists(this.gameAreaPos.x, this.gameAreaPos.y + 1) && isNodeWalkable(this.gameAreaPos.x, this.gameAreaPos.y + 1)) {
                    this.gameAreaPos.y++;
                    this.dy += unit_size;
                }

                if (this.facing !== 0) {
                    this.facing = this.moveState.LEFT ? 2 : this.moveState.RIGHT ? 3 : 0;
                }
            }

            if (this.x == this.dx && this.moveState.LEFT) {
                if (isNodeExists(this.gameAreaPos.x - 1) && isNodeWalkable(this.gameAreaPos.x - 1, this.gameAreaPos.y)) {
                    this.gameAreaPos.x--;
                    this.dx -= unit_size;
                }

                if (this.facing !== 2) {
                    this.facing = 2;
                }
            }
            else if (this.x == this.dx && this.moveState.RIGHT) {
                if (isNodeExists(this.gameAreaPos.x + 1) && isNodeWalkable(this.gameAreaPos.x + 1, this.gameAreaPos.y)) {
                    this.gameAreaPos.x++;
                    this.dx += unit_size;
                }

                if (this.facing !== 3) {
                    this.facing = 3;
                }
            }

            if (this.getDestDistance() > 0) {
                this.frameW = this.frameW === 7 ? 0 : this.frameW + 1;
            }
            else {
                this.frameW = 0;
            }
        };
        this.interact = () => {
            if (keyState.Z) {
                return;
            }
            const facingPos = [[0, 1], [0, -1], [-1, 0], [1, 0]];
            let interactObj = getInteractible(this.gameAreaPos.x + facingPos[this.facing][0], this.gameAreaPos.y + facingPos[this.facing][1]);

            if (interactObj !== null) {
                if (interactObj.oneTimeOnly && !interactObj.triggered) {
                    interactObj.triggerEvent();
                }
                else {
                    interactObj.triggerEvent();
                }
            }
            else {
                interactObj = getInteractible(this.gameAreaPos.x, this.gameAreaPos.y);
                if (interactObj !== null) {
                    if (interactObj.oneTimeOnly && !interactObj.triggered) {
                        interactObj.triggerEvent();
                    }
                    else {
                        interactObj.triggerEvent();
                    }
                }
            }
        }
        this.samePosWithInteractible = () => {
            if (getInteractible(this.gameAreaPos.x, this.gameAreaPos.y) !== null) {
                return !getInteractible(this.gameAreaPos.x, this.gameAreaPos.y).triggered;
            }
            return false;
        }

        // 0 = DOWN
        // 1 = UP
        // 2 = LEFT
        // 3 = RIGHT
        this.facing = 0;
    };
}

function playerCenterScreen() {
    const screenCenter = { x: 400, y: 240 };
    const playerCenter = player.getCenter();
    drawOffset = {
        x: (playerCenter.x * -1) + screenCenter.x,
        y: (playerCenter.y * -1) + screenCenter.y,
    }
}
