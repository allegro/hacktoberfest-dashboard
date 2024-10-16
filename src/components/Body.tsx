import { Container, Tabs } from '@mantine/core';
import { data } from '../data/contributions.json';
import { Header } from './Header';
import { TabsList } from './TabsList';
import { Contributions } from '../tabs/Contributions';
import { Inspirations } from '../tabs/Inspirations';
import inspirations from '../data/inspirations.json';
import Participants from '../tabs/Participants';
import React from 'react';
import { useTabState } from '../hooks/use-tab-state';

export function Body({ classes, allUsers }: { classes: Record<any, any>; allUsers: any }) {
  const [currentTab, setTab] = useTabState();

  const handleTabChange = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    setTab(target.innerText.toLowerCase());
  };

  return (
    <Tabs
      value={currentTab}
      defaultValue={currentTab ?? Object.keys(data)[Object.keys(data).length - 1]}
      variant='outline'
      classNames={{ tabsList: classes.tabsList, tab: classes.tab }}
    >
      <div className={classes.header}>
        <Header />
        <Container>
          <TabsList
            tabs={Object.keys(data).reverse()}
            onClick={handleTabChange}
            classNames={{ icon: classes.selectIcon, control: classes.selectControl }}
          />
        </Container>
      </div>
      <Container p='lg'>
        {Object.entries(data).map(([year, users]) => {
          return (
            <Tabs.Panel value={year} key={year}>
              <Contributions year={year} contributions={users} />
            </Tabs.Panel>
          );
        })}
        <Tabs.Panel value='inspirations'>
          <Inspirations inspirations={inspirations} />
        </Tabs.Panel>
        <Tabs.Panel value='participants'>
          <Participants participants={allUsers} />
        </Tabs.Panel>
      </Container>
    </Tabs>
  );
}
