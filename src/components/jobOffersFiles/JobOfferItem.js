import React from 'react';
import { Box, Typography } from '@mui/material';

const JobOfferItem = ({ jobOffer }) => {
    return (
        <Box>
            <Typography variant="h6">{jobOffer.title}</Typography>
            <Typography>{jobOffer.description}</Typography>
        </Box>
    );
};

export default JobOfferItem;
