const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
  }

  type User {
    id: ID!
    name: String!
    email: String
  }

  type Vote {
    id: ID!
    user: User!
    link: Link!
  }

  type SinginPayload {
    token: String
    user: User
  }

  type Query {
    allLinks: [Link!]!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
    createVote(linkId: ID!): Vote
    createUser(name: String!, authProvider: AuthProviderSingupData!): User
    singinUser(email: AUTH_PROVIDER_EMAIL): SinginPayload!
  }

  input AuthProviderSingupData {
    email: AUTH_PROVIDER_EMAIL
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }
`

module.exports = makeExecutableSchema({typeDefs, resolvers})
