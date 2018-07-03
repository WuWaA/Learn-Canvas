var canvas;
var cw = 200;
var ch = 400;
var ctx;
var X = [];
var Y = [];
var stack_X = [];
var stack_Y = [];
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
        window.addEventListener('keydown', trueKey, true);
        window.focus();
    }
}

function draw() {
    time = new Date();
    if (current != time.getSeconds()) {
        if (trueBottom()) { //触底操作 & 触顶操作
            if (bool) {
                return; //结束游戏
            }
            trueKorosu(); //满行消除
            trueCubes(); //新方块组
        }

        //一个思路：[当前方块组下落]与[触底操作 & 触顶操作]可否合并？
        //例如，在[当前方块组下落]函数中进行[触底操作 & 触顶操作]？
        //但是，这样设计好不好？

        trueDown(); //当前方块组下落
        trueRefresh(); //刷新画布
        current = time.getSeconds();
    }
    window.requestAnimationFrame(draw);
}

//刷新画布
function trueRefresh() {
    ctx.clearRect(0, 0, cw, ch);
    /*画出已有块堆*/
    for (var i = 0; i < stack_X.length; i++) {
        ctx.fillRect(stack_X[i], stack_Y[i], 20, 20);
    }
    /*画出已有块堆 End*/
    /*画出当前方块组*/
    for (var i = 0; i < X.length; i++) {
        ctx.fillRect(X[i], Y[i], 20, 20);
    }
    /*画出当前方块组 End*/
}

//键盘操作
function trueKey(e) {
    var keyID = e.keyCode;
    if (keyID === 32 && bool == true) { //空格
        //清空已有块堆
        stack_X = [];
        stack_Y = [];
        //清空当前方块组
        X = [];
        Y = [];
        //清空画布
        ctx.clearRect(0, 0, cw, ch);
        bool = false;
        trueCubes();
        draw();
    }
    /*
    if (keyID === 38 || keyID === 87) { //上箭头和W
        e.preventDefault(); //取消事件的默认动作
    }
    */
    if (keyID === 39 || keyID === 68) { //右箭头和D
        var b = true;
        for (var i = 0; i < X.length; i++) {
            if (X[i] == cw - 20) {
                b = false;
                return;
            }
            for (var j = 0; j < stack_X.length; j++) {
                //检测右方已有块堆，右边有方块则不能向右移动
                if (Y[i] == stack_Y[j] && X[i] == stack_X[j] - 20) {
                    b = false;
                    return;
                }
            }
        }

        if (b == true) {
            for (var i = 0; i < X.length; i++) {
                X[i] += 20; //当前方块组向右移动
            }
            trueRefresh();
        }

        e.preventDefault(); //取消事件的默认动作
    }
    if (keyID === 40 || keyID === 83) { //下箭头和S
        var b = true;
        for (var i = 0; i < X.length; i++) {
            if (Y[i] == ch - 20) {
                b = false;
                return;
            }
            for (var j = 0; j < stack_X.length; j++) {
                //检测下方已有块堆，下边有方块则不能向下移动
                if (X[i] == stack_X[j] && Y[i] == stack_Y[j] - 20) {
                    b = false;
                    return;
                }
            }
        }

        if (b == true) {
            for (var i = 0; i < X.length; i++) {
                Y[i] += 20; //当前方块组向下移动
            }
            trueRefresh();
        }
        e.preventDefault(); //取消事件的默认动作
    }
    if (keyID === 37 || keyID === 65) { //左箭头和A
        var b = true;
        for (var i = 0; i < X.length; i++) {
            if (X[i] == 0) {
                b = false;
                return;
            }
            for (var j = 0; j < stack_X.length; j++) {
                //检测左方已有块堆，左边有方块则不能向左移动
                if (Y[i] == stack_Y[j] && X[i] == stack_X[j] + 20) {
                    b = false;
                    return;
                }
            }
        }

        if (b == true) {
            for (var i = 0; i < X.length; i++) {
                X[i] -= 20; //当前方块组向左移动
            }
            trueRefresh();
        }
        e.preventDefault(); //取消事件的默认动作
    }
}

