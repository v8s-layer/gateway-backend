const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { Script, createContext } = require('vm');

let sandbox = {
    require: require,
    console: console,
    fetch: fetch
};

const app = express();

// Use the body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post('/run', async (req, res) => {
    try {
        const { url, inputParameters } = req.body;

        if (!url) {
            return res.status(400).send({ error: 'No URL provided.' });
        }

        // 1. Download the JavaScript file
        const response = await axios.get(url);

        // 2. Run the downloaded file's function with a timeout of 30 seconds
        const context = createContext(sandbox);
        const script = new Script(response.data, { timeout: 30000 });
        script.runInContext(context);

        // Assume the function name is 'mainFunction'
        const mainFunction = context.mainFunction;
        if (typeof mainFunction === 'function') {
            // Pass input parameters to the function
            const result = await mainFunction(inputParameters);

            // 3. Send the result to the requester
            res.status(200).send({ result });
        } else {
            res.status(400).send({ error: 'No function found in the downloaded file.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
