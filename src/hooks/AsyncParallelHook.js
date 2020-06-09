import Hook from './Hook';

/**
 * 并行执行所有hooks
 * 所有hooks都接收arguments
 * result返回所有hooks的结果
 */
export default class AsyncParallelHook extends Hook {
    constructor(options) {
        super(options);
    }

    callAsync() {
        let result = [];
        let hooks = this.hooks;

        for (let i = 0; i < hooks.length; i++) {
            let promise = this._invokeAsync(hooks[i], ...arguments);
            
            result.push(promise);
        }
        
        // 返回所有hooks的返回值
        return Promise.allSettled ? Promise.allSettled(result) : Promise.all(result);
    }

    call() {
        throw new Error('call is not supported on a AsyncParallelHook');
    }
}