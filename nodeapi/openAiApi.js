import OpenAI from "openai";
import 'dotenv/config';
import express from "express";

const openai = new OpenAI({ apiKey: process.env.apikey })
const passwordStr = process.env.passwords;
const passwords = passwordStr.split(",");

console.log(JSON.stringify(passwords))


var app = express();
app.use(express.json());



async function getFromOpenAi(incomingMessages){
    const completion = await openai.chat.completions.create({
        messages: incomingMessages,
        model: "gpt-3.5-turbo"
    });
    console.log(completion)
    return completion.choices[0];
}

async function getFromOpenAiStream(incomingMessages){
    const completion = await openai.chat.completions.create({
        messages: incomingMessages,
        model: "gpt-3.5-turbo",
        stream: true
    });
    return completion;
}


app.post('/talktoai', async function (req, res, next){
    //req.body; // JavaScript object containing the parse JSON
    console.log(req.body);
    console.log(passwords.indexOf(req.body.logincode.toLowerCase()) < 0)
    //Since API access costs money, I just want to keep a basic barrier against abuse.
    try {
        if(!req.body.logincode){
            console.log(req.body.logincode)
            throw new Error('Missing passcode');
        } else if(passwords.indexOf(req.body.logincode.toLowerCase()) < 0){
            throw new Error('Invalid passcode');
        }
        console.log("Before if");
        if(!Array.isArray(req.body.messages)){
            console.log("Body Messages Caught");
            throw new Error('Invalid input, messages are not an array.');
        } else if(!req.body.messages[0]['role'] || !req.body.messages[0]['content']){
            console.log("Body Message Content caught");
            throw new Error('Invalid input, missing role or content.');
        }
        console.log("Before getFromOpenAi");
        var response = await getFromOpenAi(req.body.messages);
        console.log(response)

        res.json(response);
    } catch (err){
        next(err);
    }
});

app.post('/talktoaistream', async function (req, res){
    //req.body; // JavaScript object containing the parse JSON
    console.log(req.body);
    try {
        console.log("Before if");
        if(!Array.isArray(req.body.messages)){
            console.log("Body Messages Caught");
            throw new Error('Invalid input, messages are not an array.');
        } else if(!req.body.messages[0]['role'] || !req.body.messages[0]['content']){
            console.log("Body Message Content caught");
            throw new Error('Invalid input, missing role or content.');
        }
        console.log("Before getFromOpenAi");
        var response = await getFromOpenAiStream(req.body.messages);
        console.log(response)
        res.write(response);
    } catch (err){
        return {};
    }
});

app.listen(process.env.apiport, () => {
    console.log("Server running on port " + process.env.apiport);
});

/*
async function main() {


    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Hello ChatGPT, this is Clem Fandango.  Can you hear me?" }],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
}

main();*/