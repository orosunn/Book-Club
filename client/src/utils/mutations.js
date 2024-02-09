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
      comments {
        _id
        content
        date
      }
      createdAt
    }
  }
}`

// export cost GET_BOOKS = gql `

// `
