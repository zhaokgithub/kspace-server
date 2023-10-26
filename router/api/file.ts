import Router from 'koa-router'
import { Context, Next } from 'koa'
import { uploadFile, createFolder, getCurrentDirList, downloadFile, uploadLocalDirFiles,deleteFile } from '../../business/files/index'
import { validateAuthMiddleware } from '../../helpper/util'
const fileRoute = new Router();



fileRoute.get('/share/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'update', downloadFile)

})

fileRoute.post('/upload/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'add', uploadFile)
})

fileRoute.post('/local/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'add', uploadLocalDirFiles)
})

fileRoute.post('/directory/', async (ctx: Context, next: Next) => {
  await validateAuthMiddleware(ctx, next, 'file', 'add', createFolder)
})

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

export default fileRoute