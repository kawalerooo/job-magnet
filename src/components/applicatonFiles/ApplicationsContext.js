import React, { createContext, useState, useContext } from 'react';
import { JobOffersContext } from '../jobOffersFiles/JobOffersContext';

export const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);
    const [ticketQueue, setTicketQueue] = useState([]);

    const { jobOffers } = useContext(JobOffersContext);

    const addApplication = (application) => {
        const newApplication = {
            ...application,
            id: generateId(),
            date: new Date().toLocaleDateString(),
        };
        setApplications([...applications, newApplication]);
    };

    const updateApplicationStatus = (id, status) => {
        const updatedApplications = applications.map((application) => {
            if (application.id === id) {
                return { ...application, status };
            }
            return application;
        });
        setApplications(updatedApplications);
    };

    const addTicketToQueue = (ticket) => {
        setTicketQueue([...ticketQueue, ticket]);
    };

    const isTicketCreatedForApplication = (applicationId) => {
        return ticketQueue.some((ticket) => ticket.id === applicationId);
    };

    const getJobOffer = (jobOfferId) => {
        return jobOffers.find((offer) => offer.id === jobOfferId);
    };

    const getApplication = (applicationId) => {
        return applications.find((app) => app.id === applicationId);
    };

    const getApplicationDate = (applicationId) => {
        const application = applications.find((app) => app.id === applicationId);
        return application ? application.date : '';
    };

    const generateId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const contextValue = {
        applications,
        addApplication,
        updateApplicationStatus,
        getJobOffer,
        getApplication,
        getApplicationDate,
        ticketQueue,
        addTicketToQueue,
        isTicketCreatedForApplication, //isTicketCreatedForApplication do kontekstu
    };

    return (
        <ApplicationsContext.Provider value={contextValue}>
            {children}
        </ApplicationsContext.Provider>
    );
};
