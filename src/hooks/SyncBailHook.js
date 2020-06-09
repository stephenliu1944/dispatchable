import Hook from './Hook';

/**
 * 所有hooks都接收arguments
 * 一旦有hook有返回值则终止后续hook执行
 * result的值为最早有返回值的hook的结果
 */
export default class SyncBailHook extends Hook {
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
        // 返回最早一个提供返回值的hook的结果
        return result;
    }

    callAsync() {        
        throw new Error('callAsync is not supported on a SyncBailHook');
    }

    bindAsync() {
        throw new Error('bindAsync is not supported on a SyncBailHook');
    }

    unbindAsync() {
        throw new Error('unbindAsync is not supported on a SyncBailHook');
    }
}