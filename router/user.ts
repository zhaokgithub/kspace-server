const Router = require('koa-router');
const userRoute = new Router();

userRoute.get('/list/', async (ctx: any) => {
    ctx.body = 'Hello user list';
})
userRoute.post('/create/', async (ctx: any) => {
    ctx.body = 'Hello user create';
})

export { userRoute }