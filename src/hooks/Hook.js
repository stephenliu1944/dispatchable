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
        if (typeof handler !== 'function') {
            throw new Error('Missing handler for bind');
        }
        
        let name;        

        if (typeof options === 'object') {
            name = options.name;

            if (options.context) {
                handler._context = true;
            }
        } else {
            name = options;
        }

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
    unbind(name, handler) {
        this._unbind(SYNC, name, handler);
    }
    // async
    unbindAsync(name, handler) {
        this._unbind(ASYNC, name, handler);
    }
    
    clear(name) {
        if (name) {
            // TODO: 
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