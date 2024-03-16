import Router from 'koa-router'
import { Context, Next } from 'koa'
import { uploadFile, getCurrentDirList, downloadFile, uploadLocalDirFiles,deleteFile,generateFileShareLink,generateFileUploadUrl, generateFileImagePreviewUrl} from '../../business/files/index'
import { validateAuthMiddleware } from '../../helpper/util'
const fileRoute = new Router();



//生成minio上传的URL
fileRoute.post('/uploadUrl/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'add', generateFileUploadUrl)
})
//生成minio图片预览的URL
fileRoute.post('/previewUrl/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'add', generateFileImagePreviewUrl)
})
//创建一条文件信息
fileRoute.post('/upload/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'add', uploadFile)
})

fileRoute.post('/local/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'add', uploadLocalDirFiles)
})

//查询文件详细信息
fileRoute.post('/del/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'delete', deleteFile)
})
//查询文件详细信息
fileRoute.get('/detail/:fileId/', async (ctx: Context, next: Next) => {
  // await validateAuthMiddleware(ctx, next, 'file', 'delete', deleteFile)
})
//查询文件列表
fileRoute.get('/list/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'query', getCurrentDirList)
})
//下载文件
fileRoute.get('/download/', async (ctx: Context, next: Next) => {
  await downloadFile(ctx, next);
})

fileRoute.get('/share/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'update', generateFileShareLink)
})
export default fileRoute