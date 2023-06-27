function telegrambot(bytecode) {
    let offset = 0;

    const parseUint256 = () => {
        const uint256 = BigInt(`0x${bytecode.slice(offset, offset+64)}`);
        offset += 64;
        return uint256.toString();
    };

    const parseInt256 = () => {
        let int256 = BigInt(`0x${bytecode.slice(offset, offset+64)}`);
        offset += 64;
        if (int256 > BigInt("0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")) {
            int256 -= BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
        }
        return int256.toString();
    };

    const parseString = () => {
        const length = Number(`0x${bytecode.slice(offset, offset+64)}`);
        offset += 64;
        const string = Buffer.from(bytecode.slice(offset, offset + length * 2), 'hex').toString('utf8');
        offset += length * 2;
        return string;
    };

    const botKey = parseString(); // First string
    const chatId = parseInt256(); // First int256
    const symbol0 = parseString(); // Second string
    const symbol1 = parseString(); // Third string
    const amount0 = parseUint256(); // First uint256
    const amount1 = parseUint256(); // Second uint256
    const decimals0 = parseUint256(); // Third uint256
    const decimals1 = parseUint256(); // Fourth uint256

    console.log("botKey: ", botKey);
    console.log("chatId: ", chatId);
    console.log("symbol0: ", symbol0);
    console.log("symbol1: ", symbol1);
    console.log("amount0: ", amount0);
    console.log("amount1: ", amount1);
    console.log("decimals0: ", decimals0);
    console.log("decimals1: ", decimals1);

    const msg = `
botKey: ${botKey}
chatId: ${chatId}
symbol0: ${symbol0}
symbol1: ${symbol1}
amount0: ${amount0}
amount1: ${amount1}
decimals0: ${decimals0}
decimals1: ${decimals1}
    `;

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