
## 自动运行的工作流
### on_master_push.yml

对于 master分支 上的每一个新提交，都会触发这个工作流，它可以 **自动增加package.json的version，然后为其添加 git 版本tag** 。默认更新[修订号](https://semver.org/lang/zh-CN/)，提交字眼包含 "新功能"、"大版本更新" 时会更新 主版本号、次版本号 。

所以，当你要**测试性地**修改该项目时，请新开一个分支（vs拓展 git graph 挺好用的），不要直接把修改推到 master 分支上。

### on_release.yml

对于每一个新建的release，都会触发这个工作流，它可以 **自动制作安装包，然后把做好的安装包放到刚刚创建的 releases 里面** 。
