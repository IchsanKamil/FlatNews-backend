# FlatNews-backend (GraphQL + Express + MongoDB)

## Setup Project
1. git clone https://github.com/kevinhermawan/FlatNews-backend.git
2. cd FlatNews-backend
3. npm install
4. npm start

## Access GraphiQL
An in-browser IDE for exploring GraphQL.

To access GraphiQL you can open http://localhost:5000/graphiql in your browser

## Queries
### Show links
```javascript
query ShowLinks {
  allLinks {
    id
    url
    description
  }
}
```
### Filtering
```javascript
query {
  allLinks(filter: {
    OR: [
      {url_contains: "face"},
      {description_contains: "Fa"}
    ]
  }){
    url
    description
  }
}
```
### Pagination
```javascript
query {
  allLinks(first: 2, skip: 1){
    url
    description
  }
}
```
## Mutations
### Create link
```javascript
mutation CreateLink {
  createLink (
    url: "https://facebook.com",
    description: "Facebook"
  ) {
    id
    url
    description
  }
}
```
### Create user
```javascript

mutation CreateUser {
  createUser (
    name: "Kevin Hermawan",
    authProvider: {
      email: {
        email: "kevinhermawanx@gmail.com",
        password: "ytrewq123456789"
      }
    }
  ) {
    id
    name
  }
}
```
### SignIn user
```javascript

mutation SignIn {
  singinUser (email: {
      email: "kevinhermawanx@gmail.com",
      password: "ytrewq123456789"
    }) {
    token
    user {
      name
      email
    }
  }
}
```
### Create vote
```javascript
mutation CreateVote {
  createVote (linkId: "59ac4fbccb316407b3f3a3ff") {
    id
    user{name}
    link{url}
  }
}
```
## Subscriptions
```javascript
subscription {
  Link(filter: {
    mutation_in: [CREATED]
  }) {
    node {
      url
      description
    }
  }
}
```
### Need great tutorials? You can visit https://howtographql.com
### Happy Hacking!

