
import Koa from 'koa';
import Routes from './router/index';
import bodyParser from 'koa-bodyparser';
import KoaJwt from 'koa-jwt';
import './database/mongo';
const app = new Koa();

app.use(bodyParser())
app.use(Routes);

app.use(async (ctx: any) => {
    console.log('not found!');
    ctx.status = 404
    ctx.body = 'not found!';
});

app.listen(3001, () => {
    console.log('serving is start:3001!');
});

app.callback()

app.on('error', err => {
    console.log(err);
})