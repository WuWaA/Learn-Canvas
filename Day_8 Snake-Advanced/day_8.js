var canvas;
var cwidth = 400;
var cheight = 400;

window.onload = function () {
    setup();
}

function setup() {
    canvas = createCanvas(cwidth, cheight);
    window.addEventListener('keydown', keyEvents(), true);
    window.focus();
    canvas.focus();
}

function draw() {
}

function keyEvents(e) {
    var key = e.keyCode;
    if (key == 32 && start == true) { // Space
        start = false; // Make Sure 'draw()' Runs Once Only Pre Game
        draw();
    }
    if ((key == 38 || key == 87) && direction != 3) { // Up and W
        direction = 1;
        e.preventDefault(); // Cancel Default Action
    }
    if ((key == 39 || key == 68) && direction != 4) { // Right and D
        direction = 2;
        e.preventDefault(); // Cancel Default Action
    }
    if ((key == 40 || key == 83) && direction != 1) { // Down and S
        direction = 3;
        e.preventDefault(); // Cancel Default Action
    }
    if ((key == 37 || key == 65) && direction != 2) { // Left and A
        direction = 4;
        e.preventDefault(); // Cancel Default Action
    }
}

function randomPos() {
    return Math.floor(Math.random() * cwidth);
}