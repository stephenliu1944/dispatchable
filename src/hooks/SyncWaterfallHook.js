import SyncHook from './SyncHook';

export default class SyncWaterfallHook extends SyncHook {
    constructor(options) {
        super(options);
    }

    call() {
        let result;
        let hooks = this.hooks;

        for (let i = 0; i < hooks.length; i++) {
            let { context, fn } = hooks[i];

            if (context) {
                result = result !== undefined ? fn(this.context, result) : fn(this.context, ...arguments);
            } else {
                result = result !== undefined ? fn(result) : fn(...arguments);
            }
        }

        return result;
    }
}