'use strict'

import { app, BrowserWindow, ipcMain, dialog } from 'electron'
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 540,
    width: 380,
    frame: false,
    center: true,
    fullscreen: false,
    resizable: false,
    show: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Showing window gracefully http://electron.atom.io/docs/api/browser-window/#winflashframeflag
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// ipc 侦听show-open-dialog事件
ipcMain.on('show-open-dialog', function (event, arg) {
  dialog.showOpenDialog(mainWindow, {
    title: 'Select your file',
    filters: [
      {name: 'All Files', extensions: arg.split(',')}
    ],
    properties: ['openFile']
  },
    function (fileNames) {
      if (fileNames === undefined) {
        event.returnValue = ''
        return
      } else {
        fileNames = fileNames[0]
        console.log('fileNames:' + fileNames)
        event.returnValue = fileNames
      }
    }
    )
})
// ipc 侦听show-save-dialog事件
ipcMain.on('show-save-dialog', function (event, arg) {
  dialog.showSaveDialog(mainWindow, {
    filters: [{name: 'DAT', extensions: ['DAT']}],
    title: '请选择保存DAT位置'
  },
         function (fileNames) {
           if (fileNames === undefined) {
             event.sender.send('show-save-dialog-reply', 'abort')
           } else {
             event.sender.send('show-save-dialog-reply', fileNames)
           }
         }
    )
})

// 退出，关闭窗口；
ipcMain.on('synchronous-message', function (event, arg) {
  if (arg === 'close-main-window') {
    app.quit()
  } else if (arg === 'mini-window') {
    mainWindow.minimize()
  }
})
