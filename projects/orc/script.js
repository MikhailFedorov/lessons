// создаём орка на позиции 30, 30
var ork = new Ork('#ork', 30, 30);

// по интервалу двигаем его и отрисовываем
setInterval(function() {
	ork.move();
	ork.draw();
}, 150);

// если нажата клавиша стрелок, то поворачиваем орка
$(document).keyup(function(e) {
	if(typeof ork.keys[e.key] !== undefined) {
  	ork.turn(ork.keys[e.key]);
  }
});

// если кликнули по сцене, то задаём орку цель
$("#stage").click(function(e) {
  ork.setTarget(e.offsetX, e.offsetY);
});


/** КЛАСС ОРКА */
function Ork(selector, x, y) {
  // находим элемент на странице и сохраняем в виде jquery объекта
  jq = $(selector);
  
  // сохраняем переменную this под другим названием,
  // чтобы обращаться в других функциях
  var me = this;

	// константы для положений орка (по аналогии с прежней переменной frameY)
  const RIGHT = 1;
  const LEFT = 3;
  const DOWN = 2;
  const UP = 0;
  
  // коды клавиш, соответствующие направлению орка
  this.keys = {
  	'ArrowRight': RIGHT,
    'ArrowLeft': LEFT,
    'ArrowUp': UP,
    'ArrowDown': DOWN,
  }

	// по умолчанию орк смотрит вправо
  var direction = RIGHT;
  // количество пикселей на один шаг
  var movePx = 10; 
  
  // координаты
  this.x = x;
  this.y = y;
  
  // изначально нет цели, куда идти
  var target = null;
  
  // функция установки цели
  this.setTarget = function(targetX, targetY) {
  	target = {
    	x: Math.round(targetX / 10) * 10,
      y: targetY
    }
  }
  
  // функция поворота орка
  this.turn = function(nextDirection) {
  	direction = nextDirection;
  }

	// функция движения орка
	this.move = function() {
  	// если есть цель, то она может изменить направление орка
  	if(target) {
    	if(target.x > me.x) {
      	direction = RIGHT;
      } else if (target.x < me.x) {
      	direction = LEFT;
      } else { // если по x мы уже на уровне цели, то меняем направление по y
      	if(target.y > me.y) {
        	direction = DOWN;
        } else {
        	direction = UP;
        }
        // здесь мы уже идём по прямой к цели, а значит цель можно сбросить
        target = null;
      }
    }
  
  	switch(direction) {
    	case RIGHT:
      	me.x += movePx;
        break;
      case LEFT:
      	me.x -= movePx;
        break;
      case UP:
      	me.y -= movePx;
        break;
       case DOWN:
       	me.y += movePx;
        break;
    }
  }

  /** ОТРИСОВКА */

  var frame = 0;
  var step = 0;

	// переключаемся на следующий шаг (другой фрейм по горизонтали)
  function nextFrame() {
    step += 1
    if (step == 4) {
      step = 0;
    }
    frame = step;
    if (step == 3) {
      frame = 1;
    }
  }

  this.draw = function() {
  	// делаем шаг
    nextFrame();
    // отрисовываем орка
    jq.css({
      backgroundPosition: -frame * 48 + 'px  -' + direction * 64 + 'px',
      left: me.x + 'px',
      top: me.y + 'px',
    });
  }
  me.draw();
}