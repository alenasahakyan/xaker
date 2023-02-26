weath = "winter"

var Grass = require("./Grass.js");
var GrassEat = require("./GrassEat.js");
var Angel = require("./Angel.js");
var Demon = require("./Demon.js");
let random = require('./random');
var fs = require('fs');

matrix = [];
side = 50;
grassArr = [];
grassEatArr = [];
angelarr = [];
demonarr= [];

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
generator(25, 20, 5, 10, 4);
function getnum() {
    frameRate(5);
    let grass1 = document.getElementById("Grass");
    let grassEat1 = document.getElementById("GrassEater");
    let angel1 = document.getElementById("Angel");
    let demon1 = document.getElementById("Demon");
    let button = document.getElementById("button")
    button.onclick = function () {
        generator(25,grass1.value, grassEat1.value, angel1.value, demon1.value);
        createCanvas(matrix[0].length * side, matrix.length * side);
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
    io.sockets.emit('weather', weath)
}
setInterval(weather, 3000);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(4000);

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
creatingObjects();

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

    io.sockets.emit("data", sendData);
}
setInterval(game, 2000)

var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEat = grassEatArr.length;
    statistics.angel = angelarr.length;
    statistics.demon = demonarr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)