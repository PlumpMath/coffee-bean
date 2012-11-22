(function(){
  var delay, query, keepEnd, set, get, coffeeInit, coffeeDestroy, escape, stringify, onload, slice$ = [].slice;
  delay = function(){
    return setTimeout(arguments[1](arguments[0]));
  };
  query = function(it){
    return document.querySelector(it);
  };
  window.show = function(){
    var args;
    args = slice$.call(arguments);
    return console.log.apply(console, args);
  };
  keepEnd = true;
  set = function(key, value){
    return localStorage.setItem(key, value);
  };
  get = function(key){
    return localStorage.getItem(key);
  };
  coffeeInit = function(){
    var area, body, coffeeBox, coffeeCode, placeTop, placeLeft, lastCode, that, coffeeDrag, ctrlPressed, result;
    area = {
      "/coffee-box": {
        'textarea/coffee-code': '',
        '/coffee-result': ''
      }
    };
    body = query('body');
    body.insertAdjacentHTML('beforeend', tmpl(area));
    coffeeBox = query('#coffee-box');
    coffeeCode = coffeeBox.querySelector('#coffee-code');
    placeTop = document.body.scrollTop + 100;
    placeLeft = document.body.scrollLeft + 200;
    coffeeBox.style.top = placeTop + "px";
    coffeeBox.style.left = placeLeft + "px";
    codearea(coffeeCode);
    lastCode = get('coffee-code');
    if ((that = lastCode) != null) {
      coffeeCode.value = that;
    }
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
    coffeeCode.focus();
    coffeeBox.onmousedown = function(){
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
    coffeeCode.addEventListener('keydown', function(eventEnter){
      var code, err;
      if (eventEnter.keyCode === 13) {
        code = coffeeCode.value;
        if (eventEnter.altKey) {
          try {
            CoffeeScript.run(code);
            return set('coffee-code', code);
          } catch (e$) {
            err = e$;
            return puts(String(err));
          }
        }
      }
    });
    result = query('#coffee-result');
    return result.onscroll = function(){
      var scrollTop, clientHeight, scrollHeight, diff;
      scrollTop = result.scrollTop, clientHeight = result.clientHeight, scrollHeight = result.scrollHeight;
      diff = scrollTop + clientHeight - scrollHeight;
      keepEnd = diff > -10;
      show(result, scrollTop, clientHeight, scrollHeight);
      return show('keep-end', keepEnd);
    };
  };
  coffeeDestroy = function(){
    var elem;
    elem = query('#coffee-box');
    return elem.parentElement.removeChild(elem);
  };
  escape = function(str){
    var html;
    html = str.replace(/\t/g, '  ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return tmpl({
      'pre.coffee-print': html
    });
  };
  stringify = function(item){
    if (typeof item === 'function') {
      return item.toString();
    } else if (typeof item === 'object') {
      return JSON.stringify(item, null, 2);
    } else {
      return String(item);
    }
  };
  window.puts = function(){
    var args, output, result;
    args = slice$.call(arguments);
    output = args.map(stringify).map(escape).join('');
    result = query('#coffee-result');
    result.insertAdjacentHTML('beforeend', output);
    if (keepEnd) {
      return result.scrollTop = result.scrollHeight;
    }
  };
  window.purge = function(){
    return query('#coffee-result').innerHTML = '';
  };
  window.select = query;
  window.all = function(str){
    return document.querySelectorAll(str);
  };
  window.log = function(){
    var args;
    args = slice$.call(arguments);
    return console.log.apply(console, args);
  };
  (onload = function(){
    return window.addEventListener('keydown', function(){
      var detectBox;
      if (event.keyCode === 192) {
        if (event.ctrlKey && !event.altKey && !event.shiftKey) {
          detectBox = query('#coffee-box');
          if (detectBox != null) {
            return coffeeDestroy();
          } else {
            return coffeeInit();
          }
        }
      }
    });
  })();
}).call(this);
