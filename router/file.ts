import Router from 'koa-router'
import { uploadFile,createFolder } from '../business/files/index'
const fileRoute = new Router();

fileRoute.get('/list/', async (ctx: any,next:any) => {
  ctx.body = 'Hello user list';
})
fileRoute.post('/download/', async (ctx: any,next:any) => {
  ctx.body = 'Hello user create';
})
fileRoute.post('/upload/', async (ctx: any,next:any) => {
  await uploadFile(ctx,next);
})
fileRoute.post('/directory/', async (ctx: any,next:any) => {
  console.log('file directory');
  await createFolder(ctx,next);
})

export default fileRoute