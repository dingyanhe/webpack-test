const webpack = require('webpack');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');
const path = require('path');

function resolve(dir) {
    console.log(path.join(__dirname, '..', dir))
    return path.join(__dirname, '..', dir)
}

module.exports.rootPath = resolve('src');

module.exports.stylusLoaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
    option: {
        stylus : {
            use: [
                poststylus([
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                    })
                ])
            ]
        }
    }
});