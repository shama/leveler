var inherits = require('inherits')
var Stream = require('stream')

function Leveler(fn) {
  Stream.call(this)
  this.readable = this.writable = true
  this.points = 0
  this.reached = Object.create(null)
  this.level = 0
  this.fn = fn || function(x) {
    return Math.floor(Math.floor(25 + Math.sqrt(625 + 100 * x)) / 50)
  }
  this.on('levelup', this.levelup.bind(this))
}
inherits(Leveler, Stream)

module.exports = function(opts) {
  return new Leveler(opts)
};
module.exports.Leveler = Leveler

Leveler.prototype.write = function(points) {
  this.points += parseFloat(points)
  var level = this.fn(this.points)
  if (level !== false) this.levelup(level)
}

Leveler.prototype.end = function(points) {
  this.write(points || 0)
}

Leveler.prototype.levelup = function(level) {
  if (this.reached[level]) return false
  this.reached[level] = this.points
  this.level = level
  this.emit('data', level)
}
