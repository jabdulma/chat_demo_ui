import React from 'react';
import BubbleSpacer from "../BubbleSpacer";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

const UserBubble = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#00FFAA' : '#88BB88',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'right',
    color: '#fff',
}));

const ChatLabel = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(1),
    textAlign: 'right',
    color: '#808080',
    fontStyle: "italic",
}));

type UserChatProps = {
    message: string
}

function UserChat(props: UserChatProps) {
    return (
        <Grid container xs={12}>
            {/* AI Message */}
            <Grid xs={12}><ChatLabel>User</ChatLabel></Grid>
            <Grid xs={2} md={4}>
                <BubbleSpacer></BubbleSpacer>
            </Grid>
            <Grid xs={10} md={8}>
                <UserBubble>
                    {props.message}
                </UserBubble>
            </Grid>
        </Grid>
    );
}

export default UserChat;