import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    FeedbackSharp as FeedbackIcon,
} from '@mui/material';
import { CalculateSharp as CalculateIcon, DescriptionSharp as CvIcon } from '@mui/icons-material';
import SuggestionIcon from '@mui/icons-material/Send';

const Header = ({ username }) => {
    const [selectedTab, setSelectedTab] = useState('');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#121212', color: '#fff', marginBottom: '20px' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, marginLeft: '240px' }}>
                    <Button
                        color="inherit"
                        component={NavLink}
                        to="/cvCreator"
                        activeClassName="selected"
                        onClick={() => handleTabClick('/cvCreator')}
                        startIcon={<CvIcon />}
                    >
                        Kreator CV
                    </Button>
                </Box>
                <Typography variant="body1">
                    Aktualnie zalogowany: {username}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
