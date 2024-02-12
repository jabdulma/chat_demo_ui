import React, {useEffect, useState} from 'react';
import './App.css';
import AiChat from "./MessageTypes/AiChat";
import UserChat from "./MessageTypes/UserChat";
import SystemMessage from "./MessageTypes/SystemMessage";


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

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const demoMessages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    {"role": "user", "content": "Where was it played?"}
]

const searchParams = new URLSearchParams(document.location.search);

const personalities = {
    default: "You are a helpful assistant.",
    aliens: "You are a helpful assistant, but you love talking about aliens.",
    sassy: "You are a helpful assistant, but you are very sassy.",
    custom: ""
}

function App() {
    const [messages, setMessages] = useState(demoMessages)
    const [count, setCount] = useState(0);
    const [personality, setPersonality] = useState("default");
    const [personalityDesc, setPersonalityDesc] = useState("")
    const [lockcode, setLockcode] = useState("");
    const [customTextEnable, setCTE] = useState(true)


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
        document.title = `ChatGPT Integration Demo`;
        setLockcode(searchParams.get("lc") || "")
        setPersonality("default")
        setPersonalityDesc(personalities.default)
        console.log("Running useEffect")
    }, []);

    const handlePersonalityChange = (event: SelectChangeEvent<typeof personality>) => {
        type personalityKeyType = keyof typeof personalities;
        let personalityKey: personalityKeyType = event.target.value as personalityKeyType;

        let ptype = event.target.value
        setCTE(ptype === "custom" ? false : true)
        setPersonality(event.target.value);
        setPersonalityDesc(personalities[personalityKey])
    };

    const handlePersonalityDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let ptype = event.target.value
        setPersonalityDesc(event.target.value);
    };

    return (
      <React.Fragment>
        <CssBaseline />
        <Container sx={{ border: '0px solid green'}} maxWidth="md">
            <Box sx={{ bgcolor: '#f4f4f4', height: '72vh', padding: '10px', overflowY:'scroll'}}>

                <Box sx={{ flexGrow: 1 }}>
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

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        {createChatBubbles()}
                     </Grid>
                </Box>
            </Box>
        </Container>
        <Container sx={{ border: '0px solid red'}} maxWidth="md">
            <Box sx={{ bgcolor: '#FFe8fc', height: '20vh', minHeight:'200px' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Stack>
                        {/* Message Box */}
                        <Grid container sx={{margin:'10px'}} >
                            <Grid item xs={10}>
                                <Paper sx={{padding:'5px'}}>
                                    <TextField label="Message ChatGPT:" fullWidth />
                                </Paper>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" size="large" sx={{minHeight: '63px', maxHeight: '65px', margin:'0px', marginLeft:'10px'}} >Send <SendRoundedIcon sx={{paddingLeft:'10px'}}/></Button>
                            </Grid>
                        </Grid>
                        <Box sx={{ flexGrow: 1,  marginLeft:'10px'}}>
                                    Below you can change ChatGPTs personality via a system call.  Doing so will clear the current message context.
                        </Box>
                        <Grid container sx={{margin:'10px'}} >
                            <Grid item xs={2}>
                                <Paper sx={{padding:'5px'}}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Personality</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Personality"
                                            value={personality}
                                            onChange={handlePersonalityChange}
                                        >
                                            <MenuItem value={"default"}>Default</MenuItem>
                                            <MenuItem value={"aliens"}>Alien Fan</MenuItem>
                                            <MenuItem value={"sassy"}>Sassy</MenuItem>
                                            <MenuItem value={"custom"}>Custom</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Paper>
                            </Grid>
                            <Grid item xs={8}>
                                <Paper sx={{padding:'5px'}}>
                                    <TextField name="personalityDesc" disabled={customTextEnable} label="" value={personalityDesc} onChange={handlePersonalityDescChange} fullWidth />
                                </Paper>
                            </Grid>
                            <Grid item xs={1}>
                                <Button variant="contained" size="small" sx={{minHeight: '63px', maxHeight: '65px', margin:'0px', marginLeft:'10px'}} >Set</Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </Box>
        </Container>
      </React.Fragment>
    );
}

export default App;
