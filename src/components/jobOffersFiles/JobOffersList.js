import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { JobOffersContext } from './JobOffersContext';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    MenuItem,
    Card,
    CardContent,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Grid,
    Slide,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Star as StarIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    applyButton: {
        border: 0,
        borderRadius: 3,
        color: 'white',
        height: 30,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        textTransform: 'none',
        fontWeight: 'bold',
        marginRight: '10px',
    },
    applyButtonTableCell: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '& .MuiButton-contained': {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
    },
});

const JobOffersList = () => {
    const { jobOffers, deleteJobOffer, filterJobOffers, favoriteOffers, toggleFavoriteOffer, handleApply, appliedCounts } =
        useContext(JobOffersContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPositionLevel, setSelectedPositionLevel] = useState('');
    const [selectedContractType, setSelectedContractType] = useState('');
    const [selectedWorkload, setSelectedWorkload] = useState('');
    const [selectedWorkMode, setSelectedWorkMode] = useState('all');
    const [page, setPage] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOfferId, setSelectedOfferId] = useState(null);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const rowsPerPage = 10;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    useEffect(() => {
        filterAndSearchJobOffers();
    }, [searchTerm, selectedPositionLevel, selectedContractType, selectedWorkload, selectedWorkMode]);

    const handleDelete = (id) => {
        setOpenDialog(true);
        setSelectedOfferId(id);
    };

    const handleDeleteConfirmation = () => {
        deleteJobOffer(selectedOfferId);
        setOpenDialog(false);
    };

    const handleDeleteCancel = () => {
        setOpenDialog(false);
    };

    const handleToggleFavorite = (id) => {
        toggleFavoriteOffer(id);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePositionLevelChange = (event) => {
        setSelectedPositionLevel(event.target.value);
    };

    const handleContractTypeChange = (event) => {
        setSelectedContractType(event.target.value);
    };

    const handleWorkloadChange = (event) => {
        setSelectedWorkload(event.target.value);
    };

    const handleWorkModeChange = (event) => {
        const value = event.target.value;
        if (value === 'favorites') {
            setSelectedWorkMode('favorites');
        } else {
            setSelectedWorkMode('all');
        }
    };

    const filterAndSearchJobOffers = () => {
        let filteredOffers = filterJobOffers();

        if (searchTerm !== '') {
            const searchTermLowerCase = searchTerm.toLowerCase();
            filteredOffers = filteredOffers.filter((offer) => {
                const offerTitleLowerCase = offer.title.toLowerCase();
                return (
                    offerTitleLowerCase.indexOf(searchTermLowerCase) !== -1 &&
                    offerTitleLowerCase.indexOf(searchTermLowerCase) === 0
                );
            });
        }

        if (selectedPositionLevel !== '') {
            filteredOffers = filteredOffers.filter((offer) => offer.positionLevel[selectedPositionLevel]);
        }

        if (selectedContractType !== '') {
            filteredOffers = filteredOffers.filter((offer) => offer.contractType[selectedContractType]);
        }

        if (selectedWorkload !== '') {
            filteredOffers = filteredOffers.filter((offer) => offer.workload[selectedWorkload]);
        }

        if (selectedWorkMode === 'favorites') {
            filteredOffers = filteredOffers.filter((offer) => favoriteOffers.includes(offer.id));
        }

        return filteredOffers;
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setShowScrollToTop(scrollTop > 500);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const displayedOffers = filterAndSearchJobOffers().slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    const positionLevelTranslations = {
        intern: 'Stażysta',
        assistant: 'Asystent',
        junior: 'Junior',
        mid: 'Mid',
        senior: 'Senior',
        director: 'Dyrektor',
        president: 'Prezes',
        worker: 'Pracownik',
    };

    const contractTypeTranslations = {
        employmentContract: 'Umowa o pracę',
        contractOfMandate: 'Umowa zlecenie',
        b2bContract: 'Umowa B2B',
        internshipContract: 'Umowa stażowa',
    };

    const workloadTranslations = {
        partTime: 'W niepełnym wymiarze',
        temporaryAdditional: 'Czasowo dodatkowe',
        fullTime: 'W pełnym wymiarze',
    };

    const workModeTranslations = {
        stationary: 'Stacjonarny',
        remote: 'Zdalny',
        hybrid: 'Hybrydowy',
        all: 'Wszystkie',
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
            <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                Lista ofert pracy
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" mb={4}>
                <TextField
                    label="Szukaj"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                        marginRight: '16px',
                        width: '300px',
                    }}
                />
                <TextField
                    select
                    label="Poziom stanowiska"
                    variant="outlined"
                    value={selectedPositionLevel}
                    onChange={handlePositionLevelChange}
                    sx={{
                        marginRight: '16px',
                        width: '200px',
                    }}
                >
                    <MenuItem value="">Wszystkie</MenuItem>
                    {Object.keys(positionLevelTranslations).map((level) => (
                        <MenuItem key={level} value={level}>
                            {positionLevelTranslations[level]}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Rodzaj umowy"
                    variant="outlined"
                    value={selectedContractType}
                    onChange={handleContractTypeChange}
                    sx={{
                        marginRight: '16px',
                        width: '200px',
                    }}
                >
                    <MenuItem value="">Wszystkie</MenuItem>
                    {Object.keys(contractTypeTranslations).map((type) => (
                        <MenuItem key={type} value={type}>
                            {contractTypeTranslations[type]}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Wymiar pracy"
                    variant="outlined"
                    value={selectedWorkload}
                    onChange={handleWorkloadChange}
                    sx={{
                        marginRight: '16px',
                        width: '200px',
                    }}
                >
                    <MenuItem value="">Wszystkie</MenuItem>
                    {Object.keys(workloadTranslations).map((workload) => (
                        <MenuItem key={workload} value={workload}>
                            {workloadTranslations[workload]}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Ulubione"
                    variant="outlined"
                    value={selectedWorkMode === 'favorites' ? 'favorites' : 'all'}
                    onChange={handleWorkModeChange}
                    sx={{
                        width: '200px',
                    }}
                >
                    <MenuItem value="all">Wszystkie</MenuItem>
                    <MenuItem value="favorites">Tylko ulubione</MenuItem>
                </TextField>
                <IconButton component={Link} to="/newJobOffer" color="primary" size="large">
                </IconButton>
            </Box>
            <Card sx={{ width: '100%' }}>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" style={{ fontWeight: 'bold' }}>
                                        Nazwa ogłoszenia
                                    </TableCell>
                                    <TableCell component="th" style={{ fontWeight: 'bold' }}>
                                        Data dodania
                                    </TableCell>
                                    <TableCell component="th" style={{ fontWeight: 'bold' }}>
                                        Poziom stanowiska
                                    </TableCell>
                                    <TableCell component="th" style={{ fontWeight: 'bold' }}>
                                        Rodzaj umowy
                                    </TableCell>
                                    <TableCell component="th" style={{ fontWeight: 'bold' }}>
                                        Wymiar pracy
                                    </TableCell>
                                    <TableCell component="th" style={{ fontWeight: 'bold' }}>
                                        Tryb pracy
                                    </TableCell>
                                    <TableCell component="th" style={{ fontWeight: 'bold' }}>
                                        Ilość zgłoszeń
                                    </TableCell>
                                    <TableCell component="th" style={{ fontWeight: 'bold' }}>
                                        Akcje
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedOffers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                                            Obecnie nie przeprowadzamy rekrutacji
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    displayedOffers.map((offer, index) => (
                                        <Slide direction={isMobile ? 'left' : 'up'} in={true} key={offer.id} timeout={300 + index * 100}>
                                            <TableRow>
                                                <TableCell>
                                                    <Button
                                                        component={Link}
                                                        to={{
                                                            pathname: `/jobOffers/${offer.id}`,
                                                            state: { offerName: offer.title },
                                                        }}
                                                        color="primary"
                                                        variant="contained"
                                                        className={classes.applyButton}
                                                    >
                                                        {offer.title}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>{offer.date.toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    {Object.keys(offer.positionLevel || {})
                                                        .filter((key) => offer.positionLevel[key])
                                                        .map((level) => positionLevelTranslations[level])
                                                        .join(', ')}
                                                </TableCell>
                                                <TableCell>
                                                    {Object.keys(offer.contractType || {})
                                                        .filter((key) => offer.contractType[key])
                                                        .map((type) => contractTypeTranslations[type])
                                                        .join(', ')}
                                                </TableCell>
                                                <TableCell>
                                                    {Object.keys(offer.workload || {})
                                                        .filter((key) => offer.workload[key])
                                                        .map((workload) => workloadTranslations[workload])
                                                        .join(', ')}
                                                </TableCell>
                                                <TableCell>
                                                    {Object.keys(offer.workMode || {})
                                                        .filter((key) => offer.workMode[key])
                                                        .map((workMode) => workModeTranslations[workMode])
                                                        .join(', ')}
                                                </TableCell>
                                                <TableCell>{appliedCounts[offer.id] || 0} zgłoszeń</TableCell>
                                                <TableCell className={classes.applyButtonTableCell}>
                                                    <Grid container spacing={1}>
                                                        <Grid item>
                                                            <IconButton
                                                                component={Link}
                                                                to={`/applyForm/${offer.id}`}
                                                                color="primary"
                                                                size="small"
                                                                onClick={() => handleApply(offer.id)}
                                                            >
                                                                Aplikuj
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item>
                                                            <IconButton
                                                                component={Link}
                                                                to={`/editJobOffer/${offer.id}`}
                                                                color="primary"
                                                                size="small"
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item>
                                                            <IconButton
                                                                onClick={() => handleDelete(offer.id)}
                                                                color="error"
                                                                size="small"
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item>
                                                            <IconButton
                                                                onClick={() => handleToggleFavorite(offer.id)}
                                                                color={favoriteOffers.includes(offer.id) ? 'warning' : 'default'}
                                                                size="small"
                                                            >
                                                                <StarIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        </Slide>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {displayedOffers.length > rowsPerPage && (
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Pagination
                                count={Math.ceil(filterAndSearchJobOffers().length / rowsPerPage)}
                                page={page + 1}
                                onChange={handleChangePage}
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>

            {showScrollToTop && (
                <IconButton
                    onClick={scrollToTop}
                    color="primary"
                    size="medium"
                    sx={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 9999,
                        backgroundColor: '#1976d2',
                    }}
                >
                    <KeyboardArrowUpIcon />
                </IconButton>
            )}

            <Dialog open={openDialog} onClose={handleDeleteCancel}>
                <DialogTitle>Potwierdź usunięcie zgłoszenia</DialogTitle>
                <DialogContent>Czy na pewno chcesz usunąć to zgłoszenie?</DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default JobOffersList;
