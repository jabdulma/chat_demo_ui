import React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

const SystemBubble = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#B0B0B0' : '#B0B0B0',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: '#fff',
}));

const ChatLabel = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(1),
    textAlign: 'left',
    color: '#808080',
    fontStyle: "italic",
}));

type SystemMessageProps = {
    message: string
}

function SystemMessage(props: SystemMessageProps) {
    return (
        <Grid container xs={12}>
            {/* AI Message */}
            <Grid xs={12}><ChatLabel>System instructions to ChatGPT:</ChatLabel></Grid>
            <Grid xs={12}>
                <SystemBubble>
                    {props.message}
                </SystemBubble>
            </Grid>
        </Grid>
    );
}

export default SystemMessage;