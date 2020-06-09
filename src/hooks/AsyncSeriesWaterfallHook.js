import Hook from './Hook';

/**
 * 所有hooks接收上一个hook的返回值, 如果上一个hook没有返回值则返回最初arguments
 * result返回最后一个hook的返回值
 */
export default class AsyncSeriesWaterfallHook extends Hook {
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
                    return data !== undefined ? this._invokeAsync(hooks[i], data) : this._invokeAsync(hooks[i], ...arguments);
                });
            }
        }
        // 返回最后一个hook的返回值
        return promise;
    }

    call() {
        throw new Error('call is not supported on a AsyncSeriesWaterfallHook');
    }
}