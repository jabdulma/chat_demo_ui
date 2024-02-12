import OpenAI from "openai";
import 'dotenv/config';
import express from "express";

const openai = new OpenAI({ apiKey: process.env.apikey })
var app = express();
app.use(express.json());

async function getFromOpenAi(body){
    const completion = await openai.chat.completions.create({
        messages: [{ role: body.role, content: body.content }],
        model: "gpt-3.5-turbo",
    });
    return completion.choices[0];
}

app.post('/talktoai', async function (req, res){
    //req.body; // JavaScript object containing the parse JSON
    console.log(req.body);

    var response = await getFromOpenAi(req.body);


    console.log(response)
    res.json(response);

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