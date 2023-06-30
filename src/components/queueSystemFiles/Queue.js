import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent } from '@mui/material';
import { QueueContext } from './QueueContext';
import { Slide, TransitionProps } from '@mui/material';

const Queue = () => {
    const { ticketQueue, currentTicket, updateTicketOrder } = useContext(QueueContext);

    useEffect(() => {
        const sortQueue = () => {
            const priorityOrder = {
                High: 1,
                Normal: 2,
            };

            const sorted = [...ticketQueue].sort((a, b) => {
                const priorityA = priorityOrder[a.priority] || 0;
                const priorityB = priorityOrder[b.priority] || 0;

                if (priorityA !== priorityB) {
                    return priorityA - priorityB;
                } else {
                    return a.id.localeCompare(b.id);
                }
            });

            updateTicketOrder(sorted);
        };

        sortQueue();
    }, [ticketQueue, updateTicketOrder]);

    return (
        <Box mt={6} display="flex" flexDirection="column" alignItems="center">
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h2" style={{ fontWeight: 'bold', textAlign: 'center' }} sx={{ marginBottom: '24px', fontWeight: 500 }}>
                        Kolejka
                    </Typography>
                    <Typography variant="h6" style={{ textAlign: 'center' }}>Aktualnie obsługiwany: {currentTicket ? currentTicket.id : 'Brak'}</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Numer biletu</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>ID zgłoszenia</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Priorytet wejścia</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ticketQueue.map((ticket, index) => (
                                    <Slide direction="down" in={true} key={ticket.id} timeout={300 + index * 100}>
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{ticket.id}</TableCell>
                                            <TableCell>{ticket.priority}</TableCell>
                                        </TableRow>
                                    </Slide>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Queue;
