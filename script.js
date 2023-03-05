var grassArr = [];
var grassEatArr = [];
var angelarr = [];
var demonarr = [];
var weath = 'winter'
var side = 50;
var matrix = [];
var start = false
function generator(matrixSize, grass1, grassEat1, angel1, demon1) {
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([]);
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0);
        }
    }
    for (let i = 0; i < grass1; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 1;
        grassArr.push(new Grass(x, y));
    }
    for (let i = 0; i < grassEat1; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 2;
        grassEatArr.push(new GrassEat(x, y));
    }
    for (let i = 0; i < angel1; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 3;
        angelarr.push(new Angel(x, y));
    }
    for (let i = 0; i < demon1; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1));
        const y = Math.round(Math.random() * (matrixSize - 1));
        matrix[y][x] = 4;
        demonarr.push(new Demon(x, y));
    }
}

function weather() {
    
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
}

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEat = new GrassEat(x, y);
                grassEatArr.push(grassEat);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var angel = new Angel(x, y);
                angelarr.push(angel);
            }
            else if (matrix[y][x] == 4) {
                var demon = new Demon(x, y);
                demonarr.push(demon);
            }
        }
    }
}

function game() {
    if (grassArr[0] !== undefined) {
        if (weath != 'autumn') {
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }

    }
    if (grassEatArr[0] !== undefined) {
        for (var i in grassEatArr) {
            grassEatArr[i].eat();
        }
    }
    if (angelarr[0] !== undefined) {
        for (var i in angelarr) {
            angelarr[i].eat();
        }
    }
    if (demonarr[0] !== undefined) {
        for (var i in demonarr) {
            demonarr[i].eat();
        }
    }


    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCount: grassEatArr.length,
        DemonCount: demonarr.length,
        AngelCount: angelarr.length

    }


}

var clickCount = 0;
function clickHandler(evt) {

    clickCount++;
    console.log(evt);
    var str = " Click to stop ";
    this.innerText = str;
    start = !start
}
var p = document.getElementById("button");
p.addEventListener("click", clickHandler);



function setup() {
    generator(25, 20, 5, 1, 4);
    frameRate(5);
creatingObjects();

}
function draw() {
    if(start)
    {if(frameCount % 15 == 0)
        weather()
    createCanvas(matrix[0].length * side, matrix.length * side)
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
    game()}
}
function mouseClicked() {
    clickCount++
    console.log(Math.floor(mouseX/side), Math.floor(mouseY/side))
    
    grassArr.push(new Grass(mouseX, mouseY))
   }

