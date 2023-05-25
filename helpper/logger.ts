import log4js from 'log4js';
// 日志级别：info warning error
// 日志分割方式：级别+日期
// 日志查看方式:
// 日志文件保存时长：error 30天 info 7天
// 邮件告警

log4js.configure({
    //输出端
    appenders: {
        out: {
            type: 'stdout'
        },
        app: {
            type: 'file',
            filename: 'application.log'
        }
    },
    //类别
    categories: {
        default: {
            appenders: [
                'out', 'app'
            ],
            level: 'debug'
        }
    },
    pm2:true
});
let logger = log4js.getLogger();
