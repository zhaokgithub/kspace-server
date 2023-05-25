const Router = require('koa-router');
const route = new Router("koa-app");
const { userRoute } = require('./user');

route.use('/api/user', userRoute.routes(), userRoute.allowedMethods());

module.exports = route.routes();
