import { Anchor, Container, List, Text, Title } from "@mantine/core";
import repositories from "../data/repositories.json";
import React from "react";

export function Inspirations({ inspirations }: { inspirations: { title: string, link: string; label: string }[] }) {
    return (
        <Container>
            <Title pb="lg">Inspirations</Title>
            <List
                spacing="xs"
                size="sm"
                center
                withPadding
            >
                {inspirations.map((it, i) =>
                    <List.Item key={`inspiration-${i}`}>
                        <Text>{it.title}</Text>
                        <Text>{it.label}</Text>
                    </List.Item>
                )}
            </List>
            <Title py="lg">Repositories</Title>
            <List
                spacing="xs"
                size="sm"
                center
                withPadding
            >
                {repositories.map(it =>
                    <List.Item key={it}>
                        <Anchor href={it}>{it}</Anchor>
                    </List.Item>
                )}
            </List>
        </Container>
    );
}