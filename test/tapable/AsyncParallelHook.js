import { AsyncParallelHook, AsyncParallelBailHook } from 'tapable';
// 不关注返回值
it('AsyncParallelHook', function() {
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
});
// 有返回值则中断
it('AsyncParallelBailHook', function() {
    console.log('AsyncParallelBailHook-------------');

    let queue = new AsyncParallelBailHook(['name']); 
 
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