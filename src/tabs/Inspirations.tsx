import { Anchor, Container, List, Text, Title } from '@mantine/core';
import repositories from '../data/repositories.json';
import React from 'react';

const GITHUB_LINK = 'https://github.com/';

const renderRepositories = () =>
    repositories.map((it) => {
        const year = new Date().getFullYear();
        const githubName = it.substring(GITHUB_LINK.length);
        const isProject = githubName.split('/').length > 1;

        return (
            <List.Item key={it}>
                <div className="repository">
                    <Anchor href={it}>{githubName}</Anchor>
                    {
                        isProject &&
                        <img
                            alt="GitHub Hacktoberfest combined status"
                            src={`https://img.shields.io/github/hacktoberfest/${year}/${githubName}`}
                        />
                    }
                </div>
            </List.Item>
        );
    })

export function Inspirations({
  inspirations,
}: {
  inspirations: { title: string; link: string; label: string }[];
}) {
  return (
    <Container>
      <Title pb='lg'>Inspirations</Title>
      <List spacing='xs' size='sm' center withPadding>
        {inspirations.map((it, i) => (
          <List.Item key={`inspiration-${i}`}>
            <Text>{it.title}</Text>
            <Text>{it.label}</Text>
          </List.Item>
        ))}
      </List>
      <Title py='lg'>Repositories</Title>
      <List spacing='xs' size='sm' center withPadding>
        {renderRepositories()}
      </List>
    </Container>
  );
}
