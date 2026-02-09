import React, { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import Loader from './components/Loader';
import { ThemeProvider } from './context/ThemeContext';


function App() {
    const [loading, setLoading] = useState(true);

    return (
        <ThemeProvider>
            {loading && <Loader onComplete={() => setLoading(false)} />}
            <AppRoutes />
        </ThemeProvider>
    );
}

export default App;
