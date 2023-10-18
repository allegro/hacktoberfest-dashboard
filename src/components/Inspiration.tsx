import { Text, createStyles, Anchor, Group, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconExternalLink } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  row: {
    display: 'block',
    width: '100%',
    maxWidth: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
    overflowX: 'auto',
  },
  rowMobile: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.dark[0],
  },
  title: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1em',
  },
}));

export type InspirationObject = {
  title: string;
  link: string;
  label: string;
};

export function Inspiration({ inspiration, ...others }: { inspiration: InspirationObject }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const { classes, cx } = useStyles();
  return (
    <Anchor
      href={inspiration.link}
      target='_blank'
      className={cx(classes.row, isMobile && classes.rowMobile)}
      {...others}
    >
      <Group py='xs' px='sm'>
        <div className={classes.title}>
          <Text>{inspiration.title}</Text>
          <span>|</span>
          <Text color='dimmed'>{inspiration.label}</Text>
        </div>
        <IconExternalLink size={14} stroke={1.5} />
      </Group>
    </Anchor>
  );
}
