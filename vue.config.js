const { defineConfig } = require('@vue/cli-service');
const isProduction = process.env.NODE_ENV === 'production'
let externals = {}
let CDN = { css: [], js: [] }
if (isProduction) {
    externals = {
        // 基本格式：
        // '包名' : '在项目中引入的名字'
        'echarts': 'echarts',
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios',
        'dayjs': 'dayjs',
        'vue-quill-editor': 'VueQuillEditor',
        'vuex-persistedstate': 'createPersistedState'
    }
    CDN = {
        css: [
            'https://unpkg.com/quill@1.3.7/dist/quill.core.css',
            'https://unpkg.com/quill@1.3.7/dist/quill.snow.css',
            'https://unpkg.com/quill@1.3.7/dist/quill.bubble.css'
        ],
        js: [
            'https://unpkg.com/echarts@5.3.2/dist/echarts.min.js',
            'https://unpkg.com/vue@2.6.14/dist/vue.js',
            'https://unpkg.com/vue-router@3.5.1/dist/vue-router.js',
            'https://unpkg.com/vuex@3.6.2/dist/vuex.js',
            'https://unpkg.com/axios@0.27.2/dist/axios.min.js',
            'https://unpkg.com/dayjs@1.11.3/dayjs.min.js',
            'https://unpkg.com/quill@1.3.7/dist/quill.js',
            'https://unpkg.com/vue-quill-editor@3.0.6/dist/vue-quill-editor.js',
            'https://unpkg.com/vuex-persistedstate@3.2.1/dist/vuex-persistedstate.umd.js'

        ]
    }
}

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: isProduction ? './' : '/',
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        externals: externals,
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    // 抽离第三方库
                    vendor: {
                        name: 'chunk-vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // 只打包初始时依赖的第三方
                    },
                    // 抽离公共组件
                    common: {
                        name: 'chunk-common',
                        minChunks: 2, // 引用次数
                        priority: 5,
                        chunks: 'initial',
                        reuseExistingChunk: true // 复用已存在的chunk
                    }
                }
            }
        }
    },
    chainWebpack(config) {
        config.plugin('html').tap(args => {
            args[0].cdn = CDN
            return args
        })
    }
});
