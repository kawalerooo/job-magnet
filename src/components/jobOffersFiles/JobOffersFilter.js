import React, { useContext } from 'react';
import { JobOffersContext } from './JobOffersContext';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';

const JobOffersFilter = () => {
    const { filters, updateFilters } = useContext(JobOffersContext);

    const handleFilterChange = (category, value) => {
        updateFilters(category, value);
    };

    const filterCategories = [
        {
            title: 'Poziom stanowiska',
            key: 'positionLevel',
            keys: [
                'intern',
                'assistant',
                'junior',
                'mid',
                'senior',
                'director',
                'president',
                'worker',
            ],
        },
        {
            title: 'Rodzaj umowy',
            key: 'contractType',
            keys: [
                'employmentContract',
                'contractOfMandate',
                'b2bContract',
                'internshipContract',
            ],
        },
        {
            title: 'Wymiar pracy',
            key: 'workload',
            keys: ['partTime', 'temporaryAdditional', 'fullTime'],
        },
        {
            title: 'Tryb pracy',
            key: 'workMode',
            keys: ['stationary', 'hybrid', 'remote'],
        },
    ];

    return (
        <Box>
            {filterCategories.map((category) => (
                <Box key={category.title}>
                    <Typography variant="h6" gutterBottom>
                        {category.title}
                    </Typography>
                    <FormGroup>
                        {category.keys.map((key) => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        checked={filters[category.key]?.[key] || false}
                                        onChange={() =>
                                            handleFilterChange(category.key, key)
                                        }
                                    />
                                }
                                label={key}
                            />
                        ))}
                    </FormGroup>
                </Box>
            ))}
        </Box>
    );
};

export default JobOffersFilter;
