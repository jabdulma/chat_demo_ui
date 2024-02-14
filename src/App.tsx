import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import AiChat from "./MessageTypes/AiChat";
import UserChat from "./MessageTypes/UserChat";
import SystemMessage from "./MessageTypes/SystemMessage";
import axios from 'axios';

import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Stack } from '@mui/system';
import {
    Paper,
    Grid,
    TextField,
    Button,
    Typography,
    AppBar,
    Toolbar,
    Tooltip,
    InputLabel,
    FormControl, Select, MenuItem, SelectChangeEvent
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChatControls from "./ChatControls";

const searchParams = new URLSearchParams(document.location.search);

type messageType = { role: string, content: string };

function App() {
    let defaultMessages: messageType[] = []
    const [messages, setMessages] = useState(defaultMessages)
    const [lockcode, setLockcode] = useState("");
    const [chatBubbles, setChatBubbles] = useState([]);
    const [personalityDesc, setPersonalityDesc] = useState("")

    const bottomDummyElement = useRef(document.createElement("div"));

    function createChatBubbles(): any {
        var messageList = messages;
        var currentMessage: { role: string; content: string; };
        let outputBubbles: any[] = [];
        for (var i = 0; i < messageList.length; i++) {
            currentMessage = messageList[i];
            if (currentMessage.role === "assistant") {
                outputBubbles.push(<AiChat key={currentMessage.role + "Key-" + i} message={currentMessage.content}></AiChat>)
            } else if (currentMessage.role === "user") {
                outputBubbles.push(<UserChat key={currentMessage.role + "Key-" + i} message={currentMessage.content}></UserChat>)
            } else if (currentMessage.role === "system") {
                outputBubbles.push(<SystemMessage key={currentMessage.role + "Key-" + i} message={currentMessage.content}></SystemMessage>)
            }
        }
        return outputBubbles;
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `John's ChatGPT Integration Demo`;
        setLockcode(searchParams.get("lc") || "")
        console.log("Running useEffect")
    }, []);

    useEffect(() => {
        bottomDummyElement.current.scrollIntoView({ behavior: "smooth" });
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
        setPersonalityDesc(freshPersonality);
        setMessages([createMessage("system", freshPersonality)]);
    }

    const sendOutMessageToApi = (msg: string) => {
        //Create a working message stack to use on state later
        var msgStack = messages;
        //Handle starting set personality if needed
        if(messages.length === 0){
            msgStack.push(createMessage("system", personalityDesc))
        }
        //Push our new message
        msgStack.push(createMessage("user", msg))
        //Send out to the API
        axios.post("/talktoai", {
            logincode: lockcode,
            messages: msgStack,
        }).then(res => {
            msgStack.push(createMessage("assistant", res.data.message.content));
            setMessages(msgStack);
            setChatBubbles(createChatBubbles());
        })
        setMessages(msgStack);
        setChatBubbles(createChatBubbles());
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <Container sx={{ border: '0px solid green'}} maxWidth="md">
            <Box sx={{ flexGrow: 1}} >
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            John's Chatbot Demo
                        </Typography>
                        <Tooltip title="Please enter a password to use the system.  Password should've been provided with the link, otherwise contact the author." placement="bottom">
                            <InfoOutlinedIcon sx={{marginRight:'10px'}}/>
                        </Tooltip>
                        <Paper>
                            <TextField value={lockcode} variant="filled" label="System Password" />
                        </Paper>

                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{ bgcolor: '#f4f4f4', minHeight:'300px', height:'calc(100vh - (200px + 64px))', padding: '10px', overflowY:'scroll'}}>
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
      </React.Fragment>
    );
}

export default App;