import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Card,
    CardContent,
    MenuItem,
    TextField,
    Button,
} from '@mui/material';
import { ApplicationsContext } from './ApplicationsContext';
import { JobOffersContext } from '../jobOffersFiles/JobOffersContext';

const ApplicationsList = () => {
    const { applications, updateApplicationStatus, getApplicationDate } = useContext(ApplicationsContext);
    const { jobOffers } = useContext(JobOffersContext);
    const [selectedJobOffer, setSelectedJobOffer] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const handleStatusChange = (id, e) => {
        const status = e.target.value;
        if (status === 'Aplikacja została złożona') {
            updateApplicationStatus(id, 'Aplikacja została złożona');
            setSelectedStatus('Aplikacja została złożona');
        } else {
            updateApplicationStatus(id, status);
        }
    };

    const handleJobOfferChange = (event) => {
        setSelectedJobOffer(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        const selectedStatus = event.target.value;
        setSelectedStatus(selectedStatus);
    };



    const filteredApplications = applications.filter((application) => {
        if (selectedJobOffer && application.jobOffer !== selectedJobOffer) {
            return false;
        }
        if (
            selectedStatus &&
            (
                (selectedStatus === 'Aplikacja została złożona' && application.status !== 'Aplikacja została złożona') ||
                (selectedStatus !== 'Aplikacja została złożona' && application.status !== selectedStatus)
            )
        ) {
            return false;
        }
        return true;
    });



    const filteredApplicationsWithDefaultStatus = selectedStatus === 'Aplikacja została złożona'
        ? filteredApplications.filter(application => application.status === 'Aplikacja została złożona')
        : filteredApplications;

    return (
        <Box mt={6} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
                Lista aplikacji
            </Typography>
            <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                <TextField
                    select
                    label="Filtruj ofertę pracy"
                    variant="outlined"
                    value={selectedJobOffer}
                    onChange={handleJobOfferChange}
                    sx={{ width: '300px', marginRight: '16px' }}
                >
                    <MenuItem value="">Wszystkie</MenuItem>
                    {jobOffers.map((offer) => (
                        <MenuItem key={offer.id} value={offer.title}>
                            {offer.title}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Filtruj status"
                    variant="outlined"
                    value={selectedStatus}
                    onChange={handleStatusFilterChange}
                    sx={{ width: '300px' }}
                >
                    <MenuItem value="">Wszystkie</MenuItem>
                    <MenuItem value="Aplikacja została złożona">Aplikacja została złożona</MenuItem>
                    <MenuItem value="Pracownik zapoznaje się z twoim zgłoszeniem">
                        Pracownik zapoznaje się z twoim zgłoszeniem
                    </MenuItem>
                    <MenuItem value="Zaproszenie na rozmowę kwalifikacyjną">Zaproszenie na rozmowę kwalifikacyjną</MenuItem>
                    <MenuItem value="Zakończono">Zakończono</MenuItem>
                    <MenuItem value="Odrzucono">Odrzucono</MenuItem>
                </TextField>
            </Box>
            <Card>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Numer zgłoszenia</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Nazwa ogłoszenia</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>ID zgłoszenia</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Data złożenia aplikacji</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredApplicationsWithDefaultStatus.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <Typography>Brak dostępnych aplikacji.</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredApplicationsWithDefaultStatus.map((application, index) => (
                                        <TableRow key={application.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{application.jobOffer}</TableCell>
                                            <TableCell>
                                                <Button
                                                    component={Link}
                                                    to={`/applicationDetails/${application.id}`}
                                                    color="secondary"
                                                    variant="contained"
                                                    style={{ backgroundColor: '#1976d2' }}
                                                >
                                                    {application.id}
                                                </Button>
                                            </TableCell>
                                            <TableCell>{getApplicationDate(application.id)}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    select
                                                    value={application.status}
                                                    onChange={(e) => handleStatusChange(application.id, e)}
                                                    variant="outlined"
                                                    sx={{ width: '100%' }}
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value) => value || 'Aplikacja została złożona',
                                                    }}
                                                >
                                                    <MenuItem value="Aplikacja została złożona">Aplikacja została złożona</MenuItem>
                                                    <MenuItem value="Pracownik zapoznaje się z twoim zgłoszeniem">
                                                        Pracownik zapoznaje się z twoim zgłoszeniem
                                                    </MenuItem>
                                                    <MenuItem value="Zaproszenie na rozmowę kwalifikacyjną">
                                                        Zaproszenie na rozmowę kwalifikacyjną
                                                    </MenuItem>
                                                    <MenuItem value="Zakończono">Zakończono</MenuItem>
                                                    <MenuItem value="Odrzucono">Odrzucono</MenuItem>
                                                </TextField>
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

export default ApplicationsList;
