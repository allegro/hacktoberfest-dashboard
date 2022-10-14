# Allegro Hacktoberfest Dashboard

Dashboard with stats of pull requests made during hacktoberfest by [Allegro](https://allegro.tech/) employees.

See current stats: https://hacktoberfest.allegro.tech/ (the page is updated every 10 minutes).

Read more about [hacktoberfest](https://hacktoberfest.com/)

## Develop locally

Node and npm in recent versions are required.

To install dependencies run:

```bash
$ npm i
```

To run locally (with live preview):

```bash
$ npm run start
```

If you want to update current contributions run:

```bash
$ export TOKEN=GITHUB_PERSONAL_ACCESS_TOKEN
$ npm run prebuild
```

## Run in production

To generate static page run:

```bash
$ export TOKEN="GITHUB_PERSONAL_ACCESS_TOKEN"
$ npm ci
$ npm run build
```

Note, that this is a static page and contributions are fetched on build by a npm task `prebuild` and a `TOKEN` variable is used to access GitHub api.

## Project data

In `src/data` directory there are json files with input data.

- `/users/{year}.json` files are used to store participants info and fetch their pull requests
- `contributions.json` is a list of pull requests made by participants, it stores historical data. Current data is updated by npm `prebuild` task.
- `inspirations.json` list of inspirations to display on inspirations tab
- `repositories.json` list of opensource repositories to display on inspirations tab
