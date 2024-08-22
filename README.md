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
## 开发
master 上的新提交都会触发一个*自动增加package.json的version，然后触发打包*工作流。

所以要修改该项目，请新开一个分支（git branch），不要直接把修改推到 master 分支上，

## 版权
目前此项目的版权协议为GPL-3.0，与上游tw一样。
