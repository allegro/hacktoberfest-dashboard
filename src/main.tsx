import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { usePreferredColorScheme } from './hooks/usePreferredColorScheme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>,
);

function ThemedApp() {
  const preferredColorScheme = usePreferredColorScheme();
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme((previousScheme) => value || (previousScheme === 'dark' ? 'light' : 'dark'));
  };

  // when user changes preferred color scheme, set it as current
  useEffect(() => {
    if (preferredColorScheme !== colorScheme) {
      setColorScheme(preferredColorScheme);
    }
  }, [preferredColorScheme]);
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
