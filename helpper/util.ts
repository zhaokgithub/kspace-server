import CounterModel from '../database/model/counter';
import fs from 'fs';
import path from 'path';
import { AUTH_MODULES } from './consant'
import { Context, Next } from 'koa';
export let sendErrorResponse = (ctx: Context, msg?: string, code?: number) => {
    const errMsg = { code: code || 0, errMsg: msg || 'failed!' };
    ctx.body = errMsg;
}

export let sendNormalResponse = (ctx: Context, msg: string, code?: number) => {
    const successMsg = { code: code || 1, errMsg: msg || 'successfully!' };
    ctx.body = successMsg;
}

export let getClientIp = (req: any) => {
    console.log("x-forwarded-for = " + req.header('x-forwarded-for')); // 各阶段ip的CSV, 最左侧的是原始ip
    var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    console.log("headers = " + JSON.stringify(req.headers)); // 包含了各种header，包括x-forwarded-for(如果被代理过的话)
    console.log("x-forwarded-for = " + req.header('x-forwarded-for')); // 各阶段ip的CSV, 最左侧的是原始ip
    console.log("ips = " + JSON.stringify(req.ips)); // 相当于(req.header('x-forwarded-for') || '').split(',')
    console.log("remoteAddress = " + req.connection.remoteAddress); // 未发生代理时，请求的ip
    console.log("ip = " + req.ip); // 同req.connection.remoteAddress, 但是格式要好一些
    return req.ip.match(/\d+\.\d+\.\d+\.\d+/)
}

/**
 *
 * @param {*} model
 * @param {*} key
 * @returns {number} id
 */
export const generateUniqueId = async (name: string) => {
    try {
        const result = await CounterModel.findOneAndUpdate({ name }, { $inc: { count: 1 } }, { new: true });
        console.log('result: ', result);
        if (!result) {
            await CounterModel.create({ name, count: 1 });
            return 1;
        }
        return result?.count;
    } catch (e) {
        console.log('e: ', e);
    }
};

export const getLocalDirFiles = (dir: string) => {
    try {
        let fileList: any = [];
        const files = fs.readdirSync(dir) || [];

        files.forEach(file => {
            const stat = fs.statSync(path.resolve(dir, file));
            const fileInfo = {
                name: file,
                realName: file,
                path: path.resolve(dir, file),
                size: stat.size,
                preDir: dir,
                type: stat.isDirectory() ? 1 : 2
            }
            fileList.push(fileInfo);
        })
        return fileList;
    } catch (e) {
        console.log('e: ', e);
        return []
    }
}

/**
 * 
 * @param userInfo 当前登录用户
 * @param module 模块
 */
type UserRoleProps = 0 | 1 | 2 | 3;
export const validateAuthMiddleware = async (ctx: any, next: any, moduleType: string, action: string, callback: any) => {
    const userInfo = ctx.state.user;
    const role: UserRoleProps = userInfo ? userInfo?.role : 0;
    const validateModules: string[] = role ? AUTH_MODULES[role] : [];
    console.log('validateModules: ', validateModules);
    if (moduleType && validateModules.includes(`${moduleType}_${action}`)) {
        await callback(ctx, next);
    } else {
        sendErrorResponse(ctx, 'Not Auth！')
    }
}