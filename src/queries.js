import { gql } from "apollo-boost";

/**
 * Creates GraphQL query fetching Pull Requests of given userNames
 * @param userNames array of userNames to get
 * @returns DocumentNode
 */
export function getPullRequests(userNames) {
    return gql`
      {
        search(query: "is:pr created:2019-10-24 ${userNames.map(username => `author:${username}`).join(' ')}", type: ISSUE, first: 100) {
          pageInfo {
            endCursor
            startCursor
          }
          edges {
            node {
              ... on PullRequest {
                title
                repository{
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
