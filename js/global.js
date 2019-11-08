let canvas, context;
let gameArea = [];
let tiles = [];
let images = {};

let keyState = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false,
    Z: false
}

let drawOffset = { x: 0, y: 0 };

let player;

let interactible = [];
let lateDrawInteractObj = [];

const unit_size = 40;