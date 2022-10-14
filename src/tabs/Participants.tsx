import { StatsCard } from '../components/StatsCard';
import { Container, List, Paper, Stack } from '@mantine/core';
import { Participant } from '../components/Participant';

export default function Participants({ participants }: { participants: string[] }) {
  return (
    <Container>
      <Stack spacing='sm'>
        <StatsCard label='Total participants' value={participants.length} />
        <Paper withBorder radius='md' p='xs'>
          <List spacing='xs' size='sm' center>
            {participants.map((login) => (
              <Participant key={login} name={login} />
            ))}
          </List>
        </Paper>
      </Stack>
    </Container>
  );
}