//新方块组
function trueCubes() {
    var mode = Math.round(Math.random() * 6);
    if (mode == 0) {
        X.push(cw / 2);
        Y.push(-20);
        X.push(cw / 2);
        Y.push(-40);
        X.push((cw / 2) - 20);
        Y.push(-20);
    }
    else if (mode == 1) {
        X.push(cw / 2);
        Y.push(-20);
        X.push(cw / 2);
        Y.push(-40);
        X.push((cw / 2) + 20);
        Y.push(-20);
    }
    else if (mode == 2) {
        X.push(cw / 2);
        Y.push(-20);
        X.push(cw / 2);
        Y.push(-40);
    }
    else if (mode == 3) {
        X.push(cw / 2);
        Y.push(-20);
        X.push(cw / 2);
        Y.push(-40);
        X.push(cw / 2);
        Y.push(-60);
    }
    else if (mode == 4) {
        X.push(cw / 2);
        Y.push(-20);
        X.push((cw / 2) + 20);
        Y.push(-20);
        X.push(cw / 2);
        Y.push(-40);
        X.push((cw / 2) - 20);
        Y.push(-40);
    }
    else if (mode == 5) {
        X.push(cw / 2);
        Y.push(-20);
        X.push((cw / 2) - 20);
        Y.push(-20);
        X.push(cw / 2);
        Y.push(-40);
        X.push((cw / 2) + 20);
        Y.push(-40);
    }
    else {
        X.push(cw / 2);
        Y.push(-20);
        X.push((cw / 2) + 20);
        Y.push(-20);
        X.push((cw / 2) - 20);
        Y.push(-20);
    }
}

//当前方块组下落
function trueDown() {
    for (var i = 0; i < X.length; i++) {
        Y[i] += 20;
    }
}

//触底操作 & 触顶操作
function trueBottom() {
    for (var i = 0; i < X.length; i++) {
        if (Y[i] == ch - 20) {
            //触底则将当前方块组加入已有块堆
            stack_X = stack_X.concat(X);
            stack_Y = stack_Y.concat(Y);
            X = [];
            Y = [];
            return true;
        }
        for (var j = 0; j < stack_X.length; j++) {
            if (X[i] == stack_X[j] && Y[i] == stack_Y[j] - 20) {
                //触顶则结束游戏
                for (var k = 0; k < X.length; k++) {
                    if (Y[k] < 0) {
                        ctx.fillStyle = 'rgba(225, 225, 225, 0.85)';
                        ctx.fillRect(10, 180, 180, 60);
                        ctx.fillStyle = 'Black';
                        ctx.font = '14px Arial';
                        ctx.fillText('Game End', 20, 200);
                        ctx.fillText('Press "Space" To Restart', 20, 220);
                        bool = true;
                        return true;
                    }
                }

                //触底则将当前方块组加入已有块堆
                stack_X = stack_X.concat(X);
                stack_Y = stack_Y.concat(Y);
                X = [];
                Y = [];
                return true;
            }
        }
    }
    return false;
}

//满行消除
function trueKorosu() {
    for (var i = 0; i < ch; i += 20) {
        var count = 0;
        var lajis = []; //已有块堆中需要消除的
        var lihais = []; //已有块堆中需要下落的
        for (var j = 0; j < stack_X.length; j++) {
            if (stack_Y[j] == i) {
                count++;
                lajis.push(j);
            }
            if (stack_Y[j] < i) {
                lihais.push(j);
            }
        }
        //满行
        if (count == 10) {
            //下落
            while (lihais.length != 0) {
                stack_Y[lihais.pop()] += 20;
            }
            //消除
            while (lajis.length != 0) {
                var laji = lajis.pop();
                stack_X.splice(laji, 1);
                stack_Y.splice(laji, 1);
            }
        }
    }
}