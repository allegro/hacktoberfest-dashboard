import {
    Accordion,
    Anchor,
    Avatar,
    Box,
    Container,
    createStyles,
    Group,
    Image,
    List,
    Paper,
    Space,
    Stack,
    Table,
    Tabs,
    Text,
    Title
} from '@mantine/core';
import hacktoberfest2022 from './assets/hacktoberfest-2022.svg';
import { data, updatedAt } from './data/contributions.json';
import inspirations from './data/inspirations.json';
import users from './data/users.json';
import repositories from './data/repositories.json';
import { Stats } from "./Stats";
import { Footer } from "./Footer";
import { User } from "./User";

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
            <Tabs
                defaultValue="2022"
                variant="outline"
                classNames={{
                    tabsList: classes.tabsList,
                    tab: classes.tab,
                }}
            >
                <div className={classes.header}>
                    <Container p="lg">
                        <Group position="apart">
                            <Box>
                                <Title>Contributions</Title>
                                <Text color="dimmed">Last
                                    update: {new Intl.RelativeTimeFormat('en').format(Math.round(((new Date(updatedAt).getTime() % 86400000 - new Date().getTime()) % 3600000) / 60000), 'minute')}</Text>
                            </Box>
                            <Image width={200} src={hacktoberfest2022}/>
                        </Group>
                    </Container>
                    <Container>
                        <Tabs.List>
                            {Object.keys(data).reverse().map((tab) => (
                                <Tabs.Tab value={tab} key={tab}>
                                    {tab}
                                </Tabs.Tab>
                            ))}
                            <Tabs.Tab value="participants" key="participants">
                                Participants
                            </Tabs.Tab>
                            <Tabs.Tab value="inspirations" key="inspirations">
                                Inspirations
                            </Tabs.Tab>
                        </Tabs.List>
                    </Container>
                </div>
                <Container p="lg">
                    {Object.entries(data).map(([year, users]) => {
                        return (
                            <Tabs.Panel value={year} pt="xs" key={year}>
                                <Stack spacing="sm">
                                    <Stats data={users}/>
                                    <Accordion chevronPosition="right" variant="contained">
                                        {
                                            users.map(user => (
                                                <Accordion.Item value={user.login} key={`${year}-${user.id}`}>
                                                    <Accordion.Control>
                                                        <Group>
                                                            <Box sx={{ flex: 1 }}>
                                                                <AccordionLabel
                                                                    label={user.login}
                                                                    image={user.avatarUrl}
                                                                    description={user.name || ''}
                                                                />
                                                            </Box>
                                                            <Group>
                                                                <Box>
                                                                    <Text align="center" size="xs"
                                                                          transform="uppercase" weight={700}
                                                                          color="dimmed">
                                                                        PR
                                                                    </Text>
                                                                    <Text align="center" size="md"
                                                                          transform="uppercase" weight={700}>
                                                                        {user.contributions.length}
                                                                    </Text>
                                                                </Box>
                                                                <Box>
                                                                    <Text align="center" size="xs"
                                                                          transform="uppercase" weight={700}
                                                                          color="dimmed">
                                                                        Stars
                                                                    </Text>
                                                                    <Text align="center" size="md"
                                                                          transform="uppercase" weight={700}>
                                                                        {Intl.NumberFormat().format(user.score)}
                                                                    </Text>
                                                                </Box>
                                                            </Group>
                                                        </Group>
                                                    </Accordion.Control>
                                                    <Accordion.Panel>
                                                        {user.bio && <Box p="sm">
                                                            <Text size="sm">{user.bio}</Text>
                                                        </Box>}
                                                        <Table>
                                                            <thead>
                                                            <tr>
                                                                <th>Repository</th>
                                                                <th>Pull Request</th>
                                                                <th style={{ minWidth: 100 }}>Created at</th>
                                                                <th style={{
                                                                    textAlign: 'right',
                                                                    minWidth: 80
                                                                }}>Stars
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {user.contributions.map((contribution, index) => (
                                                                <tr key={`${user.id}-prs-${index}`}>
                                                                    <td>
                                                                        <Text size="xs" lineClamp={1}>
                                                                            <Anchor href={contribution.url}
                                                                                    target="_blank">
                                                                                {contribution.owner.login}/{contribution.name}
                                                                            </Anchor>
                                                                        </Text>
                                                                    </td>
                                                                    <td>
                                                                        <Text size="xs" lineClamp={1}>
                                                                            <Anchor href={contribution.permalink}
                                                                                    target="_blank">
                                                                                {contribution.title}
                                                                            </Anchor>
                                                                        </Text>
                                                                    </td>
                                                                    <td>
                                                                        <Text size="xs">
                                                                            {Intl.DateTimeFormat().format(new Date(contribution.createdAt))}
                                                                        </Text>
                                                                    </td>
                                                                    <td style={{ textAlign: 'right' }}>
                                                                        <Text size="xs">
                                                                            {Intl.NumberFormat().format(contribution.stargazers.totalCount)}
                                                                        </Text>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </Table>
                                                        <Space h="md"/>
                                                        <Group>
                                                            <Image
                                                                imageProps={{ loading: 'lazy' }}
                                                                height={164}
                                                                fit="contain"
                                                                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&card_width=900`}/>
                                                        </Group>
                                                    </Accordion.Panel>
                                                </Accordion.Item>
                                            ))
                                        }
                                    </Accordion>
                                </Stack>
                            </Tabs.Panel>
                        )
                    })}
                    <Tabs.Panel value="inspirations">
                        <Title pb="lg">Inspirations</Title>
                        <List
                            spacing="xs"
                            size="sm"
                            center
                            withPadding
                        >
                            {inspirations.map((it, i) =>
                                <List.Item key={`inspiration-${i}`}>
                                    <Text>{it.title}</Text>
                                    <Text>{it.label}</Text>
                                </List.Item>
                            )}
                        </List>
                        <Title py="lg">Repositories</Title>
                        <List
                            spacing="xs"
                            size="sm"
                            center
                            withPadding
                        >
                            {repositories.map(it =>
                                <List.Item key={it}>
                                    <Anchor href={it}>{it}</Anchor>
                                </List.Item>
                            )}
                        </List>
                    </Tabs.Panel>
                    <Tabs.Panel value="participants">
                        <Paper withBorder radius="md" p="xs">
                            <List
                                spacing="xs"
                                size="sm"
                                center
                            >
                                {users.map(it =>
                                    <User name={it}/>
                                )}
                            </List>
                        </Paper>
                    </Tabs.Panel>
                </Container>
            </Tabs>
            <Footer/>
        </>
    );
}

function AccordionLabel({ label, image, description }: {
    label: string;
    image: string;
    description: string;
}) {
    return (
        <Group noWrap>
            <Avatar src={image} radius="xl" size="lg"/>
            <div>
                <Text>{label}</Text>
                <Text size="sm" color="dimmed" weight={400}>
                    {description}
                </Text>
            </div>
        </Group>
    );
}
