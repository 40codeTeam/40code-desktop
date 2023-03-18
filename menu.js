
const { Menu, BrowserWindow,shell } = require('electron')
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
            shell.openExternal('https://packager.40code.com')
        }
    },{
        label: '打包作品',//一级菜单名称
        click: () => {  //添加点击事件
            mainWindow.webContents.openDevTools()
        }
    }
    
]
 
var m = Menu.buildFromTemplate(template)
 
Menu.setApplicationMenu(m)