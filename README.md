# dispatchable
The dispatchable takes inspiration from tapable. It can be used for Browser.

```js
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesLoopHook,
    AsyncSeriesWaterfallHook
} = require('dispatchable');
```

## Installation
```
npm install --save dispatchable
```

## Usage
```js
import { SyncHook } from 'dispatchable';

let hooks = {
    run: new SyncHook()
};

hooks.run.bind('myhook', () => {
    console.log(...arguments);
});

hooks.run.bind({
    name: 'myhook',
    context: 'context'
}, () => {
    console.log(...arguments);
});

hooks.run.bind('myhook', () => {
    console.log(...arguments);
}, 'context');

hooks.run.call(1,2,3);
```

## Hook types
TODO

## Interception
TODO

## Context
TODO

## Hook interface
TODO

## API
```js
bind(options: string|{name: string, context: boolean}, handler: function)
bindAsync
call
callAsync
unbind
unbindAsync
```

## License
MIT

## Task
- interceptor
- error