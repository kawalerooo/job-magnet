import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Switch,
} from '@mui/material';
import {
    Home as HomeIcon,
    Work as WorkIcon,
    Assignment as AssignmentIcon,
    List as ListIcon,
    Create as CreateIcon,
    Queue as QueueIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import appLogo from '../../appLogo.png';
import { QueueContext } from '../queueSystemFiles/QueueContext';

const Sidebar = () => {
    const [selectedTab, setSelectedTab] = useState('');
    const { queueEnabled, setQueueEnabled } = useContext(QueueContext);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: '240px',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: '240px',
                    boxSizing: 'border-box',
                    backgroundColor: '#121212',
                    color: '#FFF',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1,
                    overflow: 'hidden',
                    transform: 'scale(1)',
                    transformOrigin: 'top left',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    marginTop: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '140px',
                        padding: '0 16px',
                        backgroundColor: '#121212',
                    }}
                >
                    <img
                        src={appLogo}
                        alt="Logo"
                        style={{ width: '80%', height: 'auto', objectFit: 'contain' }}
                    />
                </Box>

                <List sx={{ flexGrow: 1, paddingTop: '16px' }}>
                    <ListItem
                        button
                        component={Link}
                        to="/"
                        selected={selectedTab === '/'}
                        onClick={() => handleTabClick('/')}
                        sx={{
                            color: '#FFF',
                            backgroundColor: selectedTab === '/' ? '#1976d2' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#FFF' }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Strona główna"
                            primaryTypographyProps={{ sx: { textAlign: 'center' } }}
                        />
                    </ListItem>

                    <ListItem
                        button
                        component={Link}
                        to="/jobOffers"
                        selected={selectedTab === '/jobOffers'}
                        onClick={() => handleTabClick('/jobOffers')}
                        sx={{
                            color: '#FFF',
                            backgroundColor: selectedTab === '/jobOffers' ? '#1976d2' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#FFF' }}>
                            <WorkIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Stwórz ogłoszenie"
                            primaryTypographyProps={{ sx: { textAlign: 'center' } }}
                        />
                    </ListItem>

                    <ListItem
                        button
                        component={Link}
                        to="/jobOffersList"
                        selected={selectedTab === '/jobOffersList'}
                        onClick={() => handleTabClick('/jobOffersList')}
                        sx={{
                            color: '#FFF',
                            backgroundColor: selectedTab === '/jobOffersList' ? '#1976d2' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#FFF' }}>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Oferty pracy"
                            primaryTypographyProps={{ sx: { textAlign: 'center' } }}
                        />
                    </ListItem>

                    <ListItem
                        button
                        component={Link}
                        to="/applicationsList"
                        selected={selectedTab === '/applicationsList'}
                        onClick={() => handleTabClick('/applicationsList')}
                        sx={{
                            color: '#FFF',
                            backgroundColor: selectedTab === '/applicationsList' ? '#1976d2' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#FFF' }}>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Przeglądaj aplikacje"
                            primaryTypographyProps={{ sx: { textAlign: 'center' } }}
                        />
                    </ListItem>

                    <ListItem
                        button
                        component={Link}
                        to="/createTicket"
                        selected={selectedTab === '/createTicket'}
                        onClick={() => handleTabClick('/createTicket')}
                        sx={{
                            color: '#FFF',
                            backgroundColor: selectedTab === '/createTicket' ? '#1976d2' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#FFF' }}>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Stwórz bilet"
                            primaryTypographyProps={{ sx: { textAlign: 'center' } }}
                        />
                    </ListItem>

                    {queueEnabled ? (
                        <ListItem
                            button
                            component={Link}
                            to="/queue"
                            selected={selectedTab === '/queue'}
                            onClick={() => handleTabClick('/queue')}
                            sx={{
                                color: '#FFF',
                                backgroundColor: selectedTab === '/queue' ? '#1976d2' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#1976d2',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: '#FFF' }}>
                                <QueueIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Kolejka"
                                primaryTypographyProps={{ sx: { textAlign: 'center' } }}
                            />
                        </ListItem>
                    ) : (
                        <ListItem
                            sx={{
                                color: '#CCC',
                                backgroundColor: 'transparent',
                                pointerEvents: 'none',
                            }}
                        >
                            <ListItemIcon sx={{ color: '#CCC' }}>
                                <QueueIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Kolejka (wyłączona)"
                                primaryTypographyProps={{ sx: { textAlign: 'center' } }}
                            />
                        </ListItem>
                    )}

                    <ListItem
                        button
                        component={Link}
                        to="/queueManagement"
                        selected={selectedTab === '/queueManagement'}
                        onClick={() => handleTabClick('/queueManagement')}
                        sx={{
                            color: '#FFF',
                            backgroundColor: selectedTab === '/queueManagement' ? '#1976d2' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#FFF' }}>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Zarządzanie kolejką"
                            primaryTypographyProps={{ sx: { textAlign: 'center' } }}
                        />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
