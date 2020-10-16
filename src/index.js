import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import { deepOrange, indigo } from "@material-ui/core/colors";
import App from './App';
import './index.css';

const theme = createMuiTheme({ palette: { primary: deepOrange, secondary: indigo } });

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App prsAfter={new Date("2020-10-14").toISOString().substr(0,10)}/>
    </ThemeProvider>,
    document.getElementById('root')
);
