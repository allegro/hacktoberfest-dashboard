import { gql } from "apollo-boost";

/**
 * Creates GraphQL query fetching Pull Requests of given userNames
 * @param userNames array of userNames to get
 * @returns DocumentNode
 */
export function getPullRequests(userNames, prsAfter) {
    return gql`
      {
        search(query: "is:pr created:>${prsAfter} ${userNames.map(username => `author:${username}`).join(' ')}", type: ISSUE, first: 100) {
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
