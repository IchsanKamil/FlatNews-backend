const { ObjectID } = require('mongodb')

module.exports = {
  Query: {
    allLinks: async (root, data, {mongo: {Links}}) => {
      return await Links.find({}).toArray()
    }
  },
  Mutation: {
    createLink: async (root, data, {mongo: {Links}, user}) => {
      const newLink = Object.assign({postedById: user && user._id}, data)
      const response = await Links.insert(newLink)
      return Object.assign({id: response.insertedIds[0]}, newLink)
    },
    createVote: async (root, data, {mongo: {Votes}, user}) => {
      const newVote = {
        userId: user && user._id,
        linkId: new ObjectID(data.linkId)
      }
      const response = await Votes.insert(newVote)
      return Object.assign({id: response.insertedIds[0]}, newVote)
    },
    createUser: async (root, data, {mongo: {Users}}) => {
      const newUser = {
        name: data.name,
        email: data.authProvider.email.email,
        password: data.authProvider.email.password
      }
      const response = await Users.insert(newUser)
      return Object.assign({id: response.insertedIds[0]}, newUser)
    },
    singinUser: async (root, data, {mongo: {Users}}) => {
      const user = await Users.findOne({email: data.email.email})
      if(data.email.password === user.password) {
        return {token: `token-${user.email}`, user}
      }
    }
  },
  Link: {
    id: root => root._id || root.id,
    postedBy: async ({postedById}, data, {mongo: {Users}}) => {
      return await Users.findOne({_id: postedById})
    }
  },
  Vote: {
    id: root => root._id || root.id,
    user: async ({userId}, data, {mongo: {Users}}) => {
      return await Users.findOne({_id: userId})
    },
    link: async ({linkId}, data, {mongo: {Links}}) => {
      return await Links.findOne({_id: linkId})
    }
  },
  User: {
    id: root => root._id || root.id
  }
}
