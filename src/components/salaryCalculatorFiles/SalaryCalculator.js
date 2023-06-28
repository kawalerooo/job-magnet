import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const SalaryCalculator = () => {
    const [hourlySalary, setHourlySalary] = useState('');
    const [weeklyHours, setWeeklyHours] = useState('');
    const [payType, setPayType] = useState('netto');
    const [dailyPay, setDailyPay] = useState(0);
    const [weeklyPay, setWeeklyPay] = useState(0);
    const [monthlyPay, setMonthlyPay] = useState(0);
    const [annualPay, setAnnualPay] = useState(0);

    const calculateHourlyWage = () => {
        const rate = parseFloat(hourlySalary);
        const hours = parseFloat(weeklyHours);
        const daysInMonth = 30; // Przykładowa liczba dni w miesiącu
        const weeksInYear = 52; // Przykładowa liczba tygodni w roku

        if (!isNaN(rate) && !isNaN(hours)) {
            let dailyWage = rate * hours / 5;
            let weeklyWage = dailyWage * 5; // Zakładam 5 dni pracy w tygodniu
            let monthlyWage = weeklyWage * weeksInYear / 12;
            let annualWage = weeklyWage * weeksInYear;

            if (payType === 'brutto') {
                dailyWage /= (1 - 0.2); // Przykładowa stawka podatkowa 20%
                weeklyWage /= (1 - 0.2);
                monthlyWage /= (1 - 0.2);
                annualWage /= (1 - 0.2);
            }

            setDailyPay(dailyWage.toFixed(2));
            setWeeklyPay(weeklyWage.toFixed(2));
            setMonthlyPay(monthlyWage.toFixed(2));
            setAnnualPay(annualWage.toFixed(2));
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f3f3f3',
                padding: '2rem',
            }}
        >
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper elevation={3} sx={{ padding: '2rem' }}>
                        <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center', margin: '0 auto', marginBottom: '1rem' }}>
                            Kalkulator wynagrodzeń
                        </Typography>

                        <TextField
                            label="Stawka godzinowa"
                            type="number"
                            value={hourlySalary}
                            onChange={(e) => setHourlySalary(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: '1.5rem' }}
                        />
                        <TextField
                            label="Liczba godzin tygodniowo"
                            type="number"
                            value={weeklyHours}
                            onChange={(e) => setWeeklyHours(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: '1.5rem' }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <Button variant="contained" onClick={calculateHourlyWage}>
                                Oblicz
                            </Button>
                        </Box>
                        <Box sx={{ marginBottom: '1.5rem' }}>
                            <RadioGroup
                                aria-label="Typ wypłaty"
                                name="payType"
                                value={payType}
                                onChange={(e) => setPayType(e.target.value)}
                                row
                            >
                                <FormControlLabel value="netto" control={<Radio />} label="Netto" />
                                <FormControlLabel value="brutto" control={<Radio />} label="Brutto" />
                            </RadioGroup>
                        </Box>
                        <Box sx={{ marginBottom: '1.5rem' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Dzienna wypłata
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>
                                {payType === 'brutto' ? dailyPay : (dailyPay / (1 - 0.2)).toFixed(2)} zł
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                {payType === 'brutto' ? 'brutto' : 'netto'}
                            </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '1.5rem' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Tygodniowa wypłata
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>
                                {payType === 'brutto' ? weeklyPay : (weeklyPay / (1 - 0.2)).toFixed(2)} zł
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                {payType === 'brutto' ? 'brutto' : 'netto'}
                            </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '1.5rem' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Miesięczne wynagrodzenie
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>
                                {payType === 'brutto' ? monthlyPay : (monthlyPay / (1 - 0.2)).toFixed(2)} zł
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                {payType === 'brutto' ? 'brutto' : 'netto'}
                            </Typography>
                        </Box>
                        <Box sx={{ marginBottom: '1.5rem' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Roczne wynagrodzenie
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>
                                {payType === 'brutto' ? annualPay : (annualPay / (1 - 0.2)).toFixed(2)} zł
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                {payType === 'brutto' ? 'brutto' : 'netto'}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SalaryCalculator;
