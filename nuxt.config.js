const isDev = process.env.NODE_ENV == "development";
const IP = "10.17.2.1";
module.exports = {
    mode: 'universal',
    router: {
        middleware: 'checkEnv',
        base: '/mobile/'
    },
    env: {
        baseUrl: isDev ? `http://${IP}:5000` : 'http://www.liushiyizu.top',
        apiUrl: isDev ? `http://${IP}:4000` : 'http://www.liushiyizu.top',
    },
    server: isDev ? {
        port: 5000,
        host: `${IP}`,
    } : {
            port: 6868,
            host: 'localhost',
        },

    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        "assets/css/common.scss",
        "mint-ui/lib/style.css",
        "assets/font/iconfont.css",
        // "//at.alicdn.com/t/font_527748_dfn929cd4cj.css"
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: "~/plugins/mint-ui", ssr: true }
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
    ],
    /*
    ** Build configuration
    */
    build: {
        transpile: [/^mint-ui/],
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
