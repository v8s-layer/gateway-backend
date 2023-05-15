# Gateway Backend

This project is a simple backend service that allows you to download and execute JavaScript files with a single exposed function. The service is built using Node.js.

# Running the Secvice

```bash
$ npm start
```

The server will start running on the default port (3000) or the port specified in the `PORT` environment variable.

# Usage

To execute a JavaScript function from a remote file, send a POST request to the `/run` endpoint with the URL of the JavaScript file and the input parameters as a JSON object in the request body.

For example, use the following `curl` command to test the "circle_area.js" example:

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"url":"https://raw.githubusercontent.com/D3LAB-DAO/gateway-backend/main/examples/simple_addition.js", "inputParameters": {"a": 5, "b": 3}}' http://localhost:3000/run

{"result":8}
```

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"url":"https://raw.githubusercontent.com/D3LAB-DAO/gateway-backend/main/examples/circle_area.js", "inputParameters": {"radius": 5}}' http://localhost:3000/run

{"result":78.53981633974483}
```

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"url":"https://raw.githubusercontent.com/D3LAB-DAO/gateway-backend/main/examples/chat.js", "inputParameters": {"prompt": "Hello", "key": "<YOUR_API_KEY>"}}' http://localhost:3000/run

{"result":"! How can I assist you today?"}
```
