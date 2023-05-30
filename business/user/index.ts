
export const login = async (ctx: any, next: any) => {
    try {
        ctx.body = { msg: 'successfully', code: 1 }
    } catch (e) {
        ctx.body = { msg: 'failed', code: 0 }
    }
}
export const logout = async (ctx: any, next: any) => {

}
export const createUser = async (ctx: any, next: any) => {

}

export const queryUserGroup = async (ctx: any, next: any) => {

}

export const queryUserLib = async (ctx: any, next: any) => {

}

export const deleteUserLib = async (ctx: any, next: any) => {

}

