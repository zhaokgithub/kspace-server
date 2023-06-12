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
- 个人知识库
    - 保存至知识库
    - 查看知识库内容
## 软件架构
- koa+typescript+mongodb

## 安装部署
- 安装mongodb
```
docker pull mongo
```
- 初始化环境变量
```
# 数据库配置
DB_URL=mongodb://user:password@localhost:20017/kpan_dev?authSource=admin

# 服务器配置
JWT_SECRET_KEY=kpan_dev20230531

# 文件配置
FILE_MAX_SIZE=104857600
FILE_STORAGE_ROOT=E:\tmp
```

- 本地开发
```
yarn install
npm run start:dev
```

- Jenkins - pm2部署
```
yarn install
# npm run buil => pm2 start ./dist/app.js
npm run start:prod
```
-Jenkins -  docker部署

```
待开发
```