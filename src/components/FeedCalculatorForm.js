import React, { useState, useEffect } from 'react';
import {
    Box, Button, CircularProgress, Grid, TextField, Select, MenuItem,
    FormControl, InputLabel, Paper, Typography, Alert
} from '@mui/material';
import apiClient from '../api';
import CalculationResult from './CalculationResult';

const FeedCalculatorForm = () => {
    const [formData, setFormData] = useState({
        fishQuantity: '',
        currentWeightPerFish: '',
        targetWeightPerFish: '',
        fishSpecies: 'catfish',
        growthPeriodDays: '',
        waterTemperatureCelsius: '',
    });
    const [supportedSpecies, setSupportedSpecies] = useState([]);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch supported species when the component mounts
        apiClient.get('/species')
            .then(response => {
                setSupportedSpecies(response.data.data || []);
            })
            .catch(err => {
                console.error("Failed to fetch species", err);
                setError('Could not connect to the server to fetch fish species.');
            });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        setResult(null);

        const requestBody = {
            fishQuantity: Number(formData.fishQuantity),
            currentWeightPerFish: Number(formData.currentWeightPerFish),
            targetWeightPerFish: Number(formData.targetWeightPerFish),
            fishSpecies: formData.fishSpecies,
        };

        if (formData.growthPeriodDays) {
            requestBody.growthPeriodDays = Number(formData.growthPeriodDays);
        }
        
        if (formData.waterTemperatureCelsius) {
            requestBody.environmentalFactors = {
                waterTemperatureCelsius: Number(formData.waterTemperatureCelsius),
            };
        }

        try {
            const response = await apiClient.post('/calculate', requestBody);
            setResult(response.data.data);
        } catch (err) {
            console.error('Calculation API error:', err);
            const errorMessage = err.response?.data?.message || 'An unexpected error occurred. Please try again.';
            setError(`Calculation Failed: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>Calculation Parameters</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="fishQuantity"
                                label="Fish Quantity"
                                type="number"
                                value={formData.fishQuantity}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Fish Species</InputLabel>
                                <Select
                                    name="fishSpecies"
                                    value={formData.fishSpecies}
                                    label="Fish Species"
                                    onChange={handleChange}
                                >
                                    {supportedSpecies.map(species => (
                                        <MenuItem key={species} value={species}>{species.charAt(0).toUpperCase() + species.slice(1)}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="currentWeightPerFish"
                                label="Current Weight per Fish (kg)"
                                type="number"
                                value={formData.currentWeightPerFish}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="targetWeightPerFish"
                                label="Target Weight per Fish (kg)"
                                type="number"
                                value={formData.targetWeightPerFish}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="growthPeriodDays"
                                label="Growth Period (days, optional)"
                                type="number"
                                value={formData.growthPeriodDays}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="waterTemperatureCelsius"
                                label="Water Temperature (°C, optional)"
                                type="number"
                                value={formData.waterTemperatureCelsius}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                sx={{ minWidth: 200, minHeight: 50 }}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Calculate Feed'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
            
            {result && <CalculationResult resultData={result} />}
        </>
    );
};

export default FeedCalculatorForm;