import React from 'react';
import BubbleSpacer from "../BubbleSpacer";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

const AiBubble = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#00AAFF' : '#00AAFF',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: '#fff',
    width: '100%'
}));

const ChatLabel = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(1),
    textAlign: 'left',
    color: '#808080',
    fontStyle: "italic",
}));

type AiChatProps = {
    message: string
}

function AiChat(props:AiChatProps) {
    return (
        <Grid container xs={12}>
            {/* AI Message */}
            <Grid xs={12}><ChatLabel>ChatGPT</ChatLabel></Grid>
            <Grid xs={10} md={8}>
                <AiBubble>
                    {props.message}
                </AiBubble>
            </Grid>
            <Grid xs={2} md={4}>
                <BubbleSpacer></BubbleSpacer>
            </Grid>
        </Grid>
    );
}

export default AiChat;