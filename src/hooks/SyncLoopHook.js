import SyncHook from './SyncHook';

export default class SyncLoopHook extends SyncHook {
    constructor(options) {
        super(options);
    }

    call() {
        let result;
        let hooks = this.hooks;

        for (let i = 0; i < hooks.length; i++) {
            let { context, fn } = hooks[i];
            result = context ? fn(this.context, ...arguments) : fn(...arguments);

            if (result !== undefined) {
                break;
            }
        }

        if (result !== undefined) {
            this.call(...arguments);
        }
    }
}