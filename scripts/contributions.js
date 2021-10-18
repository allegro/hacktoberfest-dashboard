const { ApolloClient, InMemoryCache } = require('apollo-boost');
const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");
const path = require("path");
const { getPullRequests } = require("./queries");
const users = require("../src/data/users.json");
const { format, persist } = require("./utils");

const token = process.env['TOKEN'];
const eventDate = '2021-10-15'; //new Date().toISOString().substring(0, 10);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: 'https://api.github.com/graphql', fetch })
});

client.query({
    query: getPullRequests(users, eventDate),
    context: {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
})
    .then(({ data }) => {
        console.log("Received data. Formatting...");
        return format(data)
    })
    .then(data => {
        console.log("Persisting to file.");
        return persist({
            file: path.resolve(__dirname, "../src/data/contributions.json"),
            eventDate,
            data
        });
    })
    .then(() => {
        console.log("Done!");
    })
    .catch((e) => {
        console.error(e);
    });
