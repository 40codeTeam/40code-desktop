# 40code桌面版
## ⚠️ 注意
本仓库**不包含**编辑器源码。编辑器源码在 40codeTeam/40code-gui 。   
本仓库是基于 40code-gui 制作的可离线使用的桌面版本。

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
yarn webpack:watch
```
## 制作安装包
### 第一步：使用 webpack 为 electron 打包 40code-desktop
```
yarn webpack:build:prod
```
### 第二步：使用 electron 生成桌面应用
```
yarn electron:build
```
ps.用哪个系统运行的就会制作该系统对应的平台安装包（linux要用docker，详见[electron-build文档页](https://www.electron.build/multi-platform-build)

## 版权
目前此项目的版权协议为GPL-3.0。

## 开发注意
### 自动运行的工作流
对于 master分支 上的每一个新提交，都会触发一个*自动增加package.json的version，然后打包，发布到releases里面*的工作流。

所以，当你要**测试性地**修改该项目时，请新开一个分支（vs拓展 git graph 挺好用的），不要直接把修改推到 master 分支上。

