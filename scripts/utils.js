import fs from "fs";

function toUsersMap(data) {
    return data.search.edges
        .filter(it => it.node.author.login !== it.node.repository.owner.login)
        .reduce((acc, edge) => {
            const id = edge.node.author.id;
            if (!acc[id]) acc[id] = { ...edge.node.author, contributions: [], totalPRs: 0 };
            acc[id].totalPRs++;
            acc[id].contributions.push({ ...edge.node.repository, permalink: edge.node.permalink, createdAt: edge.node.createdAt, title: edge.node.title });
            return acc;
        }, {})
}

function calculateScore(contributions) {
    return contributions.map(it => it.stargazers.totalCount).reduce((a, b) => a + b, 0)
}

function getUniqueRepositoryNames(contributions) {
    return Array.from(new Set(contributions.map(repository => repository.name)))
}

export function format(data) {
    return Object.entries(toUsersMap(data)).map(([id, data]) => ({
        login: id,
        ...data,
        repos: getUniqueRepositoryNames(data.contributions),
        score: calculateScore(data.contributions),
    })).sort((a, b) => b.score - a.score);
}

export function persist({ data, file }) {
    fs.mkdir(file, { recursive: true }, (err) => {
        if (err) throw err;
    });
    fs.writeFileSync(file, JSON.stringify({ data, updatedAt: new Date().toISOString() }));
}