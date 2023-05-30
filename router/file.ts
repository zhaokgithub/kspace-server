import Router from 'koa-router'
import { uploadFile } from '../business/files/index'
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

export default fileRoute