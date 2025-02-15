import { useState, useEffect } from 'react';

export const useTheme = () => {
 
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light'; 
  });

  
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]); 

 
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme }; 
};
