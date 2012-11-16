(function(){
  var main, slice$ = [].slice;
  main = function(){
    var delay, query, show, area, body, coffeeBox, coffeeCode, coffeeDrag, ctrlPressed;
    delay = function(){
      return setTimeout(arguments[1](arguments[0]));
    };
    query = function(it){
      return document.querySelector(it);
    };
    show = function(){
      var args;
      args = slice$.call(arguments);
      return console.log.apply(console, args);
    };
    show(CoffeeScript);
    area = {
      "/coffee-box": {
        'textarea/coffee-code': '',
        '/coffee-result': {
          '/coffee-ctrl': {
            'span/coffee-run': 'run'
          },
          '/coffee-content': ''
        }
      }
    };
    body = query('body');
    show(body);
    body.insertAdjacentHTML('beforeend', tmpl(area));
    coffeeBox = query('#coffee-box');
    coffeeCode = coffeeBox.querySelector('#coffee-code');
    show('new', coffeeCode);
    codearea(coffeeCode);
    coffeeDrag = query('#coffee-drag');
    ctrlPressed = false;
    document.body.addEventListener('keydown', function(event){
      if (event.keyCode === 17) {
        return ctrlPressed = true;
      }
    });
    document.body.addEventListener('keyup', function(event){
      if (event.keyCode === 17) {
        return ctrlPressed = false;
      }
    });
    return coffeeBox.onmousedown = function(){
      var startX, startY;
      startX = void 8;
      startY = void 8;
      if (ctrlPressed) {
        coffeeBox.onmousemove = function(event){
          var diffX, diffY, nowX, nowY;
          if (ctrlPressed) {
            if (startX != null && startY != null) {
              diffX = event.clientX - startX;
              diffY = event.clientY - startY;
              nowX = coffeeBox.offsetLeft + diffX;
              nowY = coffeeBox.offsetTop + diffY;
              coffeeBox.style.left = nowX + 'px';
              coffeeBox.style.top = nowY + 'px';
            }
            startX = event.clientX;
            return startY = event.clientY;
          }
        };
        coffeeBox.onmouseup = function(){
          return coffeeBox.onmousemove = null;
        };
        return coffeeBox.onmouseout = function(){
          return coffeeBox.onmousemove = null;
        };
      }
    };
  };
  window.onload = main;
}).call(this);
