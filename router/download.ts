import Router from 'koa-router'
const downloadRouter = new Router();
import { downloadFile } from '../business/files/index'

downloadRouter.get('/list/', async (ctx: any, next: any) => {
    console.log('file');
    downloadFile(ctx, next)
})

export default downloadRouter;