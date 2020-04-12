# Chatbase middleware for Telegraf
[Chatbase](https://chatbase.com/) middleware for [Telegraf (Telegram bot framework)](https://github.com/telegraf/telegraf)

## Installation
```
$ npm install telegraf-chatbase
```
or using `yarn`:
```
$ yarn add telegraf-chatbase
```

## Usage
```js
import Telegraf from 'telegraf'
import TelegrafChatbase from 'telegraf-chatbase'

const bot = new Telegraf(process.env.BOT_TOKEN)
const chatbase = new TelegrafChatbase({
    token: process.env.CHATBASE_TOKEN, // Your chatbase.com token, required
    platform: 'nodejs', // Bot platform, optional
    version: '1.0' // Bot version, optional
})


bot.use(chatbase.middleware())


bot.command('start', ctx => {
    // Track message. All fields are optional.
    ctx.chatbase.track({
        intent: 'start', // The intent of the message
        isFeedback: false, // Is the message a feedback from the user
        isHandled: true, // False if the message was not handled
    })
    ctx.reply('Hello!')
})


bot.launch()
```