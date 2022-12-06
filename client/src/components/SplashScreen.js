import { Button, Typography } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FastForwardIcon from '@mui/icons-material/FastForward';
export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <Typography variant="h4" sx={{fontWeight: 'bold', textAlign: 'center'}}>Welcome to</Typography>
            <img src={"images/PlaylisterLogoProvided.png"} width={275} height={90}></img>
            <Typography variant="h6" sx={{fontWeight: 'bold'}}>The All-In-One Playlist Sharing Platform</Typography>
            <HeadphonesIcon sx={{ fontSize:45}}></HeadphonesIcon>
            <Typography variant="subtitle2" sx={{fontStyle: 'italic'}}>Create, edit, and publish your playlists!</Typography>
            <Typography variant="subtitle2" sx={{fontStyle: 'italic'}}>Like and comment on your favorite playlists</Typography>
            <Typography variant="subtitle2" sx={{fontStyle: 'italic'}}>Play songs directly on the app!</Typography>
            <a href="/register/"><button className='splashScreenButton'>Create Account</button></a> 
            <a href="/login/"><button className='splashScreenButton'>Login</button></a> 
            <button className='splashScreenButton'>Continue as Guest</button><br></br>
            <FastRewindIcon sx={{ fontSize:45}}></FastRewindIcon>
            <PlayCircleIcon sx={{ fontSize:45}}></PlayCircleIcon>
            <FastForwardIcon sx={{ fontSize:45}}></FastForwardIcon>
            <Typography variant="body2" sx={{fontStyle: 'italic'}}>Created by Jenny Yang</Typography>
        </div>
    )
}