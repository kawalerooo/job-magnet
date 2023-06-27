import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Link, Navigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().email('Niepoprawny format email').required('Wymagane'),
    password: Yup.string().required('Wymagane'),
});

const LoginForm = () => {
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (values, { setSubmitting }) => {

        if (values.email === 'test@example.com' && values.password === 'password') {
            setSubmitting(false);
            setRedirectToHome(true);
        } else {
            console.log('Błędne dane logowania');
            setSubmitting(false);
        }
    };

    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f2f2f2',
            }}
        >
            <Box
                sx={{
                    maxWidth: 400,
                    textAlign: 'center',
                    backgroundColor: '#f8f8f8',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    marginBottom: '20px',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Logowanie
                </Typography>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field
                                as={TextField}
                                name="email"
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                sx={{ marginBottom: '20px' }}
                                InputProps={{
                                    startAdornment: (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: 'rgba(0, 0, 0, 0.54)',
                                            }}
                                        >
                                            <MailOutlineIcon />
                                        </Box>
                                    ),
                                }}
                                helperText={<ErrorMessage name="email" />}
                            />
                            <Field
                                as={TextField}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                label="Hasło"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                sx={{ marginBottom: '20px' }}
                                InputProps={{
                                    startAdornment: (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: 'rgba(0, 0, 0, 0.54)',
                                            }}
                                        >
                                            <LockIcon />
                                        </Box>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword}>
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                helperText={<ErrorMessage name="password" />}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                sx={{
                                    marginBottom: '10px',
                                    fontSize: '18px',
                                    marginTop: '20px',
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                    },
                                }}
                            >
                                Zaloguj się
                            </Button>
                            <Typography variant="body2" color="textSecondary">
                                Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link>
                            </Typography>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default LoginForm;
