import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import StarIcon from '@material-ui/icons/Star';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const useStyles = makeStyles(theme => ({
    root: { width: '100%', backgroundColor: theme.palette.background.paper },
    inline: { display: 'inline' },
    chips: { display: 'flex', height: 42, alignItems: 'center' },
    loader: { display: 'flex', height: 200, alignItems: 'center', justifyContent: 'center' },
    stats: {
        width: 100,
        color: theme.palette.primary.main
    },
    stat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statText: {
        marginLeft: 4,
    },
    statIcon: {
        height: 20,
    },
}));

export default function Leaderboard({ contributions }) {
    const classes = useStyles();
    const { eventDate, data } = contributions;

    return (
        <List className={classes.root}>
            {data.length === 0 ?
                <ListItem alignItems="flex-start"><ListItemText>Brak Pull Requestów</ListItemText></ListItem> : ""}
            {data.map(({ login, avatar, score, repos, totalPRs }, index) => (
                <React.Fragment key={login}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={login} src={avatar}/>
                        </ListItemAvatar>
                        <ListItemText className={classes.chips}
                                    primary={<Link href={`https://github.com/pulls?q=is%3Apr+author%3A${login}+archived%3Afalse+created:${eventDate}`}>{login}</Link>}
                                    secondary={renderChips(repos)}/>
                        <ListItemSecondaryAction className={classes.stats}>
                            <div className={classes.stat}>
                                <StarIcon className={classes.statIcon}/>
                                <Typography className={classes.statText}>{score}</Typography>
                            </div>
                            <div style={{ marginBottom: 4 }} className={classes.stat}>
                                <TrendingUpIcon className={classes.statIcon}/>
                                <Typography className={classes.statText}>{totalPRs}</Typography>
                            </div>
                        </ListItemSecondaryAction>
                    </ListItem>
                    {index === data.length - 1 ? "" : <Divider component="li"/>}
                </React.Fragment>
            ))}
        </List>
    );
}

function renderChips(repos) {
    return repos.map(repoName => (
        <Chip
            component="small"
            key={repoName}
            style={{ marginLeft: '10px' }}
            size="small"
            label={repoName}
        />
    ));
}
