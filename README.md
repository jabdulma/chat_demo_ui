# John's ChatGPT Demo

![Screenshot of a ChatGPT client](/screen.png?raw=true "Screenshot of Demo")

Now available running on Azure at **[aichat.john-am.com](https://aichat.john-am.com)** - Passcode required for use, please contact me (or check my resume) for a passcode!

This project is a portfolio app to show skills and capabilities of the author.  It can be set up locally with NodeJS, or can be deployed to Azure.

The demo is a simple ChatGPT client, running through a local API contained within the `nodeapi` directory.  The client was developed with React, and the API with Node.  The UI components were provided by MUI.


## Installation
As long as you have an OpenAI API key, NodeJS, and Yarn, this repo can be run locally.  Just clone the repo and run `yarn` to install dependencies.

### Installation steps and running locally:

*This assumes Node and Npm have been installed*

1. Clone the repo `git clone git@github.com:jabdulma/chat_demo_ui.git` or similar
2. Run `npm install` to install packages locally
3. In the base repo directory, create a `.env` file with the following parameters.  The `.exampleenv` file has been provided for reference.
   1. `apikey={openai api key here}`
   2. `apiport=4000`
   3. `passwords={passwords}` where {passwords} is a comma-separated list of passwords
4. run `npm run runapi` and in a separate console window, `npm start`
5. After a few moments the api will be available locally on `localhost:4000` and the UI will be available at [http://localhost:3000](http://localhost:3000).

### Running with Azure CLI

*This assumes Azure CLI tools have been installed* 

1. Perform steps 1-3 above, the `apiport` parameter can be omitted
2. copy the .env file to `./azureapi`
3. run `npm build` to create a built version of the webapp
4. run `swa start build --api-location azureapi` to run the webapp with the API wired up in place.

## Notes and FAQ:

### Changing the port

Changing the port can be done easily by changing the `apiport` parameter in your `.env` file.  If you make this change, 
be sure to change the corresponding proxy port in `package.json`.

### Why are the UI and API in the same repo?

Being a portfolio project, and because of the limited size of the API, I felt it was reasonable to leave everything in a single 
repository.  In a production or enterprise environment, I would want them in separate repos.

### Why the passcode system?  It's not secure.
The goal of the password system is only to limit API usage to those with trusted links.  I'm not looking to cover other attack vectors and 
full authentication is outside of scope for this demonstration.  I would actually leave it completely open except that I'm using paid API 
access to power it.  To make testing easier locally, leave the parameter blank so a blank password is allowed.

### Why are you using Google Analytics?
Pure curiosity on how the app is being used.  In a previous position I worked extensively with Analytics apps including GA and 
SiteCatalyst.  Being so familiar with them makes it easy for me to add them in.  I only track when messages are sent, and do not 
track message content.

### What about Mobile?
With [MUI](https://mui.com/core/) the components used can easily be scaled to mobile.  It does require some additional styling, which 
will come in a future update.

### Why 2 versions of the API?
Two reasons, one is that the Node version was written first and a slightly different version was needed for Azure.  But also 
I didn't feel requiring Azure to run locally was appropriate for a portfolio project where the viewer may not have Azure CLI 
tools installed.  In an enterprise or production environment I would not propose maintaining two versions of the same API.

### Other feedback / questions:
Feel free to reach out to me at jabdulma@gmail.com with any feedback or questions you may have.  Thanks for looking at my demo!