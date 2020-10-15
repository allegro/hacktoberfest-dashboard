import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    title: { color: 'white', marginBottom: theme.spacing(2), marginTop: theme.spacing(2) },
    list: { width: '100%', backgroundColor: theme.palette.background.paper }
}));

const userRepos = [
        "https://github.com/fsprojects/Paket",
        "https://github.com/fsharp/FAKE",
        "https://github.com/demisto/content",
        "https://github.com/i18next/i18next",
        "https://github.com/allegro/hermes",
        "https://github.com/kif-framework",
        "https://github.com/apollographql",
        "https://github.com/jhipster/generator-jhipster",
        "https://github.com/javers/javers",
        "https://github.com/allegro/envoy-control",
        "https://github.com/hashicorp/consul",
        "https://github.com/spring-projects",
        "https://github.com/badges/shields",
        "https://github.com/allegro/envoy-control",
        "https://github.com/allegro/bigflow",
        "https://github.com/facebook/screenshot-tests-for-android",
        "https://github.com/mac-cain13",
        "https://github.com/Kong/insomnia",
        "https://github.com/allegro/hermes",
        "https://github.com/resilience4j/resilience4j",
        "https://github.com/spring-projects/spring-fu",
        "https://github.com/micrometer-metrics/micrometer",
        "https://github.com/tsenart/vegeta",
        "https://github.com/tensorflow/probability",
        "https://github.com/mitmproxy/mitmproxy",
        "https://github.com/elastic/elasticsearch",
        "https://github.com/nodejs/node",
        "https://github.com/Microsoft/TypeScript",
        "https://github.com/Microsoft/vscode",
        "https://github.com/javers/javers",
        "https://github.com/dankraw/ssh-aliases",
        "https://github.com/Netflix/Hystrix",
        "https://github.com/spring-projects/spring-boot",
        "https://github.com/apache/incubator-druid",
        "https://github.com/vapor/vapor",
        "https://github.com/IBM-Swift/Kitura",
        "https://github.com/mat3e/dorf",
        "https://github.com/sloik/SwiftPlayground"
];

const inspirations = [
    {
        title: 'Hacktoberfest labeled',
        link: 'https://github.com/topics/hacktoberfest',
        label: 'topic: hacktoberfest'
    },
    {
        title: 'Good first issue',
        link: 'https://github.com/search?q=label%3A%22good+first+issue%22+state%3Aopen&type=Issues&ref=advsearch&l=&l=',
        label: 'label: "good first issue" state:open'
    },
    {
        title: 'Ideal for contribution',
        link: 'https://github.com/search?q=label%3A%22ideal-for-contribution%22+state%3Aopen&type=Issues',
        label: 'label:"ideal for contribution" state:open'
    }
];

export default function Inspirations() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography gutterBottom variant="h4" align="center" className={classes.title}>Inspiracje</Typography>
            <List className={classes.list}>
                {inspirations.map((it, i) =>
                    <React.Fragment>
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
                    <React.Fragment>
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
