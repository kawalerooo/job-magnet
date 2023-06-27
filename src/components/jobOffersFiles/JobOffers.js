import React, { useContext, useState, useEffect, useRef } from 'react';
import {
    Box,
    Button,
    Typography,
    Switch,
    TextField,
    Paper,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Step,
    StepLabel,
    Stepper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    createTheme,
    ThemeProvider,
    withStyles,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { JobOffersContext } from './JobOffersContext';
import { useNavigate } from 'react-router-dom';
import { ApplicationFieldsContext } from '../applicatonFiles/ApplicationFieldsContext';

const theme = createTheme({
    components: {
        MuiStepper: {
            styleOverrides: {
                root: {
                    '& .MuiStepIcon-root.Mui-active': {
                        color: 'black',
                    },
                    '& .MuiStepIcon-root.Mui-completed': {
                        color: 'green',
                    },
                    '& .MuiStepIcon-text': {
                        fill: 'white',
                    },
                },
            },
        },
    },
});

const JobOffers = () => {
    const [title, setTitle] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [requirements, setRequirements] = useState('');
    const [benefits, setBenefits] = useState('');
    const { addJobOffer } = useContext(JobOffersContext);
    const navigate = useNavigate();
    const { applicationFields, setApplicationFields } = useContext(ApplicationFieldsContext);

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

    const [currentStep, setCurrentStep] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    const descriptionContainerRef = useRef(null);

    const steps = ['Opis ogłoszenia', 'Poziomy stanowiska', 'Pola aplikacyjne'];

    const handleSave = () => {
        const jobOffer = {
            title,
            responsibilities,
            requirements,
            benefits,
            positionLevel,
            contractType,
            workload,
            workMode,
            date: new Date(),
        };
        addJobOffer(jobOffer);
        setTitle('');
        setResponsibilities('');
        setRequirements('');
        setBenefits('');
        setPositionLevel({
            intern: false,
            assistant: false,
            junior: false,
            mid: false,
            senior: false,
            director: false,
            president: false,
            worker: false,
        });
        setContractType({
            employmentContract: false,
            contractOfMandate: false,
            b2bContract: false,
            internshipContract: false,
        });
        setWorkload({
            partTime: false,
            temporaryAdditional: false,
            fullTime: false,
        });
        setWorkMode({
            stationary: false,
            hybrid: false,
            remote: false,
        });
        navigate('/jobOffersList');
    };

    const handleFieldChange = (name) => (event) => {
        const { checked } = event.target;
        setApplicationFields((prevFields) => ({
            ...prevFields,
            [name]: checked,
        }));
    };

    const handlePositionLevelChange = (event) => {
        setPositionLevel((prevLevel) => ({
            ...prevLevel,
            [event.target.name]: event.target.checked,
        }));
    };

    const handleContractTypeChange = (event) => {
        setContractType((prevType) => ({
            ...prevType,
            [event.target.name]: event.target.checked,
        }));
    };

    const handleWorkloadChange = (event) => {
        setWorkload((prevWorkload) => ({
            ...prevWorkload,
            [event.target.name]: event.target.checked,
        }));
    };

    const handleWorkModeChange = (event) => {
        setWorkMode((prevMode) => ({
            ...prevMode,
            [event.target.name]: event.target.checked,
        }));
    };

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    useEffect(() => {
        const isPositionLevelValid = Object.values(positionLevel).some((value) => value);
        const isContractTypeValid = Object.values(contractType).some((value) => value);
        const isWorkloadValid = Object.values(workload).some((value) => value);
        const isWorkModeValid = Object.values(workMode).some((value) => value);
        const isApplicationFieldsValid = Object.values(applicationFields).some((value) => value === true);

        setIsFormValid(
            (currentStep === 0 && title && responsibilities && requirements && benefits) ||
            (currentStep === 1 && isPositionLevelValid && isContractTypeValid && isWorkloadValid && isWorkModeValid) ||
            (currentStep === 2 && isApplicationFieldsValid)
        );
    }, [
        currentStep,
        title,
        responsibilities,
        requirements,
        benefits,
        positionLevel,
        contractType,
        workload,
        workMode,
        applicationFields,
    ]);

    useEffect(() => {
        if (descriptionContainerRef.current) {
            const descriptionContainer = descriptionContainerRef.current;
            descriptionContainer.scrollTop = descriptionContainer.scrollHeight;
        }
    }, [responsibilities, requirements, benefits]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#F5F5F5',
                    padding: '48px',
                    borderRadius: '4px',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                    width: '800px',
                    margin: 'auto',
                }}
            >
                <Typography variant="h4" component="h2" style={{ fontWeight: 'bold' }} sx={{ marginBottom: '24px', fontWeight: 500, textAlign: 'center' }}>
                    Stwórz ogłoszenie
                </Typography>

                <ThemeProvider theme={theme}>
                    <Stepper alternativeLabel activeStep={currentStep} sx={{ marginBottom: '24px' }}>
                        {steps.map((label) => (
                            <Step key={label} completed={currentStep > steps.indexOf(label)}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </ThemeProvider>

                {currentStep === 0 && (
                    <>
                        <Typography variant="h6" component="h3" sx={{ marginBottom: '12px', fontWeight: 500, textAlign: 'center' }}></Typography>
                        <TextField
                            label="Tytuł"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: '24px' }}
                        />
                        <div
                            ref={descriptionContainerRef}
                            sx={{
                                minHeight: '120px',
                                marginBottom: '24px',
                                border: '1px solid #E0E0E0',
                                borderRadius: '4px',
                                padding: '8px',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <ReactQuill
                                value={responsibilities}
                                onChange={(value) => setResponsibilities(value)}
                                placeholder="Twój zakres obowiązków"
                                style={{ resize: 'none', width: '100%' }}
                            />
                        </div>
                        <div
                            ref={descriptionContainerRef}
                            sx={{
                                minHeight: '120px',
                                marginBottom: '24px',
                                border: '1px solid #E0E0E0',
                                borderRadius: '4px',
                                padding: '8px',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <ReactQuill
                                value={requirements}
                                onChange={(value) => setRequirements(value)}
                                placeholder="Nasze wymagania"
                                style={{ resize: 'none', width: '100%' }}
                            />
                        </div>
                        <div
                            ref={descriptionContainerRef}
                            sx={{
                                minHeight: '120px',
                                marginBottom: '24px',
                                border: '1px solid #E0E0E0',
                                borderRadius: '4px',
                                padding: '8px',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <ReactQuill
                                value={benefits}
                                onChange={(value) => setBenefits(value)}
                                placeholder="Benefity"
                                style={{ resize: 'none', width: '100%' }}
                            />
                        </div>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                            <Button variant="contained" onClick={handleNextStep} disabled={!title || !responsibilities || !requirements || !benefits}>
                                Dalej
                            </Button>
                        </Box>
                    </>
                )}

                {currentStep === 1 && (
                    <>
                        <Typography variant="h6" component="h3" sx={{ marginBottom: '12px', fontWeight: 500 }}>
                            Wybierz poziomy stanowiska
                        </Typography>
                        <Paper elevation={1}>
                            <FormGroup>
                                {Object.keys(positionLevel).map((key) => (
                                    <FormControlLabel
                                        key={key}
                                        control={<Checkbox checked={positionLevel[key]} onChange={handlePositionLevelChange} name={key} />}
                                        label={key}
                                    />
                                ))}
                            </FormGroup>
                        </Paper>
                        <Typography variant="h6" component="h3" sx={{ marginTop: '24px', marginBottom: '12px', fontWeight: 500 }}>
                            Wybierz rodzaj umowy
                        </Typography>
                        <Paper elevation={1}>
                            <FormGroup>
                                {Object.keys(contractType).map((key) => (
                                    <FormControlLabel
                                        key={key}
                                        control={<Checkbox checked={contractType[key]} onChange={handleContractTypeChange} name={key} />}
                                        label={key}
                                    />
                                ))}
                            </FormGroup>
                        </Paper>
                        <Typography variant="h6" component="h3" sx={{ marginTop: '24px', marginBottom: '12px', fontWeight: 500 }}>
                            Wybierz wymiar pracy
                        </Typography>
                        <Paper elevation={1}>
                            <FormGroup>
                                {Object.keys(workload).map((key) => (
                                    <FormControlLabel
                                        key={key}
                                        control={<Checkbox checked={workload[key]} onChange={handleWorkloadChange} name={key} />}
                                        label={key}
                                    />
                                ))}
                            </FormGroup>
                        </Paper>
                        <Typography variant="h6" component="h3" sx={{ marginTop: '24px', marginBottom: '12px', fontWeight: 500 }}>
                            Wybierz tryb pracy
                        </Typography>
                        <Paper elevation={1}>
                            <FormGroup>
                                {Object.keys(workMode).map((key) => (
                                    <FormControlLabel
                                        key={key}
                                        control={<Checkbox checked={workMode[key]} onChange={handleWorkModeChange} name={key} />}
                                        label={key}
                                    />
                                ))}
                            </FormGroup>
                        </Paper>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                            <Button variant="contained" onClick={handlePreviousStep}>
                                Wstecz
                            </Button>
                            <Button variant="contained" onClick={handleNextStep} disabled={!isFormValid}>
                                Dalej
                            </Button>
                        </Box>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <Typography variant="h6" component="h3" sx={{ marginBottom: '12px', fontWeight: 500 }}></Typography>
                        <List sx={{ marginTop: '24px', maxWidth: '600px', textAlign: 'center' }}>
                            <ListItem>
                                <ListItemText primary="Imię" />
                                <ListItemSecondaryAction>
                                    <Switch
                                        name="firstName"
                                        checked={applicationFields.firstName || false}
                                        onChange={handleFieldChange('firstName')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Nazwisko" />
                                <ListItemSecondaryAction>
                                    <Switch
                                        name="lastName"
                                        checked={applicationFields.lastName || false}
                                        onChange={handleFieldChange('lastName')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Email" />
                                <ListItemSecondaryAction>
                                    <Switch
                                        name="email"
                                        checked={applicationFields.email || false}
                                        onChange={handleFieldChange('email')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Telefon" />
                                <ListItemSecondaryAction>
                                    <Switch
                                        name="phone"
                                        checked={applicationFields.phone || false}
                                        onChange={handleFieldChange('phone')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="CV" />
                                <ListItemSecondaryAction>
                                    <Switch
                                        name="cvFile"
                                        checked={applicationFields.cvFile || false}
                                        onChange={handleFieldChange('cvFile')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Poziom wykształcenia" />
                                <ListItemSecondaryAction>
                                    <Switch
                                        name="educationLevel"
                                        checked={applicationFields.educationLevel || false}
                                        onChange={handleFieldChange('educationLevel')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Dostępność" />
                                <ListItemSecondaryAction>
                                    <Switch
                                        name="availability"
                                        checked={applicationFields.availability || false}
                                        onChange={handleFieldChange('availability')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Oczekiwania co do wynagrodzenia" />
                                <ListItemSecondaryAction>
                                    <Switch
                                        name="salaryExpectations"
                                        checked={applicationFields.salaryExpectations || false}
                                        onChange={handleFieldChange('salaryExpectations')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                            <Button variant="contained" onClick={handlePreviousStep}>
                                Wstecz
                            </Button>
                            <Button variant="contained" onClick={handleSave} disabled={!isFormValid}>
                                Zapisz
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default JobOffers;
