import KoaRouter from 'koa-router';
import userRoute from './user';
const router = new KoaRouter();

router.use('/api/user', userRoute.routes(), userRoute.allowedMethods());
const routes = router.routes();

export default routes;
