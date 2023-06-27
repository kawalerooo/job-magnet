import React, { useState, useCallback, createContext } from 'react';

export const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
    const [queueEnabled, setQueueEnabled] = useState(true);
    const [ticketQueue, setTicketQueue] = useState([]);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [ticketOrder, setTicketOrder] = useState([]);

    const addTicketToQueue = (newTicket) => {
        setTicketQueue((prevQueue) => [...prevQueue, newTicket]);
    };

    const removeTicketFromQueue = (ticketId) => {
        setTicketQueue((prevQueue) => prevQueue.filter((ticket) => ticket.id !== ticketId));
    };

    const startMeeting = () => {
        const nextTicketId = ticketOrder[0];
        if (nextTicketId) {
            const nextTicket = ticketQueue.find((ticket) => ticket.id === nextTicketId);
            setCurrentTicket(nextTicket);
            setTicketQueue((prevQueue) => prevQueue.filter((ticket) => ticket.id !== nextTicketId));
            setTicketOrder((prevOrder) => prevOrder.slice(1));
        }
    };

    const endMeeting = () => {
        setCurrentTicket(null);
    };

    const updateTicketOrder = useCallback((queue) => {
        const sortedQueue = [...queue].sort((a, b) => {
            if (a.priority === 'High' && b.priority === 'High') {
                return a.id.localeCompare(b.id);
            } else if (a.priority === 'High') {
                return -1;
            } else if (b.priority === 'High') {
                return 1;
            } else {
                return a.priority.localeCompare(b.priority);
            }
        });
        const order = sortedQueue.map((ticket) => ticket.id);
        setTicketOrder(order);
    }, []);

    const updateTicketQueue = useCallback((queue) => {
        setTicketQueue(queue);
    }, []);

    return (
        <QueueContext.Provider
            value={{
                queueEnabled,
                setQueueEnabled,
                ticketQueue,
                currentTicket,
                startMeeting,
                endMeeting,
                addTicketToQueue,
                removeTicketFromQueue,
                ticketOrder,
                updateTicketOrder,
                updateTicketQueue,
            }}
        >
            {children}
        </QueueContext.Provider>
    );
};
