var { AsyncParallelHook, AsyncParallelBailHook } = require('tapable');

// 不关注返回值
function AsyncParallelHookTest() {
    console.log('AsyncParallelHook-------------');

    var queue = new AsyncParallelHook(['name']);
    
    queue.tapPromise('1', (name, name2) => {
        console.log('queue1: ', name, name2);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('queue1-1: ', name, name2);
                resolve(111);
            }, 1000);
        });
    });
    
    queue.tapPromise('2', (name, name2) => {
        console.log('queue2: ', name, name2);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('queue1-2: ', name, name2);
                resolve(222);
            }, 2000);
        });
    });

    queue.tap('3', (name, name2) => {
        console.log('queue3: ', name, name2);
        return 3;
    });

    queue.promise('webpack1', 'webpack2').then((a, b, c) => {
        console.log('result:');
        
        console.log(a, b, c);
    }, (a, b, c) => {
        console.log(a, b, c);
        
    });
}

// 有返回值则中断
/*
    最早提供返回值的tapPromise会传递给回调并触发回调.
    如果都没有返回值, 则都执行完后触发回调.
*/
function AsyncParallelBailHookTest() {
    console.log('AsyncParallelBailHook-------------');

    let queue = new AsyncParallelBailHook(['name']); 
 
    queue.tapPromise('1', (name, name2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('queue1-2: ', name, name2);
                resolve();
            }, 1000);
        });
    });
    
    queue.tapPromise('2', (name, name2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('queue2-2: ', name, name2);
                resolve(222);
            }, 2000);
        });
    });

    queue.tapPromise('3', (name, name2) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('queue3-2: ', name, name2);
                resolve(333);
            }, 3000);
        });
    });
    
    queue.promise('webpack1').then((result) => {
        console.log('result', result);
    });
}

// AsyncParallelHookTest();
AsyncParallelBailHookTest();