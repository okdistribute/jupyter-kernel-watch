var test = require('tape')
var fs = require('fs')
var kernelWatch = require('./')

test('kernel.json changes trigger', function (t) {
  t.plan(2)
  var kernel = {
   "display_name": "Python 2",
   "language": "python",
   "argv": [
    "/usr/local/opt/python/bin/python2.7",
    "-m",
    "ipykernel",
    "-f",
    "{connection_file}"
   ]
  }


  var watcher = kernelWatch('./test')

  watcher.on('kernelspec', function (kernelSpec) {
    t.same(kernelSpec, kernel)
    watcher.close()
  })

  fs.writeFile('test/kernel.json', JSON.stringify(kernel), function (err){
    t.error(err)
  })

})
