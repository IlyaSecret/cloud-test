const path = require("path");

const buildPath = path.resolve(__dirname, "build");
const contentPath = path.resolve(__dirname, "public");
const srcPath = path.resolve(__dirname, "src");
const isProd = process.env.NODE_ENV === "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getSettingsForStyles = (withModules = false) => {
  return [
    MiniCssExtractPlugin.loader,
    !withModules
      ? "css-loader"
      : {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: !isProd
              ? "[path][name]__[local]"
              : "[hash:base64]",
          },
        },
      },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  target: "web",
  entry: path.join(srcPath, "index.tsx"),
  output: {
    path: buildPath,
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(contentPath, "index.html"),
      favicon: path.resolve(contentPath, "favicon.ico"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[fullhash].css",
    }),
    new TsCheckerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: "babel-loader",
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".js", ".ts"],
    alias: {
      "@components": path.join(srcPath, "/components"),
      "@utils": path.join(srcPath, "/utils"),
      "@assets": path.join(srcPath, "/assets"),
      "@features": path.join(srcPath, "/features"),
      "@pages": path.join(srcPath, "/pages"),
      "@hooks": path.join(srcPath, "/hooks"),
      "@store": path.join(srcPath, "/store"),
      "@schema": path.join(srcPath, "/schema"),
    },
  },
  optimization: {
    usedExports: true,
  },
};
