# leveler

A streaming stat leveling API.

## example

```js
var leveler = require('leveler')

// Create a leveling thing
var exp = leveler(function(points) {
  return Math.floor(Math.floor(25 + Math.sqrt(625 + 100 * points)) / 50)

  // or if you need async emit 'levelup' and return false
  // exp.emit('levelup', level)
  // return false
})

// Every second add 100 experience points
setInterval(function() {
  exp.write(100)
}, 1000)

exp.on('data', function(level) {
  console.log('Player has reached level ' + level + ' with ' + exp.points + ' exp!')
})
```

## install

With [npm](https://npmjs.org) do:

```
npm install leveler
```

Use [browserify](http://browserify.org) to `require('leveler')`.

## release history
* 0.1.0 - initial release

## license
Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
