import { Tabs } from '@mantine/core';
import React from 'react';

export function TabsList({ tabs }: { tabs: string[] }) {
  return (
    <Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
          {tab}
        </Tabs.Tab>
      ))}
      <Tabs.Tab value='participants' key='participants'>
        Participants
      </Tabs.Tab>
      <Tabs.Tab value='inspirations' key='inspirations'>
        Inspirations
      </Tabs.Tab>
    </Tabs.List>
  );
}
