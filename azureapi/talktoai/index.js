const OpenAI = require('openai');
//import OpenAI from "openai";
//import 'dotenv/config';
//import express from "express";

const openai = new OpenAI({ apiKey: process.env.apikey })
const passwordStr = process.env.passwords;
const passwords = passwordStr.split(",");

async function getFromOpenAi(incomingMessages){
    const completion = await openai.chat.completions.create({
        messages: incomingMessages,
        model: "gpt-3.5-turbo"
    });
    return completion.choices[0];
}

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

module.exports = async function (context, req) {
    var resObj = {};

    //Since API access costs money, I just want to keep a basic barrier against abuse.
    if(!req.body.logincode){
        resObj = createError(400, "Missing passcode")
    } else if(passwords.indexOf(req.body.logincode.toLowerCase()) < 0){
        resObj = createError(400,'Invalid passcode');
    }
    //Error handling
    else if(!Array.isArray(req.body.messages)){
        resObj = createError(400,'Invalid input, messages are not an array.');
    } else if(!req.body.messages[0]['role'] || !req.body.messages[0]['content']){
        resObj = createError(400,'Invalid input, missing role or content.');
    } else {
        var chatGptMessage = await getFromOpenAi(req.body.messages);
        resObj.status = 200;
        resObj.body = chatGptMessage;
    }
    context.res = (resObj);
};