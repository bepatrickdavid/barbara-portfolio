const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const sass = require('sass');
const path = require("path");
const fs = require('fs');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        index: path.resolve(__dirname, "src", "index.js"),
        page: './src/js/page-basic.js',
        error: './src/js/page-error.js',
    },
    module: {
        rules: [{
                test: /\.(sa|sc|c)ss$/,
                // Loaders are applied in reverse order
                use: [{
                        // After all CSS loaders we use plugin to do his work.
                        // It gets all transformed CSS and extracts it into separate
                        // single bundled file
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        // This loader resolves url() and @imports inside CSS
                        loader: 'css-loader',
                    },
                    {
                        // Then we apply postCSS fixes like autoprefixer and minifying
                        loader: 'postcss-loader',
                    },
                    {
                        // First we transform SASS to standard CSS
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                            sassOptions: {
                                includePaths: [],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(png|svg|jpe?g|jpeg|gif|webp)$/i,
                loader: 'file-loader',
                options: {
                    name(file) {
                        return '[hash].[ext]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            },
            {
                test: /\.json$/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.hbs"),
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "page.hbs"),
            filename: 'page.html',
            chunks: ['page']
        }),
        //EXAMPLE MULTILANGUAGE
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, "src", "page-en.hbs"),
        //     filename: 'page-en.html',
        //     chunks: ['page']
        // }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "404.hbs"),
            filename: '404.html',
            chunks: ['error']
        }),
        new CopyWebpackPlugin({
            patterns: [{
                    from: './src/sw.js',
                    to: '',
                },
                {
                    from: './src/images', //serve static images
                    to: './images',
                },
                {
                    from: './offline',
                    to: './offline',
                },
                {
                    from: './src/asset-manifest.json',
                    to: '',
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'main.bundle.css',
        }),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./dist directory is being served
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] }
        }),
    ],
    stats: {
        assets: true,
        children: true,
        chunks: true,
        errors: true,
        errorDetails: true,
        modules: true,
        timings: true,
        colors: true
    },
};

// MULTILANGUAGE
// Create a en folder in dist with all the -en files
// module.exports.plugins.push({
//     apply: (compiler) => {
//         compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
//             // Create a directory named "en" in the "dist" folder
//             fs.mkdir(path.resolve(compilation.options.output.path, 'en'), (err) => {
//                 if (err) {
//                     console.error(err);
//                 }

//                 // Define the array of HTML files to copy
//                 const files = fs.readdirSync(compilation.options.output.path).filter(file => file.endsWith('-en.html'));

//                 // Copy HTML files from the "dist" folder to the "en" folder
//                 files.forEach((file) => {
//                     const source = path.resolve(compilation.options.output.path, file);
//                     const destination = path.resolve(compilation.options.output.path, `en/${file.replace(/-en\.html$/, '.html')}`);
//                     fs.copyFile(source, destination, (err) => {
//                         if (err) {
//                             console.error(err);
//                         } else {
//                             // Delete -en file from dist folder
//                             fs.unlink(path.resolve(compilation.options.output.path, file), (err) => {
//                                 if (err) {
//                                     console.error(err);
//                                 }
//                             });
//                         }
//                     });
//                 });
//                 const fileTypes = ['.js', '.svg', '.woff2', '.json', '.css'];

//                 // Define the array of files to copy
//                 const filesToCopy = fs.readdirSync(compilation.options.output.path).filter(file => fileTypes.includes(path.extname(file)));

//                 // Copy files from the "dist" folder to the "en" folder
//                 filesToCopy.forEach((file) => {
//                     fs.copyFile(path.resolve(compilation.options.output.path, file), path.resolve(compilation.options.output.path, 'en', file), (err) => {
//                         if (err) {
//                             console.error(err);
//                         }
//                     });
//                 });
//             });
//         });
//     }
// });