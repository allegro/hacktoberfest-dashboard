import { Box, Group, Paper, Text } from '@mantine/core';

export function StatsCard({ value, label, round = false }: { value: number; label: string, round?: boolean }) {
  return (
    <Paper withBorder radius='md' p='xs'>
      <Group>
        <Box pl='xs'>
          <Text color='dimmed' size='xs' transform='uppercase' weight={700}>
            {label}
          </Text>
          <Text weight={700} size='xl'>
            {round && value > 99 ? '100+' : Intl.NumberFormat().format(value)}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
}
