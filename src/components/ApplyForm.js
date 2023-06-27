import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    createTheme,
    ThemeProvider,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { JobOffersContext } from './jobOffersFiles/JobOffersContext';
import { ApplicationFieldsContext } from './applicatonFiles/ApplicationFieldsContext';
import { ApplicationsContext } from './applicatonFiles/ApplicationsContext';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    backgroundColor: '#1976d2',
                    '&:hover': {
                        backgroundColor: '#1976d2',
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '100%',
                    marginBottom: '16px',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    marginBottom: '8px',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    paddingTop: '18.5px',
                    paddingBottom: '18.5px',
                },
            },
        },
    },
});

const ApplyForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { applicationFields, setApplicationFields } = useContext(ApplicationFieldsContext);
    const { addApplication } = useContext(ApplicationsContext);
    const { jobOffers } = useContext(JobOffersContext);

    const [formData, setFormData] = useState({});
    const [offerName, setOfferName] = useState('');

    useEffect(() => {
        const selectedOffer = jobOffers.find((offer) => offer.id === id);
        if (selectedOffer) {
            setOfferName(selectedOffer.title);
        }
    }, [jobOffers, id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            cvFile: file,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const field in applicationFields) {
            if (!formData[field]) {
                alert('Proszę uzupełnić wszystkie pola formularza.');
                return;
            }
        }

        const application = {
            id,
            jobOffer: offerName,
            ...formData,
        };

        addApplication(application);
        setFormData({});
        navigate('/applicationConfirmation');
    };

    const handleCVPreview = () => {
        if (formData.cvFile) {
            const url = URL.createObjectURL(formData.cvFile);
            window.open(url);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Box sx={{ width: '400px', p: 3, border: '1px solid #ccc', borderRadius: '4px' }}>
                    <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
                        {offerName && `Formularz aplikacyjny: ${offerName}`}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {Object.keys(applicationFields).map((fieldName) => (
                            <React.Fragment key={fieldName}>
                                {fieldName === 'firstName' && (
                                    <TextField
                                        name="firstName"
                                        label="Imię"
                                        value={formData.firstName || ''}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                    />
                                )}
                                {fieldName === 'lastName' && (
                                    <TextField
                                        name="lastName"
                                        label="Nazwisko"
                                        value={formData.lastName || ''}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                    />
                                )}
                                {fieldName === 'email' && (
                                    <TextField
                                        name="email"
                                        label="Email"
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                    />
                                )}
                                {fieldName === 'phone' && (
                                    <TextField
                                        name="phone"
                                        label="Numer telefonu"
                                        value={formData.phone || ''}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                        inputProps={{ maxLength: 10 }}
                                    />
                                )}
                                {fieldName === 'educationLevel' && (
                                    <FormControl fullWidth margin="normal" required>
                                        <InputLabel>Poziom wykształcenia</InputLabel>
                                        <Select
                                            name="educationLevel"
                                            value={formData.educationLevel || ''}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="podstawowe">Podstawowe</MenuItem>
                                            <MenuItem value="zawodowe">Zawodowe</MenuItem>
                                            <MenuItem value="srednie-bezmatury">Średnie - bez matury</MenuItem>
                                            <MenuItem value="srednie-maturalne">Średnie - maturalne</MenuItem>
                                            <MenuItem value="wyzsze-licencjat">Wyższe - licencjat</MenuItem>
                                            <MenuItem value="wyzsze-inzynier">Wyższe - inżynier</MenuItem>
                                            <MenuItem value="wyzsze_magister">Wyższe - magister</MenuItem>
                                            <MenuItem value="w-trakcie-studiow">W trakcie studiów</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                                {fieldName === 'availability' && (
                                    <FormControl fullWidth margin="normal" required>
                                        <InputLabel>Od kiedy możesz rozpocząć pracę</InputLabel>
                                        <Select
                                            name="availability"
                                            value={formData.availability || ''}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="natychmiast">Natychmiast</MenuItem>
                                            <MenuItem value="2-tygodnie">2 tygodnie</MenuItem>
                                            <MenuItem value="1-miesiac">1 miesiąc</MenuItem>
                                            <MenuItem value="3-miesiace">3 miesiące</MenuItem>
                                            <MenuItem value="wiecej-niz-3-miesiace">Więcej niż 3 miesiące</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                                {fieldName === 'salaryExpectations' && (
                                    <TextField
                                        name="salaryExpectations"
                                        label="Oczekiwania finansowe (brutto)"
                                        value={formData.salaryExpectations || ''}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                        inputProps={{ maxLength: 10 }}
                                    />
                                )}
                                {fieldName === 'cvFile' && (
                                    <>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            id="cvFileInput"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="cvFileInput">
                                            <Button
                                                variant="outlined"
                                                component="span"
                                                startIcon={<CloudUploadIcon />}
                                                sx={{
                                                    marginBottom: '16px',
                                                    display: 'block',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    width: '100%',
                                                }}
                                            >
                                                Wyślij CV (PDF)
                                            </Button>
                                        </label>
                                        {formData.cvFile && (
                                            <Typography>{formData.cvFile.name}</Typography>
                                        )}
                                        {formData.cvFile && (
                                            <Button
                                                variant="contained"
                                                onClick={handleCVPreview}
                                                sx={{ marginTop: '16px', width: '100%' }}
                                            >
                                                Podgląd CV
                                            </Button>
                                        )}
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                        <Button type="submit" variant="contained" color="primary" sx={{ float: 'right' }}>
                            Wyślij aplikację
                        </Button>
                    </form>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default ApplyForm;
