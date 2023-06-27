function telegrambot(data) {
    const ethers = require('ethers');

    const abiCoder = new ethers.utils.AbiCoder();

    const decoded = abiCoder.decode(
        [
            'string',    // botKey
            'int256',    // chatId
            'string',    // symbol0
            'string',    // symbol1
            'uint256',   // amount0
            'uint256',   // amount1
            'uint256',   // decimals0
            'uint256'    // decimals1
        ],
        data
    );

    const botKey = decoded[0];
    const chatId = decoded[1].toString();
    const symbol0 = decoded[2] == "WFTM" ? "FTM" : "WFTM";
    const symbol1 = decoded[3];
    const amount0 = decoded[4].toString();
    const amount1 = decoded[5].toString();
    const decimals0 = decoded[6].toString();
    const decimals1 = decoded[7].toString();

    const msg = `Swap ${amount0 / 10**decimals0} ${symbol0} to ${amount1 / 10**decimals1} ${symbol1}`;

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