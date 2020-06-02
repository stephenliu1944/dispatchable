export default class Hook {
    isUsed;
    options;
    listeners;
    interceptors;

    constructor(options) {
        this.isUsed = false;
        this.options = options;
        this.listeners = {};
        this.interceptors = {};
    }

    _bind(type, name, handler) {
        if (typeof name !== 'string' || name === '') {
            throw new Error('Missing name for bind');
        }

        if (!this.isUsed) {
            this.isUsed = true;
        }

        if (!(type in this.listeners)) {
            this.listeners[type] = {};
        }
        // type = 'sync' || 'async', TODO: name不能重复
        this.listeners[type][name] = handler;
    }

    // sync
    bind(name, callback) {
        this._bind('sync', name, callback);
    }
    // async
    bindAsync(name, callback) {
        this._bind('async', name, callback);
    }

    _unbind(type, name) {
        if (!(type in this.listeners)) {
            return;
        }

        if (this.listeners[type][name]) {
            this.listeners[type][name] = null;
        }

        delete this.listeners[type][name];
    }

    unbind(name) {
        this._unbind('sync', name);
    }

    unbindAsync(name) {
        this._unbind('async', name);
    }
    // 清除所有绑定
    clear() {
        // TODO:
    }

    // 以下需要子类自己实现
    dispatch(event) {
        // if (!(event.type in this.listeners)) {
        //     return true;
        // }
        // var stack = this.listeners[event.type].slice();

        // for (var i = 0, l = stack.length; i < l; i++) {
        //     stack[i].call(this, event);
        // }
        // return !event.defaultPrevented;
        throw new Error('Abstract: "dispatch" should be overridden');
    }
    
    dispatchAsync() {
        throw new Error('Abstract: "dispatchAsync" should be overridden');
    }
}