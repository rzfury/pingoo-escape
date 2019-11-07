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
                this.x = Math.max(this.x - (this.x - this.dx), this.x - this.moveSpeed);
            }
            else if (this.x < this.dx) {
                this.x = Math.min(this.x + (this.dx - this.x), this.x + this.moveSpeed);
            }

            if (this.y > this.dy) {
                this.y = Math.max(this.y - (this.y - this.dy), this.y - this.moveSpeed);
            }
            else if (this.y < this.dy) {
                this.y = Math.min(this.y + (this.dy - this.y), this.y + this.moveSpeed);
            }

            if (this.x == this.dx && this.moveState.left) {
                if (isNodeExists(this.gameAreaPos.x - 1) && isNodeWalkable(this.gameAreaPos.x - 1, this.gameAreaPos.y)) {
                    this.gameAreaPos.x--;
                    this.dx -= unit_size;
                }
            }
            else if (this.x == this.dx && this.moveState.right) {
                if (isNodeExists(this.gameAreaPos.x + 1) && isNodeWalkable(this.gameAreaPos.x + 1, this.gameAreaPos.y)) {
                    this.gameAreaPos.x++;
                    this.dx += unit_size;
                }
            }

            if (this.y == this.dy && this.moveState.up) {
                if (isNodeExists(this.gameAreaPos.x, this.gameAreaPos.y - 1) && isNodeWalkable(this.gameAreaPos.x, this.gameAreaPos.y - 1)) {
                    this.gameAreaPos.y--;
                    this.dy -= unit_size;
                }
            }
            else if (this.y == this.dy && this.moveState.down) {
                if (isNodeExists(this.gameAreaPos.x, this.gameAreaPos.y + 1) && isNodeWalkable(this.gameAreaPos.x, this.gameAreaPos.y + 1)) {
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

function playerCenterScreen() {
    const screenCenter = { x: 400, y: 240 };
    const playerCenter = player.getCenter();
    drawOffset = {
        x: (playerCenter.x * -1) + screenCenter.x,
        y: (playerCenter.y * -1) + screenCenter.y,
    }
}
