import { createStyles, Container, Group, ActionIcon, Image } from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandGithub,
} from '@tabler/icons';
import allegro from '../assets/allegro.svg';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image src={allegro} width={120} />
        <Group spacing={0} className={classes.links} position='right' noWrap>
          <ActionIcon size='lg' component='a' href='https://github.com/allegro'>
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size='lg' component='a' href='https://twitter.com/allegrotech'>
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size='lg'
            component='a'
            href='https://www.youtube.com/channel/UC66wC6RBjFk6CuVz7wdjJ5g'
          >
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size='lg' component='a' href='https://www.instagram.com/allegropl'>
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
