var fs = require('fs')
var Gaze = require('gaze').Gaze
var inherits = require('inherits')
var events = require('events')
var debug = require('debug')('jupyter-kernel-watch')
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

function KernelWatch (dirs) {
  var self = this
  if (!(self instanceof KernelWatch)) return new KernelWatch(dirs)
  events.EventEmitter.call(self)

  self.kernelspecs = []

  self.gaze = new Gaze(pattern)

  for (var i in dirs) {
    var pattern = path.join(dirs[i], "**/*.json")
    self.gaze.add(pattern)
    debug('added', pattern)
  }

  self.gaze.on('deleted', function (filepath) {
    if (isKernelJSON(filepath)) {
      for (var i in self.kernelspecs) {
        if (self.kernelspecs.filepath === filepath) {
          delete self.kernelspecs[i]
        }
      }
    }
  })

  self.gaze.on('changed', function (event, filepath) {
    self.updateKernel(filepath)
  })

  self.gaze.on('all', function (event, filepath) {
    self.updateKernel(filepath)
  })

}

KernelWatch.prototype.updateKernel = function (filepath) {
  var self = this

  if (isKernelJSON(filepath)) {
    fs.readFile(filepath, function (err, contents) {
      if (err) self.emit('error', err)
      try {
        contents = JSON.parse(contents.toString())
        self.kernelspecs.push({filepath: filepath, data: contents})
        self.emit('kernelspecs', self.kernelspecs)
      } catch (err) {
        self.emit('error', err)
      }
    })
  }
}

KernelWatch.prototype.close = function () {
  this.gaze.close()
}