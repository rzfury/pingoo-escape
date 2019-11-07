function interactibleObj(nodeX, nodeY, trigger, isAbovePlayer) {
    this.x = Number.NEGATIVE_INFINITY;
    this.y = Number.NEGATIVE_INFINITY;
    this.isAbovePlayer = isAbovePlayer;
    this.gameAreaPos = {
        x: nodeX,
        y: nodeY
    }
    this.handleTrigger = () => {
        triggerHandler(trigger);
    };
    this.draw = () => {
        this.x = this.gameAreaPos.x * unit_size;
        this.y = this.gameAreaPos.y * unit_size;

        fillColor('#0a0');
        drawRect(this.x + 5, this.y + 5, 30, 30);
    };
}

function triggerHandler(trigger) {
    if (typeof trigger.all !== 'undefined') {
        trigger.all();
    }
    else {
        if (validateTrigger(trigger, 'playerBelow')) {
            validatePlayerPos(this, 'playerBelow') && trigger.playerBelow();
            return;
        }
        else if (validateTrigger(trigger, 'playerAbove')) {
            trigger.playerAbove();
            return;
        }
        else if (validateTrigger(trigger, 'playerOnLeft')) {
            trigger.playerOnLeft();
            return;
        }
        else if (validateTrigger(trigger, 'playerOnRight')) {
            trigger.playerOnRight();
            return;
        }
        else if (validateTrigger(trigger, 'playerOnTop')) {
            trigger.playerOnTop();
            return;
        }
        else if (validateTrigger(trigger, 'playerOnBottom')) {
            this.isAbovePlayer && trigger.playerOnBottom();
            return;
        }
    }
}

function createInteractible(x, y, trigger, isAbovePlayer) {
    interactible[x][y] = new interactibleObj(x, y, trigger, isAbovePlayer);
}

function validatePlayerPos(iobj, keyMethod) {
    if (keyMethod === 'playerBelow') {
        return (
            player.gameAreaPos.x === iobj.gameAreaPos.x &&
            player.gameAreaPos.y - 1 === iobj.gameAreaPos.y
        );
    }
}

function validateTrigger(trigger, keyMethod) {
    return typeof trigger[keyMethod] !== 'undefined';
}

function getInteractible(x, y) {
    if (typeof interactible[x] !== 'undefined') {
        if (typeof interactible[x][y] !== 'undefined') {
            if (typeof interactible[x][y].empty === 'undefined') {
                return interactible[x][y];
            }
        }
    }
    return null;
}
