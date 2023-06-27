import React, { useContext, useState } from 'react';
import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { ApplicationsContext } from '../applicatonFiles/ApplicationsContext';
import { QueueContext } from './QueueContext';

const CreateTicket = () => {
    const { applications, updateApplicationStatus, getApplicationDate } = useContext(ApplicationsContext);
    const { addTicketToQueue } = useContext(QueueContext);
    const [selectedApplicationId, setSelectedApplicationId] = useState('');
    const [priority, setPriority] = useState('NORMAL');

    const invitedApplications = applications.filter(
        (application) => application.status === 'Zaproszenie na rozmowę kwalifikacyjną'
    );

    const generateTicketNumber = () => {
        //xxx
    };

    const handleApplicationSelect = (event) => {
        setSelectedApplicationId(event.target.value);
    };

    const handlePrioritySelect = (event) => {
        setPriority(event.target.value);
    };

    const handleCreateTicket = () => {
        if (selectedApplicationId) {
            const selectedApplication = invitedApplications.find(
                (application) => application.id === selectedApplicationId
            );

            const isTicketExist = applications.some(
                (application) =>
                    application.id === selectedApplicationId && application.status === 'Zakończono'
            );

            if (!isTicketExist) {
                const newTicket = {
                    number: generateTicketNumber(),
                    id: selectedApplicationId,
                    position: selectedApplication.position,
                    priority: priority,
                };

                updateApplicationStatus(selectedApplicationId, 'Zakończono');
                addTicketToQueue(newTicket);

                setSelectedApplicationId('');
                setPriority('NORMAL');
            }
        }
    };

    return (
        <Box mt={6} display="flex" flexDirection="column" alignItems="center">
            <Card>
                <CardContent>
                    <Typography
                        variant="h4"
                        component="h2"
                        style={{ fontWeight: 'bold' }}
                        sx={{ marginBottom: '24px', fontWeight: 500, textAlign: 'center' }}
                    >
                        Lista osób zaproszonych na rozmowę kwalifikacyjną
                    </Typography>
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
                                {invitedApplications.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            Brak danych
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    invitedApplications.map((application, index) => (
                                        <TableRow key={application.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{application.jobOffer}</TableCell>
                                            <TableCell>
                                                <Button
                                                    color="primary"
                                                    onClick={() => setSelectedApplicationId(application.id)}
                                                >
                                                    {application.id}
                                                </Button>
                                            </TableCell>
                                            <TableCell>{getApplicationDate(application.id)}</TableCell>
                                            <TableCell>{application.status}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            alignItems: 'center',
                            marginTop: '24px',
                            '& > *': {
                                width: '50%',
                            },
                        }}
                    >
                        <FormControl>
                            <InputLabel>ID zgłoszenia</InputLabel>
                            <Select value={selectedApplicationId} onChange={handleApplicationSelect}>
                                {invitedApplications.map((application) => (
                                    <MenuItem key={application.id} value={application.id}>
                                        {application.id}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Priorytet</InputLabel>
                            <Select value={priority} onChange={handlePrioritySelect}>
                                <MenuItem value="NORMAL">NORMAL</MenuItem>
                                <MenuItem value="HIGH">HIGH</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={handleCreateTicket}>
                            Utwórz bilet
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CreateTicket;
