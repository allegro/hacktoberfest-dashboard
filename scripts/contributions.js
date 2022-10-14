import { getPullRequests } from './queries.js';
import { format } from './utils.js';
import path from 'path';
import fs from 'fs';

const token = process.env['TOKEN'];

if (!token) {
  // eslint-disable-next-line no-console
  console.log('Gathering github data skipped - no token provided.');
  process.exit(0);
}

const now = new Date();

const contributions = {
  data: {},
  updatedAt: new Date().toISOString(),
};

for (let year = now.getFullYear() - 3; year <= now.getFullYear(); year++) {
  const users = JSON.parse(fs.readFileSync(`./src/data/users/${year}.json`));
  await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: getPullRequests(users, year) }),
  })
    .then((response) => response.json())
    .then((it) => it.data)
    .then(format)
    .then((data) => (contributions.data[year] = data))
    .then(() => console.log(`Gathered ${year} contributions.`)) // eslint-disable-line no-console
    .catch((e) => console.error(e));
}

fs.writeFileSync(path.resolve(`src/data/contributions.json`), JSON.stringify(contributions));
