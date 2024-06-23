# 概述

#### 介绍
kpan-server采用nodejs的koa来实现一个文件服务功能

#### 软件架构
- 语言框架：nodejs  koajs
- 数据库：mongodb
- 构建：docker
- 运行：linux docker


#### 本地运行
- 安装依赖初始化
- 环境变量初始化
- 连接数据库
- 运行

#### 功能模块

- 用户模块
- 文件模块

# 部署

## docker部署minio

- 拉取minio镜像
```
docker pull minio/minio
```

- 初始化文件存储目录
```
sudo mkdir /home/minio
sudo mkdir /home/minio/config
sudo mkdir /home/minio/data
```

- 部署minio：MINIO_ACCESS_KEY登录的用户名 MINIO_SECRET_KEY登录的密码
```
docker run -d -p 9000:9000 -p 9092:9092 --name minio -e "MINIO_ACCESS_KEY=user" -e "MINIO_SECRET_KEY=password" -v /home/minio/data:/data -v /home/minio/config:/root/.minio minio/minio server /data --console-address ":9000" -address ":9092"
```
- 
## 部署serve服务

- 初始化配置文件

```
# .env
SERVER_PORT=
DB_URL=
JWT_SECRET_KEY=

MINIO_CLIENT_HOST=
MINIO_CLIENT_PORT=
MINIO_CLIENT_ACCESSKEY=
MINIO_CLIENT_SECRETKEY=
```