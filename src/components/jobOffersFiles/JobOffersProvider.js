import React, { createContext, useState } from 'react';

export const JobOffersContext = createContext();

export const JobOffersProvider = ({ children }) => {
    const [jobOffers, setJobOffers] = useState([]);

    const addJobOffer = (jobOffer) => {
        const newJobOffer = {
            ...jobOffer,
            id: generateId(),
        };
        setJobOffers([...jobOffers, newJobOffer]);
    };

    const editJobOffer = (id, updatedJobOffer) => {
        const updatedOffers = jobOffers.map((offer) => {
            if (offer.id === id) {
                return { ...offer, ...updatedJobOffer };
            }
            return offer;
        });
        setJobOffers(updatedOffers);
    };

    const deleteJobOffer = (id) => {
        const updatedOffers = jobOffers.filter((offer) => offer.id !== id);
        setJobOffers(updatedOffers);
    };

    const generateId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const contextValue = {
        jobOffers,
        setJobOffers,
        addJobOffer,
        editJobOffer,
        deleteJobOffer,
    };

    return (
        <JobOffersContext.Provider value={contextValue}>
            {children}
        </JobOffersContext.Provider>
    );
};
