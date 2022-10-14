import { Tabs } from '@mantine/core';
import React from 'react';

export function TabsList({
  tabs,
  onClick,
}: {
  tabs: string[];
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Tab value={tab} key={tab} onClick={onClick}>
          {tab}
        </Tabs.Tab>
      ))}
      <Tabs.Tab value='participants' key='participants' onClick={onClick}>
        Participants
      </Tabs.Tab>
      <Tabs.Tab value='inspirations' key='inspirations' onClick={onClick}>
        Inspirations
      </Tabs.Tab>
    </Tabs.List>
  );
}
