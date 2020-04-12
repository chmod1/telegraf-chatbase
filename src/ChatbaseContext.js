/**
 * ChatbaseContext class
 */
export class ChatbaseContext {
    /**
     * Init chatbase context
     * 
     * @param {} message - Chatbase message
     * @param {Object} ctx - {@link https://telegraf.js.org/#/?id=context}
     */
    constructor(message, ctx) {
        this.message = message
        this.ctx = ctx
    }


    /**
     * Send chatbase message
     * 
     * @param {Object} param
     * @param {String} [param.intent=] - The intent of the message
     * @param {Boolean} [param.isFeedback=false] - Is the message a feedback from the user
     * @param {Boolean} [param.isHandled=true] - False if the message was not handled
     * @returns {Promise}
     */
    track({ intent = '', isFeedback = false, isHandled = true }) {
        const uid = this.getUserID()
        const text = this.getMessageText()

        if (isFeedback) {
            this.message.setAsFeedback()
        }

        if (intent) {
            this.message.setIntent(intent)
        }

        this.message.setUserId(uid.toString())
        this.message.setMessage(text)
        this.message.setAsTypeUser()

        return this.message.send()
    }


    /**
     * Get user id from context
     * 
     * @returns {Number} - User id
     */
    getUserID() {
        if (!this.ctx.from) {
            throw new Error('No sender info')
        }

        return this.ctx.from.id
    }


    /**
     * Get message text from context
     * 
     * @returns {String} - Message or query text
     */
    getMessageText() {
        if (this.ctx.callbackQuery) {
            return this.ctx.callbackQuery.data
        } else if (this.ctx.inlineQuery) {
            return this.ctx.inlineQuery.query
        } else {
            return this.ctx.message.text
        }
    }
}