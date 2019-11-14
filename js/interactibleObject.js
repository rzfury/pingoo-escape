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
        if (this.oneTimeOnly) {
            if(!this.triggered) this.triggered = true;
            else return;
        }
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

function createInteractible(x, y, img, trigger, isAbovePlayer, oneTimeOnly, canWalkThru) {
    if (!canWalkThru) {
        gameArea[x][y].walkable = false;
    }
    else if(canWalkThru) {
        gameArea[x][y].walkable = true;
    }
    interactible[x][y] = new interactibleObj(x, y, img, trigger, isAbovePlayer, oneTimeOnly);
}

function setInteractDialog(x, y, text = '') {
    if(getInteractible(x, y) !== null) {
        interactible[x][y].interactDialog = text;
    }
}

function getInteractibleDialog(x, y) {
    if(getInteractible(x, y) !== null) {
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
