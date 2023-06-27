import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { JobOffersContext } from './JobOffersContext';
import { useParams, useNavigate } from 'react-router-dom';

const EditJobOffer = () => {
    const { id } = useParams();
    const { jobOffers, editJobOffer } = useContext(JobOffersContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [requirements, setRequirements] = useState('');
    const [benefits, setBenefits] = useState('');
    const [positionLevel, setPositionLevel] = useState({
        intern: false,
        assistant: false,
        junior: false,
        mid: false,
        senior: false,
        director: false,
        president: false,
        worker: false,
    });
    const [contractType, setContractType] = useState({
        employmentContract: false,
        contractOfMandate: false,
        b2bContract: false,
        internshipContract: false,
    });
    const [workload, setWorkload] = useState({
        partTime: false,
        temporaryAdditional: false,
        fullTime: false,
    });
    const [workMode, setWorkMode] = useState({
        stationary: false,
        hybrid: false,
        remote: false,
    });

    useEffect(() => {
        const jobOffer = jobOffers.find((offer) => offer.id === id);
        if (jobOffer) {
            setTitle(jobOffer.title);
            setResponsibilities(jobOffer.responsibilities);
            setRequirements(jobOffer.requirements);
            setBenefits(jobOffer.benefits);
            setPositionLevel(jobOffer.positionLevel);
            setContractType(jobOffer.contractType);
            setWorkload(jobOffer.workload);
            setWorkMode(jobOffer.workMode);
        }
    }, [id, jobOffers]);

    const handleSave = () => {
        const updatedJobOffer = {
            id,
            title,
            responsibilities,
            requirements,
            benefits,
            positionLevel,
            contractType,
            workload,
            workMode,
            date: jobOffers.find((offer) => offer.id === id).date,
        };
        editJobOffer(id, updatedJobOffer);
        navigate('/jobOffersList');
    };

    if (!jobOffers.find((offer) => offer.id === id)) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f8f8f8',
            }}
        >
            <Typography variant="h4" component="h2" gutterBottom>
            </Typography>
            <Box
                sx={{
                    maxWidth: '600px',
                    width: '100%',
                    margin: '0 auto',
                    padding: '40px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    marginTop: '16px',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
                            Edytuj ogłoszenie
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Tytuł"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: '16px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ReactQuill
                            value={responsibilities}
                            onChange={(value) => setResponsibilities(value)}
                            placeholder="Twój zakres obowiązków"
                            style={{ minHeight: '120px', marginBottom: '16px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ReactQuill
                            value={requirements}
                            onChange={(value) => setRequirements(value)}
                            placeholder="Nasze wymagania"
                            style={{ minHeight: '120px', marginBottom: '16px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ReactQuill
                            value={benefits}
                            onChange={(value) => setBenefits(value)}
                            placeholder="Benefity"
                            style={{ minHeight: '120px', marginBottom: '16px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>
                            Poziom stanowiska:
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={positionLevel.intern}
                                        onChange={(e) => setPositionLevel((prev) => ({ ...prev, intern: e.target.checked }))}
                                    />
                                }
                                label="Intern"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={positionLevel.assistant}
                                        onChange={(e) => setPositionLevel((prev) => ({ ...prev, assistant: e.target.checked }))}
                                    />
                                }
                                label="Assistant"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={positionLevel.junior}
                                        onChange={(e) => setPositionLevel((prev) => ({ ...prev, junior: e.target.checked }))}
                                    />
                                }
                                label="Junior"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={positionLevel.mid}
                                        onChange={(e) => setPositionLevel((prev) => ({ ...prev, mid: e.target.checked }))}
                                    />
                                }
                                label="Mid"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={positionLevel.senior}
                                        onChange={(e) => setPositionLevel((prev) => ({ ...prev, senior: e.target.checked }))}
                                    />
                                }
                                label="Senior"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={positionLevel.director}
                                        onChange={(e) => setPositionLevel((prev) => ({ ...prev, director: e.target.checked }))}
                                    />
                                }
                                label="Director"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={positionLevel.president}
                                        onChange={(e) => setPositionLevel((prev) => ({ ...prev, president: e.target.checked }))}
                                    />
                                }
                                label="President"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={positionLevel.worker}
                                        onChange={(e) => setPositionLevel((prev) => ({ ...prev, worker: e.target.checked }))}
                                    />
                                }
                                label="Worker"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>
                            Rodzaj umowy:
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={contractType.employmentContract}
                                        onChange={(e) => setContractType((prev) => ({ ...prev, employmentContract: e.target.checked }))}
                                    />
                                }
                                label="Umowa o pracę"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={contractType.contractOfMandate}
                                        onChange={(e) => setContractType((prev) => ({ ...prev, contractOfMandate: e.target.checked }))}
                                    />
                                }
                                label="Umowa zlecenie"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={contractType.b2bContract}
                                        onChange={(e) => setContractType((prev) => ({ ...prev, b2bContract: e.target.checked }))}
                                    />
                                }
                                label="Umowa B2B"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={contractType.internshipContract}
                                        onChange={(e) => setContractType((prev) => ({ ...prev, internshipContract: e.target.checked }))}
                                    />
                                }
                                label="Umowa stażowa"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>
                            Wymiar pracy:
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={workload.partTime}
                                        onChange={(e) => setWorkload((prev) => ({ ...prev, partTime: e.target.checked }))}
                                    />
                                }
                                label="W niepełnym wymiarze"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={workload.temporaryAdditional}
                                        onChange={(e) => setWorkload((prev) => ({ ...prev, temporaryAdditional: e.target.checked }))}
                                    />
                                }
                                label="Czasowy dodatkowy"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={workload.fullTime}
                                        onChange={(e) => setWorkload((prev) => ({ ...prev, fullTime: e.target.checked }))}
                                    />
                                }
                                label="W pełnym wymiarze"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>
                            Tryb pracy:
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={workMode.stationary}
                                        onChange={(e) => setWorkMode((prev) => ({ ...prev, stationary: e.target.checked }))}
                                    />
                                }
                                label="Stacjonarny"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={workMode.hybrid}
                                        onChange={(e) => setWorkMode((prev) => ({ ...prev, hybrid: e.target.checked }))}
                                    />
                                }
                                label="Hybrydowy"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={workMode.remote}
                                        onChange={(e) => setWorkMode((prev) => ({ ...prev, remote: e.target.checked }))}
                                    />
                                }
                                label="Zdalny"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={handleSave}>
                            Zapisz
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EditJobOffer;
