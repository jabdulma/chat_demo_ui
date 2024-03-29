//const OpenAI = require('openai');
//require('dotenv/config');
//const express = require('express');
import OpenAI from "openai";
import 'dotenv/config';
import express from "express";

const openai = new OpenAI({ apiKey: process.env.apikey })
const passwordStr = process.env.passwords;
const passwords = passwordStr.split(",");

console.log(JSON.stringify(passwords))


var app = express();
app.use(express.json());

function createError(status, msg){
    var errObj = {};
    errObj.status = status || 500;
    errObj.body = {message: msg};
    return {
        status: status || 500,
        message: msg || "Internal Server Error"
    }
}

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

app.post('/api/talktoai', async function (req, res){
    //req.body; // JavaScript object containing the parse JSON
    //Since API access costs money, I just want to keep a basic barrier against abuse.

    var resObj = {};

    //Since API access costs money, I just want to keep a basic barrier against abuse.
    if(!req.body.logincode){
        res.status(400).json(createError(400, "Missing passcode"));
    } else if(passwords.indexOf(req.body.logincode.toLowerCase()) < 0){
        res.status(400).json(createError(400,'Invalid passcode'));
    }
    //Error handling
    else if(!Array.isArray(req.body.messages)){
        res.status(400).json(createError(400,'Invalid input, messages are not an array.'));
    } else if(!req.body.messages[0]['role'] || !req.body.messages[0]['content']){
        res.status(400).json(createError(400,'Invalid input, missing role or content.'));
    } else {
        var chatGptMessage = await getFromOpenAi(req.body.messages);
        //resObj.status = 200;
        resObj = chatGptMessage
    }
    res.json(resObj);
});

//Work in progress on streaming version of the API
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