import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Box, List } from '@mui/material';

export default function CommentsSection() {
    const { store } = useContext(GlobalStoreContext);

    return(
        <Box id="comment-box" sx={{borderRadius: "10px"}}>
            <List>
                Empty For Now
            </List>
            <input type="text" placeholder="Add Comment" float="bottom"></input>
        </Box>
    );
}