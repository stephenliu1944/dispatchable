# dispatchable

## Install
```
npm i dispatchable
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

## API
```js
bind(options: string|{name: string, context: boolean}, handler: function)
bindAsync
call
callAsync
```

## License

## Task
- onError
- context