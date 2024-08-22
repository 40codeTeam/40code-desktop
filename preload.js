const {
  contextBridge,
  ipcRenderer,
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "exit", (()=>{
    ipcRenderer.send('win-close','close')
  })
);