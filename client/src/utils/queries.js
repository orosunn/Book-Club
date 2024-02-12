import { gql } from '@apollo/client';

export const GET_BOOKS = gql`query getBooks {
    getBooks {
      _id
      title
      author
      imageUrl
      genre
    }
  }`

  export const GET_USER = gql `
query GetUser {
  getUser {
    _id
    username
    email
  }
}`


export const GET_POSTS = gql`
mutation Mutation($postText: String!, $createdAt: String, $username: String!) {
  addPost(postText: $postText, createdAt: $createdAt, username: $username) {
    postText
    createdAt
    username
  }
}
`