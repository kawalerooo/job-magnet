import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { CalculateSharp as CalculateIcon, DescriptionSharp as CvIcon, FeedbackSharp as FeedbackIcon } from '@mui/icons-material';

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
                        component={Link}
                        to="/salaryCalculator"
                        selected={selectedTab === '/salaryCalculator'}
                        onClick={() => handleTabClick('/salaryCalculator')}
                        startIcon={<CalculateIcon />}
                    >
                        Kalkulator wynagrodzeń
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/cvCreator"
                        selected={selectedTab === '/cvCreator'}
                        onClick={() => handleTabClick('/cvCreator')}
                        startIcon={<CvIcon />}
                    >
                        Kreator CV
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/sendSuggestions"
                        selected={selectedTab === '/sendSuggestions'}
                        onClick={() => handleTabClick('/sendSuggestions')}
                        startIcon={<FeedbackIcon />}
                    >
                        Wyślij sugestie
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
