
delay = -> setTimeout &1 &0
query = -> document.querySelector it
window.show = (...args) -> console.log.apply console, args
keep-end = yes

set = (key, value) -> local-storage.set-item key, value
get = (key) -> local-storage.get-item key

coffee-init = ->
  area =
    "/coffee-box":
      'textarea/coffee-code': ''
      '/coffee-result': ''

  body = (query 'body')
  show body
  body.insertAdjacentHTML 'beforeend', (tmpl area)

  coffee-box = query \#coffee-box
  coffee-code = coffee-box.querySelector \#coffee-code
  show \new coffee-code
  codearea coffee-code
  last-code = get \coffee-code
  if last-code? then coffee-code.value = that

  coffee-drag = query \#coffee-drag

  ctrl-pressed = no
  document.body.add-event-listener \keydown (event) ->
    if event.key-code is 17 then ctrl-pressed := yes
    # show \down event.key-code, ctrl-pressed
  document.body.add-event-listener \keyup (event) ->
    if event.key-code is 17 then ctrl-pressed := no
    # show \up event.key-code, ctrl-pressed

  coffee-code.focus!

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

  coffee-code.add-event-listener \keydown (event-enter) ->
    # show \keydown event-enter
    if event-enter.key-code is 13
      # show \here event-enter.key-code
      code = coffee-code.value
      caret-at = coffee-code.selection-start
      t1 = code[caret-at - 1]
      t2 = code[caret-at - 2]
      if t1 is '\n' and t2 is '\n'
        try
          CoffeeScript.run code
          set \coffee-code code
        catch err then puts (String err)

  result = query '#coffee-result'
  result.onscroll = ->
    {scroll-top, client-height, scroll-height} = result
    diff = scroll-top + client-height - scroll-height
    keep-end := (diff > -10)
    show result, scroll-top, client-height, scroll-height
    show \keep-end keep-end

coffee-destroy = ->
  elem = query \#coffee-box
  elem.parent-element.remove-child elem

escape = (str) ->
  html = str
    .replace /\t/g '  '
    .replace /</g '&lt;'
    .replace />/g '&gt;'
  # "<pre class='coffee-print'>#html</pre>"
  tmpl 'pre.coffee-print': html

stringify = (item) ->
  if typeof item is \function
    item.toString!
  else if typeof item is \object
    JSON.stringify item, null 2
  else String item

window.puts = (...args) ->
  output = args .map stringify .map escape .join ''
  result = query '#coffee-result'
  result.insertAdjacentHTML 'beforeend', output
  # show keep-end
  if keep-end
    result.scroll-top = result.scroll-height

window.purge = ->
  (query '#coffee-result').innerHTML = ''

window.onload = ->
  window.add-event-listener \keydown ->
    # show it
    if event.key-code is 192
      if event.ctrl-key and (not event.alt-key) and (not event.shift-key)
        detect-box = query \#coffee-box
        if detect-box? then coffee-destroy!
        else coffee-init!
  coffee-init!