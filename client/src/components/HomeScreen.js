import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import MUIEditSongModal from './MUIEditSongModal'

import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import SortIcon from '@mui/icons-material/Sort';
import { Toolbar, Button } from '@mui/material';
import Youtube from 'react-youtube';
import YoutubePlayer from './YouTubePlayer';
import CommentsSection from './CommentsSection';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [isPlayerOpen, setPlayerOpen] = useState(null);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handlePlayer(){
        setPlayerOpen(true)
    };

    function handleComments(){
        setPlayerOpen(false)
    };


    let listCard = "";
    const homeScreenMenu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
        <MenuItem onClick={handleMenuClose}>Name(A - Z)</MenuItem>
        <MenuItem onClick={handleMenuClose}>Publish Date(Newest)</MenuItem>
        <MenuItem onClick={handleMenuClose}>Listens(High - Low)</MenuItem>
        <MenuItem onClick={handleMenuClose}>Likes(High - Low)</MenuItem>
        <MenuItem onClick={handleMenuClose}>Dislikes(High - Low)</MenuItem>
    </Menu>
    );
    if (store) {
        listCard = 
            <List sx={{borderRadius: 5, bgcolor: '#C9EEFF'}} >
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" id="home-screen-banner">
            <Toolbar>
                <IconButton> <HomeOutlinedIcon sx={{ fontSize:40}}/></IconButton>
                <IconButton> <GroupsOutlinedIcon sx={{ fontSize:40}}/></IconButton>
                <IconButton> <PersonOutlineOutlinedIcon sx={{ fontSize:40}}/></IconButton>
                <Box sx={{ flexGrow: 1 }}>
                <input type="text" placeholder="Search" className="searchBar"></input>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Typography className="sortBy">SORT BY</Typography>
                    <IconButton
                    onClick={handleSortMenuOpen}
                    >
                        <SortIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
        {
            homeScreenMenu
        }
        <Box id="list-selector-list">
            {
                listCard
            }
            <MUIDeleteModal />
            <MUIRemoveSongModal />
            <MUIEditSongModal />
        </Box>
        <Box id="player-comments">
            <Box id="player-comments-buttons">
            <Button id="player-button" variant="outlined" onClick={handlePlayer}>Player</Button>
            <Button id="comments-button" variant="outlined" onClick={handleComments}>Comments</Button>
            </Box>
            {isPlayerOpen? <YoutubePlayer/>: <CommentsSection/>}
        </Box>
        <div id = "add-list">
            <IconButton onClick={handleCreateNewList}><AddIcon /></IconButton> 
            Your Lists
        </div>
    </Box>
        );
}

export default HomeScreen;