import { SYNC, ASYNC } from 'Constants/common';
import Hook from './Hook';

export default class AsyncSeriesHook extends Hook {
    constructor(options) {
        super(options);
    }

    call() {
        throw new Error('call is not supported on a AsyncSeriesHook');
    }

    callAsync() {
        // let result = [];
        // let hooks = this.hooks;

        // for (let i = 0; i < hooks.length; i++) {
        //     let promise;
        //     let { type, context, fn } = hooks[i];

        //     if (type === SYNC) {
        //         let data = context ? fn(this.context, ...arguments) : fn(...arguments);
        //         promise = Promise.resolve(data);
        //     } else if (type === ASYNC) {
        //         promise = context ? fn(this.context, ...arguments) : fn(...arguments);
        //     }

        //     result.push(promise);
        // }

        // // return Promise.all(result);
        // return Promise.allSettled(result);
    }
}