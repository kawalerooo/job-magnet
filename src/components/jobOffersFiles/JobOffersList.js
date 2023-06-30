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

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
            <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
                Lista ofert pracy
            </Typography>
            <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                <TextField
                    label="Szukaj"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                        marginRight: '16px',
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#1976d2',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976d2',
                            },
                        },
                    }}
                />
                <TextField
                    select
                    label="Poziom stanowiska"
                    variant="outlined"
                    value={selectedPositionLevel}
                    onChange={handlePositionLevelChange}
                    sx={{
                        width: '200px',
                        marginRight: '16px',
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#1976d2',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976d2',
                            },
                        },
                    }}
                >
                    <MenuItem value="">Wszystkie</MenuItem>
                    {Object.entries(positionLevelTranslations).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                            {label}
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
                        width: '200px',
                        marginRight: '16px',
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#1976d2',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976d2',
                            },
                        },
                    }}
                >
                    <MenuItem value="">Wszystkie</MenuItem>
                    {Object.entries(contractTypeTranslations).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                            {label}
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
                        width: '200px',
                        marginRight: '16px',
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#1976d2',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976d2',
                            },
                        },
                    }}
                >
                    <MenuItem value="">Wszystkie</MenuItem>
                    {Object.entries(workloadTranslations).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                            {label}
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
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#1976d2',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976d2',
                            },
                        },
                    }}
                >
                    <MenuItem value="all">Wszystkie</MenuItem>
                    <MenuItem value="favorites">Tylko ulubione</MenuItem>
                </TextField>
                <IconButton component={Link} to="/newJobOffer" color="primary" size="large">
                    {/* Dodaj ikonę dla przycisku */}
                </IconButton>
            </Box>
            <Card sx={{ marginTop: '16px', width: '100%' }}>
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
                                                    >
                                                        {offer.title}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>{offer.date.toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    {Object.keys(offer.positionLevel || {})
                                                        .filter((key) => offer.positionLevel[key])
                                                        .map((key) => positionLevelTranslations[key])
                                                        .join(', ')}
                                                </TableCell>
                                                <TableCell>
                                                    {Object.keys(offer.contractType || {})
                                                        .filter((key) => offer.contractType[key])
                                                        .map((key) => contractTypeTranslations[key])
                                                        .join(', ')}
                                                </TableCell>
                                                <TableCell>
                                                    {Object.keys(offer.workload || {})
                                                        .filter((key) => offer.workload[key])
                                                        .map((key) => workloadTranslations[key])
                                                        .join(', ')}
                                                </TableCell>
                                                <TableCell>
                                                    {Object.keys(offer.workMode || {})
                                                        .filter((key) => offer.workMode[key])
                                                        .map((key) => workModeTranslations[key])
                                                        .join(', ')}
                                                </TableCell>
                                                <TableCell>{appliedCounts[offer.id] || 0} zgłoszeń</TableCell>
                                                <TableCell>
                                                    <Box display="flex" gap={1}>
                                                        <IconButton
                                                            component={Link}
                                                            to={`/applyForm/${offer.id}`}
                                                            color="primary"
                                                            size="small"
                                                            onClick={() => handleApply(offer.id)}
                                                        >
                                                            Aplikuj
                                                        </IconButton>
                                                        <IconButton
                                                            component={Link}
                                                            to={`/editJobOffer/${offer.id}`}
                                                            color="primary"
                                                            size="small"
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(offer.id)}
                                                            color="error"
                                                            size="small"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleToggleFavorite(offer.id)}
                                                            color={favoriteOffers.includes(offer.id) ? 'warning' : 'default'}
                                                            size="small"
                                                        >
                                                            <StarIcon />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        </Slide>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Pagination
                            count={Math.ceil(filterAndSearchJobOffers().length / rowsPerPage)}
                            page={page + 1}
                            onChange={handleChangePage}
                        />
                    </Box>
                </CardContent>
            </Card>

            {showScrollToTop && (
                <IconButton
                    onClick={scrollToTop}
                    color="primary"
                    size="medium"
                    style={{
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
