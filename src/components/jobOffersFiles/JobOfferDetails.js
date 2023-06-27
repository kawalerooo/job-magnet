import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { JobOffersContext } from './JobOffersContext';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const StyledButton = styled(Button)({
    marginTop: '1rem',
    marginBottom: '1rem',
    marginLeft: 'auto',
    display: 'block',
});

const JobOfferDetails = () => {
    const { id } = useParams();
    const { jobOffers } = useContext(JobOffersContext);
    const jobOffer = jobOffers.find((offer) => offer.id === id);
    const navigate = useNavigate();

    if (!jobOffer) {
        return <Typography>Loading...</Typography>;
    }

    const handleApply = () => {
        navigate(`/applyForm/${id}`);
    };

    const formattedDate = new Date(jobOffer.date).toLocaleDateString();

    const positionLevel = Object.entries(jobOffer.positionLevel)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)
        .join(', ');

    const contractType = Object.entries(jobOffer.contractType)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)
        .join(', ');

    const workload = Object.entries(jobOffer.workload)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)
        .join(', ');

    const workMode = Object.entries(jobOffer.workMode)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)
        .join(', ');

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8f8f8',
                padding: '2rem',
            }}
        >
            <Paper elevation={3} sx={{ padding: '2rem', width: '70%', maxWidth: '800px' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    {jobOffer.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Data dodania: {formattedDate}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    <WorkOutlineIcon /> Poziom stanowiska: {positionLevel}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    <AssignmentTurnedInIcon /> Rodzaj umowy: {contractType}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    <ScheduleIcon /> Wymiar pracy: {workload}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    <AccountTreeIcon /> Tryb pracy: {workMode}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    <strong>Zakres obowiązków:</strong>
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: jobOffer.responsibilities }} />
                <Typography variant="h6" gutterBottom>
                    <strong>Wymagania:</strong>
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: jobOffer.requirements }} />
                <Typography variant="h6" gutterBottom>
                    <strong>Benefity:</strong>
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: jobOffer.benefits }} />
                <StyledButton variant="contained" color="primary" onClick={handleApply}>
                    Aplikuj
                </StyledButton>
            </Paper>
        </Box>
    );
};

export default JobOfferDetails;
