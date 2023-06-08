# 使用nodejs镜像
FROM node:16

# 工作目录
WORKDIR /app

# 复制文件
COPY . .

# 安装依赖
RUN npm install & npm run build

# 暴露端口
EXPOSE 3001

# 定义启动命令
CMD ['']

