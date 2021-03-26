'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import { autoUpdater } from "electron-updater"

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// render부분에서 http request cors이슈를 해결해 준다
app.commandLine.appendSwitch ( 'disable-features', 'OutOfBlinkCors');

// gpu 랜더링 가속화 설정
app.disableHardwareAcceleration();

async function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
    // autoUpdater.checkForUpdatesAndNotify();
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

autoUpdater.on('checking-for-update', function() {
  console.log('업데이트 버전 체크');
});
autoUpdater.on('error', function(error) {
  console.log('error---' + error);
});
autoUpdater.on('download-progress', (progressObj) => {
  let speed = 'Download Status = speed: ' + progressObj.bytesPerSecond.toString().substr(0,1) + 'MB/s';
  let percent = ' | Downloaded ' + Math.floor(progressObj.percent) + '% ';
  let total = '(' + progressObj.transferred + '/' + progressObj.total + ')';
  console.log(speed + percent + total);
});
//다운로드 완료되면 업데이트
autoUpdater.on('update-downloaded', function(event, releaseNotes, releaseName) {
  console.log('업데이트 파일 다운로드 완료');
  // app.removeAllListeners("window-all-closed");
  autoUpdater.quitAndInstall(false);
  // setTimeout(function() {
  //   app.relaunch()
  //   app.exit()
  // }, 3000);
});
//신규 업로드가 있을경우 === 구버전
autoUpdater.on('update-available', function() {
  console.log('새로운 업데이트 파일이 있습니다.');
});
 
//신규 업로드가 없을경우 === 최신버전
autoUpdater.on('update-not-available', function() {
  console.log('업데이트할 필요가 없습니다');
});
