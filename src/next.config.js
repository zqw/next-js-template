function cdn() {
  let cdnPrefix = "";
  if (process.env.NODE_ENV == "prod" || process.env.NODE_ENV == "production" || process.env.env_server == "vpc_prod") {
    cdnPrefix = "http://XXX.xxx.com.cn/xxx"
  }
  return cdnPrefix
}

module.exports = {
  assetPrefix: cdn(),
  webpack: (config, {dev}) => {

    // Perform customizations to webpack config

    // Important: return the modified config
    // config.resolve.modules = [path.resolve(__dirname, "components"), "node_modules"]

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries["main.js"] &&
        !entries["main.js"].includes("babel-polyfill")
      ) {
        entries["main.js"].unshift("babel-polyfill");
      }

      return entries;
    };

    config.module.rules.push({
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    });

    config.module.rules.push({
      test: /\.handlebars$/,
      loader: "handlebars-loader"
    });

    config.node = {
      fs: "empty"
    };

    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries["main.js"] &&
        !entries["main.js"].includes("babel-polyfill")
      ) {
        entries["main.js"].unshift("babel-polyfill");
      }

      return entries;
    };
    config.node = {
      fs: "empty"
    };
    return config;
  },

  // exportPathMap: function(defaultPathMap) {
  //   return {
  //     // "/test": { page: "/test" },
  //   };
  // }
};
