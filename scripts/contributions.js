import { getPullRequests } from './queries.js';
import { format } from './utils.js';
import path from 'path';
import fs from 'fs';

const token = process.env['TOKEN'];

if (!token) {
    console.log('Gathering github data skipped - no token provided.');
    process.exit(0);
}

const now = new Date();

const contributions = {
    data: {},
    updatedAt: new Date().toISOString(),
};

let year = now.getFullYear();
const users = JSON.parse(fs.readFileSync(`./src/data/users/${year}.json`));

const results = [];
let cursor = null;
let morePages = true;

while (morePages) {
    const page = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: getPullRequests(users, year, cursor) }),
    })
      .then((response) => response.json())
      .then(response => {
          if (response.data.search.pageInfo.hasNextPage) {
              cursor = `"${response.data.search.pageInfo.endCursor}"`;
          } else {
              morePages = false;
          }
          return response;
      })
      .then((it) => it.data)
      .then(format);
    results.push(page);
}
contributions.data[year] = Object.values(groupByKey(results.reduce((acc, o) => {
    acc.push(o);
    return acc;
}, []).flat(), 'login')).map(list => list.reduce((acc, o) => ({
    ...o,
    contributions: [...o.contributions, ...acc.contributions],
    score: o.score + acc.score,
}), { contributions: [], score: 0 }));

console.log(`Gathered ${year} contributions.`);

fs.writeFileSync(path.resolve(`./src/data/contributions.json`), JSON.stringify(contributions));

function groupByKey(list, key) {
    return list.reduce((hash, obj) => ({
        ...hash,
        [obj[key]]: (hash[obj[key]] || []).concat(obj)
    }), {});
}
