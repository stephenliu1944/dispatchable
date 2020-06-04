var { AsyncParallelHook, AsyncParallelBailHook } = require('tapable');

// 不关注返回值
function AsyncParallelHookTest() {
    console.log('AsyncParallelHook-------------');

    var queue = new AsyncParallelHook(['name']);
    
    queue.tap('1', (name, name2) => {
        console.log('queue1: ', name, name2);
        return 1;
    });
    
    queue.tap('2', (name, name2) => {
        console.log('queue2: ', name, name2);
    });

    queue.tap('3', (name, name2) => {
        console.log('queue3: ', name, name2);
    });

    queue.call('webpack1', 'webpack2');
}
// 有返回值则中断
function AsyncParallelBailHookTest() {
    console.log('AsyncParallelBailHook-------------');

    let queue = new AsyncParallelBailHook(['name']); 
 
    queue.tapPromise('1', (name, name2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('queue1-2: ', name, name2);
                resolve();
            }, 2000);
        });
    });
    
    queue.tapPromise('2', (name, name2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('queue2-2: ', name, name2);
                resolve(1111);
            }, 3000);
        });
    });

    queue.tapPromise('3', (name, name2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('queue3-2: ', name, name2);
                resolve();
            }, 5000);
        });
    });
    
    queue.promise('webpack1').then((result) => {
        console.log('finish', result);
    });
}

AsyncParallelBailHookTest();