function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200, 200, 0)";
        ctx.globalAlpha = 0.2; //全局透明度
        for (var i = 1; i <= 8; i++) {
            ctx.arc(75, 75, i * 10, 0, 2 * Math.PI, true);
            ctx.fill();
        }
    }

    var canvas2 = document.getElementById("canvas2");
    if (canvas2.getContext) {
        var ctx = canvas2.getContext("2d");
        var lg = ctx.createLinearGradient(0, 0, 100, 100); //???
        //var rg = ctx.createRadialGradient(125, 125, 25, 150, 150, 25);
        lg.addColorStop(0, 'yellow'); //???
        lg.addColorStop(0.75, 'orange'); //???
        lg.addColorStop(1, 'red'); //???
        //rg.addColorStop(0.5, 'red');
        ctx.fillStyle = lg;
        ctx.fillRect(0, 0, 150, 150);
        //ctx.fillStyle = rg;
        //ctx.fillRect(0, 75, 150, 75);
    }
}

window.onload = function () {
    draw();
}