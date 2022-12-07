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
  const [ vidPlaying, setVidPlaying ] = useState(false);

  let playlistName = "";
  let title = "";
  let artist = "";

  let titles = [];
  let artists = [];
  let playlist = [];
  let length = 0;

  let player;

  if (store.currentList && store.currentList.songs){
    length = store.currentList.songs.length;
    playlistName = store.currentList.name;
    for (let i = 0; i < length; i++){
      titles[i] = store.currentList.songs[i].title;
      artists[i] = store.currentList.songs[i].artist;
      playlist[i] = store.currentList.songs[i].youTubeId;
    }
    if (store.currentList.songs.length !== 0){
      title = store.currentList.songs[songCount].title;
      artist = store.currentList.songs[songCount].artist;
    }
  }

  // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
  let currentSong = 0;

  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
        autoplay: 0,
    },
  };

  // THIS EVENT HANDLER GETS CALLED ONCE THE PLAYER IS CREATED
  function onPlayerReady(event) {
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
    player = event.target;
  }

  // THIS FUNCTION LOADS THE CURRENT SONG INTO
  // THE PLAYER AND PLAYS IT
  function loadAndPlayCurrentSong(player) {
    let song = "";
    console.log(songCount);
    if (songCount < length){
      song = playlist[songCount];
    }
    else{
      setSongCount(0);
    }
    console.log(song);

    if (player){
      player.loadVideoById(song);
      player.playVideo();
    }
  }

  // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
  function incSong() {
    currentSong++;
    currentSong = currentSong % playlist.length;
    setSongCount(songCount + 1);
  }

  // THIS FUNCTION DECREMENTS THE PLAYLIST SONG TO THE NEXT ONE (FOR PREVIOUS SONG BUTTON)
  function decrSong() {
    currentSong--;
    currentSong = currentSong % playlist.length;
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
      loadAndPlayCurrentSong();
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

  function handlePrevious(event){
    decrSong();
    loadAndPlayCurrentSong(player);
  }

  function handleStop(event){
    player.stopVideo();
    setVidPlaying(false);
  }

  function handlePlay(event){
    player.playVideo();
    setVidPlaying(true);
  }

  function handleSkip(event){
    incSong();
    loadAndPlayCurrentSong(player);
  }

  return(
    <div>
    <Youtube videoId={playlist[songCount]}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}/>
    <Box sx={{width: '95%', height: '40%', backgroundColor: 'white', borderRadius: '10px', border: 1, mx: 'auto'}}>
      <Typography variant = "h5" style={{textAlign: 'center'}}> Now Playing</Typography>
      <Typography variant="body1"> Playlist: {playlistName}<br/></Typography>
      <Typography variant="body1">Song #: {songCount + 1}<br/></Typography>
      <Typography variant="body1">Title: {title}<br/></Typography>
      <Typography variant="body1">Artist: {artist}</Typography>
      <Box sx={{height: '20%', backgroundColor: '#ACC8D5', borderRadius: '10px', textAlign:'center', mx: '5%', my: '2%', border:1, borderWidth: '2px', boxShadow: '1px 3px 3px pink'}}>
        <IconButton onClick = {handlePrevious} sx = {{color: 'black'}} disabled = {songCount === 0}><FastRewindIcon/></IconButton>
        <IconButton onClick = {handleStop} sx = {{color: 'black'}} disabled = {vidPlaying === false}><StopIcon/></IconButton>
        <IconButton onClick = {handlePlay} sx = {{color: 'black'}} disabled = {vidPlaying === true || store.currentList === null || store.currentList.songs.length === 0}>
          <PlayArrowIcon/>
        </IconButton>
        <IconButton onClick = {handleSkip} sx = {{color: 'black'}} disabled = {songCount + 1 >= length}><FastForwardIcon/></IconButton>
      </Box>
    </Box>
    </div>);
}