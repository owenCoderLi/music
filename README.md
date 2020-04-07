# react hooks 仿网易云音乐

## 技术栈

```
react-hooks: 新版本的react，采用hooks开发组件
redux: react的状态管理库
react-router: react路由
react-transition-group: react官方推荐动画库
redux-immutable: 统一数据格式
redux-thunk: redux中间件
better-scroll: 页面滚动效果
```

## 运行

本项目采用create-react-app脚手架搭建，因音乐数据来源取自 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) , 如果是用户自己搭建，则需要在运行create-react-app之后

```shell
cd react-music/
git submodule add https://github.com/Binaryify/NeteaseCloudMusicApi.git NeteaseCloudMusicApi

// 这样会将NeteaseCloudMusicApi作为子项目导入
```

若直接运行，则执行以下命令:

```shell
cd react-music/
git submodule update --init --recursive
cd NeteaseCloudMusicApi/
yarn install / npm install
cd ../
yarn start / npm run start
```

项目运行效果：

