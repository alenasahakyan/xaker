function setup() {
    var weath = 'winter'
    //var socket = io();

    var side = 50;

    var matrix = [];

    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let AngelCountElement = document.getElementById('AngelCount');
    let DemonCountElement = document.getElementById('DemonCount');


    socket.on("data", drawGame);
    socket.on("weather", function (data) {
        weath = data;
    })

var clickCount = 0;
function clickHandler(evt){

clickCount++;
console.log(evt);
var str = "Thanks for clicking " + clickCount;
this.innerText = str;
}
var p = document.getElementById("button");
p.addEventListener("click", clickHandler);

function bodyClick(evt){
console.log("Clicked at X: " + evt.pageX + ", Y: " + evt.pageY);    
}
window.onclick = bodyClick;

    function drawGame(data) {        
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCount;
        AngelCountElement.innerText = data.AngelCount;
        DemonCountElement.innerText = data.DemonCount;
        createCanvas(matrix[0].length*side,matrix.length*side)
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 1) {
                    
                        if (weath == "spring") {
                            fill("green")
                        }
                        else if (weath == "summer") {
                            fill("#012100");
                        }
                        else if (weath == "winter") {
                            fill("#d6ceb8")
                        }
                        else if (weath == "autumn") {
                            fill("#ad8002")
                        }
                        rect(x * side, y * side, side, side);
                    }
                    else if (matrix[y][x] == 0) {
                        fill("#acacac");
                    }
                    else if (matrix[y][x] == 2) {
                        fill("yellow");
                    }
                    else if (matrix[y][x] == 3) {
                        fill("Blue");
                    }
                    else if (matrix[y][x] == 4) {
                        fill("Red");
                    }


                    rect(x * side, y * side, side, side);

                }
            }
        }
    }