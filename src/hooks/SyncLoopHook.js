import { SYNC } from 'Constants/common';
import SyncHook from './SyncHook';

export default class SyncLoopHook extends SyncHook {
    constructor(options) {
        super(options);
    }

    call() {
        let hooks = this.hooks[SYNC];
        let result;

        for (let name in hooks) {
            let hook = hooks[name];
            result = hook._context ? hook(this.context, ...arguments) : hook(...arguments);

            if (result !== undefined) {
                break;
            }
        }

        if (result !== undefined) {
            this.call(...arguments);
        }
    }
}