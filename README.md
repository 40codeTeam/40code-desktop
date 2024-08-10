# 40code桌面版
## 安装
```
git clone https://github.com/40codeTeam/40code-desktop.git
cd 40code-desktop
yarn config set registry https://registry.npm.taobao.org/
yarn config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
yarn install
```
## 运行
```
yarn start
```
## 制作安装包   
ps.用哪个系统运行的就会制作该系统对应的平台安装包（linux要用docker，详见[electron-build文档页](https://www.electron.build/multi-platform-build)
```
yarn build
```

目前此项目的版权协议为GPL
