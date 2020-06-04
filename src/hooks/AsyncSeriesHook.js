import { ASYNC } from 'Constants/common';
import Hook from './Hook';

export default class AsyncSeriesHook extends Hook {
    constructor(options) {
        super(options);
    }

    call() {
        let hooks = this.hooks[ASYNC];

        for (let name in hooks) {
            let hook = hooks[name];
            hook._context ? hook(this.context, ...arguments) : hook(...arguments);
        }
    }

    callAsync() {
        throw new Error('callAsync is not supported on a SyncHook');
    }

    bindAsync() {
        throw new Error('bindAsync is not supported on a SyncHook');
    }

    unbindAsync() {
        throw new Error('unbindAsync is not supported on a SyncHook');
    }
}