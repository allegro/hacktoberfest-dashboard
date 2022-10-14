import { Anchor, Avatar, createStyles, Group, Text } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

export function Participant({ name, ...others }: { name: string }) {
  const { classes } = useStyles();
  return (
    <Anchor href={`https://github.com/${name}`} className={classes.user} {...others}>
      <Group p='xs'>
        <Avatar
          imageProps={{ loading: 'lazy' }}
          src={`https://github.com/${name}.png`}
          radius='xl'
          size='lg'
        />
        <div style={{ flex: 1 }}>
          <Text size='sm' weight={500}>
            {name}
          </Text>
        </div>
        <IconExternalLink size={14} stroke={1.5} />
      </Group>
    </Anchor>
  );
}
