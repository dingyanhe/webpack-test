const baseConfig = require('./overrides-config.base')
const rootPath = require('./overrides-config.base')


module.exports = function(config) {
    // Use your ESLint
    /*let eslintLoader = config.module.rules[0];
    eslintLoader.use[0].options.useEslintrc = true;*/

    // Use Poststylus Plugin to handle stylus
    config.plugins.push(baseConfig.stylusLoaderOptionsPlugin);
    let alias = config.resolve.alias;
    alias['@'] = baseConfig.rootPath;

    console.log(config.module.rules)

    // Add the stylus loader second-to-last
    // (last one must remain as the "file-loader")
    let loaderList = config.module.rules.reduce((item, current) =>{
        return current.hasOwnProperty('oneOf') ? current.oneOf : item
    }, []);
    loaderList.splice(loaderList.length - 1, 0, {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"]
    });
};
