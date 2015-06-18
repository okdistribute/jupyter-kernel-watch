var test = require('tape')
var fs = require('fs')
var kernelWatch = require('../')
var path = require('path')

var kernel = {
 "display_name": "Python 2",
 "language": "python",
 "argv": [
  "/usr/local/opt/python/bin/python2.7",
  "-m", "ipykernel",
  "-f", "{connection_file}"
 ]
}

var kernelS = {
  "display_name":"Scala",
  "language":"scala",
  "argv":[
    "/usr/local/opt/scala/bin/scala",
    "-m", "ipykernel",
    "-f", "{connection_file}"]
}

var kernelR = {
  "display_name":"Scala",
  "language":"scala",
  "argv":[
    "/usr/local/opt/scala/bin/scala",
    "-m", "ipykernel",
    "-f", "{connection_file}"]
}

test('kernel.json changes trigger with multiple folders', function (t) {
  t.plan(9)

  var watcher = kernelWatch([path.join(__dirname, 'kernels'), path.join(__dirname, 'kernels2')])
  var times = 0

  watcher.on('kernelspecs', function (kernelSpecs) {
    times += 1

    if (times === 1) {
      t.equals(kernelSpecs.length, 1)
      t.same(kernelSpecs[0].data, kernel)
    }

    if (times === 2) {
      t.equals(kernelSpecs.length, 2)
      t.same(kernelSpecs[1].data, kernelS)
    }

    if (times === 3) {
      t.equals(kernelSpecs.length, 3)
      t.same(kernelSpecs[2].data, kernelR)
    }

    if (times === 3) watcher.close()
  })
  fs.writeFile(path.join(__dirname, 'kernels/python/kernel.json'), JSON.stringify(kernel), function (err){
    t.error(err)
  })

  fs.writeFile(path.join(__dirname, 'kernels/scala/kernel.json'), JSON.stringify(kernelS), function (err){
    t.error(err)
  })

  fs.writeFile(path.join(__dirname, 'kernels2/R/kernel.json'), JSON.stringify(kernelR), function (err){
    t.error(err)
  })

})
