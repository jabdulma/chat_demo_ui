const OpenAI = require('openai');
const apiCommon = require('../common/common')

const passwordStr = process.env.passwords;
const passwords = passwordStr.split(",");

const { app } = require('@azure/functions');

app.setup({ enableHttpStream: true });

module.exports = async function (context, req) {
    //Since API access costs money, I just want to keep a basic barrier against abuse.
    module.exports = async function (context, req) {
        var resObj = {};

        context.log("Anything")

        //Since API access costs money, I just want to keep a basic barrier against abuse.
        if(!req.body.logincode){
            resObj = apiCommon.createError(400, "Missing passcode")
        } else if(passwords.indexOf(req.body.logincode.toLowerCase()) < 0){
            resObj = apiCommon.createError(400,'Invalid passcode');
        }
        //Error handling
        else if(!Array.isArray(req.body.messages)){
            resObj = apiCommon.createError(400,'Invalid input, messages are not an array.');
        } else if(!req.body.messages[0]['role'] || !req.body.messages[0]['content']){
            resObj = apiCommon.createError(400,'Invalid input, missing role or content.');
        } else {
            console.log("About to stream")
            var chatGptStream = await apiCommon.getFromOpenAi(req.body.messages, true);
            for await (const chunk of chatGptStream) {
                context.log(chunk);
                context.res.write(chunk.choices[0]?.delta.content || "");
            }
            context.res.end();
        }
        if(resObj.status){
            context.res = (resObj);
        }
    };
}