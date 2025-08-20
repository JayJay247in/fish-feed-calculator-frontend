import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FeedCalculatorForm from './components/FeedCalculatorForm';
import './App.css'; // Import the stylesheet

// A simple theme for a professional look and feel
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#00695c',
        },
        secondary: {
            main: '#ffab40',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ my: 4, textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Aquaculture Feed Calculator
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Optimize your feed composition and cost with our advanced calculator.
                    </Typography>
                </Box>
                <FeedCalculatorForm />
            </Container>
        </ThemeProvider>
    );
}

export default App;