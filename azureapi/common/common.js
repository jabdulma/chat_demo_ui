const OpenAI = require("openai");
require('dotenv').config()
 
const { app } = require('@azure/functions');

app.setup({ enableHttpStream: true });

const openai = new OpenAI({ apiKey: process.env.apikey })

function createError(status, msg){
    var errObj = {};
    errObj.status = status || 500;
    errObj.body = {message: msg};
    return {
        status: status || 500,
        body: {
            message: msg || "Internal Server Error"
        }
    }
}

async function getFromOpenAi(incomingMessages, stream){
    console.log("Starting OpenAI call.")
    const completion = await openai.chat.completions.create({
        messages: incomingMessages,
        model: "gpt-3.5-turbo",
        stream: stream || false
    });
    console.log("Fired off: " + JSON.stringify(completion))
    return (stream ? completion : completion.choices[0]);
}

module.exports = {createError, getFromOpenAi};