
const Koa = require('koa');
const app = new Koa();
const routes = require('./router/index');
app.use(routes);
app.use(async (ctx: any) => {
    ctx.status = 404
    ctx.body = 'not found!';
});

app.listen(3000, () => {
    const env = process.env.NODE_ENV
    console.log('current env:',env)
    console.log('serving is start!');
});