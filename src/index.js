const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schemas')
const connectMongo = require('./mongo/connector')
const { authenticate } = require('./authentication')
const buildDataloaders = require('./dataloaders')
const formatError = require('./formatError')
const {execute, subscribe} = require('graphql')
const {createServer} = require('http')
const {SubscriptionServer} = require('subscriptions-transport-ws')

const start = async () => {

  const mongo = await connectMongo()
  const app = express()
  const PORT = 5000

  const buildOptions = async (req, res) => {
    const user = await authenticate(req, mongo.Users)
    return {
      context: {
        dataloaders: buildDataloaders(mongo),
        mongo,
        user
      },
      formatError,
      schema
    }
  }

  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions))

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: `'Authorization': 'bearer token-kevinhermawanx@gmail.com'`,
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
  }))

  const server = createServer(app)
  server.listen(PORT, () => {
    SubscriptionServer.create(
      {execute, subscribe, schema},
      {server, path: '/subscriptions'}
    )
    console.log(`FlatNews GraphQL Server running on localhost:${PORT}`)
  })
}

start()
