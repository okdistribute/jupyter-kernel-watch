var fs = require('fs')
var Gaze = require('gaze').Gaze
var inherits = require('inherits')
var events = require('events')
var path = require('path')

function isKernelJSON (filepath) {
  var name = path.basename(filepath)
  return name === 'kernel.json'
}

/**
 * @class KernelWatch
 * @classdesc Watches a Jupyter kernel runtime directory for changes, calling cb on change
 */
module.exports = KernelWatch
inherits(KernelWatch, events.EventEmitter)

function KernelWatch (dir) {
  var self = this
  if (!(self instanceof KernelWatch)) return new KernelWatch(dir)

  events.EventEmitter.call(self)

  var pattern = path.join(dir, "*.json")

  self.gaze = new Gaze(pattern)

  self.gaze.on('all', function (event, filepath) {
    if (isKernelJSON(filepath)) {
      fs.readFile(filepath, function (err, contents) {
        if (err) self.emit('error', err)
        try {
          contents = JSON.parse(contents.toString())
          self.emit('kernelspec', contents)
        } catch (err) {
          self.emit('error', err)
        }
      })
    }
  })
}

KernelWatch.prototype.close = function () {
  this.gaze.close()
}