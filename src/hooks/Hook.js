import { SYNC, ASYNC } from 'Constants/common';
import { clearObject } from 'Utils/common';

export default class Hook {
    options;
    context;
    hooks;
    interceptors;
    // nameIndex;   用于提升性能, 根据name快速找到hook

    constructor(options = {}) {
        this.options = options;
        this.context = options.context || {};
        this.hooks = [];
        this.interceptors = {};
        // this.nameIndex = [];
    }

    isUsed() {
        return this.hooks.length > 0;
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

        this.hooks.push(options);
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
        } else if (typeof handler !== 'function') {
            throw new Error('Missing handler for unbind');
        }

        // 测试内存回收情况, 是否需要调用clearObject(opts)处理移除的hook
        this.hooks = this.hooks.filter(opts => opts.type !== type || opts.name !== name || opts.fn !== handler);
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
        // 清除指定 name 的所有 hooks
        if (name) {
            // 测试内存回收情况, 是否需要调用clearObject(opts)处理移除的hook
            this.hooks = this.hooks.filter(opts => opts.name !== name);
        // 清除所有hooks
        } else {
            clearObject(this.hooks);
            clearObject(this.context);
        }
    }

    _invoke(hook) {
        let { context, fn } = hook;
        let args = Array.from(arguments).shift();
        let result = context ? fn(this.context, ...args) : fn(...args);
        return result;
    }

    _invokeAsync(hook) {
        let result = this._invoke(...arguments);

        if (hook.type === SYNC) {
            result = Promise.resolve(result);
        }
        
        return result;
    }

    call() {
        throw new Error('Abstract: "call" should be overridden');
    }
    
    callAsync() {
        throw new Error('Abstract: "callAsync" should be overridden');
    }
}