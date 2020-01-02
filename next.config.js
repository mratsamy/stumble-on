const path = require("path")
const { parsed: localEnv } = require("dotenv").config
const webpack = require("webpack")

module.exports = {
    webpack(config, options) {
        config.resolve.alias["~components"] = path.join(__dirname, "components")
        config.resolve.alias["~api"] = path.join(__dirname, "api")
        config.resolve.alias["~lib"] = path.join(__dirname, "lib")

        config.plugins.push(new webpack.NodeEnvironmentPlugin(localEnv))

        return config
    },
}
