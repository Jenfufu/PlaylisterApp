import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Button} from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
            open={store.currentModal==="REMOVE_SONG"}
        >
            <Box sx={style}>
            <div
        id="remove-song-modal"
        className={modalClass}
        data-animation="slideInOutLeft">
        <div id='verify-remove-song-root'>
            <div className="modal-north">
                <h1>Remove {songTitle}?</h1>
            </div>
            <div className="modal-center">
                <div className="modal-center-content">
                    <font size="6">Are you sure you wish to permanently remove {songTitle} from the playlist?</font>
                </div>
            </div>
            <div className="modal-south">
                <Button size="small" variant="contained" color="success" onClick={handleConfirmRemoveSong}>Confirm</Button>
                <Button size="small" variant="contained" color="error" onClick={handleCancelRemoveSong}>Cancel</Button>
            </div>
        </div>
    </div>
            </Box>
        </Modal>
    );
}