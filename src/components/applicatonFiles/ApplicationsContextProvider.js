import React, { createContext, useState, useEffect } from 'react';

export const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);
    const [invitedApplications, setInvitedApplications] = useState([]);

    useEffect(() => {
        const filteredApplications = applications.filter(application => application.status === "Zaproszenie na rozmowę kwalifikacyjną");
        setInvitedApplications(filteredApplications);
    }, [applications]);

    const addApplication = (application) => {
        const applicationWithPosition = { ...application, position: 'Nazwa stanowiska' };
        setApplications((prevApplications) => [...prevApplications, applicationWithPosition]);
    };

    const updateApplicationStatus = (id, status) => {
        setApplications((prevApplications) =>
            prevApplications.map((app) => (app.id === id ? { ...app, status } : app))
        );
    };

    const deleteApplication = (id) => {
        setApplications((prevApplications) =>
            prevApplications.filter((app) => app.id !== id)
        );
    };

    return (
        <ApplicationsContext.Provider
            value={{
                applications,
                invitedApplications,
                addApplication,
                updateApplicationStatus,
                deleteApplication
            }}
        >
            {children}
        </ApplicationsContext.Provider>
    );
};
