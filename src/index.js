const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schemas')
const connectMongo = require('./mongo/connector')

const start = async () => {

  const mongo = await connectMongo()
  const app = express()
  const PORT = 5000

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: {mongo},
    schema
  }))

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))

  app.listen(PORT, () => {
    console.log(`FlatNews GraphQL Server running on localhost:${PORT}`)
  })
}

start()
