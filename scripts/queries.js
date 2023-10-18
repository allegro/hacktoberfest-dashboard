/**
 * Creates GraphQL query fetching Pull Requests of given userNames
 * @param userNames array of userNames to get
 * @param year int
 * @param cursor string
 * @returns string
 */

export function getPullRequests(userNames, year, cursor = null) {
    const eventStartDate = `${year}-10-01`;
    return `
      {
        search(query: "is:pr draft:false created:${eventStartDate}..${year}-10-31 ${userNames
        .map((username) => `author:${username}`)
        .join(' ')}", type: ISSUE, first: 100, after: ${cursor}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              ... on PullRequest {
                title
                state
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
