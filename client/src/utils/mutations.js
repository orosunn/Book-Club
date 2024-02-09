import { gql } from '@apollo/client';




export const ADD_USER = gql
` mutation addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}`

export const GET_USER = gql 
`query getUser {
    _id
    username
    email
    posts {
      _id
      content
      book {
        _id
        title
        author
        description
        imageUrl
        votes
      }
      createdAt
    }
  }
}`

export cost GET_BOOKS = gql `

`
