const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
    votes: [Vote!]!
  }

  type User {
    id: ID!
    name: String!
    email: String
    password: String
    votes: [Vote!]!
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

  type Subscription {
    Link(filter: LinkSubscriptionFilter): LinkSubscriptionPayload
  }

  input LinkSubscriptionFilter {
    mutation_in: [_ModelMutationType!]
  }

  type LinkSubscriptionPayload {
    mutation: _ModelMutationType!
    node: Link
  }

  enum _ModelMutationType {
    CREATED
    UPDATED
    DELETED
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
