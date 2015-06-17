# jupyter-kernel-watch

Watches a jupyter kernel for you. Emits events when things are changed!

[![NPM](https://nodei.co/npm/jupyter-kernel-watch.png)](https://nodei.co/npm/jupyter-kernel-watch/)


Windows        | Mac/Linux
-------------- | ------------
[![Build status](https://ci.appveyor.com/api/projects/status/s236036xnglo4v5l)](https://ci.appveyor.com/project/karissa/jupyter-kernel-watch) | [![Travis](http://img.shields.io/travis/karissa/jupyter-kernel-watch.svg?style=flat)](https://travis-ci.org/karissa/jupyter-kernel-watch)



```js
var KernelWatch = require('jupyter-kernel-watch')
var watcher = KernelWatch('./test')
```

## API

### KernelWatch(dir)

Returns a watcher

`dir`: the directory to watch


### watcher.close

Closes the watcher -- stops watching the filesystem.

## Events

There should be more, but right now it just emits one event -- that's when the kernel spec (`kernel.json`) has changed.

### kernelspec

```js
watcher.on('kernelspec', function (kernelSpec) {
  // kernelSpec is the contents of the kernel.json as a JSON object
})
```

