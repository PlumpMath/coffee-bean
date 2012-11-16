
main = ->
  delay = -> setTimeout &1 &0
  query = -> document.querySelector it

  show = (...args) -> console.log.apply console, args

  show CoffeeScript

  area =
    "/coffee-box":
      'textarea/coffee-code': ''
      '/coffee-result':
        '/coffee-ctrl':
          'span/coffee-run': 'run'
        '/coffee-content': ''

  body = (query 'body')
  show body
  body.insertAdjacentHTML 'beforeend', (tmpl area)

  coffee-box = query \#coffee-box
  coffee-code = coffee-box.querySelector \#coffee-code
  show \new coffee-code
  codearea coffee-code

  coffee-drag = query \#coffee-drag

  ctrl-pressed = no
  document.body.add-event-listener \keydown (event) ->
    if event.key-code is 17 then ctrl-pressed := yes
    # show \down event.key-code, ctrl-pressed
  document.body.add-event-listener \keyup (event) ->
    if event.key-code is 17 then ctrl-pressed := no
    # show \up event.key-code, ctrl-pressed

  coffee-box.onmousedown = ->

    start-x = undefined
    start-y = undefined

    # show ctrl-pressed
    if ctrl-pressed
      coffee-box.onmousemove = (event) ->

        if ctrl-pressed
          # show 'start pos' start-x, start-y
          if start-x? and start-y?
            diff-x = event.client-x - start-x
            diff-y = event.client-y - start-y
            # show \diff diff-x, diff-y

            now-x = coffee-box.offset-left + diff-x
            now-y = coffee-box.offset-top + diff-y

            coffee-box.style.left = now-x + 'px'
            coffee-box.style.top = now-y + 'px'

            # show 'new pos', coffee-drag.style

          start-x := event.client-x
          start-y := event.client-y
          # show 'end pos', start-x, start-y

      coffee-box.onmouseup = ->
        coffee-box.onmousemove = null
      coffee-box.onmouseout = ->
        coffee-box.onmousemove = null

window.onload = main