const path = require("path")
const { parsed: localEnv } = require("dotenv").config
const webpack = require("webpack")
const withCSS = require("@zeit/next-css")

module.exports = withCSS({
    cssModules: true,
    webpack(config, options) {
        config.resolve.alias["~components"] = path.resolve(__dirname, "components")
        config.resolve.alias["~api"] = path.resolve(__dirname, "api")
        config.resolve.alias["~lib"] = path.resolve(__dirname, "lib")

        config.plugins.push(new webpack.NodeEnvironmentPlugin(localEnv))

        return config
    },
})
