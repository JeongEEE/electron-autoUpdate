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
          owner: "JeondEEE",
          repo: "electron-autoUpdate",
          token: "7d10016797f3581b0c6a5abed9b7bddddeb9a0b1",
          private: false,
          releaseType: 'release',
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
