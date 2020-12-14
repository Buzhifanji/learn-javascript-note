// grunt 的入口文件
// 用于定义一些需要grunt 自动执行的任务
// 需要导出一个函数
// 此函数接收一个 grunt 的形参，内部提供一些创建任务时可以用的api

module.exports = grunt => {
    /** 配置方法 */
    grunt.initConfig({
        build: {
            options: {  // 配置选项
                foo: 'bar'
            },
            css: {
                options: {
                    foo: 'baz'
                }
            }, 
            js: '2'
        },
        foo: {
            bar: 123
        }
    })

    /** 
     * 多目标模式，可以让任务根据配置形成多个子任务 
     *  yarn grunt build:css 运行指定目标
     * 
     */
    grunt.registerMultiTask('build', function () {
        // console.log('build task')
        console.log(this.options())
        console.log(`target: ${this.target}, data: ${this.data}`)
    })

    /** 基本使用 */
    grunt.registerTask('foo', () => {
        console.log(grunt.config('foo.bar'))
        // console.log('hello grunt~')
    })

    grunt.registerTask('bar', '任务描述', () => {
        console.log('other task~')
    })

    grunt.registerTask('default', ['foo', 'bad', 'bar',])

    // 异步
    grunt.registerTask('async-task', function () {
        const done = this.async()
        setTimeout(() => {
            console.log('async task working~')
            done();
        }, 1000);
    })

    // 标记任务失败
    // 失败后，剩余任务不会被执行
    // 执行 加 --force
    grunt.registerTask('bad', () => {
        console.log('bad working~')
        return false;
    })
    grunt.registerTask('bad-async', function() {
        const done = this.async();
        setTimeout(() => {
            console.log('bad-async working!')
            done(false)
        }, 1000);
    })

}