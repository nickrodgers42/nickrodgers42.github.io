$(document).ready(function() {
    console.log("The document is ready");
    var myCanvas = $('#myCanvas')[0];
    console.log(myCanvas);
    var ctx = myCanvas.getContext("2d");
    
    var circleDrawn = false;

    function drawCircle() {
        if (circleDrawn) {
            ctx.beginPath();
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            circleDrawn = false;
            ctx.closePath();
        }
        else {
            ctx.beginPath();
            ctx.arc(100, 75, 50, 0, 2 * Math.PI);
            ctx.stroke();
            circleDrawn = true;
            ctx.closePath();
        }
    }
    
    var rainDrops = [];

    function rainDrop(x, y, opacity) {
        this.x = x;
        this.y = y;
        this.opacity = opacity;
        this.nextDrawn = false;
        this.counter = 0;
    }

    function drawRain() {
        rainDrops.forEach(drawRainDrop);
    }

    function drawRainDrop(currentDrop, index) {
        console.log(currentDrop);
        ctx.fillStyle = "rgba(0,0,0," + currentDrop.opacity +")";
        ctx.beginPath();
        ctx.fillRect(currentDrop.x, currentDrop.y, 5, 5);
        currentDrop.opacity -= 0.1;
        if (!currentDrop.nextDrawn) {
            currentDrop.counter++;
            if (currentDrop.counter == 2 && currentDrop.y < myCanvas.height) {
                rainDrops.push(new rainDrop(currentDrop.x, currentDrop.y + 10, 1));
                currentDrop.nextDrawn = true;
            }
        }
        if (currentDrop.opacity <= 0.1) {
            rainDrops.splice(index,1);
        }
        ctx.closePath();
    }
    var timer1 = 0;
    function draw () {
        ctx.beginPath();
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        circleDrawn = false;
        ctx.closePath();
        timer1++;
        if (timer1 == 5) {
            rainDrops.push(new rainDrop(Math.floor(Math.random() * 500), 0, 1));
        }
        timer1 %= 5;
        drawRain();
    }

    var drawInterval = setInterval(draw, 30);
});
