import React, { useState } from 'react';
import {
    Paper, Typography, Grid, Box, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, List, ListItem, // ListItemIcon and ListItemText are removed
    Button, CircularProgress, Alert, Chip
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import apiClient from '../api';

// Helper function to format numbers cleanly
const formatNumber = (num) => num ? num.toFixed(2) : '0.00';

const CalculationResult = ({ resultData }) => {
    const [orderState, setOrderState] = useState({ isLoading: false, error: '', confirmation: null });

    const handlePlaceOrder = async () => {
        setOrderState({ isLoading: true, error: '', confirmation: null });
        const orderRequest = {
            items: resultData.ingredients.map(ing => ({
                ingredientName: ing.ingredientName,
                totalAmountKg: ing.totalAmountKg
            }))
        };
        try {
            const response = await apiClient.post('/order', orderRequest);
            setOrderState({ isLoading: false, error: '', confirmation: response.data.data });
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Could not place the order.';
            setOrderState({ isLoading: false, error: errorMessage, confirmation: null });
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom color="primary">Calculation Results</Typography>
            
            {/* --- SUMMARY SECTION --- */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}><Typography><strong>Total Daily Feed:</strong> {formatNumber(resultData.dailyFeedAmountKg)} kg</Typography></Grid>
                <Grid item xs={12} md={4}><Typography><strong>Total Feed Needed:</strong> {formatNumber(resultData.totalFeedNeededKg)} kg</Typography></Grid>
                <Grid item xs={12} md={4}><Typography><strong>Estimated Growth Period:</strong> {resultData.estimatedGrowthDays} days</Typography></Grid>
                <Grid item xs={12}><Typography variant="h6"><strong>Estimated Total Cost:</strong> ${formatNumber(resultData.estimatedCostUSD)}</Typography></Grid>
            </Grid>

            {/* --- INGREDIENTS TABLE --- */}
            <Typography variant="h5" gutterBottom>Ingredient Composition</Typography>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ingredient</TableCell>
                            <TableCell align="right">Percentage</TableCell>
                            <TableCell align="right">Daily Amount (kg)</TableCell>
                            <TableCell align="right">Total Amount (kg)</TableCell>
                            <TableCell align="right">Cost/kg ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resultData.ingredients.map((ing) => (
                            <TableRow key={ing.ingredientName}>
                                <TableCell>{ing.ingredientName}</TableCell>
                                <TableCell align="right">{formatNumber(ing.percentage)}%</TableCell>
                                <TableCell align="right">{formatNumber(ing.dailyAmountKg)}</TableCell>
                                <TableCell align="right">{formatNumber(ing.totalAmountKg)}</TableCell>
                                <TableCell align="right">${formatNumber(ing.costPerKg)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* --- OTHER DETAILS --- */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>Feeding Schedule</Typography>
                    <List dense>
                        <ListItem><Typography><strong>Feedings per Day:</strong> {resultData.feedingSchedule.feedingsPerDay}</Typography></ListItem>
                        <ListItem><Typography><strong>Amount per Feeding:</strong> {formatNumber(resultData.feedingSchedule.amountPerFeedingKg)} kg</Typography></ListItem>
                        <ListItem><Typography><strong>Recommended Times:</strong> {resultData.feedingSchedule.feedingTimes.join(', ')}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>Nutrient Analysis</Typography>
                     <Chip 
                        icon={resultData.nutrientAnalysis.meetsRequirements ? <CheckCircleOutlineIcon /> : <WarningAmberIcon />}
                        label={resultData.nutrientAnalysis.meetsRequirements ? "Meets Requirements" : "Requirement Mismatch"}
                        color={resultData.nutrientAnalysis.meetsRequirements ? "success" : "warning"}
                        sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">{resultData.nutrientAnalysis.nutritionalNotes}</Typography>
                </Grid>
            </Grid>
            
            {/* --- FEED MILL INTEGRATION --- */}
            <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>Place Feed Order</Typography>
                {!orderState.confirmation ? (
                    <>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            disabled={orderState.isLoading}
                            onClick={handlePlaceOrder}
                        >
                            {orderState.isLoading ? <CircularProgress size={24} color="inherit"/> : "Place Simulated Order"}
                        </Button>
                        {orderState.error && <Alert severity="error" sx={{ mt: 2 }}>{orderState.error}</Alert>}
                    </>
                ) : (
                    <Alert severity="success">
                        <Typography><strong>Order Confirmed!</strong></Typography>
                        <Typography>Order ID: {orderState.confirmation.orderId}</Typography>
                        <Typography>Supplier: {orderState.confirmation.supplier}</Typography>
                        <Typography>Total Cost: ${formatNumber(orderState.confirmation.totalCost)}</Typography>
                    </Alert>
                )}
            </Box>
        </Paper>
    );
};

export default CalculationResult;