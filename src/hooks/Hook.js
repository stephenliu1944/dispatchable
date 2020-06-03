import { SYNC, ASYNC } from 'Constants/common';
import { clearObject } from 'Utils/common';

export default class Hook {
    options;
    hooks;
    interceptors;
    length;

    constructor(options) {
        this.options = options;
        this.hooks = {};
        this.interceptors = {};
        this.length = 0;
    }

    isUsed() {
        return this.length > 0;
    }

    _bind(type, name, handler) {
        if (typeof name !== 'string' || name === '') {
            throw new Error('Missing name for bind');
        }      

        if (!(type in this.hooks)) {
            this.hooks[type] = {};
        }

        if (!this.hooks[type][name]) {
            this.length++;
        }

        this.hooks[type][name] = handler;
    }
    // sync
    bind(name, callback) {
        this._bind(SYNC, name, callback);
    }
    // async
    bindAsync(name, callback) {
        this._bind(ASYNC, name, callback);
    }

    _unbind(type, name) {
        if (typeof name !== 'string' || name === '') {
            throw new Error('Missing name for unbind');
        }  

        if (!(type in this.hooks)) {
            return;
        }

        if (this.hooks[type][name]) {
            this.hooks[type][name] = null;
            this.length--;
        }

        delete this.hooks[type][name];
    }
    // sync
    unbind(name) {
        this._unbind(SYNC, name);
    }
    // async
    unbindAsync(name) {
        this._unbind(ASYNC, name);
    }
    
    clear() {
        clearObject(this.hooks);
        this.length = 0;
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