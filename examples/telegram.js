function telegrambot(params) {
    const { botKey, chatId, msg } = params;

    const TeleBot = require('telebot');
    const bot = new TeleBot(botKey);

    return new Promise((resolve, reject) => {
        try {

            bot.sendMessage(chatId, `${msg}`)
                .then((response) => {
                    console.log('Ok:', response);
                    resolve(response);
                }).catch((err) => {
                    console.error('Error:', err);
                    reject(err);
                });
        } catch (err) {
            onsole.error(err);
            reject(err);
        }
    });
}

// Expose the function to be executed by the server
mainFunction = telegrambot;
