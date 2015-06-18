var gazeCollect = require('gaze-collect')
var path = require('path')

function isKernelJSON (filepath) {
  var name = path.basename(filepath)
  return name === 'kernel.json'
}

module.exports = function (dirs) {
  for (var i in dirs) {
    dirs[i] = path.join(dirs[i], "**/*.json")
  }

  var opts = {
    read: true,
    valid: isKernelJSON,
  }

  return gazeCollect(dirs, opts)
}