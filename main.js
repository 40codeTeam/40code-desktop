// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView,webContents, ipcMain,Menu,globalShortcut } = require('electron')
var Mousetrap = require('mousetrap');

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
      contextIsolation: false
    },
    // autoHideMenuBar: true // 自动隐藏菜单栏
  })

  // and load the index.html of the app.
  globalShortcut.register('f12', () => {
    console.log('Electron loves global shortcuts!')
  })
  Menu.setApplicationMenu(null)
  mainWindow.setMenu(null)

  mainWindow.loadFile('./static/editor.html')

  // const args = process.argv.slice(2);
  // console.log('Command line arguments:', args);

  // Open the DevTools.
  if(process.env.dev)
  mainWindow.webContents.openDevTools()


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
