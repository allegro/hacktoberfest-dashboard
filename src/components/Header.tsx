import { Box, Container, Group, Image, Text, Title } from "@mantine/core";
import { updatedAt } from "../data/contributions.json";
import hacktoberfest2022 from "../assets/hacktoberfest-2022.svg";
import React from "react";

export function Header() {
    const time = new Intl.RelativeTimeFormat("en").format(Math.round(((new Date(updatedAt).getTime() % 86400000 - new Date().getTime()) % 3600000) / 60000), "minute");
    return (
        <Container p="lg">
            <Group position="apart">
                <Box>
                    <Title>Contributions</Title>
                    <Text color="dimmed">Last update: {time}</Text>
                </Box>
                <Image width={200} src={hacktoberfest2022} alt="Hacktoberfest 2022"/>
            </Group>
        </Container>
    );
}