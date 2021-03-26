const webpack = require('webpack');
module.exports = {
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "auto-update",
        appId: "com.jeong.auto",
        artifactName: "auto-update.${ext}",
        publish: [{
          provider: "github",
          owner: process.env.OWNER,
          repo: process.env.REPO,
          token: process.env.JEONG_GH_TOKEN,
          private: false,
          releaseType: 'draft',
          publishAutoUpdate: true
        }],
        linux: {
          target: [
            {
              target: "appimage",
              arch: [
                "arm64",
              ]
            }
          ]
        },
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_JSON: '"' + escape(JSON.stringify(require('./package.json'))) + '"'
        }
      })
    ]
  },
}
