import Hook from './Hook';

/**
 * 所有hooks都接收arguments
 * 一旦有hook有返回值则返回该hook的返回值
 */
export default class AsyncParallelBailHook extends Hook {
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

        // 返回最早一个提供返回值的hook的结果
        return Promise.any ? Promise.any(result) : Promise.race(result);
    }

    call() {
        throw new Error('call is not supported on a AsyncParallelBailHook');
    }
}