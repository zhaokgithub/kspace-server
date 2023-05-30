import Router from 'koa-router'
import {login,logout,createUser,queryUserGroup,queryUserLib} from '../business/user/index'

const userRoute = new Router();
userRoute.get('/list/', async (ctx: any,next:any) => {
    ctx.body = 'Hello user list';
})
userRoute.get('/:userId/', async (ctx: any,next:any) => {
    ctx.body = 'Hello user list';
})
userRoute.post('/create/', async (ctx: any,next:any) => {
    ctx.body = 'Hello user create';
})
userRoute.post('/login/', async (ctx: any,next:any) => {
    login(ctx,next)
})
userRoute.post('/logout/', async (ctx: any,next:any) => {
    logout(ctx,next)
})

export default userRoute;
