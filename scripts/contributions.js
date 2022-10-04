import { getPullRequests } from "./queries.js";
import users from '../src/data/users.json' assert { type: 'json' };
import { format } from "./utils.js";
import path from "path";
import fs from "fs";

const token = process.env['TOKEN'];
const now = new Date();

const contributions = {
    data: {},
    updatedAt: new Date().toISOString()
};

for (let year = now.getFullYear() - 3; year <= now.getFullYear(); year++) {
    await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query: getPullRequests(users, year) })
    })
        .then(response => response.json())
        .then(it => it.data)
        .then(format)
        .then((data) => contributions.data[year] = data)
        .then(() => console.log(`Gathered ${year} contributions.`))
        .catch((e) => console.error(e))
}

fs.writeFileSync(path.resolve(`src/data/contributions.json`), JSON.stringify(contributions));
