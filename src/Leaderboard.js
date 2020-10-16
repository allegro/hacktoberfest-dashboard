import React, { useState } from "react";
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ApolloClient from 'apollo-boost';
import { makeStyles, TextField } from "@material-ui/core";
import { getPullRequests } from "./queries";
import users from './users';
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import StarIcon from '@material-ui/icons/Star';
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: { width: '100%', backgroundColor: theme.palette.background.paper },
    inline: { display: 'inline' },
    chips: { display: 'flex', height: 42, alignItems: 'center' },
    loader: { display: 'flex', height: 200, alignItems: 'center', justifyContent: 'center' },
    stars: {
        display: 'flex',
        alignItems: 'center',
        width: 100,
        justifyContent: 'space-around',
        color: theme.palette.primary.main
    }
}));

const LOCALSTORAGE_KEY = 'github_token';

export default function Leaderboard({prsAfter}) {
    const [token, setToken] = useState(localStorage.getItem(LOCALSTORAGE_KEY));

    const client = new ApolloClient({
        uri: 'https://api.github.com/graphql', request: (operation) => {
            operation.setContext({ headers: { authorization: `Bearer ${token}` } })
        }
    });

    return <ApolloProvider client={client}>
        <PullRequestTable client={client} token={token} setToken={setToken} prsAfter={prsAfter}/>
    </ApolloProvider>;
}

function PullRequestTable({ client, token, setToken, prsAfter }) {
    const classes = useStyles();
    const { loading, error, data } = useQuery(getPullRequests(users, prsAfter), { pollInterval: 300000 });

    if (!token) return <TokenPrompt updateToken={setToken}/>;

    if (loading) return <div className={classes.loader}><CircularProgress size={48}/></div>;
    if (error) {
        setToken(null);
        return <p>error</p>;
    }
    const entries = Object.entries(toUsersMap(data)).sort((a, b) => {
        return calcScore(b[1]) - calcScore(a[1]);
    });
    return (
        <ApolloProvider client={client}>
            <List className={classes.root}>
                {entries.length === 0 ?
                    <ListItem alignItems="flex-start"><ListItemText>Brak Pull Requestów</ListItemText></ListItem> : ""}
                {entries.map((entry, i) => {
                    const user = JSON.parse(entry[0]);
                    const pullRequests = entry[1];
                    return <React.Fragment key={user.login}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={user.login} src={user.avatarUrl}/>
                            </ListItemAvatar>
                            <ListItemText className={classes.chips}
                                          primary={<Link href={`https://github.com/pulls?q=is%3Apr+author%3A${user.login}+archived%3Afalse+created:>${prsAfter}`}>{user.login}</Link>}
                                          secondary={renderChips(pullRequests)}/>
                            <ListItemSecondaryAction className={classes.stars}>
                                <StarIcon style={{ height: 40 }}/>
                                <Typography>{calcScore(pullRequests)}</Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        {i === entries.length - 1 ? "" : <Divider component="li"/>}
                    </React.Fragment>
                })}
            </List>
        </ApolloProvider>
    );
}

function TokenPrompt({ updateToken }) {
    const [token, setToken] = useState(null);
    return (
        <Paper style={{ padding: 20, display: 'flex', justifyContent: 'space-around' }}>
            <TextField onChange={(e) => setToken(e.target.value)} placeholder="github personal token" value={token}
                       style={{ width: '90%' }}/>
            <Button variant="primary" onClick={() => {
                localStorage.setItem(LOCALSTORAGE_KEY, token);
                updateToken(token);
            }}>Dodaj</Button>
        </Paper>
    );
}

function calcScore(pullRequests) {
    return pullRequests.map(it => it.repository.stargazers.totalCount).reduce((a, b) => a + b, 0)
}

function getUniqueRepoNames(pullRequests) {
    return Array.from(new Set(pullRequests.map(pr => pr.repository.name)))
}

function renderChips(pullRequests) {
    return getUniqueRepoNames(pullRequests).map((repoName, i) => <Chip component="small" key={i} style={{ marginLeft: '10px' }} size="small"
                                             label={repoName}/>);
}

function toUsersMap(data) {
    return data.search.edges
        .filter(it => it.node.author.login !== it.node.repository.owner.login)
        .reduce((acc, edge) => {
        const key = JSON.stringify(edge.node.author);
        if (!acc[key]) acc[key] = [];
        acc[key] = acc[key].concat([{
            title: edge.node.title,
            repository: edge.node.repository,
            permalink: edge.node.permalink
        }]);
        return acc;
    }, {});
}
