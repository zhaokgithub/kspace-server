
import Koa from 'koa';
import Routes from './router/index';
const app = new Koa();
import dotenv from 'dotenv'
console.log('ENV: ', dotenv.config());

app.use(Routes);

app.use(async (ctx: any) => {
    ctx.status = 404
    ctx.body = 'not found!';
});

app.listen(3000, () => {
    const env = process.env.NODE_ENV
    console.log('current env:', env)
    console.log('serving is start!');
});