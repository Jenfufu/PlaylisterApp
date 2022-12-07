
import {Box, Button} from '@mui/material/';

export default function PlayerAndComments (){
    return (
        <div>
            <Box>
                <Button id="player-button" variant="outlined">Player</Button>
                <Button id="comments-button" variant="outlined">Comments</Button>
            </Box>
        </div>
    );
}