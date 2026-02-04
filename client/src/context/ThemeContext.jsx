import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Function to determine theme based on time
        const updateThemeByTime = () => {
            const hour = new Date().getHours();

            // Light theme: 6 AM to 6 PM (6:00 - 18:00)
            // Dark theme: 6 PM to 6 AM (18:00 - 6:00)
            const newTheme = (hour >= 6 && hour < 18) ? 'light' : 'dark';

            setTheme(newTheme);

            // Apply theme to document
            if (newTheme === 'light') {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            } else {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
            }
        };

        // Initial theme setup
        updateThemeByTime();

        // Check every minute for theme updates
        const interval = setInterval(updateThemeByTime, 60000);

        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        if (newTheme === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
