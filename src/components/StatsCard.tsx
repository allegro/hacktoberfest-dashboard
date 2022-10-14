import { Box, Group, Paper, Text } from '@mantine/core';

export function StatsCard({ value, label }: { value: number; label: string }) {
  return (
    <Paper withBorder radius='md' p='xs'>
      <Group>
        <Box pl='xs'>
          <Text color='dimmed' size='xs' transform='uppercase' weight={700}>
            {label}
          </Text>
          <Text weight={700} size='xl'>
            {Intl.NumberFormat().format(value)}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
}
