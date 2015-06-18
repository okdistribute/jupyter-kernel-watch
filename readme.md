# jupyter-kernel-watch

Watches jupyter kernel directories for you.

[![NPM](https://nodei.co/npm/jupyter-kernel-watch.png)](https://nodei.co/npm/jupyter-kernel-watch/)

| [![Travis](http://img.shields.io/travis/karissa/jupyter-kernel-watch.svg?style=flat)](https://travis-ci.org/karissa/jupyter-kernel-watch)



```js
var KernelWatch = require('jupyter-kernel-watch')
var watcher = KernelWatch(['/path/to/kernels', '/another/path/to/.jupyter/kernels'])

watcher.on('data', function (kernelSpecs) {
  // kernelSpecs is a list of the contents of the kernel.json as a JSON object
  // e.g. [
  // {
  //   "filepath": "/path/to/kernels/python/kernel.json",
  //   "data": { "display_name": "Python 2", "language": "python", "argv": [ etc...]}
  //  }
  // ]
  //
})

watcher.close()
```

## API

### KernelWatch(dirs)

Returns a watcher

`dirs`: the directories to watch


### watcher.close()

Closes the watcher -- stops watching the filesystem.

## Events

There should be more, but right now it just emits one event -- that's when the kernel spec (`kernel.json`) has changed.

### kernelspecs

```js
watcher.on('data', function (kernelSpecs) {
  // list of kernelspecs
})
```

