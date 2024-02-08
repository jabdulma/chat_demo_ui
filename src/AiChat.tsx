import React from 'react';
import BubbleSpacer from "./BubbleSpacer";
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Stack } from '@mui/system';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
    padding: theme.spacing(1),
    textAlign: 'left',
    color: '#0f0f0f',
}));

function AiChat() {
    return (
        <Grid container xs={12}>
            {/* AI Message */}
            {/* <Grid xs={12}><ChatLabel>ChatGpt:</ChatLabel></Grid> */}
            <Grid xs={10} md={8}>
                <AiBubble>
                    Hello I am ChatGPT lol
                </AiBubble>
            </Grid>
            <Grid xs={2} md={4}>
                <BubbleSpacer></BubbleSpacer>
            </Grid>
        </Grid>
    );
}

export default AiChat;