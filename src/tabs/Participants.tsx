import { StatsCard } from '../components/StatsCard';
import { Container, List, Paper, Stack } from '@mantine/core';
import { Participant } from '../components/Participant';

export default function Participants({ participants }: { participants: string[] }) {
  return (
    <Container>
      <Stack spacing='sm'>
        <StatsCard label='Total participants' value={participants.length} />
        <Paper withBorder radius='md' p='xs'>
          <List spacing='xs' size='sm' center listStyleType='none'>
            {participants.map((login) => (
              <List.Item key={login}>
                <Participant name={login} />
              </List.Item>
            ))}
          </List>
        </Paper>
      </Stack>
    </Container>
  );
}
