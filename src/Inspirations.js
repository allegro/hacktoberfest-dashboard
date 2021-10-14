import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import userRepos from './data/repositories.json';
import inspirations from './data/inspirations.json';

const useStyles = makeStyles(theme => ({
    title: { color: 'white', marginBottom: theme.spacing(2), marginTop: theme.spacing(2) },
    list: { width: '100%', backgroundColor: theme.palette.background.paper, marginBottom: theme.spacing(4) }
}));

export default function Inspirations() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography gutterBottom variant="h4" align="center" className={classes.title}>Inspiracje</Typography>
            <List className={classes.list}>
                {inspirations.map((it, i) =>
                    <React.Fragment key={it.title}>
                        <ListItem>
                            <ListItemText primary={it.title} secondary={
                                <Link href={it.link}>{it.label}</Link>
                            }/>
                        </ListItem>
                        {i === inspirations.length - 1 ? "" : <Divider component="li"/>}
                    </React.Fragment>
                )}
            </List>
            <Typography gutterBottom variant="h4" align="center" className={classes.title}>
                Projekty zgłoszone przez uczestników
            </Typography>
            <List dense className={classes.list}>
                {userRepos.map((it, i) =>
                    <React.Fragment key={it}>
                        <ListItem>
                            <ListItemText primary={<Link href={it}>{it}</Link>}/>
                        </ListItem>
                        {i === userRepos.length - 1 ? "" : <Divider component="li"/>}
                    </React.Fragment>
                )}
            </List>
        </React.Fragment>
    );
}
