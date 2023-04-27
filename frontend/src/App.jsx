import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Landing } from './pages/Landing';
import { DataStudio } from './pages/DataStudio';
import { PaperViewer } from './pages/PaperViewer';

// 150050

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/studio" element={<DataStudio />} />
                <Route path="/paper/:paperId" element={<PaperViewer />} />
            </Routes>
        </Router>
    );
}

export default App;
