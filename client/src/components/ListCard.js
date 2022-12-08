import { useContext, useState } from 'react'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import { Button, MenuItem, Typography } from '@mui/material';
import SongCard from './SongCard.js'
import List from '@mui/material/List';
import YoutubePlayer from './YouTubePlayer';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { idNamePair, selected } = props;
    store.history = useHistory();

    function handleLoadList(event, id) {
        event.stopPropagation();
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            console.log(text)
            console.log(id)
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleLoadPlayer(event, id) {
        store.setListToPlay(id);
    }
    function handleDuplicateList(event, id) {
        store.duplicateList(id);
    }
    function handlePublish(event, id) {
        console.log("at handle publish")
        store.publishPlaylist(id);
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement = null;
    if (store.currentList!==null && store.currentList._id === idNamePair._id){
    cardElement =
    <Box>
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '10px', display: 'flex', p: 1}}
            style={{ width: '100%', fontSize: '20pt' }}
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            <Box sx={{ p: 1}}>
                <IconButton>
                    <ThumbUpOffAltIcon />
                </IconButton>
            </Box>
            <Box sx={{ p: 1}}>
                <IconButton>
                    <ThumbDownOffAltIcon /> 
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={store.closeCurrentList}>
                    <KeyboardDoubleArrowUpOutlinedIcon />
                </IconButton>
            </Box>
        </ListItem>
        <Box>
            <List>
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}

                    />
                ))
            }
            </List>
            <Button variant="outlined" onClick={handleAddNewSong}>Add</Button>
            <Button variant="outlined" onClick={handleUndo}>Undo</Button>
            <Button variant="outlined" onClick={handleRedo}>Redo</Button>
            <Button variant="outlined" onClick={(event) => {handlePublish(event, idNamePair._id)}}>Publish</Button>
            <Button variant="outlined" onClick={(event) => {handleDeleteList(event, idNamePair._id)}}>Delete</Button>
            <Button variant="outlined" onClick={(event) => {handleDuplicateList(event, idNamePair._id)}}>Duplicate</Button>
         </Box>
    </Box>
    }
    else {
        cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '10px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '20pt' }}
            button
            onClick = {(event) => {
                handleLoadPlayer(event, idNamePair._id)
            }} 
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            <Box sx={{ p: 1}}>
                <IconButton>
                    <ThumbUpOffAltIcon />
                </IconButton>
            </Box>
            <Box sx={{ p: 1}}>
                <IconButton>
                    <ThumbDownOffAltIcon />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleLoadList(event, idNamePair._id)
                    }}>
                        <KeyboardDoubleArrowDownOutlinedIcon />
                </IconButton>
            </Box>
        </ListItem>
    }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;