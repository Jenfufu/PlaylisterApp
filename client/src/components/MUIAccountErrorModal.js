import { useContext } from 'react'
import * as React from 'react';
import AuthContext from '../auth';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/system';
import { AlertTitle, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIAccountErrorModal(){
    const { auth } = useContext(AuthContext);

    function handleCloseErrorModal(event) {
        auth.hideAccountErrorModal()
    }
    
    return (
        <Modal 
            open={auth.error !== null}
        >
            <Box sx={style} textAlign="center">
            <div className="modal-dialog">
            <header className="dialog-header"> 
                Account Error
            </header>
            <Alert severity="error">
                <AlertTitle><strong>Error</strong></AlertTitle>
                {auth.error}
            </Alert>
            <Button variant="contained" color="error"onClick={handleCloseErrorModal}>Close</Button>
            </div>
            </Box>
        </Modal>

    );
}
