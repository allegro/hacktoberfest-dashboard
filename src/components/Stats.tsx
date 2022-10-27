import { SimpleGrid } from '@mantine/core';
import { StatsCard } from './StatsCard';

export function Stats({
  data,
  year,
}: {
  data: { [key: string]: { totalPRs: number; score: number }[] };
  year: string;
}) {
  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      <StatsCard label='Contributors' value={data[year].length} />
      <StatsCard label='Registered' value={data[year].length} />
      <StatsCard
        label='Total PRs'
        value={data[year].reduce(
          (previousValue, currentValue) => previousValue + currentValue.totalPRs,
          0,
        )}
      />
      <StatsCard
        label='Total Stars'
        value={data[year].reduce(
          (previousValue, currentValue) => previousValue + currentValue.score,
          0,
        )}
      />
    </SimpleGrid>
  );
}
