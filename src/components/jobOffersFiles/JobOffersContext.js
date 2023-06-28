import React, { createContext, useState } from 'react';

export const JobOffersContext = createContext();

export const JobOffersProvider = ({ children }) => {
    const [jobOffers, setJobOffers] = useState([]);
    const [filters, setFilters] = useState({
        positionLevel: {},
        contractType: {},
        workload: {},
        workMode: {},
    });
    const [favoriteOffers, setFavoriteOffers] = useState([]);
    const [appliedCounts, setAppliedCounts] = useState({});

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

    const updateFilters = (category, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [category]: { ...prevFilters[category], [value]: !prevFilters[category][value] },
        }));
    };

    const filterJobOffers = () => {
        return jobOffers.filter((offer) => {
            return Object.keys(filters).every((category) => {
                return Object.keys(filters[category]).every((key) => {
                    if (!filters[category][key]) {
                        return true;
                    }
                    return offer[category][key];
                });
            });
        });
    };

    const toggleFavoriteOffer = (id) => {
        setFavoriteOffers((prevFavoriteOffers) => {
            if (prevFavoriteOffers.includes(id)) {
                return prevFavoriteOffers.filter((offerId) => offerId !== id);
            } else {
                return [...prevFavoriteOffers, id];
            }
        });
    };

    const handleApply = (id) => {
        setAppliedCounts((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 0) + 1,
        }));
    };

    const contextValue = {
        jobOffers,
        addJobOffer,
        editJobOffer,
        deleteJobOffer,
        filters,
        updateFilters,
        filterJobOffers,
        favoriteOffers,
        toggleFavoriteOffer,
        appliedCounts,
        handleApply,
    };

    return (
        <JobOffersContext.Provider value={contextValue}>
            {children}
        </JobOffersContext.Provider>
    );
};
