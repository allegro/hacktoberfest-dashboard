const fs = require("fs");

function toUsersMap(data) {
    return data.search.edges
        .filter(it => it.node.author.login !== it.node.repository.owner.login)
        .reduce((map, edge) => {
            const { login, avatarUrl } = edge.node.author;
            if (!map[login]) map[login] = { avatar: avatarUrl, contributions: [], totalPRs: 0 };
            map[login].totalPRs++;
            map[login].contributions.push(edge.node.repository);
            return map;
        }, {})
}

function calculateScore(contributions) {
    return contributions.map(it => it.stargazers.totalCount).reduce((a, b) => a + b, 0)
}

function getUniqueRepositoryNames(contributions) {
    return Array.from(new Set(contributions.map(repository => repository.name)))
}

function format(data) {
    return Object.entries(toUsersMap(data)).map(([login, { avatar, contributions, totalPRs }]) => ({
        login,
        avatar,
        repos: getUniqueRepositoryNames(contributions),
        score: calculateScore(contributions),
        totalPRs,
    })).sort((a, b) => b.score - a.score);
}

function persist({ data, eventDate, file }) {
    fs.writeFileSync(file, JSON.stringify({ eventDate, data, updatedAt: new Date().toISOString() }), { flag: "w" });
}

module.exports = {
    format,
    persist
};
