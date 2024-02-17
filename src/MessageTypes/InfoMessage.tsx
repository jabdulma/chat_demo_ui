import React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

const InfoBubble = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#EEE' : '#EEE',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: 'gray',
    border: '1px solid #DDD'
}));

const ChatLabel = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(1),
    textAlign: 'left',
    textShadow: '#FFF 0px 0px 5px',
    color: '#808080',
    fontStyle: "italic",
}));

type SystemMessageProps = {
    message: string
}

function InfoMessage(props: SystemMessageProps) {
    return (
        <Grid container xs={12}>
            {/* AI Message */}
            <Grid xs={12}><ChatLabel>Info</ChatLabel></Grid>
            <Grid xs={12}>
                <InfoBubble>
                    {props.message}
                </InfoBubble>
            </Grid>
        </Grid>
    );
}

export default InfoMessage;