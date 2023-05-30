
import Koa from 'koa';
import Routes from './router/index';
import './database/mongo';
const app = new Koa();
app.use(Routes);

app.use(async (ctx: any) => {
    console.log('not found!');
    ctx.status = 404
    ctx.body = 'not found!';
});

app.listen(3000, () => {
    console.log('serving is start:3000!');
});

app.callback()

app.on('error', err => {
    console.log(err);
})