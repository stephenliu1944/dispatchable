import Hook from './Hook';

/**
 * 所有hooks都接收arguments
 * result返回所有hooks的结果
 */
export default class SyncHook extends Hook {
    constructor(options) {
        super(options);
    }

    call() {
        let result = [];
        let hooks = this.hooks;

        for (let i = 0; i < hooks.length; i++) {
            let data = this._invoke(hooks[i], ...arguments);

            result.push(data);
        }
        // 返回所有hooks的返回值
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