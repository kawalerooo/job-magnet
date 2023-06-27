import React from 'react';
import { Typography, Box, Button, createTheme, ThemeProvider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    backgroundColor: '#1976d2',
                    '&:hover': {
                        backgroundColor: '#1976d2',
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    },
                },
            },
        },
    },
});

const ApplicationConfirmation = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <CheckCircleOutlineIcon sx={{ fontSize: 100, color: 'green' }} />
                <Typography variant="h4" component="h2" sx={{ mt: 2 }}>
                    Twoja aplikacja została przyjęta!
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Możesz ją śledzić w zakładce lista aplikacji.
                </Typography>
                <Button component={Link} to="/applicationsList" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Przejdź do listy aplikacji
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default ApplicationConfirmation;
