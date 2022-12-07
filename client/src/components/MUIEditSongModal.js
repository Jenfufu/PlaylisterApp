import { useContext, useState, useEffect } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState("");
    const [ artist, setArtist ] = useState("")
    const [ youTubeId, setYouTubeId ] = useState("");

    useEffect(() => {

        if(store.currentSong) {
            setTitle(store.currentSong.title)
            setArtist(store.currentSong.artist)
            setYouTubeId(store.currentSong.youTubeId)
        }

    }, [store.currentSong])

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.currentModal==="EDIT_SONG"}
        >
            <Box sx={style}>
                <Typography variant="h3" mb={2}>Edit Song</Typography>
                <Typography variant="h6">Title:</Typography>
                    <input type="text" id="edit-song-modal-title-textfield" defaultValue={title} onChange={handleUpdateTitle}></input>
                <Typography variant="h6">Artist:</Typography>
                    <input type="text" id="edit-song-modal-artist-textfield" defaultValue={artist} onChange={handleUpdateArtist}></input>
                <Typography variant="h6">YouTube Id:</Typography>
                    <input type="text" id="edit-song-modal-youTubeId-textfield" defaultValue={youTubeId} onChange={handleUpdateYouTubeId}></input>
                <Button size="small" variant="contained" color="success" onClick={handleConfirmEditSong}>Confirm</Button>
                <Button size="small" variant="contained" color="error" onClick={handleCancelEditSong}>Cancel</Button>
            </Box>
            </Modal>
    );
}