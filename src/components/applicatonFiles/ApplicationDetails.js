import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Card,
    CardContent,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import { ApplicationsContext } from './ApplicationsContext';

const ApplicationDetails = () => {
    const { id } = useParams();
    const { applications, getJobOffer, getApplicationDate } = useContext(ApplicationsContext);
    const [application, setApplication] = useState(null);

    useEffect(() => {
        const foundApplication = applications.find((app) => app.id === id);
        setApplication(foundApplication);
    }, [applications, id]);

    if (!application) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Box textAlign="center">
                    <Typography variant="h4" component="h2">
                        Brak danych aplikacji
                    </Typography>
                    <Typography>Nie można znaleźć aplikacji o podanym identyfikatorze.</Typography>
                </Box>
            </Box>
        );
    }

    const {
        id: applicationId,
        firstName,
        lastName,
        email,
        phone,
        educationLevel,
        availability,
        salaryExpectations,
        cvFile,
        status,
    } = application;

    const jobOffer = getJobOffer(application.jobOfferId);

    const getStatusSteps = () => {
        return [
            'Aplikacja została złożona',
            'Pracownik zapoznaje się z twoim zgłoszeniem',
            'Zaproszenie na rozmowę kwalifikacyjną',
            'Zakończono',
            'Odrzucono',
        ];
    };

    const getStatusStepIndex = (status) => {
        const steps = getStatusSteps();
        const index = steps.indexOf(status);
        return index !== -1 ? index : 0;
    };

    const activeStep = getStatusStepIndex(status);

    const downloadCV = () => {
        if (cvFile) {
            const link = document.createElement('a');
            link.href = cvFile.url;
            link.download = cvFile.name;
            link.click();
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Typography
                variant="h4"
                component="h2"
                style={{ fontWeight: 'bold' }}
                sx={{ marginBottom: '24px', fontWeight: 500, textAlign: 'center' }}
            >
                Szczegóły aplikacji
            </Typography>
            <Card sx={{ maxWidth: 700, margin: '0 20px' }}>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>ID zgłoszenia:</TableCell>
                                    <TableCell>{applicationId}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Imię:</TableCell>
                                    <TableCell>{firstName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Nazwisko:</TableCell>
                                    <TableCell>
                                        {lastName ? (
                                            lastName
                                        ) : (
                                            <Typography color="textSecondary" fontStyle="italic">
                                                Brak danych
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>E-mail:</TableCell>
                                    <TableCell>
                                        {email ? (
                                            email
                                        ) : (
                                            <Typography color="textSecondary" fontStyle="italic">
                                                Brak danych
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Numer telefonu:</TableCell>
                                    <TableCell>
                                        {phone ? (
                                            phone
                                        ) : (
                                            <Typography color="textSecondary" fontStyle="italic">
                                                Brak danych
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Poziom wykształcenia:</TableCell>
                                    <TableCell>
                                        {educationLevel ? (
                                            educationLevel
                                        ) : (
                                            <Typography color="textSecondary" fontStyle="italic">
                                                Brak danych
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Od kiedy możesz rozpocząć pracę:</TableCell>
                                    <TableCell>
                                        {availability ? (
                                            availability
                                        ) : (
                                            <Typography color="textSecondary" fontStyle="italic">
                                                Brak danych
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Oczekiwania finansowe (brutto):</TableCell>
                                    <TableCell>
                                        {salaryExpectations ? (
                                            salaryExpectations
                                        ) : (
                                            <Typography color="textSecondary" fontStyle="italic">
                                                Brak danych
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>CV:</TableCell>
                                    <TableCell>
                                        {cvFile ? (
                                            <Button
                                                variant="contained"
                                                onClick={downloadCV}
                                                sx={{ width: '100%', marginBottom: '8px' }}
                                            >
                                                Pobierz CV
                                            </Button>
                                        ) : (
                                            <Typography color="textSecondary" fontStyle="italic">
                                                Brak danych
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box my={2}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {getStatusSteps().map((step, index) => (
                                <Step key={step} completed={index < activeStep}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </CardContent>
            </Card>
            <Box mt={2}>
                <Button
                    component={Link}
                    to="/applicationsList"
                    variant="contained"
                    color="primary"
                >
                    Powrót do listy aplikacji
                </Button>
            </Box>
        </Box>
    );
};

export default ApplicationDetails;
