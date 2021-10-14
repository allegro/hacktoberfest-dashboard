import React from 'react';
import { hydrate, render } from 'react-dom';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import App from './App';
import './index.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F74700',
            contrastText: "#FFFFFF"
        },
    },
});

const root = document.getElementById('root');
const fn = root.hasChildNodes() ? hydrate : render;

fn(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    root
);
