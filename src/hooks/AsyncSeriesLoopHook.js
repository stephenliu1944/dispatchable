import Hook from './Hook';

/**
 * 所有hooks都接收arguments
 * 一旦hook有返回值则重新遍历
 * result没有返回值
 */
export default class AsyncSeriesLoopHook extends Hook {
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

        promise.then((result) => {
            if (result !== undefined) {
                this.callAsync(...arguments);
            }
        });

        // 没有返回值
    }

    call() {
        throw new Error('call is not supported on a AsyncSeriesLoopHook');
    }
}