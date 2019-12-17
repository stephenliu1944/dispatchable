export default class Hook {
    constructor() {
        this.listeners = {};
    }
    // eventName, listener
    on(type, callback) {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    };

    onAsync() {

    }

    onPromise() {

    }

    // eventName, listener
    off(type, callback) {
        if (!(type in this.listeners)) {
            return;
        }
        var stack = this.listeners[type];
        for (var i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return;
            }
        }
    };

    offAsync() {

    }

    offPromise() {

    }

    clear() {

    }

    // eventName, listener
    trigger(event) {
        if (!(event.type in this.listeners)) {
            return true;
        }
        var stack = this.listeners[event.type].slice();

        for (var i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event);
        }
        return !event.defaultPrevented;
    };

    triggerAsync() {

    }

    triggerPromise() {

    }
}