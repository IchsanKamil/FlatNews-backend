const { Logger, MongoClient } = require('mongodb')

const MONGO_URL = 'mongodb://localhost:27017/flatnews'

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL)

  let logCount = 0
  Logger.setCurrentLogger((msg, state) => {
    console.log(`MONGODB REQUEST ${++logCount}: ${msg}`)
  })
  Logger.setLevel('debug')
  Logger.filter('class', ['Cursor'])

  return {
    Links: db.collection('links'),
    Users: db.collection('users'),
    Votes: db.collection('votes')
  }
}
