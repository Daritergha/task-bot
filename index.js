const TelegramApi = require('node-telegram-bot-api')
const {estimOptions, againOptions} = require('./options')
const token = '________________________________________'    //your token

const bot = new TelegramApi(token, {polling: true})

const estim = {}



const dayEstim = async (chatID) => {
    //await bot.sendMessage(chatID,`Получена команда ${text}`)
    await bot.sendMessage(chatID,`Оцени свой день от 0 до 9 (целым числом)`, estimOptions);
    //const estim =
    estim[chatID] = 6;
    await bot.sendMessage(chatID, 'Отличный выбор!')
}

const startprod = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/myname', description: 'Имя пользователя'},
        {command: '/day', description: 'Как прошёл день'}
    ])

    bot.on('message', async msg =>{
        const text = msg.text;
        const chatID = msg.chat.id;

        if(text === '/start') {
            //await bot.sendMessage(chatID,`Получена команда ${text}`)
            await bot.sendSticker(chatID, 'CAACAgIAAxkBAAEH1lZj9KSZ5zRcUYMSJz8WrXYTlptHQgACPRUAAvYIuUnak_eap8-TZC4E')
            return bot.sendMessage(chatID,`Добро пожаловать в чат!`)
        }
        if(text === '/myname') {
            //await bot.sendMessage(chatID,`Получена команда ${text}`)
            return bot.sendMessage(chatID,`Тебя зовут ${msg.from.first_name} ${msg.from.last_name}, приятно познакомиться!`)
        }
        if(text === '/day') {
            return dayEstim(chatID);
        }
        return bot.sendMessage(chatID, 'Не понятно :(');
    })

    bot.on('callback_query', async msg => {
        const data  = msg.data;
        const chatID = msg.message.chat.id;
        if(data === '/again') {
            return dayEstim(cahtID)
        }
        if(data >= estim[chatID]) {
          return bot.sendMessage(cahtID, 'Здорово! Так держать!', againOptions)
        } else {
          return bot.sendMessage(cahtID, 'Не стоит расстраиваться! Дальше будет ещё хуже...', againOptions)
        }
    })
}

startprod()

