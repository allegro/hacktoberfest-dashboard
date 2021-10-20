import React, { useState, useMemo } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import StarIcon from '@material-ui/icons/Star';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const useStyles = makeStyles((theme) => ({
    sortFormContainer: { display: "flex", justifyContent: "flex-end" },
    sortForm: { width: 160, marginBottom: 16 },
    sortFormLabel: { color: theme.palette.primary.main },
    sortFormSelect: {
        color: theme.palette.primary.main,
        "&:before": { borderColor: theme.palette.primary.main },
    },
    sortFormSelectIcon: { color: theme.palette.primary.main },
    root: { width: "100%", backgroundColor: theme.palette.background.paper },
    inline: { display: "inline" },
    chips: { display: "flex", height: 42, alignItems: "center" },
    loader: {
        display: "flex",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    stats: {
        width: 100,
        color: theme.palette.primary.main,
    },
    stat: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
    const [sortBy, setSortBy] = useState('score');

    const items = useMemo(() => [...data].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        console.log(a, b, sortBy)

        return valueB - valueA;
    }), [data, sortBy]);

    return (
        <>
            <div className={classes.sortFormContainer}>
                <FormControl className={classes.sortForm}>
                    <InputLabel className={classes.sortFormLabel} htmlFor="sort-by">Sortuj po:</InputLabel>
                    <Select
                        className={classes.sortFormSelect}
                        native
                        value={sortBy}
                        onChange={(value) => setSortBy(value.target.value)}
                        inputProps={{
                            name: 'sort-by',
                            id: 'sort-by',
                            classes: {
                                icon: classes.sortFormSelectIcon,
                            },
                        }}
                    >
                        <option selected value="score">Gwiazdkach</option>
                        <option value="totalPRs">Pull Requestach</option>
                    </Select>
                </FormControl>
            </div>

            <List className={classes.root}>
                {items.length === 0 ?
                    <ListItem alignItems="flex-start"><ListItemText>Brak Pull Requestów</ListItemText></ListItem> : ""}
                {items.map(({ login, avatar, score, repos, totalPRs }, index) => (
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
        </>
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
