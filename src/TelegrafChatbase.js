import chatbase from '@google/chatbase'
import { ChatbaseContext } from './ChatbaseContext'


/**
 * Telegraf chatbase middleware
 */
export class TelegrafChatbase {
    /**
     * Init
     * 
     * @param {Object} param
     * @param {String} param.token - Chatbase.com token
     * @param {String} [param.platform=nodejs] - Platform name
     * @param {String} [param.version=1.0] - Platform name
     */
    constructor({ token, platform = 'nodejs', version = '1.0' }) {
        this.token = token
        this.platform = platform
        this.version = version
    }


    /**
     * @returns {Function} - Telegraf middleware
     */
    middleware() {
        return (ctx, next) => {
            const message = chatbase
                .newMessage(this.token)
                .setPlatform(this.platform)
                .setVersion(this.version)

            ctx.chatbase = new ChatbaseContext(message, ctx)

            return next()
        }
    }
}