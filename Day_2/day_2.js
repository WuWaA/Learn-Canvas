function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200, 200, 0)";
        ctx.globalAlpha = 0.2;
        for (var i = 1; i <= 8; i++) {
            ctx.arc(75, 75, i * 10, 0, 2 * Math.PI, true);
            ctx.fill();
        }
    }
}

window.onload = function () {
    draw();
}