var { AsyncSeriesHook, AsyncSeriesBailHook, AsyncSeriesWaterfallHook, AsyncSeriesLoopHook } = require('tapable');

// 不关注返回值
function AsyncSeriesHookTest() {
    console.log('AsyncSeriesHook-------------');
    var queue = new AsyncSeriesHook(['name']);
        
    queue.tap('1', (name, name2) => {
        console.log('queue1: ', name, name2);
        return 111;
    });
    
    queue.tapPromise('2', (name, name2) => {
        console.log('queue2: ', name, name2);
        return new Promise((resolve, reject) => {
            console.log('queue2-1: ', name, name2);
            setTimeout(() => {
                console.log('queue2-2: ', name, name2);
                resolve(222);
            }, 4000);
        });
    });
    
    queue.tapPromise('3', (name, name2) => {
        console.log('queue2: ', name, name2);
        return new Promise((resolve, reject) => {
            console.log('queue3-1: ', name, name2);
            setTimeout(() => {
                console.log('queue3-2: ', name, name2);
                resolve(333);
            }, 2000);
        });
    });
    
    queue.promise('webpack1', 'webpack2').then((data) => {
        console.log('result: ', data);
    });
}

AsyncSeriesHookTest();