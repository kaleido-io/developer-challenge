import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Landing } from './pages/Landing';
import { DataStudio } from './pages/DataStudio';
import { PaperViewer } from './pages/PaperViewer';
import { JournalCentral } from './pages/JournalCentral';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/studio" element={<DataStudio />} />
                <Route path="/paper/:paperId" element={<PaperViewer />} />
                <Route path="/journal-central" element={<JournalCentral />} />
            </Routes>
        </Router>
    );
}

export default App;
