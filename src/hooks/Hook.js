import { SYNC, ASYNC } from 'Constants/common';
import { clearObject } from 'Utils/common';

export default class Hook {
    options;
    context;
    hooks;
    interceptors;
    length;

    constructor(options = {}) {
        this.options = options;
        this.context = options.context || {};
        this.hooks = {};
        this.interceptors = {};
        this.length = 0;
    }

    isUsed() {
        return this.length > 0;
    }

    _bind(type, options, handler) {
        if (typeof options === 'string') {
            options = {
                type,
                fn: handler,
                name: options
            };
        } else if (typeof options === 'object') {
            options.type = type;
            options.fn = handler;
        } else if (typeof options !== 'object' || options === null) {
            throw new Error('Invalid bind options');
        }

        if (typeof options.name !== 'string' || options.name === '') {
            throw new Error('Missing name for bind');
        }
        
        if (typeof options.fn !== 'function') {
            throw new Error('Missing handler for bind');
        }

        let name = options.name;        

        if (this.hooks[name]) {
            this.hooks[name].push(options);
        } else {
            this.hooks[name] = [options];
        }

        this.length++;
    }
    // sync
    bind(options, handler) {
        this._bind(SYNC, options, handler);
    }
    // async
    bindAsync(options, handler) {
        this._bind(ASYNC, options, handler);
    }

    _unbind(type, name, handler) {
        if (typeof name !== 'string' || name === '') {
            throw new Error('Missing name for unbind');
        }  

        if (typeof handler !== 'function') {
            throw new Error('Missing handler for unbind');
        }

        if (!(name in this.hooks)) {
            return;
        }

        if (this.hooks[name]) {
            let length = this.hooks[name].length;
            // 测试内存回收情况
            this.hooks[name] = this.hooks[name].filter(opts => opts.type !== type || opts.fn !== handler);
            this.length = this.length - (length - this.hooks[name].length);
        }
    }
    // sync
    unbind(name, handler) {
        this._unbind(SYNC, name, handler);
    }
    // async
    unbindAsync(name, handler) {
        this._unbind(ASYNC, name, handler);
    }
    
    clear(name) {
        // 清除指定 name 下的所有hooks
        if (name) {
            if (this.hooks[name] && this.hooks[name].length > 0) {
                this.length = this.length - this.hooks[name].length;
                clearObject(this.hooks[name]);
                delete this.hooks[name];
            }
        // 清除所有hooks
        } else {
            clearObject(this.hooks);
            clearObject(this.context);
            this.length = 0;
        }
    }

    call() {
        throw new Error('Abstract: "call" should be overridden');
    }
    
    callAsync() {
        throw new Error('Abstract: "callAsync" should be overridden');
    }
}