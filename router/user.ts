import Router from 'koa-router'
import { login, logout, createUser, queryUserGroup, queryUserLib } from '../business/user/index'

const userRoute = new Router();
userRoute.get('/list/', async (ctx: any, next: any) => {
    await queryUserGroup(ctx, next)
})
userRoute.get('/:userId/', async (ctx: any, next: any) => {
    await queryUserLib(ctx, next)
})
userRoute.post('/create/', async (ctx: any, next: any) => {
    await createUser(ctx, next)
})
userRoute.post('/login/', async (ctx: any, next: any) => {
    await login(ctx, next)
})
userRoute.post('/logout/', async (ctx: any, next: any) => {
    await logout(ctx, next)
})

export default userRoute;
