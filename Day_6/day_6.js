var canvas;
var cw = 200;
var ch = 400;
var ctx;
var X;
var Y;
var time;
var current = 0;
var bool = true;

window.onload = function () {
    setup();
}

function setup() {
    canvas = document.getElementById('canvas');
    canvas.width = cw;
    canvas.height = ch;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.font = '14px Arial';
        ctx.fillText('Press "Space" To Start', 20, 20);
        window.addEventListener('keydown', doKeydown, true);
        window.focus();
    }
}

function draw() {
    time = new Date();
    if (current != time.getSeconds()) {
        ctx.clearRect(0, 0, cw, ch);

        //只有一个方块时，检测触底
        if (X.length == 1) {
            if (Y[Y.length - 1] == ch - 20) {
                X.push(cw / 2);
                Y.push(-20);
            }
        }

        //大于一个方块时
        if (X.length > 1) {
            for (var i = 0; i < X.length - 1; i++) {
                //画出其他方块
                ctx.fillRect(X[i], Y[i], 20, 20);

                //检测触底，以及，检测下方方块，触底/触块则出新方块
                if ((X[X.length - 1] == X[i] && Y[Y.length - 1] == Y[i] - 20) || (Y[Y.length - 1] == ch - 20)) {
                    //检测触顶
                    if (X[X.length - 1] == cw / 2 && Y[Y.length - 1] == 0) {
                        ctx.fillRect(X[X.length - 1], Y[Y.length - 1], 20, 20);
                        ctx.fillStyle = 'rgb(255, 0, 0)';
                        ctx.fillText('Game End', 20, 20);
                        return;
                    }
                    console.log('AO');
                    X.push(cw / 2);
                    Y.push(-20);
                }
            }
        }
        Y[Y.length - 1] += 20;
        ctx.fillRect(X[X.length - 1], Y[Y.length - 1], 20, 20);

        //检测是否满一整行
        //现阶段只有单行检测，多行检测需要固定一个Y并循环所有固定Y上面的X
        if (X.length > 1) {
            var count = 0;
            for (var i = 0; i < X.length - 1; i++) {
                if (Y[i] == Y[Y.length - 1]) {
                    count++;
                }
            }
        }
        if (count == 10) {
            while (X.length > 0) {
                //弄个新的坐标数组，只加入未被消除的方块
                //已知消除行的Y坐标，消除后，将所有Y坐标小于消除行的方块下移20（Y += 20）
            }
        }
        current = time.getSeconds();
    }
    window.requestAnimationFrame(draw);
}

//键盘操作后，刷新画布
function idraw() {
    ctx.clearRect(0, 0, cw, ch);
    if (X.length > 1) {
        for (var i = 0; i < X.length - 1; i++) {
            ctx.fillRect(X[i], Y[i], 20, 20);
        }
    }
    ctx.fillRect(X[X.length - 1], Y[Y.length - 1], 20, 20);
}

//键盘操作
function doKeydown(e) {
    var keyID = e.keyCode;
    if (keyID === 32 && bool == true) { //空格
        ctx.clearRect(0, 0, cw, ch);
        X = [cw / 2];
        Y = [-20];
        bool = false;
        draw();
    }
    /*
    if (keyID === 38 || keyID === 87) { // 上箭头和W
        e.preventDefault(); //取消事件的默认动作
    }
    */
    if ((keyID === 39 || keyID === 68) && (X[X.length - 1] < (cw - 20))) { //右箭头和D
        var b = true;
        if (X.length > 1) {
            for (var i = 0; i < X.length - 1; i++) {
                //检测右边方块，右边有方块则不能向右移动
                if (Y[Y.length - 1] == Y[i] && X[X.length - 1] == X[i] - 20) {
                    b = false;
                }
            }
        }
        if (b == true) {
            X[X.length - 1] += 20;
            idraw();
        }

        e.preventDefault(); //取消事件的默认动作
    }
    if ((keyID === 40 || keyID === 83) && (Y[Y.length - 1] < (ch - 20))) { //下箭头和S
        var b = true;
        if (X.length > 1) {
            for (var i = 0; i < X.length - 1; i++) {
                //检测左边方块，左边有方块则不能向左移动
                if (X[X.length - 1] == X[i] && Y[Y.length - 1] == Y[i] - 20) {
                    b = false;
                    break;
                }
            }
        }
        if (b == true) {
            Y[Y.length - 1] += 20;
            idraw();
        }
        e.preventDefault(); //取消事件的默认动作
    }
    if ((keyID === 37 || keyID === 65) && X[X.length - 1] > 0) { //左箭头和A
        var b = true;
        if (X.length > 1) {
            for (var i = 0; i < X.length - 1; i++) {
                //检测下边方块，下边有方块则不能向下移动
                if (Y[Y.length - 1] == Y[i] && X[X.length - 1] == X[i] + 20) {
                    b = false;
                }
            }
        }
        if (b == true) {
            X[X.length - 1] -= 20;
            idraw();
        }
        e.preventDefault(); //取消事件的默认动作
    }
}