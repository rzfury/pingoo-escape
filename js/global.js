let canvas, context;
let gameArea = [];
let tiles = [];
let images = {};

let gameStarted = false;
let gameOver = false;

let keyState = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false,
    Z: false
}

let gameAreaSize = { w: 0, h: 0 };
let drawOffset = { x: 0, y: 0 };

let player;

let interactible = [];
let lateDrawInteractObj = [];

const unit_size = 40;
const startTime = Date.now();

let timeElapsed = Date.now();
