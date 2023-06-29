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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { QueueContext } from './QueueContext';
import { useNavigate } from 'react-router-dom';
import { TablePagination } from '@mui/material';

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
        completedMeetings,
    } = useContext(QueueContext);

    const [openDialog, setOpenDialog] = useState(false);
    const [confirmStartMeeting, setConfirmStartMeeting] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState('');
    const [ticketQueuePage, setTicketQueuePage] = useState(0);
    const [completedMeetingsPage, setCompletedMeetingsPage] = useState(0);
    const rowsPerPage = 10;

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
            .map((ticketId) => ticketQueue.find((ticket) => ticket?.id === ticketId))
            .filter((ticket) => ticket && ticket.priority && typeof ticket.priority === 'string');

        await updateTicketOrder(newTicketOrder);
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

        const completedTicket = ticketQueue.find((ticket) => ticket && ticket.id === selectedTicketId);
        if (completedTicket) {
            //addCompletedMeeting(completedTicket);
        }

        removeTicketFromQueue(selectedTicketId);
    };

    const handleReturnToMeeting = () => {
        const url = `/recruitment/${currentTicket.id}`;
        navigate(url);
    };

    const handleRemoveTicket = (ticketId) => {
        removeTicketFromQueue(ticketId);
    };

    // Obliczanie statystyk
    const totalTickets = ticketOrder.length;
    const completedTickets = completedMeetings.length;
    const totalDuration = completedMeetings.reduce((sum, meeting) => sum + (meeting.endTime - meeting.startTime), 0);
    const averageDuration = completedTickets > 0 ? totalDuration / completedTickets : 0;

    const ticketQueuePages = Math.ceil(ticketQueue.length / rowsPerPage);
    const completedMeetingsPages = Math.ceil(completedMeetings.length / rowsPerPage);

    const handleTicketQueuePageChange = (event, page) => {
        setTicketQueuePage(page);
    };

    const handleCompletedMeetingsPageChange = (event, page) => {
        setCompletedMeetingsPage(page);
    };

    const ticketQueueStartIndex = ticketQueuePage * rowsPerPage;
    const ticketQueueEndIndex = (ticketQueuePage + 1) * rowsPerPage;
    const ticketQueuePageData = ticketQueue.slice(ticketQueueStartIndex, ticketQueueEndIndex);

    const completedMeetingsStartIndex = completedMeetingsPage * rowsPerPage;
    const completedMeetingsEndIndex = (completedMeetingsPage + 1) * rowsPerPage;
    const completedMeetingsPageData = completedMeetings.slice(completedMeetingsStartIndex, completedMeetingsEndIndex);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100vh',
                padding: '20px',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Card sx={{ width: '100%', marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                        Zarządzanie kolejką
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center' }}>
                        <Typography variant="body1" sx={{ marginRight: '10px' }}>
                            Stan kolejki:
                        </Typography>
                        <Switch checked={queueEnabled} onChange={handleQueueToggle} color="primary" />
                    </Box>

                    <Typography variant="body1" sx={{ marginBottom: '10px', textAlign: 'center' }}>
                        Aktualnie obsługiwany: {currentTicket ? currentTicket.id : 'Brak'}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <Button
                            variant="contained"
                            onClick={handleStartMeetingConfirmation}
                            disabled={!queueEnabled || currentTicket || isQueueEmpty}
                            sx={{ marginRight: '10px' }}
                        >
                            Rozpocznij spotkanie
                        </Button>

                        {currentTicket && (
                            <Button variant="contained" onClick={handleReturnToMeeting} sx={{ marginRight: '10px' }}>
                                Powrót do spotkania
                            </Button>
                        )}

                        <Button variant="contained" onClick={endMeeting} disabled={!currentTicket}>
                            Zakończ spotkanie
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Box sx={{ display: 'flex', marginTop: '20px', width: '100%' }}>
                <TableContainer component={Card} sx={{ flex: 1, marginRight: '10px' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>
                            Kolejka
                        </Typography>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="ticketQueue">
                                {(provided) => (
                                    <Table {...provided.droppableProps} ref={provided.innerRef}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }}>Numer biletu</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>ID zgłoszenia</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>Priorytet</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>Akcje</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {ticketQueuePageData.map((ticket, index) => (
                                                <Draggable key={ticket.id} draggableId={ticket.id} index={index + ticketQueueStartIndex}>
                                                    {(provided) => (
                                                        <TableRow
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            <TableCell>{index + 1 + ticketQueueStartIndex}</TableCell>
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
                                            ))}
                                            {ticketQueue.length === 0 && (
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
                        <TablePagination
                            component="div"
                            count={ticketQueue.length}
                            page={ticketQueuePage}
                            onPageChange={handleTicketQueuePageChange}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[]}
                        />
                    </CardContent>
                </TableContainer>

                <TableContainer component={Card} sx={{ flex: 1, marginLeft: '10px' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>
                            Spotkania zakończone
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Numer</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>ID zgłoszenia</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Priorytet</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {completedMeetingsPageData.map((meeting, index) => (
                                    <TableRow key={meeting.id}>
                                        <TableCell>{index + 1 + completedMeetingsStartIndex}</TableCell>
                                        <TableCell>{meeting.id}</TableCell>
                                        <TableCell>{meeting.priority}</TableCell>
                                    </TableRow>
                                ))}
                                {completedMeetings.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            Brak spotkań zakończonych
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={completedMeetings.length}
                            page={completedMeetingsPage}
                            onPageChange={handleCompletedMeetingsPageChange}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[]}
                        />
                    </CardContent>
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
