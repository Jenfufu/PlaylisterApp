import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Box, List, TextField } from '@mui/material';
import CommentCard from './CommentCard';

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
                {
                    store.listToPlay.comments.map((commentCard) => (
                        <CommentCard 
                            comment={commentCard}
                        />
                    ))
                }
            </List>
            <TextField label="Add Comment" onKeyPress={handleKeyPress} onChange={handleChange} value={comment}></TextField>
        </Box>
    );
}