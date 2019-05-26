document.addEventListener("DOMContentLoaded", function(event) { 
  var square1 = new Square('square1', 100, 50);
  var square2 = new Square('square2', 200, 100);
  var square3 = new Square('square3', 300, 150);
  var square4 = new Square('square4', 250, 200);


  setInterval(function() {
    square1.move();
    square2.move();
    square3.move();
    square4.moveH();
  }, 30);

});



function Square(elID, x, y) {
  var el = document.getElementById(elID);
  var left = x;
  var top = y;
  var step = 20;
  var rightFlag = true;
  var bottomFlag = true;
  this.draw = function() {
    el.style.left = left + 'px';
    el.style.top = top + 'px';
  }

  this.moveH = function() {
    if (top >= 300) {
      bottomFlag = false
    } else if (top <= 0) {
      bottomFlag = true
    }

    if (bottomFlag) {
      top += step
    } else {
      top -= step
    }

    this.draw();
  }

  this.move = function() {
    if (left >= 300) {
      rightFlag = false
    } else if (left <= 0) {
      rightFlag = true
    }

    if (rightFlag) {
      left += step
    } else {
      left -= step
    }
    this.draw();
  }
}
