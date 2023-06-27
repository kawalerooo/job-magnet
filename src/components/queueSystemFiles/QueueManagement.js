import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Switch,
    Button,
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { QueueContext } from './QueueContext';
import { useNavigate } from 'react-router-dom';

const QueueManagement = () => {
    const {
        queueEnabled,
        setQueueEnabled,
        currentTicket,
        startMeeting,
        endMeeting,
        ticketQueue,
        ticketOrder,
        updateTicketOrder,
        updateTicketQueue,
        removeTicketFromQueue,
    } = useContext(QueueContext);

    const [openDialog, setOpenDialog] = useState(false);
    const [confirmStartMeeting, setConfirmStartMeeting] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState('');

    const navigate = useNavigate();

    const handleQueueToggle = () => {
        setQueueEnabled(!queueEnabled);
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const newTicketOrder = Array.from(ticketOrder);
        const [removed] = newTicketOrder.splice(source.index, 1);
        newTicketOrder.splice(destination.index, 0, removed);

        const sortedQueue = newTicketOrder
            .map((ticketId) => ticketQueue.find((ticket) => ticket.id === ticketId))
            .filter((ticket) => ticket && ticket.priority && typeof ticket.priority === 'string');

        await updateTicketOrder(sortedQueue);
        await updateTicketQueue(sortedQueue);
    };

    useEffect(() => {
        updateTicketOrder(ticketQueue);
        updateTicketQueue(ticketQueue);
    }, [ticketQueue, updateTicketOrder, updateTicketQueue]);

    const isQueueEmpty = ticketQueue.length === 0;

    const handleStartMeetingConfirmation = () => {
        const selectedTicketId = ticketQueue.length > 0 ? ticketQueue[0].id : '';
        setOpenDialog(true);
        setConfirmStartMeeting(true);
        setSelectedTicketId(selectedTicketId);
    };

    const handleStartMeeting = () => {
        startMeeting(selectedTicketId);
        setOpenDialog(false);
        setConfirmStartMeeting(false);
        setSelectedTicketId('');

        const url = `/recruitment/${selectedTicketId}`;
        navigate(url);
    };

    const handleReturnToMeeting = () => {
        const url = `/recruitment/${currentTicket.id}`;
        navigate(url);
    };

    const handleRemoveTicket = (ticketId) => {
        removeTicketFromQueue(ticketId);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100vh',
                padding: '20px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '600px',
                    width: '100%',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px',
                    padding: '20px',
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                    Zarządzanie kolejką
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Switch checked={queueEnabled} onChange={handleQueueToggle} color="primary" sx={{ marginRight: '10px' }} />
                    <Typography variant="body1">Stan kolejki: {queueEnabled ? 'Włączona' : 'Wyłączona'}</Typography>
                </Box>

                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    Aktualnie obsługiwany: {currentTicket ? currentTicket.id : 'Brak'}
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleStartMeetingConfirmation}
                    disabled={!queueEnabled || currentTicket || isQueueEmpty}
                    sx={{ marginBottom: '10px' }}
                >
                    Rozpocznij spotkanie
                </Button>

                {currentTicket && (
                    <Button variant="contained" onClick={handleReturnToMeeting} sx={{ marginBottom: '10px' }}>
                        Powrót do spotkania
                    </Button>
                )}

                <Button variant="contained" onClick={endMeeting} disabled={!currentTicket} sx={{ marginBottom: '10px' }}>
                    Zakończ spotkanie
                </Button>

                <TableContainer>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="ticketQueue">
                            {(provided) => (
                                <Table {...provided.droppableProps} ref={provided.innerRef}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 'bold' }}>Numer biletu</TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}>ID zgłoszenia</TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}>Priorytet</TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ticketOrder.map((ticketId, index) => {
                                            const ticket = ticketQueue.find((ticket) => ticket.id === ticketId);
                                            if (ticket) {
                                                return (
                                                    <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                                                        {(provided) => (
                                                            <TableRow
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                            >
                                                                <TableCell>{index + 1}</TableCell>
                                                                <TableCell>{ticket.id}</TableCell>
                                                                <TableCell>{ticket.priority}</TableCell>
                                                                <TableCell>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="error"
                                                                        onClick={() => handleRemoveTicket(ticket.id)}
                                                                    >
                                                                        Usuń
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </Draggable>
                                                );
                                            }
                                            return null;
                                        })}
                                        {ticketOrder.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center">
                                                    Brak danych
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {provided.placeholder}
                                    </TableBody>
                                </Table>
                            )}
                        </Droppable>
                    </DragDropContext>
                </TableContainer>
            </Box>

            {/* Start Meeting Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Potwierdzenie rozpoczęcia spotkania</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                        Spotkanie rozpocznie się dla ID zgłoszenia: {selectedTicketId}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                        Czy na pewno chcesz rozpocząć spotkanie?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Anuluj</Button>
                    <Button onClick={handleStartMeeting} disabled={!confirmStartMeeting} autoFocus>
                        Rozpocznij spotkanie
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default QueueManagement;
