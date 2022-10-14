import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>,
);

function ThemedApp() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }}>
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
