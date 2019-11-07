function interactibleObj(nodeX, nodeY, trigger, isAbovePlayer) {
    this.x = Number.NEGATIVE_INFINITY;
    this.y = Number.NEGATIVE_INFINITY;
    this.isAbovePlayer = isAbovePlayer;
    this.gameAreaPos = {
        x: nodeX,
        y: nodeY
    }
    this.triggerEvent = () => {
        triggerHandler(this, trigger);
    };
    this.draw = () => {
        this.x = this.gameAreaPos.x * unit_size;
        this.y = this.gameAreaPos.y * unit_size;

        fillColor('#0a0');
        drawRect(this.x + 5, this.y + 5, 30, 30);
    };
    this.samePosAsPlayer = () => {
        return JSON.stringify(player.gameAreaPos) === JSON.stringify(this.gameAreaPos);
    }
}

function triggerHandler(iObj, trigger) {
    if (typeof trigger.all !== 'undefined') {
        trigger.all();
    }
    else {
        if (validateTrigger(trigger, 'playerOnTop')) {
            player.facing === 0 && trigger.playerOnTop();
        }
        if (validateTrigger(trigger, 'playerOnBottom')) {
            player.facing === 1 && trigger.playerOnBottom();
        }
        if (validateTrigger(trigger, 'playerOnLeft')) {
            player.facing === 3 && trigger.playerOnLeft();
        }
        if (validateTrigger(trigger, 'playerOnRight')) {
            player.facing === 2 && trigger.playerOnRight();
        }
        if (validateTrigger(trigger, 'playerAbove')) {
            iObj.samePosAsPlayer() && !iObj.isAbovePlayer && trigger.playerAbove();
        }
        if (validateTrigger(trigger, 'playerBelow')) {
            iObj.samePosAsPlayer() && iObj.isAbovePlayer && trigger.playerBelow();
        }
    }
}

function createInteractible(x, y, trigger, isAbovePlayer, canWalkThru) {
    if(!canWalkThru) {
        gameArea[x][y].walkable = false;
    }
    interactible[x][y] = new interactibleObj(x, y, trigger, isAbovePlayer);
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
