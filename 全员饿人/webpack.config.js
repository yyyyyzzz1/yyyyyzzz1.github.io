const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production', // 生产模式
    entry: "./全员饿人/js/index.js", // 入口路径
    output: { // 出口路径
        path: path.resolve(__dirname, 'dist'),
        // [hash]让每一次生成的文件都带上HASH值
        filename: 'bundle.min.[hash].js'
    },
    target: "web",
    devServer: {
        port: 3000, // 端口号
        progress: true, // 显示打包编译的进度
        contentBase: './dist', // 指定当前服务处理资源的目录
        open: true // 编译完成会自动打开浏览器
    },
    // 使用插件
    plugins: [
        new HtmlWebpackPlugin({
            // 指定要编译的文件，不指定的话会按照默认的模板创建一个html
            template: './全员饿人/index.html',
            // 编译完成输出的文件名
            filename: 'index.html',
            // 给引入的文件通过问号传参设置HASH戳（清除缓存的），但是真实项目我们一般都是每一次编译生成不同的JS文件引入，详见上面的出口路径设置
            // hash: true,
            // 控制压缩
            minify: {
                collapseWhitespace: true, // 干掉空格
                removeComments: true, // 干掉注释
                removeAttributeQuotes: true, // 干掉双引号
                removeEmptyAttributes: true // 干掉空属性
            }
        })
    ],
    // 使用loader加载器来处理规则
    module: {
        rules: [{
            // 基于正则匹配处理哪些文件
            test: /\.(css)$/i, 
            // 控制使用哪个加载器loader（有顺序的：数组从右到左执行）
            use: [
                "style-loader", // 把编译好的css插入到页面的HEAD中（内嵌式样式）
                "css-loader" // 编译@import/url()这种语法的
            ]
        }]
    }
};
