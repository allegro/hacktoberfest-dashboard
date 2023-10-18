import { Container, List, Paper, Title, useMantineTheme } from '@mantine/core';
import repositories from '../data/repositories.json';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Repository } from '../components/Repository';
import { Inspiration } from '../components/Inspiration';

export function Inspirations({
  inspirations,
}: {
  inspirations: { title: string; link: string; label: string }[];
}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  return (
    <Container px={isMobile ? 0 : undefined}>
      <Title pb='lg'>Inspirations</Title>
      <Paper withBorder radius='md' py='xs' px={0}>
        <List spacing='xs' size='sm' center listStyleType='none'>
          {inspirations.map((it, i) => (
            <List.Item key={`inspiration-${i}`}>
              <Inspiration inspiration={it} />
            </List.Item>
          ))}
        </List>
      </Paper>
      <Title py='lg'>Repositories</Title>
      <Paper withBorder radius='md' py='xs' px={0}>
        <List spacing='xs' size='sm' center>
          {repositories.map((repo) => (
            <Repository key={repo} repo={repo} />
          ))}
        </List>
      </Paper>
    </Container>
  );
}
