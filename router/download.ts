import Router from 'koa-router'
import { Context, Next } from 'koa'
import { uploadFile, createFolder, getCurrentDirList, downloadFile, uploadLocalDirFiles,deleteFile } from '../business/files/index'
import { validateAuthMiddleware } from '../helpper/util'
const fileRoute = new Router();