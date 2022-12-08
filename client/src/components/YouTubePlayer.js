import React from 'react';
import Youtube from 'react-youtube';
import GlobalStoreContext from '../store';
import { useContext, useState } from 'react';

import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { IconButton, Typography, Box } from '@mui/material';

export default function YoutubePlayer(){
  // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
  // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
  // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
  // FROM ONE SONG TO THE NEXT
  const { store } = useContext(GlobalStoreContext);
  const [ songCount, setSongCount ] = useState(0);

  let playlistName = "";
  let title = "";
  let artist = "";

  let titles = [];
  let artists = [];
  let playlist = [];
  let length = 0;

  let player;

  if (store.listToPlay){
    length = store.listToPlay.songs.length;
    playlistName = store.listToPlay.name;
    for (let i = 0; i < length; i++){
      titles[i] = store.listToPlay.songs[i].title;
      artists[i] = store.listToPlay.songs[i].artist;
      playlist[i] = store.listToPlay.songs[i].youTubeId;
    }
    if (store.listToPlay.songs.length !== 0){
      title = store.listToPlay.songs[songCount].title;
      artist = store.listToPlay.songs[songCount].artist;
    }
  }

  // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
  let currentSongIndex = 0;

  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
        autoplay: 0,
    },
  };

  // THIS EVENT HANDLER GETS CALLED ONCE THE PLAYER IS CREATED
  function onPlayerReady(event) {
    loadAndPlaySong(event.target);
    event.target.playVideo();
    player = event.target;
  }

  // THIS FUNCTION LOADS THE CURRENT SONG INTO
  // THE PLAYER AND PLAYS IT
  function loadAndPlaySong(player) {
    let song = "";
    if (songCount < length){
      song = playlist[songCount];
    }
    else{
      setSongCount(0);
    }

    if (player){
      player.cueVideoById(song);
    }
  }

  // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
  function incSong() {
    currentSongIndex++;
    //currentSongIndex = currentSongIndex % playlist.length;
    currentSongIndex%=playlist.length;
    setSongCount(songCount + 1);
  }

  // THIS FUNCTION DECREMENTS THE PLAYLIST SONG TO THE NEXT ONE (FOR PREVIOUS SONG BUTTON)
  function decrSong() {
    currentSongIndex--;
    currentSongIndex%=playlist.length;
    setSongCount(songCount - 1);
  }

  // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
  // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
  // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
  // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    player = event.target;
    if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log("-1 Video unstarted");
    } 
    else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log("0 Video ended");
      incSong();
      loadAndPlaySong();
    } 
    else if (playerStatus === 1) {
      // THE VIDEO IS PLAYED
      console.log("1 Video played");
    } 
    else if (playerStatus === 2) {
      // THE VIDEO IS PAUSED
      console.log("2 Video paused");
    } 
    else if (playerStatus === 3) {
      // THE VIDEO IS BUFFERING
      console.log("3 Video buffering");
    } 
    else if (playerStatus === 5) {
      // THE VIDEO HAS BEEN CUED
      console.log("5 Video cued");
    }
  }

  function handlePreviousSong(event){
    decrSong();
    loadAndPlaySong(player);
  }

  function handleStop(event){
    player.stopVideo();
  }

  function handlePlay(event){
    player.playVideo();
  }

  function handleSkip(event){
    incSong();
    loadAndPlaySong(player);
  }

  return(
    <div id="YouTubePlayer">
      <Youtube videoId={playlist[songCount]}
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}/>
      <Box sx={{width: '95%', height: '35%', backgroundColor: 'white', borderRadius: '10px', border: 1, mx: 'auto'}}>
        <Typography variant = "h5" style={{textAlign: 'center'}}> Now Playing</Typography>
        <Typography variant="body1"> Playlist: {playlistName}<br/></Typography>
        <Typography variant="body1">Song #: {songCount + 1}<br/></Typography>
        <Typography variant="body1">Title: {title}<br/></Typography>
        <Typography variant="body1">Artist: {artist}</Typography>
        <Box sx={{height: '15%', backgroundColor: '#ACC8D5', mx: '7%', my: '2%', textAlign:'center', border:1, borderWidth: '2px'}}>
          <IconButton onClick = {handlePreviousSong}><FastRewindIcon/></IconButton>
          <IconButton onClick = {handleStop} ><StopIcon/></IconButton>
          <IconButton onClick = {handlePlay}><PlayArrowIcon/></IconButton>
          <IconButton onClick = {handleSkip}><FastForwardIcon/></IconButton>
        </Box>
      </Box>
    </div>);
}