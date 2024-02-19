import Router from 'koa-router'
import { Context, Next } from 'koa'
import { uploadFile, createFolder, getCurrentDirList, downloadFile, uploadLocalDirFiles,deleteFile,generateFileShareLink,generateFileUploadUrl} from '../../business/files/index'
import { validateAuthMiddleware } from '../../helpper/util'
const fileRoute = new Router();



//生成minio上传的URL
fileRoute.get('/uploadUrl/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'add', generateFileUploadUrl)
})
//创建一条文件信息
fileRoute.post('/upload/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'add', uploadFile)
})

fileRoute.post('/local/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'add', uploadLocalDirFiles)
})

//查询文件详细信息
fileRoute.get('/del/:fileId/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'delete', deleteFile)
})

fileRoute.get('/list/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'query', getCurrentDirList)
})

fileRoute.get('/download/', async (ctx: Context, next: Next) => {
  await downloadFile(ctx, next);
})
fileRoute.get('/tmperay/', async (ctx: Context, next: Next) => {
  await downloadFile(ctx, next);
})
fileRoute.get('/share/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'update', generateFileShareLink)
})
export default fileRoute