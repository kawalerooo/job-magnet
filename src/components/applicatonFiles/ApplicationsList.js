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
    TablePagination,
    Slide,
    IconButton,
    Grid,
} from '@mui/material';
import { ApplicationsContext } from './ApplicationsContext';
import { JobOffersContext } from '../jobOffersFiles/JobOffersContext';
import { makeStyles } from '@mui/styles';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Star as StarIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';

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

const ApplicationsList = () => {
    const { applications, updateApplicationStatus, getApplicationDate } = useContext(ApplicationsContext);
    const { jobOffers } = useContext(JobOffersContext);
    const [selectedJobOffer, setSelectedJobOffer] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

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
            ((selectedStatus === 'Aplikacja została złożona' && application.status !== 'Aplikacja została złożona') ||
                (selectedStatus !== 'Aplikacja została złożona' && application.status !== selectedStatus))
        ) {
            return false;
        }
        return true;
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredApplications.length - page * rowsPerPage);

    const filteredApplicationsWithDefaultStatus =
        selectedStatus === 'Aplikacja została złożona'
            ? filteredApplications.filter((application) => application.status === 'Aplikacja została złożona')
            : filteredApplications;

    const classes = useStyles();

    return (
        <Box mt={6} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
                Lista aplikacji
            </Typography>
            <Box mt={2} display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" mb={4}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <TextField
                            select
                            label="Filtruj ofertę pracy"
                            variant="outlined"
                            value={selectedJobOffer}
                            onChange={handleJobOfferChange}
                            sx={{ width: '300px' }}
                        >
                            <MenuItem value="">Wszystkie</MenuItem>
                            {jobOffers.map((offer) => (
                                <MenuItem key={offer.id} value={offer.title}>
                                    {offer.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item>
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
                    </Grid>
                    <Grid item>
                        <IconButton component={Link} to="/newApplication" color="primary" size="large">
                        </IconButton>
                    </Grid>
                </Grid>
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
                            {filteredApplicationsWithDefaultStatus.length === 0 ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            Brak aplikacji
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {filteredApplicationsWithDefaultStatus
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((application, index) => (
                                            <Slide direction="up" in={true} key={application.id} timeout={300 + index * 100}>
                                                <TableRow>
                                                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
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
                                                            SelectProps={{
                                                                displayEmpty: true,
                                                                renderValue: (value) =>
                                                                    value || 'Aplikacja została złożona',
                                                            }}
                                                        >
                                                            <MenuItem value="Aplikacja została złożona">
                                                                Aplikacja została złożona
                                                            </MenuItem>
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
                                            </Slide>
                                        ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[]}
                        count={filteredApplicationsWithDefaultStatus.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default ApplicationsList;
