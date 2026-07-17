import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications]       = useState(3);
  const [theme, setTheme]                       = useState('dark');

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const markNotificationsRead = useCallback(() => {
    setNotifications(0);
  }, []);

  return (
    <AppContext.Provider value={{
      sidebarCollapsed, toggleSidebar,
      notifications, markNotificationsRead,
      theme, toggleTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
