# kpan-server
百度网盘内存不够还有上传下载的速度限制，自己整一个自己的网盘来用，正好手里有台废弃的笔记本。

## 需求分析
- 用户管理
    - 注册、登录
    - 新建用户
- 文件管理
    - 文件上传
    - 文件夹新建
    - 文件列表查询
## 软件架构
- 前端：vue3+typescript+antd
- 后台：koa+typescript+mongodb

## 安装部署
- 安装mongodb
```
docker pull mongo
```
- 初始化环境变量
```
# 数据库配置
DB_URL=mongodb://kpan_dev:123456@39.104.93.152:8017/kpan_dev?authSource=admin
DB_USER=zhaokai
DB_PWD=@zhao116524

# 服务器配置
JWT_SECRET_KEY=kpan_dev20230531

# 文件配置
# 最大文件尺寸100M
FILE_MAX_SIZE=104857600
FILE_STORAGE_ROOT=E:\tmp
```

- 本地开发
```
yarn install
npm run start:dev
```

- pm2部署
```
yarn install
# npm run buil => pm2 start ./dist/app.js
npm run start:prod
```
- docker部署

```
待开发
```