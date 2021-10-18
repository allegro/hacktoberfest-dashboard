const { gql } = require("apollo-boost");

/**
 * Creates GraphQL query fetching Pull Requests of given userNames
 * @param userNames array of userNames to get
 * @param eventDate string representing event date (YYYY-MM-DD)
 * @returns DocumentNode
 */
function getPullRequests(userNames, eventDate) {
    return gql`
      {
        search(query: "is:pr created:>=${eventDate} ${userNames.map(username => `author:${username}`).join(' ')}", type: ISSUE, first: 100) {
          pageInfo {
            endCursor
            startCursor
          }
          edges {
            node {
              ... on PullRequest {
                title
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
                  login
                  avatarUrl
                }
              }
            }
          }
        }
      }
    `;
}

module.exports = { getPullRequests };
