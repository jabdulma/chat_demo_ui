import React from 'react';
import './App.css';
import AiChat from "./AiChat";

import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Stack } from '@mui/system';
import {Paper, Grid} from '@mui/material';
import { styled } from '@mui/material/styles';



const AiBubble = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#00AAFF' : '#00AAFF',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: '#fff',
}));

const UserBubble = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#00FFAA' : '#88BB88',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'right',
    color: '#fff',
}));

const BubbleSpacer = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1)
}));



// <Grid container spacing={2}>
//     {/* AI Message */}
//     <AiChat/>
//     {/* User Message */}
//     <Grid xs={2} md={4} spacing={2}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     <Grid xs={10} md={8} spacing={2}>
//         <UserBubble>xs=10 md=8</UserBubble>
//     </Grid>
//
//
//
//     {/* AI Message */}
//     <Grid xs={10} md={8}>
//         <AiBubble>xs=10 md=8</AiBubble>
//     </Grid>
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     {/* User Message */}
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     <Grid xs={10} md={8}>
//         <UserBubble>xs=10 md=8</UserBubble>
//     </Grid>
//
//
//     {/* AI Message */}
//     <Grid xs={10} md={8}>
//         <AiBubble>xs=10 md=8</AiBubble>
//     </Grid>
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     {/* User Message */}
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     <Grid xs={10} md={8}>
//         <UserBubble>xs=10 md=8</UserBubble>
//     </Grid>
//
//
//     {/* AI Message */}
//     <Grid xs={10} md={8}>
//         <AiBubble>xs=10 md=8</AiBubble>
//     </Grid>
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     {/* User Message */}
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     <Grid xs={10} md={8}>
//         <UserBubble>xs=10 md=8</UserBubble>
//     </Grid>
//
//
//
//     {/* AI Message */}
//     <Grid xs={10} md={8}>
//         <AiBubble>xs=10 md=8</AiBubble>
//     </Grid>
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     {/* User Message */}
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     <Grid xs={10} md={8}>
//         <UserBubble>xs=10 md=8</UserBubble>
//     </Grid>
//
//
//
//     {/* AI Message */}
//     <Grid xs={10} md={8}>
//         <AiBubble>xs=10 md=8</AiBubble>
//     </Grid>
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     {/* User Message */}
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     <Grid xs={10} md={8}>
//         <UserBubble>xs=10 md=8</UserBubble>
//     </Grid>
//
//
//     {/* AI Message */}
//     <Grid xs={10} md={8}>
//         <AiBubble>xs=10 md=8</AiBubble>
//     </Grid>
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     {/* User Message */}
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     <Grid xs={10} md={8}>
//         <UserBubble>xs=10 md=8</UserBubble>
//     </Grid>
//
//
//
//     {/* AI Message */}
//     <Grid xs={10} md={8}>
//         <AiBubble>xs=10 md=8</AiBubble>
//     </Grid>
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     {/* User Message */}
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//     <Grid xs={10} md={8}>
//         <UserBubble>xs=10 md=8</UserBubble>
//     </Grid>
//
//     {/* Ending grid used for scrolling */}
//     <Grid xs={2} md={4}>
//         <BubbleSpacer></BubbleSpacer>
//     </Grid>
//
// </Grid>


function App() {
  return (
      <React.Fragment>
        <CssBaseline />
        <Container sx={{ border: '1px solid green'}} maxWidth="md">
            <Box sx={{ bgcolor: '#f4f4f4', height: '65vh', padding: '10px', overflow:'scroll'}}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Stack>
                            <AiChat></AiChat>

                        </Stack>
                    </Box>
                    {/* User Message */}
            </Box>
        </Container>
        <Container sx={{ border: '1px solid red'}} maxWidth="md">
          <Box sx={{ bgcolor: '#FFe8fc', height: '20vh' }} />
        </Container>
      </React.Fragment>
  );
}

export default App;
