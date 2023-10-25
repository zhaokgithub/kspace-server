import Router from 'koa-router'
import { uploadFile, createFolder, getCurrentDirList, downloadFile, uploadLocalDirFiles } from '../business/files/index'
import { validateAuthMiddleware } from '../helpper/util'
const fileRoute = new Router();

fileRoute.get('/list/', async (ctx: any, next: any) => {
  validateAuthMiddleware(ctx, 1, async () => {
    await getCurrentDirList(ctx, next)
  })

})

fileRoute.get('/download/', async (ctx: any, next: any) => {
  await downloadFile(ctx, next);
})
fileRoute.get('/del/', async (ctx: any, next: any) => {
  await downloadFile(ctx, next);
})
fileRoute.get('/share/', async (ctx: any, next: any) => {
  await downloadFile(ctx, next);
})

fileRoute.post('/upload/', async (ctx: any, next: any) => {
  await uploadFile(ctx, next);
})
fileRoute.post('/local/', async (ctx: any, next: any) => {
  await uploadLocalDirFiles(ctx, next);
})

fileRoute.post('/directory/', async (ctx: any, next: any) => {
  console.log('file directory');
  await createFolder(ctx, next);
})

export default fileRoute