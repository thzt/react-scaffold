const path = require('path');
const os = require('os');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, ''),
    entry: {
        index: ['babel-polyfill', path.resolve(__dirname, 'src/index.jsx')]
    },
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js',
        publicPath: 'dist/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                use: 'happypack/loader?id=jsx'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'happypack/loader?id=scss'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('index.css'),
        new BundleAnalyzerPlugin({
            generateStatsFile: true,
            analyzerMode: 'disabled',
        }),

        new HappyPack({
            id: 'jsx',
            threadPool: happyThreadPool,
            loaders: [
                { loader: 'babel-loader', query: { presets: ['es2015', 'react', 'stage-0'] } }
            ],
        }),

        new HappyPack({
            id: 'scss',
            threadPool: happyThreadPool,
            loaders: [
                'css-loader',
                'sass-loader'
            ],
        }),
    ]
};