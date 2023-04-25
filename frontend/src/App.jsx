import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Landing } from './pages/Landing';
import { DataEntry } from './pages/DataEntry';
import { CreatePaper } from './pages/CreatePaper';
import { DataStudio } from './pages/DataStudio';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'Merriweather'
    }
});

// 150050

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/data-entry" element={<DataEntry />} />
                    <Route path="/create-paper" element={<CreatePaper />} />
                    <Route path="/studio" element={<DataStudio />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
