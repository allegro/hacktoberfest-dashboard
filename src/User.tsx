import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles, Anchor,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },
}));

interface UserButtonProps extends UnstyledButtonProps {
    name: string;
}

export function User({ name, ...others }: UserButtonProps) {
    const { classes } = useStyles();

    return (
        <Anchor href={`https://github.com/${name}`}  className={classes.user} {...others}>
            <Group>
                <Avatar src={`https://github.com/${name}.png`} radius="xl" size="lg" />
                <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        {name}
                    </Text>
                </div>
                <IconChevronRight size={14} stroke={1.5} />
            </Group>
        </Anchor>
    );
}