import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = ({ username }) => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#121212', color: '#fff' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    RecruitmentApp
                </Typography>
                <Box>
                    <Typography variant="body1">
                        Aktualnie zalogowany: {username}
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
