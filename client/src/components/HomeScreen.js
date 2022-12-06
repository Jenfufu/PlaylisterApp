import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

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
import { Toolbar } from '@mui/material';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

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
            <List sx={{ width: '50%', left: '2%', top: '10%', borderRadius: 5, bgcolor: '#C9EEFF', mb:"15px"}}>
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
        <Box>
            {
                listCard
            }
            <MUIDeleteModal />
        </Box>
        <div id = "add-list">
            <input
                type = "button"
                onClick = {handleCreateNewList}
                value="+" />
            Your Lists
        </div>
    </Box>
        );
}

export default HomeScreen;