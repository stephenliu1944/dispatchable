import { SyncHook, SyncBailHook, SyncWaterfallHook, SyncLoopHook } from 'tapable';
// 不关注返回值
it('SyncHook', function() {
    console.log('SyncHook-------------');

    var queue = new SyncHook(['name']);
    
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
});
// 有返回值则中断
it('SyncBailHook', function() {
    console.log('SyncBailHook-------------');

    let queue = new SyncBailHook(['name']); 
 
    queue.tap('1', (name, name2) => {
        console.log('queue1: ', name, name2);
        return;
    });
    
    queue.tap('2', (name, name2) => {
        console.log('queue2: ', name, name2);
    });

    queue.tap('3', (name, name2) => {
        console.log('queue3: ', name, name2);
        return 'wrong';
    });
    
    queue.call('webpack1');
});

it('SyncWaterfallHook', function() {
    console.log('SyncWaterfallHook-------------');
    
    let queue = new SyncWaterfallHook(['name']);

    // The return value of the previous function can be passed to the next function
    queue.tap('1', (name, name2) => {
        console.log('queue1: ', name, name2);
        return 111;
    });
    
    queue.tap('2', (name, name2) => {
        console.log('queue2: ', name, name2);
    });

    queue.tap('3', (name, name2) => {
        console.log('queue3: ', name, name2);
    });
    
    queue.call('webpack');
});

it('SyncLoopHook', function() {
    console.log('SyncLoopHook-------------');

    let queue = new SyncLoopHook(['name']); 
    let count = 3;

    queue.tap('1', (name, name2) => {
        console.log('queue1: ', name, name2);
        return;
    });
    
    queue.tap('2', (name, name2) => {
        console.log('queue2: ', name, name2);
        return;
    });

    queue.tap('3', (name, name2) => {
        console.log('queue3: ', name, name2);
        return;
    });

    queue.call('webpack');
});