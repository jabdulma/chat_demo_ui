import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import AiChat from "./MessageTypes/AiChat";
import UserChat from "./MessageTypes/UserChat";
import SystemMessage from "./MessageTypes/SystemMessage";
import InfoMessage from "./MessageTypes/InfoMessage";
import axios from 'axios';

import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/system';
import {
    Paper,
    Grid,
    TextField,
    Typography,
    AppBar,
    Toolbar,
    Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChatControls from "./ChatControls";

import backgroundImage from './img/background-topography.png';
import githubLogo from './img/github-mark-white.png';

import ReactGA from "react-ga4";
ReactGA.initialize(process.env.REACT_APP_GA_CODE || "");

let theme = createTheme();
theme = responsiveFontSizes(theme);

const searchParams = new URLSearchParams(document.location.search);

type messageType = { role: string, content: string };
const initMessages: messageType =  { role: "info", content: "Welcome!  To start using this chat enter a message to ChatGPT below." }


function App() {
    let defaultMessages: messageType[] = [initMessages]
    const [messages, setMessages] = useState(defaultMessages)
    const [lockcode, setLockcode] = useState("");
    const [chatBubbles, setChatBubbles] = useState([]);
    const [personalityDesc, setPersonalityDesc] = useState("")

    //Dialog State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState("");

    //Scoll element
    const bottomDummyElement = useRef(document.createElement("div"));

    function handleDialogClose(): void{
        setChatBubbles(createChatBubbles());
        setDialogOpen(false);
    }

    function createChatBubbles(): any {
        var messageList = messages;
        var currentMessage: { role: string; content: string; };
        let outputBubbles: any[] = [];
        for (var i = 0; i < messageList.length; i++) {
            currentMessage = messageList[i];

           switch(currentMessage.role){
               case 'info':
                   outputBubbles.push(<InfoMessage key={currentMessage.role + "Key-" + i} message={currentMessage.content}></InfoMessage>);
                   break;
               case 'system':
                   outputBubbles.push(<SystemMessage key={currentMessage.role + "Key-" + i} message={currentMessage.content}></SystemMessage>);
                   break;
               case 'assistant':
                   outputBubbles.push(<AiChat key={currentMessage.role + "Key-" + i} message={currentMessage.content}></AiChat>);
                   break;
               case 'user':
                   outputBubbles.push(<UserChat key={currentMessage.role + "Key-" + i} message={currentMessage.content}></UserChat>);
                   break;
           }
        }
        return outputBubbles;
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `John's ChatGPT Integration Demo`;
        setLockcode(searchParams.get("lc") || "")
        setChatBubbles(createChatBubbles());
    }, []);

    useEffect(() => {
        let scrollElem : HTMLElement = bottomDummyElement.current;
        scrollElem.scrollIntoView({ behavior: "smooth" });
    }, [chatBubbles]);

    const createMessage = (role: string, msg: string) => {
        return {
            role: role,
            content: msg
        }
    }

    const statePushMessage = (pushMessage: messageType) => {
        var msgStack = messages;
        msgStack.push(pushMessage);
        setMessages(msgStack);
    }

    const receiveNewPersonality = (freshPersonality: string) => {
        ReactGA.event("setPersonality", {
            personality: freshPersonality,
            lcode: lockcode
        });
        setPersonalityDesc(freshPersonality);
        setMessages([createMessage("system", freshPersonality)]);
    }

    const openErrorDialog = (msg: string) => {
        if(msg.indexOf("passcode") > 0){
        setDialogText(
            `Received error: ${msg}.
                   Please reload the page and try again.
            
                   To speak with ChatGPT you will need a passcode that should have been provided with the link.  The passcode can be entered in the upper left of the page.  If you didn't receive a passcode, please contact the author.`)
        } else {
            setDialogText(
                `Received error: ${msg}.
                Please reload the page and try again.  If the error persists, please contact the author.`
            )
        }
        setDialogOpen(true)
    }

    const sendOutMessageToApi = (msg: string) => {
        ReactGA.event("sendMessage", {
            lcode: lockcode
        });
        //Create a working message stack to use on state later
        var msgStack = messages;
        //Handle starting set personality if needed
        if(messages.length === 0){
            msgStack.push(createMessage("system", personalityDesc))
        }
        //Push our new message
        msgStack.push(createMessage("user", msg))
        //Send out to the API
        axios.post("/api/talktoai", {
            logincode: lockcode,
            messages: msgStack,
        }).then(res => {
            msgStack.push(createMessage("assistant", res.data.message.content));
            setMessages(msgStack);
            setChatBubbles(createChatBubbles());
        }).catch(error => {
            setMessages([initMessages]);
            openErrorDialog((error?.response?.data?.message ?? "Internal error"))
        })
        setMessages(msgStack);
        setChatBubbles(createChatBubbles());
    }

    const handlePersonalityDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let ptype = event.target.value
        setPersonalityDesc(ptype);
    };

    const handlePasscodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let lc = event.target.value
        setLockcode(lc);
    }


    return (
      <React.Fragment>
          <ThemeProvider theme={theme}>

        <CssBaseline />
        <Container sx={{ padding: '0px', border: '0px solid green'}} maxWidth="md">
            <Box sx={{ flexGrow: 1}} >
                <AppBar position="static">
                    <Toolbar>
                        <a href="https://github.com/jabdulma/chat_demo_ui"><img style={{width:'40px', marginRight: '15px'}} src={githubLogo} /></a>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' }}}
                        >
                            John's Chatbot Demo

                        </Typography>

                        <Paper sx={{width: '40%', maxWidth:'250px'}}>
                            <TextField fullWidth value={lockcode} onChange={handlePasscodeChange} variant="filled" label="System Password" />
                        </Paper>
                        <Tooltip title="Please enter a password to use the system.  Password should've been provided with the link, otherwise contact the author." placement="bottom">
                            <InfoOutlinedIcon sx={{marginLeft:'10px'}}/>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'repeat',  bgcolor: '#f4f4f4', minHeight:'300px', height:'calc(100vh - (238px + 64px))', padding: '10px', overflowY:'scroll'}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        {chatBubbles}
                     </Grid>
                    <div style={{ float:"left", clear: "both" }}
                         ref={bottomDummyElement}>
                    </div>
                </Box>
            </Box>
        </Container>
        <ChatControls
            sendChatToApp={sendOutMessageToApi}
            sendPersonalityToApp={receiveNewPersonality}
            personality={personalityDesc}
        />
          <Dialog
              open={dialogOpen}
              onClose={handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                  {"There was a problem sending the request."}
              </DialogTitle>
              <DialogContent>
                  <DialogContentText style={{whiteSpace: 'pre-line'}} id="alert-dialog-description">
                      {dialogText}
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleDialogClose} autoFocus>
                      Ok
                  </Button>
              </DialogActions>
          </Dialog>
          </ThemeProvider>
      </React.Fragment>
    );
}

export default App;