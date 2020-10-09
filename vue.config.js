module.exports = {
	publicPath:"./",
	devServer: {
        proxy: {
            '/api': {
                target: 'http://182.92.223.226/', //对应自己的接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
