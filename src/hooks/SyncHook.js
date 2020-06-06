import Hook from './Hook';

export default class SyncHook extends Hook {
    constructor(options) {
        super(options);
    }

    call() {
        let result;
        let hooks = this.hooks;

        for (let i = 0; i < hooks.length; i++) {
            let { context, fn } = hooks[i];
            result = context ? fn(this.context, ...arguments) : fn(...arguments);
        }
        // 返回最后一个返回值
        return result;
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