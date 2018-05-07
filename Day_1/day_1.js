function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 50, 50);

        ctx.strokeRect(50, 50, 50, 50);

        ctx.clearRect(50, 50, 5, 5);

        ctx.lineStyle = "rgb(200, 0, 0)"; //不存在的
        ctx.beginPath();
        ctx.moveTo(140, 140);
        ctx.lineTo(130, 130);
        ctx.lineTo(140, 130);
        ctx.stroke();
        ctx.closePath(); //后关闭路径

        ctx.strokeStyle = "rgb(0, 200, 0)"; //存在的
        ctx.beginPath();
        ctx.moveTo(140, 140);
        ctx.lineTo(150, 130);
        ctx.lineTo(140, 130);
        ctx.closePath(); //先关闭路径
        ctx.stroke();

        /*
        ctx.strokeStyle = "rgb(200, 200, 0)";
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.stroke(110, 110);
        ctx.stroke(120, 110);
        ctx.closePath();
        */
    }

    var canvas2 = document.getElementById('canvas2');
    if (canvas2.getContext) {
        var ctx = canvas2.getContext('2d');

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
        ctx.arc(75, 75, 35, 0, Math.PI, false);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);
        ctx.stroke();
    }

    var canvas3 = document.getElementById('canvas3');
    if (canvas3.getContext) {
        var ctx = canvas3.getContext('2d');

        ctx.fillStyle = "rgb(200, 0, 200)"; //填充颜色测试
        ctx.arc(100, 5, 10, 0, Math.PI, false); //圆心测试
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.arcTo(50, 50, 100, 100, 30); //???
        ctx.arcTo(100, 100, 150, 75, 60); //???
        ctx.stroke();
    }
}

window.onload = function () {
    draw();
}