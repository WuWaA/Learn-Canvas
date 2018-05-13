var cwidth = 100;
var cheight = 100;
var time;
var current;
var canvas;
var ctx;
var posX = [cwidth / 2];
var posY = [cheight / 2];
var slength = [1];
var direction = 0; //1234 == ↑→↓←
var food;

window.onload = function () {
    setup();
}

function setup() {
    canvas = document.getElementById('canvas');
    canvas.width = cwidth;
    canvas.height = cheight;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(posX[0], posY[0], slength[0], 1);
        ctx.fillStyle = 'rgb(255, 0, 0)';
        food = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
        ctx.fillRect(food[0], food[1], 1, 1);
        ctx.fillStyle = 'rgb(0, 0, 0)';
        window.addEventListener('keydown', doKeydown, true);
        window.focus();
        //draw();
    }
}

function draw() { //draw(ws, as)
    time = new Date();

    if (posX[0] == food[0] && posY[0] == food[1]) {
        food = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
        slength.push(1);
        posX.push(posX[posX.length - 1]);
        posY.push(posY[posY.length - 1]);
    }

    if (Math.floor(time.getMilliseconds() / 60) != current) {
        if (direction == 1) {
            posY[0] -= 1;
        }
        if (direction == 2) {
            posX[0] += 1;
        }
        if (direction == 3) {
            posY[0] += 1;
        }
        if (direction == 4) {
            posX[0] -= 1;
        }

        ctx.clearRect(0, 0, cwidth, cheight);

        for (var i = 0; i < slength.length; i++) {
            ctx.fillRect(posX[i], posY[i], slength[i], 1);
        }

        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(food[0], food[1], 1, 1);
        ctx.fillStyle = 'rgb(0, 0, 0)';

        var bool = false;
        for (var i = 1; i < slength.length; i++) {
            if (posX[0] == posX[i] && posY[0] == posY[i]) {
                bool = true;
                break;
            }
        }
        if (bool) {
            return;
        }

        for (var i = slength.length - 1; i > 0; i--) {
            posX[i] = posX[i - 1];
            posY[i] = posY[i - 1];
        }
    }

    if (posX[0] > cwidth || posX[0] < 0 || posY[0] > cheight || posY[0] < 0) {
        return;
    }

    //posX += ad;
    //posY += ws;
    //ctx.fillRect(posX, posY, length, 1);

    current = Math.floor(time.getMilliseconds() / 60);
    //console.log('X & Y: ' + posX[0] + ', ' + posY[0]);
    //console.log('Seconds & Current: ' + Math.floor(time.getMilliseconds() / 60) + ', ' + current);
    window.requestAnimationFrame(draw);
}

function doKeydown(e) {
    draw();
    var keyID = e.keyCode;
    if (keyID === 38 || keyID === 87) { // up arrow and w
        if (direction != 3) {
            direction = 1;
        }
        //draw(-1, 0);
        e.preventDefault(); //取消事件的默认动作
    }
    if (keyID === 39 || keyID === 68) { // right arrow and d
        if (direction != 4) {
            direction = 2;
        }
        //draw(0, 1);
        e.preventDefault(); //取消事件的默认动作
    }
    if (keyID === 40 || keyID === 83) { // down arrow and s
        if (direction != 1) {
            direction = 3;
        }
        //draw(1, 0);
        e.preventDefault(); //取消事件的默认动作
    }
    if (keyID === 37 || keyID === 65) { // left arrow and a
        if (direction != 2) {
            direction = 4;
        }
        //draw(0, -1);
        e.preventDefault(); //取消事件的默认动作
    }
}