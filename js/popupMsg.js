function showPopup(msg) {
    popupMsgs.push(new _popupMsg(msg));
}

function showPopupDelay(msg, delay = 0) {
    setTimeout(() => popupMsgs.push(new _popupMsg(msg)), Math.max(1, 1000 * delay));
}

function _popupMsg(msg) {
    this.opacity = 8;
    this.msg = msg;
}

function drawPopups() {
    if(popupMsgs.length === 0) return;
    for(let i=0; i<popupMsgs.length; i++) {
        let y = (1 + (popupMsgs.length - i)) * 20;
        
        popupMsgs[i].opacity -= 0.1;
        
        context.globalAlpha = Math.max(0, Math.min(popupMsgs[i].opacity, 1));
        drawText(popupMsgs[i].msg, 11, 468 - y);
    }

    popupMsgs = popupMsgs.filter((v) => v.opacity > 0);
}
