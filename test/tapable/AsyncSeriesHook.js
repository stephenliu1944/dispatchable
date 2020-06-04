var { AsyncSeriesHook, AsyncSeriesBailHook, AsyncSeriesWaterfallHook } = require('tapable');
// 不关注返回值
console.log('AsyncSeriesHook-------------');

var queue = new AsyncSeriesHook(['name']);
    
queue.tap({
    name: '3',
    type: 'promise'
}, (name, name2) => {
    return new Promise((resolve, reject) => {
        console.log('queue1-1: ', name, name2);
        setTimeout(() => {
            console.log('queue1-2: ', name, name2);
            resolve();
        }, 2000);
    });
});

queue.tapPromise('1', (name, name2) => {
    console.log('queue1: ', name, name2);
    return new Promise((resolve, reject) => {
        console.log('queue1-1: ', name, name2);
        setTimeout(() => {
            console.log('queue1-2: ', name, name2);
            resolve();
        }, 2000);
    });
});

var f = (name, name2) => {
    console.log('queue3-2: ', name, name2);
};

queue.tap('3', f);
queue.tap('3', f);

queue.tapPromise('2', (name, name2) => {
    console.log('queue2: ', name, name2);
    return new Promise((resolve, reject) => {
        console.log('queue2-1: ', name, name2);
        setTimeout(() => {
            console.log('queue2-2: ', name, name2);
            resolve();
        }, 2000);
    });
});

queue.promise('webpack1', 'webpack2');