# John's ChatGPT Demo

This project is a portfolio app to show skills and capabilities of the author.  It can be set up locally with NodeJS, or in an upcoming feature can be deployed to Azure.

The demo is a simple ChatGPT client, running through a local API contained within the `nodeapi` directory.  The client was developed with React, and the API with Node.  The UI components were provided by MUI.


## Installation
As long as you have an OpenAI API key, NodeJS, and Yarn, this repo can be run locally.  Just clone the repo and run `yarn` to install dependencies.

### Installation steps and running locally:

*This assumes Node and Yarn have been installed*

1. Clone the repo `git clone git@github.com:jabdulma/chat_demo_ui.git` or similar
2. Run `yarn` to install packages locally
3. In the base repo directory, create a `.env` file with the following parameters.  The `.exampleenv` file has been provided for reference.
   1. `apikey={openai api key here}`
   2. `apiport=4000`
   3. `passwords={passwords}` where {passwords} is a comma-separated list of passwords
4. run `yarn runapi` and in a separate console window, `yarn start`
5. After a few moments the api will be available locally on `localhost:4000` and the UI will be available at [http://localhost:3000](http://localhost:3000).

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

### Other feedback / questions:
Feel free to reach out to me at jabdulma@gmail.com with any feedback or questions you may have.  Thanks for looking at my demo!