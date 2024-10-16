import { Group, Menu, Tabs, UnstyledButton } from '@mantine/core';
import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons';

export function TabsList({
  tabs,
  onClick,
  classNames
}: {
  tabs: string[];
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  classNames: { icon: string, control: string }
}) {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(tabs[0]);

  const years = tabs.map((year) => {
    return (
      <Menu.Item
        onClick={(clickEvent) => {
          setSelected(year);
          onClick(clickEvent);
        }}
        key={year}
      >
        {year}
      </Menu.Item>
    );
  })
  return (
    <Tabs.List >
      <Tabs.Tab value='year' key={'year'} onClick={() => setOpened(!opened)}>
        <Menu
          radius="md"
          width="target"
          withinPortal
          opened={opened}
          onClose={() => setOpened(false)}
          onOpen={() => setOpened(true)}
        >
          <Menu.Target>
            <UnstyledButton className={classNames.control} data-expanded={opened || undefined}>
              <Group spacing={2}>
                <span>{selected}</span>
              </Group>
              <IconChevronDown size="1rem" className={classNames.icon} stroke={1.5} />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{years}</Menu.Dropdown>
        </Menu>
      </Tabs.Tab>
      <Tabs.Tab value='participants' key='participants' onClick={onClick}>
        Participants
      </Tabs.Tab>
      <Tabs.Tab value='inspirations' key='inspirations' onClick={onClick}>
        Inspirations
      </Tabs.Tab>
    </Tabs.List>
  );
}
