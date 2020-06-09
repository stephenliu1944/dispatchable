import Hook from './Hook';

/**
 * 所有hooks都接收arguments
 * 一旦有hook有返回值则终止后续hook执行
 * result返回有返回值的hook的结果
 */
export default class AsyncSeriesBailHook extends Hook {
    constructor(options) {
        super(options);
    }

    callAsync() {
        if (!this.isUsed()) {
            return;
        }

        let hooks = this.hooks;
        let promise = this._invokeAsync(hooks[0], ...arguments);

        if (hooks.length > 1) {
            for (let i = 1; i < hooks.length; i++) {    
                promise = promise.then(data => {
                    return data !== undefined ? data : this._invokeAsync(hooks[i], ...arguments);
                });
            }
        }
        
        // 返回最早一个提供返回值的hook的结果
        return promise;
    }

    call() {
        throw new Error('call is not supported on a AsyncSeriesBailHook');
    }
}