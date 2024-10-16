import { createStyles } from '@mantine/core';
import { Footer } from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import { Body } from './components/Body';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const allUsers = await Promise.all(
  Object.values(import.meta.glob('./data/users/*.json')).map((it) => it()),
).then((modules) => [
  ...new Set(
    modules
      .map((module) => JSON.parse(JSON.stringify(module)))
      .map((module) => module.default)
      .flat(),
  ),
]);

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
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
  selectIcon: {
    transition: 'transform 150ms ease',
    transform: 'rotate(0deg)',

    '[data-expanded] &': {
    transform: 'rotate(180deg)',
    }
  },
  selectControl: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px',
}
}));

export default function App() {
  const { classes } = useStyles();
  return (
    <>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Body allUsers={allUsers} classes={classes} />
        </QueryParamProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}
