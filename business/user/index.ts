import UserModel from '../../database/model/user';
import { generateUniqueId } from '../../helpper/util'
import { JWT_SECRET_KEY } from '../../helpper/env';
import * as jwt from 'jsonwebtoken';

export const login = async (ctx: any, next: any) => {
    try {
        const data = ctx.request.body;
        const { account, password } = data;
        const user = await UserModel.findOne({ account })
        if (user && user.password === password) {
            const userInfo = {};
            const secret = JWT_SECRET_KEY ? JWT_SECRET_KEY : '';
            console.log('secret: ', secret);
            const token = jwt.sign(userInfo, secret, {})
            ctx.body = { msg: 'successfully', code: 1,token}
        }else{
            ctx.body = { msg: 'user name or password is not valid!', code: 1 }
        }
    } catch (e) {
        ctx.body = { msg: 'failed', code: 0 }
    }
}
export const logout = async (ctx: any, next: any) => {
    try {
        ctx.body = { msg: 'successfully', code: 1 }
    } catch (e) {
        ctx.body = { msg: 'failed', code: 0 }
    }
}
export const createUser = async (ctx: any, next: any) => {
    try {
        const data = ctx.request.body;
        const userId = await generateUniqueId('user')
        const res = await UserModel.create({ ...data, userId })
        ctx.body = { msg: 'successfully', code: 1 }
    } catch (e) {
        console.log('e: ', e);
        ctx.body = { msg: 'failed', code: 0 }
    }
}

export const queryUserGroup = async (ctx: any, next: any) => {
    try {
        ctx.body = { msg: 'successfully', code: 1 }
    } catch (e) {
        ctx.body = { msg: 'failed', code: 0 }
    }
}

export const queryUserLib = async (ctx: any, next: any) => {
    try {
        ctx.body = { msg: 'successfully', code: 1 }
    } catch (e) {
        ctx.body = { msg: 'failed', code: 0 }
    }
}

export const deleteUserLib = async (ctx: any, next: any) => {
    try {
        ctx.body = { msg: 'successfully', code: 1 }
    } catch (e) {
        ctx.body = { msg: 'failed', code: 0 }
    }
}

