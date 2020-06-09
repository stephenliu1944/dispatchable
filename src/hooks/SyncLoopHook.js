import Hook from './Hook';

/**
 * 所有hooks都接收arguments
 * 一旦hook有返回值则重新遍历
 * result没有返回值
 */
export default class SyncLoopHook extends Hook {
    constructor(options) {
        super(options);
    }

    call() {
        let result;
        let hooks = this.hooks;

        for (let i = 0; i < hooks.length; i++) {
            result = this._invoke(hooks[i], ...arguments);

            if (result !== undefined) {
                break;
            }
        }

        if (result !== undefined) {
            this.call(...arguments);
        }
        // 没有返回值
    }

    callAsync() {        
        throw new Error('callAsync is not supported on a SyncLoopHook');
    }

    bindAsync() {
        throw new Error('bindAsync is not supported on a SyncLoopHook');
    }

    unbindAsync() {
        throw new Error('unbindAsync is not supported on a SyncLoopHook');
    }
}