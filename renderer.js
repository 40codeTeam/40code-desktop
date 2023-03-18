// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
import { contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('electron', {
    load: (callback) => ipcRenderer.on('open-file', callback)
})
// ipcRenderer.on('open-file',(file)=>{vm.loadProject(file)})