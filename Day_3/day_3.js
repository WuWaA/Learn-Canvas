function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = 'images/star.png';
        img.onload = function () {
            var ptrn = ctx.createPattern(img, 'repeat'); //类似贴图
            ctx.fillStyle = ptrn;
            ctx.fillRect(0, 0, 150, 150);
        }
    }

    var canvas2 = document.getElementById('canvas2');
    if (canvas2.getContext) {
        var ctx2 = canvas2.getContext('2d');
        ctx2.font = "24px Arial";
        ctx2.fillText("Hello World", 10, 40);
        ctx2.strokeText("Hello World", 10, 80);
    }
}

window.onload = function () {
    draw();
}