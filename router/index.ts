import KoaRouter from 'koa-router';
import userRoute from './user';
import fileRoute from './file';
const router = new KoaRouter();

router.use('/api/user', userRoute.routes(), userRoute.allowedMethods());
router.use('/api/file', fileRoute.routes(), fileRoute.allowedMethods());
const routes = router.routes();

export default routes;
