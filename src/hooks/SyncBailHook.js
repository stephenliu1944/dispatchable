import { SYNC } from 'Constants/common';
import SyncHook from './SyncHook';

export default class SyncBailHook extends SyncHook {
    constructor(options) {
        super(options);
    }

    call() {
        let hooks = this.hooks[SYNC];

        for (let name in hooks) {
            let hook = hooks[name];
            let result = hook._context ? hook(this.context, ...arguments) : hook(...arguments);

            if (result !== undefined) {
                break;
            }
        }
    }
}