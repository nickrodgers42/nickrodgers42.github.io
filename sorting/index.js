$(document).ready(function() {
    var sortingCanvas = $("#sorting-canvas")[0];
    sortingCanvas.height = $(window).height() * 0.8;
    sortingCanvas.width = sortingCanvas.height;
    $(window).resize(function () { 
        sortingCanvas.height = $(window).height() * 0.8;
        sortingCanvas.width = sortingCanvas.height;
    });
    var context = sortingCanvas.getContext("2d");
    var sortButton = $("#sort-button")[0];
    var sorting = false;
    var myArray = [];
    var color1 = new Color(255, 0, 0);
    var color2 = new Color(0,0, 255);
    for (var i = 0; i < 20; ++i) {
        myArray[i] = new MakeArray(20, color1, color2);
        shuffle(myArray[i]);
    }
    drawArr(myArray);
    sortButton.onclick = function() {
        console.log(sorting);
        if (!sorting) {
            sorting = true;
            sortArr(myArray, sorting);
        }
        else {
            clearInterval(srtInterval);
            sorting = false;
            for (var i = 0; i < 20; ++i) {
                myArray[i] = new MakeArray(20, color1, color2);
                shuffle(myArray[i]);
            }
            drawArr(myArray);
        }
    };
});

function shuffle(a) {
    for (var i = a.length - 1; i > 0; --i) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}

function drawArr(arr) {
    var sortingCanvas = $("#sorting-canvas")[0];
    var context = sortingCanvas.getContext("2d");
    context.clearRect(0,0, sortingCanvas.width, sortingCanvas.height);
    for (var i = 0; i < arr.length; ++i) {
        for (var j = 0; j < arr[i].length; ++j) {
            context.fillStyle = "rgb(" + arr[i][j].color.red + "," + arr[i][j].color.green +
            "," + arr[i][j].color.blue + ")";
            context.fillRect((j * (sortingCanvas.width / arr[j].length)), (i * (sortingCanvas.height/arr.length)), (sortingCanvas.width / arr[i].length), (sortingCanvas.width / arr.length));
        }
    }
}

function Color(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
}

function MakeArray(size, color1, color2) {
    var arr = [];
    for (var i = 0; i < size; ++i) {
        var val = i+1;
        var red = color1.red - Math.floor(((color1.red - color2.red) / size) * i);
        var green = color1.green - Math.floor(((color1.green - color2.green) / size) * i);
        var blue = color1.blue - Math.floor(((color1.blue - color2.blue) / size) * i);
        var color = new Color(red, green, blue);
        arr[i] = new ArrayStruct(val, color);
    }
    return arr;
}

function ArrayStruct(val, color) {
    this.val = val;
    this.color = color;
}

function sortArr(arr, sorting) {
    var k = 0;
    var i = 0;
    var j = 0;
    var run = function() {
        k = 0;
        srtInterval = setInterval(function () {
            if (arr[k][j].val > arr[k][j + 1].val) {
                temp = arr[k][j];
                arr[k][j] = arr[k][j + 1];
                arr[k][j + 1] = temp;
            }
            drawArr(arr);
            if (k == arr.length - 1) {
                clearInterval(srtInterval);
                j++;
                if (j < arr[k].length - i - 1) {
                    run();
                }
                else {
                    j = 0;
                    i++;
                    if (i < arr[k].length - 1) {
                        run();
                    }
                    else {
                        console.log("done");
                        sorting = false;
                    }
                }
            }
            else {
                k++;
            }
        }, 3);
    };
    run();
}