var NewCord= require("./NewCord");
var random = require("./random.js");

module.exports = class Angel extends NewCord {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
    }
   getNewCoordinates() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }


    mul() {
        var found = this.chooseCell(0);
        var newCell = random(found);

        if (newCell && this.energy >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            angelarr.push(new Angel(newX, newY));
            this.energy = 8;
        }
    }
    move() {
        var found = this.chooseCell(0);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }

    eat() {
        var found = this.chooseCell(4,1);

        var newCell = random(found);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 30) {
                this.mul();
            }
        }

        else {
            this.move();
        }
    }
    die() {
        for (var i in angelarr) {
            if (this.x == angelarr[i].x && this.y == angelarr[i].y) {
                angelarr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}