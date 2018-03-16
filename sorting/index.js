$(document).ready(function() {
    console.log("hello world");
    var sortingCanvas = $("#sorting-canvas")[0];
    var context = sortingCanvas.getContext("2d");
    var sortButton = $("#sort-button")[0];
    sortButton.onclick = function() { console.log("Button clicked");};
    var myArray = [];
    var color1 = new Color(255, 0, 0);
    var color2 = new Color(0,0, 255);
    var myArray = new MakeArray(20, color1, color2);
    for (var i = 0; i < myArray.length; ++i) {
        console.log(myArray[i].val);
        console.log(myArray[i].color.red);
    }
    shuffle(myArray);
    for (var i = 0; i < myArray.length; ++i) {
        console.log(myArray[i].val);
    }
});

function shuffle(a) {
    for (var i = a.length - 1; i > 0; --i) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
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