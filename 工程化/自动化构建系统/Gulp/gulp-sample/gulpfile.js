const { series, parallel } = require('gulp')

/** 基本使用 */
exports.foo = done => {
    console.log('foo task working~')

    done()  // 标识任务完成
}

exports.default = done => {
    console.log('default task working~')
    done()
}

/** 组合任务 */
const task1 = done => {
    setTimeout(() => {
        console.log('task1 working!')
        done()
    }, 1000);
}
const task2 = done => {
    setTimeout(() => {
        console.log('task2 working!')
        done()
    }, 1000);
}
const task3 = done => {
    setTimeout(() => {
        console.log('task3 working!')
        done()
    }, 1000);
}

// 串行
exports.bar = series(task1, task2, task3)
// 并行
exports.bar1 = parallel(task1, task2, task3)