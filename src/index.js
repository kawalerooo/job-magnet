import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { JobOffersProvider } from './components/jobOffersFiles/JobOffersContext';

ReactDOM.render(
    <React.StrictMode>
        <JobOffersProvider>
            <App />
        </JobOffersProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
