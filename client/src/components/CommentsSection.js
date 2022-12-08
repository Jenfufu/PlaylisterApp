import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Box, List, TextField } from '@mui/material';


export default function CommentsSection() {
    const { store } = useContext(GlobalStoreContext);
    const [comment, setComment] = useState('');

    function handleKeyPress(event) {
        if (event.code === "Enter"){
            store.updateComments(comment)
            setComment('')
        }
    }

    function handleChange(event) {
        setComment(event.target.value)
    }

    return(
        <Box id="comment-box" sx={{borderRadius: "10px"}}>
            <List>
                Empty For Now
            </List>
            <TextField label="Add Comment" onKeyPress={handleKeyPress} onChange={handleChange} value={comment}></TextField>
        </Box>
    );
}