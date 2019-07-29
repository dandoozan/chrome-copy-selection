const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATH_TO_SRC = path.join(__dirname, 'src');

module.exports = {
    context: PATH_TO_SRC,
    entry: {
        'js/background/background': glob.sync(
            `${PATH_TO_SRC}/js/background/*.js`
        ),
        // 'js/popup': './js/popup.js',
        // 'js/options': './js/options.js',
        'js/contentScripts/_main': './js/contentScripts/_main.js',

        //generate entries for the page-specific content scripts
        ...glob
            .sync(`${PATH_TO_SRC}/js/contentScripts/*.js`, {
                ignore: '**/_*.js',
            })
            .reduce((obj, pathToFile) => {
                obj[
                    pathToFile.substring(
                        PATH_TO_SRC.length,
                        pathToFile.lastIndexOf('.')
                    )
                ] = pathToFile;
                return obj;
            }, {}),
    },
    output: {
        filename: '[name].bundle.js',
        library: 'PAGE_MODULE',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),

        //copy everything in "src" except the "js" dir
        new CopyWebpackPlugin(
            glob
                .sync(`${PATH_TO_SRC}/*`, { ignore: `**/js` })
                .map(pathToFile => {
                    let basename = path.parse(pathToFile).base;
                    return {
                        from: basename,
                        to: basename, //I have to specify "to" in order to get the same dir hierarchy structure when the contents are copied over to dist
                        ignore: ['.DS_Store'],
                    };
                })
        ),
    ],
    devtool: 'inline-source-map',
    resolve: {
        //set "symlinks" to false so that webpack looks for dependencies in this project (not in the symlinked
        //file location).  This allows me to use dependencies (eg. lodash) in my "utils" file (which i symlink
        //here) and it will use the "lodash" from this project
        symlinks: false,
    },
};
