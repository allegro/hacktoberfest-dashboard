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
import contributions from "./data/contributions.json";
import Legend from './Legend';

const useStyles = makeStyles(theme => ({
    root: { height: '100vh', width: '100%' },
    brand: { marginRight: theme.spacing(2) },
    guides: { display: 'flex', justifyContent: 'space-between', margin: 0, padding: 0 },
    guideLink: { color: '#fff' },
    logo: { marginTop: 20, width: '100%', maxHeight: 300 },
    header: { margin: theme.spacing(4), textAlign: 'center', gridArea: '1 / 1 / 2 / 2' },
    main: { gridArea: '2 / 1 / 3 / 2' },
    title: { padding: theme.spacing(2), color: '#fff' },
    footer: { gridArea: '3 / 1 / 4 / 2' },
    app: { display: 'grid', gridTemplateColumns: '1fr' }
}));

function App() {
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
                    <ul className={classes.guides}>
                      <li><a className={classes.guideLink} href="https://opensource.guide">https://opensource.guide</a></li>
                      <li><a className={classes.guideLink} href="https://hacktoberfest.digitalocean.com">https://hacktoberfest.digitalocean.com</a></li>
                    </ul>

                </header>
                <main className={classes.main}>
                    <Typography gutterBottom variant="h3" style={{color: 'white'}} align="center">TOP 100</Typography>
                    <Legend />
                    <Leaderboard contributions={contributions} />
                    <Typography component="p" variant="caption" align="center" className={classes.title}>
                        is:<strong>pr</strong> created:<strong>{contributions.eventDate}</strong> author:<strong>login</strong><br />(last update: <strong>{new Date(contributions.updatedAt).toLocaleTimeString("pl-PL", { timeZone: "Europe/Warsaw" })}</strong>)
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
