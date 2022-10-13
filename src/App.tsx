import { Container, createStyles, Tabs } from '@mantine/core';
import { data } from './data/contributions.json';
import inspirations from './data/inspirations.json';
import { Footer } from "./components/Footer";
import React from "react";
import Participants from "./tabs/Participants";
import { Inspirations } from "./tabs/Inspirations";
import { Contributions } from "./tabs/Contributions";
import { Header } from "./components/Header";
import { TabsList } from "./components/TabsList";

const users = await Promise.all(Object.values(import.meta.glob('./data/users/*.json')).map(it => it()))
                        .then(modules => [...new Set(modules.map(module => JSON.parse(JSON.stringify(module))).map(module => module.default).flat())]);

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
        }`
    },
    tabsList: {
        borderBottom: '0 !important',
    },
    tab: {
        fontWeight: 500,
        height: 38,
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
        '&[data-active]': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        },
    },
}));

export default function App() {
    const { classes } = useStyles();
    return (
        <>
            <Tabs defaultValue={Object.keys(data)[Object.keys(data).length - 1]} variant="outline"
                  classNames={{ tabsList: classes.tabsList, tab: classes.tab, }}>
                <div className={classes.header}>
                    <Header/>
                    <Container>
                        <TabsList tabs={Object.keys(data).reverse()}/>
                    </Container>
                </div>
                <Container p="lg">
                    {Object.entries(data).map(([year, users]) => {
                        return (
                            <Tabs.Panel value={year} key={year}>
                                <Contributions year={year} contributions={users}/>
                            </Tabs.Panel>
                        )
                    })}
                    <Tabs.Panel value="inspirations">
                        <Inspirations inspirations={inspirations}/>
                    </Tabs.Panel>
                    <Tabs.Panel value="participants">
                        <Participants participants={users}/>
                    </Tabs.Panel>
                </Container>
            </Tabs>
            <Footer/>
        </>
    );
}
