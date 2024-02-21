const OpenAI = require('openai');
const apiCommon = require('../common/common')

const passwordStr = process.env.passwords;
const passwords = passwordStr.split(",");
 

module.exports = async function (context, req) {
    var resObj = {};

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
        var chatGptMessage = await apiCommon.getFromOpenAi(req.body.messages);
        resObj.status = 200;
        resObj.body = chatGptMessage;
    }
    context.res = (resObj);
};