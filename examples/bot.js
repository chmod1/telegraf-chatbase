import Telegraf from 'telegraf'
import TelegrafChatbase from 'telegraf-chatbase'

const bot = new Telegraf(process.env.BOT_TOKEN)
const chatbase = new TelegrafChatbase({
    token: process.env.CHATBASE_TOKEN,
    platform: 'nodejs',
    version: '1.0'
})


bot.use(chatbase.middleware())


bot.command('start', ctx => {
    ctx.chatbase.track({
        intent: 'start',
        isFeedback: false,
        isHandled: true,
    })
    ctx.reply('Hello!')
})


bot.launch()