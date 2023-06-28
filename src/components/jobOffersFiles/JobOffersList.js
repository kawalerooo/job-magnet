import React, { useState, useContext } from 'react';
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
} from '@mui/material';

const JobOffersList = () => {
    const { jobOffers, deleteJobOffer, filterJobOffers, favoriteOffers, toggleFavoriteOffer } = useContext(JobOffersContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPositionLevel, setSelectedPositionLevel] = useState('');
    const [selectedContractType, setSelectedContractType] = useState('');
    const [selectedWorkload, setSelectedWorkload] = useState('');
    const [selectedWorkMode, setSelectedWorkMode] = useState('all');

    const handleDelete = (id) => {
        deleteJobOffer(id);
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

    const handleToggleFavorite = (id) => {
        toggleFavoriteOffer(id);
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
                    <MenuItem value="intern">Intern</MenuItem>
                    <MenuItem value="assistant">Assistant</MenuItem>
                    <MenuItem value="junior">Junior</MenuItem>
                    <MenuItem value="mid">Mid</MenuItem>
                    <MenuItem value="senior">Senior</MenuItem>
                    <MenuItem value="director">Director</MenuItem>
                    <MenuItem value="president">President</MenuItem>
                    <MenuItem value="worker">Worker</MenuItem>
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
                    <MenuItem value="employmentContract">Employment Contract</MenuItem>
                    <MenuItem value="contractOfMandate">Contract of Mandate</MenuItem>
                    <MenuItem value="b2bContract">B2B Contract</MenuItem>
                    <MenuItem value="internshipContract">Internship Contract</MenuItem>
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
                    <MenuItem value="partTime">Part-Time</MenuItem>
                    <MenuItem value="temporaryAdditional">Temporary Additional</MenuItem>
                    <MenuItem value="fullTime">Full-Time</MenuItem>
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
            </Box>
            <Card>
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
                                        Akcje
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterAndSearchJobOffers().length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            Obecnie nie przeprowadzamy rekrutacji
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filterAndSearchJobOffers().map((offer) => (
                                        <TableRow key={offer.id}>
                                            <TableCell>
                                                <Button
                                                    component={Link}
                                                    to={{
                                                        pathname: `/jobOffers/${offer.id}`,
                                                        state: { offerName: offer.title },
                                                    }}
                                                    color="secondary"
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor: '#1976d2',
                                                    }}
                                                >
                                                    {offer.title}
                                                </Button>
                                            </TableCell>
                                            <TableCell>{offer.date.toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                {Object.keys(offer.positionLevel || {})
                                                    .filter((key) => offer.positionLevel[key])
                                                    .join(', ')}
                                            </TableCell>
                                            <TableCell>
                                                {Object.keys(offer.contractType || {})
                                                    .filter((key) => offer.contractType[key])
                                                    .join(', ')}
                                            </TableCell>
                                            <TableCell>
                                                {Object.keys(offer.workload || {})
                                                    .filter((key) => offer.workload[key])
                                                    .join(', ')}
                                            </TableCell>
                                            <TableCell>
                                                {Object.keys(offer.workMode || {})
                                                    .filter((key) => offer.workMode[key])
                                                    .join(', ')}
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" gap={1}>
                                                    <Button
                                                        component={Link}
                                                        to={`/applyForm/${offer.id}`}
                                                        color="secondary"
                                                        variant="contained"
                                                        style={{
                                                            backgroundColor: '#1976d2',
                                                        }}
                                                    >
                                                        Aplikuj
                                                    </Button>
                                                    <Button
                                                        component={Link}
                                                        to={`/editJobOffer/${offer.id}`}
                                                        color="secondary"
                                                        variant="contained"
                                                        style={{
                                                            backgroundColor: '#1976d2',
                                                        }}
                                                    >
                                                        Edytuj
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDelete(offer.id)}
                                                        color="secondary"
                                                        variant="contained"
                                                        style={{
                                                            backgroundColor: 'red',
                                                            color: 'white',
                                                        }}
                                                    >
                                                        Usuń
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleToggleFavorite(offer.id)}
                                                        color="secondary"
                                                        variant="contained"
                                                        style={{
                                                            backgroundColor: favoriteOffers.includes(offer.id) ? 'yellow' : 'transparent',
                                                            color: favoriteOffers.includes(offer.id) ? 'black' : 'white',
                                                        }}
                                                    >
                                                        {favoriteOffers.includes(offer.id) ? (
                                                            <span role="img" aria-label="favorite">⭐</span>
                                                        ) : (
                                                            <span role="img" aria-label="not-favorite">⭐</span>
                                                        )}
                                                    </Button>

                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default JobOffersList;
