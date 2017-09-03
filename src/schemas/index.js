const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }

  type Query {
    allLinks: [Link!]!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
  }
`

module.exports = makeExecutableSchema({typeDefs})
