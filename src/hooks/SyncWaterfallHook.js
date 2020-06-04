import { SYNC } from 'Constants/common';
import SyncHook from './SyncHook';

export default class SyncWaterfallHook extends SyncHook {
    constructor(options) {
        super(options);
    }

    call() {
        let hooks = this.hooks[SYNC];
        let params = arguments;
        let index = 0;

        for (let name in hooks) {
            let result;
            let hook = hooks[name];

            if (hook._context) {
                result = index === 0 ? hook(this.context, ...params) : hook(this.context, params);
            } else {
                result = index === 0 ? hook(...params) : result = hook(params);
            }

            if (result !== undefined) {
                params = result;
            }
            
            index++;
        }
    }
}