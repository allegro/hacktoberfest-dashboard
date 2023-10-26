import { Box, Container, Group, Image, Text, Title, useMantineColorScheme } from '@mantine/core';
import { updatedAt } from '../data/contributions.json';
import hacktoberfestLogoDark from '../assets/hacktoberfest-2023-dark.png';
import hacktoberfestLogoLight from '../assets/hacktoberfest-2023-light.png';
import React from 'react';

export function Header() {
  const { colorScheme } = useMantineColorScheme();
  const time = new Intl.RelativeTimeFormat('en').format(
    Math.round(
      (((new Date(updatedAt).getTime() % 86400000) - new Date().getTime()) % 3600000) / 60000,
    ),
    'minute',
  );
  return (
    <Container p='lg'>
      <Group position='apart'>
        <Box>
          <Title>Contributions</Title>
          <Text color='dimmed'>Last update: {time}</Text>
        </Box>
        <Image
          fit='contain'
          height={165}
          width='auto'
          src={colorScheme === 'dark' ? hacktoberfestLogoLight : hacktoberfestLogoDark}
          alt='Hacktoberfest 2023'
        />
      </Group>
    </Container>
  );
}
