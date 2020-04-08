var path = require('path')
var webpack = require('webpack')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}

var webpackConfig = {
    entry: {
        app:'./main.js',
     },
    resolve: {
        extensions: ['.js', '.json'],
      },
  module: {
    rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src'), resolve('test')]
        },
      ]
  },
  devtool: false,
  output: {
    path: resolve('./'),
    publicPath: '',
    filename: 'index.js',
    chunkFilename: "index.js",
    library: 'getech-monitor',
    libraryTarget: 'umd',
    umdNamedDefine:true //会对UMD的构建过程中的AMD模块进行命名，否则就使用匿名的define
  },
}

/**npm run build --report   查看build文件图**/
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// webpackConfig.plugins.push(new BundleAnalyzerPlugin())


var spinner = ora('building for production...')
spinner.start()

rm(path.join('index.js'), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

module.exports = webpackConfig