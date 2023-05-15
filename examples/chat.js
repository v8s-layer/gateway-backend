function chat(params) {
    const { prompt, key } = params;

    const message = prompt;
    const GPT35TurboMessage = [
        {
            "role": "system",
            "content": message
        }
    ];

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(key)
        },
        body: JSON.stringify({
            'model': "gpt-3.5-turbo",
            'messages': GPT35TurboMessage,
        })
    };

    try {
        fetch('https://api.openai.com/v1/chat/completions', requestOptions)
            .then(response => response.json())
            .then(data => { return data; })
            .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
        return err;
    }
}

// Expose the function to be executed by the server
mainFunction = chat;
