const Router = require('koa-router');
const fileRoute = new Router();

fileRoute.get('/list/', async (ctx: any) => {
  ctx.body = 'Hello user list';
})
fileRoute.post('/upload/', async (ctx: any) => {
  ctx.body = 'Hello user create';
})

export {fileRoute}