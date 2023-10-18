import { Text, createStyles, Anchor, Group, Avatar, Box, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconExternalLink } from '@tabler/icons';

const GITHUB_LINK = 'https://github.com/';
const useStyles = createStyles((theme) => ({
  repo: {
    display: 'block',
    width: '100%',
    maxWidth: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
    overflowX: 'auto',
  },
  repoMobile: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.dark[0],
  },
}));

export function Repository({ repo, ...others }: { repo: string }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const { classes, cx } = useStyles();
  const year = new Date().getFullYear();
  const githubName = repo.substring(GITHUB_LINK.length);
  const isProject = githubName.split('/').length > 1;
  return (
    <Anchor
      href={repo}
      target='_blank'
      className={cx(classes.repo, isMobile && classes.repoMobile)}
      {...others}
    >
      <Group py='xs' px='sm'>
        <Text>{githubName}</Text>
        <IconExternalLink size={14} stroke={1.5} />
        {isProject && (
          <img
            alt='GitHub Hacktoberfest combined status'
            src={`https://img.shields.io/github/hacktoberfest/${year}/${githubName}`}
          />
        )}
      </Group>
    </Anchor>
  );
}
