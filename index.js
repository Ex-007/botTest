const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')


// const cron = require('node-cron')
const env = require('dotenv')
// const express = require('express')


env.config()

const TOKEN = process.env.BOT_TOKEN
const bot = new TelegramBot(TOKEN, {
    polling : true
})


bot.onText(/\/start/, msg => {
    let chatId = msg.chat.id
    bot.sendMessage(chatId, 'Send me a message and I will respond to you')
}
)


bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;
  
    bot.sendMessage(chatId, "Processing your request...");
  
    try {
      const response = await axios.post(
        "https://api.cohere.com/v1/generate",
        {
          model: "command", 
          prompt: userMessage,
          max_tokens: 500, 
          temperature: 0.8,
          k: 0, 
          p: 0.75, 
          stop_sequences: [],
          return_likelihoods: "NONE"
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const allResponses = response.data.generations.map(gen => gen.text).join("\n\n"); 
  
      if (allResponses.length > 4096) {
        const parts = allResponses.match(/[\s\S]{1,4000}/g); 
        for (const part of parts) {
          await bot.sendMessage(chatId, part);
        }
      } else {
        bot.sendMessage(chatId, allResponses);
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "Sorry, something went wrong.");
    }
  });

// bot.on("message", async (msg) => {
//     const chatId = msg.chat.id;
//     const userMessage = msg.text;
  
//     bot.sendMessage(chatId, "Processing your request...");
  
//     try {
//       const response = await axios.post(
//         "https://api.cohere.com/v1/generate",
//         {
//           model: "command", 
//           prompt: userMessage,
//           max_tokens: 100,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       const generatedText = response.data.generations[0].text;
//       bot.sendMessage(chatId, generatedText);
//     } catch (error) {
//       console.error(error);
//       bot.sendMessage(chatId, "Sorry, something went wrong.");
//     }
//   });



























// bot.onText(/\/start/, msg => {
//     let chatId = msg.chat.id
//     const options = {
//         reply_markup : {
//             inline_keyboard : [
//                 [
//                     { text : 'Jeweleries', callback_data : 'jeweleries'},
//                     { text : 'Varieties', callback_data : 'vareties'}
//                 ],
//                 [
//                     { text : 'Visit Website', url : "https://abtech-two.vercel.app"}
//                 ]
//             ]
//         }
//     }
//     bot.sendMessage(chatId, 'Select from the Available options : ', options)
// })


// bot.on('callback_query', async (query) => {
//     let chatId = query.message.chat.id
//     const data = query.data
//     if(data === 'jeweleries'){
//         try {
//             let response = await axios.get('https://opendetails.vercel.app/products/jeweleries')
//             let fileDetails = response.data
//             fileDetails.forEach(element => {
//                 let message = ` 
//                 Product name : ${element.productName} \nProduct Price: ${element.productPrice} \n${element.productImage}
//                 `
//                 bot.sendMessage(chatId, message)
//             });
//         } catch (error) {
//             console.log(error)
//             bot.sendMessage(chatId, `Encountered an error : ${error}`)
//         }
//     }else if(data === 'varieties'){
//         let response = await axios.get('https://opendetails.vercel.app/products/varieties')
//             let fileDetails = response.data
//             fileDetails.forEach(element => {
                
//                 let message = ` 
//                 Product name ${element.productName}
//                 Product Price: ${element.productPrice}
//                 ${element.productImage}
//                 `
//                 bot.sendMessage(chatId, message)
//             });
//     }
//     bot.answerCallbackQuery(query.id)
// })






























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