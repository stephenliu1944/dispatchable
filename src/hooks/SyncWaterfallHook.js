import Hook from './Hook';

/**
 * 所有hooks接收上一个hook的返回值, 如果上一个hook没有返回值则返回最初arguments
 * result返回最后一个hook的返回值
 */
export default class SyncWaterfallHook extends Hook {
    constructor(options) {
        super(options);
    }

    call() {
        let result;
        let hooks = this.hooks;

        for (let i = 0; i < hooks.length; i++) {
            result = result !== undefined ? this._invoke(hooks[i], result) : this._invoke(hooks[i], ...arguments);
        }
        // 返回最后一个hook的返回值
        return result;
    }
    
    callAsync() {        
        throw new Error('callAsync is not supported on a SyncWaterfallHook');
    }

    bindAsync() {
        throw new Error('bindAsync is not supported on a SyncWaterfallHook');
    }

    unbindAsync() {
        throw new Error('unbindAsync is not supported on a SyncWaterfallHook');
    }
}