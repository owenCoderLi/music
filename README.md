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

首页：

![music1.png](https://github.com/owenCoderLi/music/blob/master/screen/music1.png)



歌手列表页：

![music2.png](https://github.com/owenCoderLi/music/blob/master/screen/music2.png)



排行榜：

![music3.png](https://github.com/owenCoderLi/music/blob/master/screen/music3.png)



歌单详情页：

![music4.png](https://github.com/owenCoderLi/music/blob/master/screen/music4.png)



歌曲播放器小窗口：

![music5.png](https://github.com/owenCoderLi/music/blob/master/screen/music5.png)



播放器详情：

![music6.png](https://github.com/owenCoderLi/music/blob/master/screen/music6.png)



歌曲歌词页：

![music7.png](https://github.com/owenCoderLi/music/blob/master/screen/music7.png)