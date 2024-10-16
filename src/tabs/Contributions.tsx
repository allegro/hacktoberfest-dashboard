import {
  Accordion,
  Anchor,
  Avatar,
  Box,
  Group,
  Image,
  Space,
  Stack,
  Table,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Stats } from '../components/Stats';
import { data } from '../data/contributions.json';

export function Contributions({
  year,
  contributions,
}: {
  year: string;
  contributions: {
    id: string;
    login: string;
    bio: string | null;
    avatarUrl: string;
    name: string | null;
    contributions: {
      permalink: string;
      title: string;
      name: string;
      url: string;
      owner: { login: string };
      stargazers: { totalCount: number };
      createdAt: string;
    }[];
    score: number;
  }[];
}) {
  const { colorScheme } = useMantineColorScheme();
  const statsTheme = colorScheme === 'dark' ? 'dark' : 'default';
  return (
    <Stack spacing='sm'>
      <Stats data={data} year={year} />
      <Accordion chevronPosition='right' variant='contained'>
        {contributions
          .sort((a, b) => b.score - a.score)
          .map((user) => (
            <Accordion.Item value={user.login} key={`${year}-${user.id}`}>
              <Accordion.Control>
                <Group>
                  <Box sx={{ flex: 1 }}>
                    <AccordionLabel
                      label={user.login}
                      image={user.avatarUrl}
                      description={user.name || ''}
                    />
                  </Box>
                  <Group>
                    <Box>
                      <Text
                        align='center'
                        size='xs'
                        transform='uppercase'
                        weight={700}
                        color='dimmed'
                      >
                        PR
                      </Text>
                      <Text align='center' size='md' transform='uppercase' weight={700}>
                        {user.contributions.length}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        align='right'
                        size='xs'
                        transform='uppercase'
                        weight={700}
                        color='dimmed'
                        sx={{ minWidth: 100 }}
                      >
                        Stars
                      </Text>
                      <Text align='right' size='md' transform='uppercase' weight={700}>
                        {Intl.NumberFormat().format(user.score)}
                      </Text>
                    </Box>
                  </Group>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                {user.bio && (
                  <Box p='sm'>
                    <Text size='sm'>{user.bio}</Text>
                  </Box>
                )}
                <Table>
                  <thead>
                    <tr>
                      <th>Repository</th>
                      <th>Pull Request</th>
                      <th style={{ minWidth: 100 }}>Created at</th>
                      <th
                        style={{
                          textAlign: 'right',
                          minWidth: 80,
                        }}
                      >
                        Stars
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.contributions.map((contribution, index) => (
                      <tr key={`${user.id}-prs-${index}`}>
                        <td>
                          <Text size='xs' lineClamp={1}>
                            <Anchor href={contribution.url} target='_blank'>
                              {contribution.owner.login}/{contribution.name}
                            </Anchor>
                          </Text>
                        </td>
                        <td>
                          <Text size='xs' lineClamp={1}>
                            <Anchor href={contribution.permalink} target='_blank'>
                              {contribution.title}
                            </Anchor>
                          </Text>
                        </td>
                        <td>
                          <Text size='xs'>
                            {Intl.DateTimeFormat().format(new Date(contribution.createdAt))}
                          </Text>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <Text size='xs'>
                            {Intl.NumberFormat().format(contribution.stargazers.totalCount)}
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Space h='md' />
                <Group>
                  <Image
                    imageProps={{ loading: 'lazy' }}
                    height={164}
                    fit='contain'
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&card_width=900&theme=${statsTheme}`}
                  />
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
      </Accordion>
    </Stack>
  );
}

function AccordionLabel({
  label,
  image,
  description,
}: {
  label: string;
  image: string;
  description: string;
}) {
  return (
    <Group noWrap>
      <Avatar src={image} radius='xl' size='lg' />
      <div>
        <Text>{label}</Text>
        <Text size='sm' color='dimmed' weight={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}
