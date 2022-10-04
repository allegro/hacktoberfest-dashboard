/**
 * Creates GraphQL query fetching Pull Requests of given userNames
 * @param userNames array of userNames to get
 * @param eventDate int
 * @returns string
 */

export function getPullRequests(userNames, year) {
    return `
      {
        search(query: "is:pr created:${year}-10-01..${year}-10-31 ${userNames.map(username => `author:${username}`).join(' ')}", type: ISSUE, first: 100) {
          pageInfo {
            endCursor
            startCursor
          }
          edges {
            node {
              ... on PullRequest {
                title
                createdAt
                repository{
                  owner {
                    login
                  }
                  name
                  url
                  stargazers {
                    totalCount
                  }
                }
                permalink
                author {
                  ... on User {
                    id
                    name
                    avatarUrl
                    login
                    bio
                  }
                }
              }
            }
          }
        }
      }
    `;
}