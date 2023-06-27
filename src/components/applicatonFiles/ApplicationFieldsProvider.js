import React, { createContext, useState } from 'react';

export const ApplicationFieldsContext = createContext();

export const ApplicationFieldsProvider = ({ children }) => {
    const [applicationFields, setApplicationFields] = useState({});

    return (
        <ApplicationFieldsContext.Provider value={{ applicationFields, setApplicationFields }}>
            {children}
        </ApplicationFieldsContext.Provider>
    );
};
