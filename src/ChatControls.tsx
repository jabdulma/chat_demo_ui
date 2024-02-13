import React, {useState} from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import {Box, Container, Stack} from "@mui/system";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";



const personalities = {
    default: "You are a helpful assistant.",
    aliens: "You are a helpful assistant, but you love talking about aliens.",
    sassy: "You are a helpful assistant, but you are very sassy.",
    custom: ""
}

type ChatControlProps = {
    sendChatToApp: Function,
    sendPersonalityToApp: Function
}


function ChatControls(props:ChatControlProps) {

    const [chatMessage, setChatMessage]=  useState("")
    const [personality, setPersonality] = useState("default");
    const [personalityDesc, setPersonalityDesc] = useState("")
    const [lockcode, setLockcode] = useState("");
    const [customTextEnable, setCTE] = useState(true)


    const handleSendMessage = () => {
        // Send to App for handling
    }


    const handlechatMessageChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        let msg = event.target.value
        setChatMessage(msg);
    };

    const handlePersonalityDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let ptype = event.target.value
        setPersonalityDesc(ptype);
    };

    const handlePersonalityChange = (event: SelectChangeEvent<typeof personality>) => {
        type personalityKeyType = keyof typeof personalities;
        let personalityKey: personalityKeyType = event.target.value as personalityKeyType;

        let ptype = event.target.value
        setCTE(ptype === "custom" ? false : true)
        setPersonality(event.target.value);
        setPersonalityDesc(personalities[personalityKey])
    };

    return (
        <React.Fragment>
            <Container sx={{ border: '0px solid red'}} maxWidth="md">
                <Box sx={{ bgcolor: '#FFe8fc', height: '20vh', minHeight:'200px' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Stack>
                            {/* Message Box */}
                            <Grid container sx={{margin:'10px'}} >
                                <Grid xs={10}>
                                    <Paper sx={{padding:'5px'}}>
                                        <TextField label="Message ChatGPT:" value={chatMessage} onChange={handlechatMessageChange} fullWidth />
                                    </Paper>
                                </Grid>
                                <Grid xs={2}>
                                    <Button variant="contained" size="large" onClick={handleSendMessage} sx={{minHeight: '63px', maxHeight: '65px', margin:'0px', marginLeft:'10px'}} >Send <SendRoundedIcon sx={{paddingLeft:'10px'}}/></Button>
                                </Grid>
                            </Grid>
                            <Box sx={{ flexGrow: 1,  marginLeft:'10px'}}>
                                Below you can change ChatGPTs personality via a system call.  Doing so will clear the current message context.
                            </Box>
                            <Grid container sx={{margin:'10px'}} >
                                <Grid xs={2}>
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
                                <Grid xs={8}>
                                    <Paper sx={{padding:'5px'}}>
                                        <TextField name="personalityDesc" disabled={customTextEnable} label="" value={personalityDesc} onChange={handlePersonalityDescChange} fullWidth />
                                    </Paper>
                                </Grid>
                                <Grid xs={1}>
                                    <Button variant="contained" size="small" sx={{minHeight: '63px', maxHeight: '65px', margin:'0px', marginLeft:'10px'}} >Set</Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>

    )

};

export default ChatControls;