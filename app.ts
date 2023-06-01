
import Koa from 'koa';
import Routes from './router/index';
import bodyParser from 'koa-body';
import './database/mongo';
import { FILE_STORAGE_ROOT, SERVER_PORT,FILE_MAX_SIZE } from './helpper/env';
const app = new Koa();


app.use(bodyParser({ multipart: true, formidable: { uploadDir: FILE_STORAGE_ROOT, maxFileSize: Number(FILE_MAX_SIZE), keepExtensions: true } }))
app.use(Routes);

app.use(async (ctx: any) => {
    console.log('not found!');
    ctx.status = 404
    ctx.body = 'not found!';
});

app.listen(SERVER_PORT, () => {
    console.log(`serving is start:${SERVER_PORT}!`);
});

app.callback()

app.on('error', err => {
    console.log(err);
})