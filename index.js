const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')


// const cron = require('node-cron')
const env = require('dotenv')
const { text, query } = require('express')


env.config()

const TOKEN = process.env.BOT_TOKEN
const bot = new TelegramBot(TOKEN, {
    polling : true
})

bot.onText(/\/start/, msg => {
    let chatId = msg.chat.id
    const options = {
        reply_markup : {
            inline_keyboard : [
                [
                    { text : 'Jeweleries', callback_data : 'jeweleries'},
                    { text : 'Varieties', callback_data : 'varieties'}
                ],
                [
                    { text : 'Visit Website', url : "https://abtech-two.vercel.app"}
                ]
            ]
        }
    }
    bot.sendMessage(chatId, 'Select from the Available options : ', options)
})


bot.on('callback_query', async (query) => {
    let chatId = query.message.chat.id
    const data = query.data
    if(data === 'jeweleries'){
        try {
            let response = await axios.get('https://opendetails.vercel.app/products/jeweleries')
            let fileDetails = response.data
            fileDetails.forEach(element => {
                let message = ` 
                Product name : ${element.productName} \nProduct Price: ${element.productPrice} \n${element.productImage}
                `
                bot.sendMessage(chatId, message)
            });
        } catch (error) {
            console.log(error)
            bot.sendMessage(chatId, `Encountered an error : ${error}`)
        }
    }else if(data === 'varieties'){
        let response = await axios.get('https://opendetails.vercel.app/products/varieties')
            let fileDetails = response.data
            fileDetails.forEach(element => {
                
                let message = ` 
                Product name ${element.productName}
                Product Price: ${element.productPrice}
                ${productImage}
                `
                bot.sendMessage(chatId, message)
            });
    }
    bot.answerCallbackQuery(query.id)
})






























// bot.onText(/\/start/, msg => {
//     let chatId = msg.chat.id
//     const options = {
//         reply_markup : {
//             inline_keyboard : [
//                 [
//                     { text : 'Angry', callback_data : 'angry'},
//                     { text : 'Happy', callback_data : 'happy'}
//                 ],
//                 [
//                     { text : 'Visit Website', url : "https://abtech-two.vercel.app"}
//                 ]
//             ]
//         }
//     }
//     bot.sendMessage(chatId, 'Select from the Available options : ', options)
// })

// HANDLING THE SELECTED OPTIONS
// bot.on('callback_query', query => {
//     let chatId = query.message.chat.id
//     const data = query.data
//     if(data === 'angry'){
//         bot.sendMessage(chatId, 'Anger Cannot resolve anything neither can it repair what has been destroyed. \nStay Positive and Forgive')
//     }else if(data === 'happy'){
//         bot.sendMessage(chatId, 'Happiness is the best feeling a person can ever have. \nA beautiful and poistive smile on your face is enough to get your day started')
//     }
//     bot.answerCallbackQuery(query.id)
// })











// bot.on('message', msg => {
//     let chatId = msg.chat.id
//     let textedValue = msg.text

//     bot.sendMessage(chatId, `You said : ${textedValue}`)
// })