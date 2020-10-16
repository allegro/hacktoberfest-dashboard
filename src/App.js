import React from 'react';
import logo from './logo.svg';
import allegro from './allegro.svg';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Leaderboard from "./Leaderboard";
import Inspirations from "./Inspirations";

const useStyles = makeStyles(theme => ({
    root: { height: '100vh', width: '100%' },
    brand: { marginRight: theme.spacing(2) },
    logo: { marginTop: 20, width: '100%', maxHeight: 300 },
    header: { margin: theme.spacing(4), textAlign: 'center', gridArea: '1 / 1 / 2 / 2' },
    main: { gridArea: '2 / 1 / 3 / 2', color: '#fff' },
    title: { padding: theme.spacing(2) },
    footer: { gridArea: '3 / 1 / 4 / 2' },
    app: { display: 'grid', gridTemplateColumns: '1fr' }
}));

function App({prsAfter}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img src={allegro} className={classes.brand} alt="allegro"/>
                    <Typography variant="h6">
                        Hacktoberfest
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container className={classes.app}>
                <header className={classes.header}>
                    <img src={logo} className={classes.logo} alt="logo"/>
                </header>
                <main className={classes.main}>
                    <Typography gutterBottom variant="h3" align="center">TOP 100</Typography>
                    <Leaderboard prsAfter={prsAfter} />
                    <Typography component="p" variant="caption" align="center" className={classes.title}>
                        is:<strong>pr</strong> created after:<strong>{prsAfter}</strong> author:<strong>login</strong>
                    </Typography>
                </main>
                <footer className={classes.footer}>
                    <Inspirations/>
                </footer>
            </Container>
        </div>
    );
}

export default App;
