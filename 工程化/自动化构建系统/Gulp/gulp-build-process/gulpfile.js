const fs = require('fs')
const { Transform } = require('stream')
// gulp 构建过程核心工作原理
// 输入（读取文件）=》 加工（压缩文件）=》输出（写入文件）
// The streaming build system003333333333

exports.default = () => {
    // 文件读取流
    const read = fs.createReadStream('normalize.css')
    // 文件写入流
    const write = fs.createWriteStream('normalize.min.css')
    // 文件转换流
    const transform = new Transform({
        transform: (chunk, encoding, callback) => {
            // 核心转换过程实现
            // chunk => 读取流中的读取到的内容（Buffer）
            const input = chunk.toString()
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            // 错误优先，没有传null
            callback(null, output)
        }
    })

    // 把读取出来的文件流导入写入文件流中
    read.pipe(transform)
        .pipe(write)
    return read
}