import Hook from './Hook';

/**
 * 所有hooks都接收arguments
 * result返回所有hooks的结果
 */
export default class AsyncSeriesHook extends Hook {
    constructor(options) {
        super(options);
    }

    callAsync() {
        if (!this.isUsed()) {
            return;
        }

        let result = [];
        let hooks = this.hooks;
        let promise = this._invokeAsync(hooks[0], ...arguments);

        if (hooks.length > 1) {
            for (let i = 1; i < hooks.length; i++) {    
                promise = promise.then((data) => {
                    result.push(data);
                    
                    return this._invokeAsync(hooks[i], ...arguments);
                });
            }
        }
        
        // 返回所有hooks的返回值
        return promise.then((data) => {
            result.push(data);
            return result;
        });
    }

    call() {
        throw new Error('call is not supported on a AsyncSeriesHook');
    }
}