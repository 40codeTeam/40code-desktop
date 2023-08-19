// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView,webContents, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true, // is default value after Electron v5
      // contextIsolation: true, // protect against prototype pollution
      // enableRemoteModule: false, // turn off remote
      nodeIntegration: true, // 是否集成 Nodejs
    },
    // autoHideMenuBar: true // 自动隐藏菜单栏
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./static/editor.html')
  // require('./menu')

  const { Menu, shell } = require('electron')
  var template = [
    {
      label: '打开官网',//一级菜单名称
      click: () => {  //添加点击事件
        shell.openExternal('https://40code.com')
      }
    },
    {
      label: '打包作品',//一级菜单名称
      click: () => {  //添加点击事件
        // const view = new BrowserView()
        const win = new BrowserWindow({
          width: 800,
          height: 600,
          webPreferences: {
            webSecurity: false
          }
        })
        // win.setBrowserView(view)
        // view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
        win.webContents.loadURL('https://packager.40code.com')
      }
    }, {
      label: '打开控制台',//一级菜单名称
      click: () => {  //添加点击事件
        mainWindow.webContents.openDevTools()
      }
    }

  ]

  var m = Menu.buildFromTemplate(template)

  Menu.setApplicationMenu(m)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  app.on('close', (event, title) => {
    // let { canClose } = storage.getData('canClose');
    // let canClose=1;
    // if (canClose) {
    app.exit();
    // }
  })
  app.on('open-file', (event, file) => {
    console.log(event, file)
    webContents.send(file)
  })
  ipcMain.on("win-close", function (e) {
    console.log('关闭')
    app.exit();
  });

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
