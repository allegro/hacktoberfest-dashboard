import { Box, Center, Group, Paper, RingProgress, SimpleGrid, Text, Tooltip } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons';

export function Stats({ data }: any) {
    return (
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Paper withBorder radius="md" p="xs">
                <Group>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value: 10, color: 'green' }]}
                        label={
                            <Center>
                                <IconArrowUpRight size={22} stroke={1.5}/>
                            </Center>
                        }
                    />
                    <Box>
                        <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                            Total Users
                        </Text>
                        <Text weight={700} size="xl">
                            {data.length}
                        </Text>
                    </Box>
                </Group>
            </Paper>
            <Paper withBorder radius="md" p="xs">
                <Group>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value: 10, color: 'green' }]}
                        label={
                            <Center>
                                <IconArrowUpRight size={22} stroke={1.5}/>
                            </Center>
                        }
                    />

                    <Box>
                        <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                            Total PRs
                        </Text>
                        <Text weight={700} size="xl">
                            {data.reduce((previousValue: number, currentValue: any) => previousValue + currentValue.totalPRs, 0)}
                        </Text>
                    </Box>
                </Group>
            </Paper>
            <Paper withBorder radius="md" p="xs">
                <Group>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value: 10, color: 'green' }]}
                        label={
                            <Center>
                                <IconArrowUpRight size={22} stroke={1.5}/>
                            </Center>
                        }
                    />
                    <Box>
                        <Tooltip label="Tooltip">
                            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                                Total Star
                            </Text>
                        </Tooltip>
                        <Text weight={700} size="xl">
                            {Intl.NumberFormat().format(data.reduce((previousValue: number, currentValue: any) => previousValue + currentValue.score, 0))}
                        </Text>
                    </Box>
                </Group>
            </Paper>
        </SimpleGrid>
    );
}