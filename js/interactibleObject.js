// EXAMPLE
// createInteractible(13, 15, {
//     // playerOnTop: () => console.log('you are on top'),
//     // playerOnBottom: () => console.log('you are on bottom'),
//     // playerOnLeft: () => console.log('you are on Left'),
//     // playerOnRight: () => console.log('you are on Right'),
//     // playerAbove: () => console.log('you are above!'),
//     // playerBelow: () => console.log('you are below!'),
// }, false, true, true);

function interactibleObj(nodeX, nodeY, img, trigger, isAbovePlayer, oneTimeOnly) {
    this.x = Number.NEGATIVE_INFINITY;
    this.y = Number.NEGATIVE_INFINITY;
    this.interactDialog = '';
    this.isAbovePlayer = isAbovePlayer;
    this.triggered = false;
    this.oneTimeOnly = oneTimeOnly;
    this.gameAreaPos = {
        x: nodeX,
        y: nodeY
    }
    this.triggerEvent = () => {
        triggerHandler(this, trigger);
    };
    this.draw = () => {
        if (this.oneTimeOnly && this.triggered) return;

        this.x = this.gameAreaPos.x * unit_size;
        this.y = this.gameAreaPos.y * unit_size;

        if (img) {
            drawImg(img, this.x, this.y, unit_size, unit_size);
        }
        else {
            fillColor('#0a0');
            drawRect(this.x + 5, this.y + 5, 30, 30);
        }
    };
    this.samePosAsPlayer = () => {
        return JSON.stringify(player.gameAreaPos) === JSON.stringify(this.gameAreaPos);
    }
}

function triggerHandler(iObj, trigger) {
    if (typeof trigger.all !== 'undefined') {
        trigger.all();
        oneTimeTrigger(iObj)
    }
    else {
        if (validateTrigger(trigger, 'playerOnTop')) {
            if (player.facing === 0) {
                trigger.playerOnTop();
                oneTimeTrigger(iObj)
            }
        }
        if (validateTrigger(trigger, 'playerOnBottom')) {
            if (player.facing === 1) {
                trigger.playerOnBottom();
                oneTimeTrigger(iObj)
            }
        }
        if (validateTrigger(trigger, 'playerOnLeft')) {
            if (player.facing === 3) {
                trigger.playerOnLeft();
            }
        }
        if (validateTrigger(trigger, 'playerOnRight')) {
            if (player.facing === 2) {
                trigger.playerOnRight();
                oneTimeTrigger(iObj)
            }
        }
        if (validateTrigger(trigger, 'playerAbove')) {
            if (iObj.samePosAsPlayer() && !iObj.isAbovePlayer) {
                trigger.playerAbove();
                oneTimeTrigger(iObj)
            }
        }
        if (validateTrigger(trigger, 'playerBelow')) {
            if (iObj.samePosAsPlayer() && iObj.isAbovePlayer) {
                trigger.playerBelow();
                oneTimeTrigger(iObj)
            }
        }
    }
}

function oneTimeTrigger(iObj) {
    if (iObj.oneTimeOnly && !iObj.triggered) {
        iObj.triggered = true;
    }
}

function createInteractible(x, y, img, trigger, isAbovePlayer, oneTimeOnly, canWalkThru) {
    if (!canWalkThru) {
        gameArea[x][y].walkable = false;
    }
    else if (canWalkThru) {
        gameArea[x][y].walkable = true;
    }
    interactible[x][y] = new interactibleObj(x, y, img, trigger, isAbovePlayer, oneTimeOnly);
}

function setInteractDialog(x, y, text = '') {
    if (getInteractible(x, y) !== null) {
        interactible[x][y].interactDialog = text;
    }
}

function getInteractibleDialog(x, y) {
    if (getInteractible(x, y) !== null) {
        return interactible[x][y].interactDialog;
    }
    return '';
}

function destroyInteractible(x, y) {
    interactible[x][y] = { x, y, empty: true };
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
