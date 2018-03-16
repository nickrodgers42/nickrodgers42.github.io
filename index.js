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
    var colors = ["255, 0, 25", "255, 170, 0", "255, 225, 0", "38, 255, 0", "0, 208, 255", "187, 0, 255"];

    function rainDrop(x, y, opacity, rgbColorValues, size, horizontalDrift) {
        this.x = x;
        this.y = y;
        this.opacity = opacity;
        this.rgbColorValues = rgbColorValues;
        this.size = size;
        this.horizontalDrift = horizontalDrift;
        this.nextDrawn = false;
        this.counter = 0;
    }

    function drawRain() {
        rainDrops.forEach(drawRainDrop);
    }

    function drawRainDrop(currentDrop, index) {
        // console.log(currentDrop);
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + currentDrop.rgbColorValues + "," + currentDrop.opacity +")";
        ctx.fillRect(currentDrop.x, currentDrop.y, currentDrop.size, currentDrop.size);
        currentDrop.opacity -= 0.1;
        if (!currentDrop.nextDrawn) {
            currentDrop.counter++;
            if (currentDrop.counter == 2 && currentDrop.y < myCanvas.height) {
                rainDrops.push(new rainDrop(currentDrop.x + currentDrop.horizontalDrift, currentDrop.y + currentDrop.size + currentDrop.horizontalDrift, 1, currentDrop.rgbColorValues, 
                    currentDrop.size, currentDrop.horizontalDrift));
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
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
        circleDrawn = false;
        ctx.closePath();
        timer1++;
        if (timer1 == 3) {
            rainDrops.push(new rainDrop(Math.floor(Math.random() * 800) - 300, 0, 1, colors[Math.floor(Math.random() * 6)],
                            Math.floor(Math.random() * 8 + 1), Math.random() * 3));
        }
        timer1 %= 3;
        drawRain();
        // console.log(rainDrops.length);
    }

    var drawInterval = setInterval(draw, 30);
});
