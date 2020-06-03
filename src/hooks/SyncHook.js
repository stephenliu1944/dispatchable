import { SYNC } from 'Constants/common';
import Hook from './Hook';

export default class SyncHook extends Hook {
    constructor(options) {
        super(options);
    }

    dispatch() {
        let hooks = this.hooks[SYNC];

        for (let name in hooks) {
            hooks[name](...arguments);
        }
    }
    
    dispatchAsync() {
        throw new Error('dispatchAsync is not supported on a SyncHook');
    }
}