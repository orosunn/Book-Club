import { gql } from '@apollo/client';

export const GET_BOOKS = gql`query getBooks {
    getBooks {
      _id
      title
      author
      imageUrl
      genre
      likes
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



export const QUERY_ME = gql `
query Query {
  me {
    username
    _id
  }

}`

export const GET_POST = gql `
query GetPost($postId: ID!) {
  getPost(postId: $postId) {
    postText
    username
    _id
  }
}`

export const GET_POSTS = gql `query Query {
  getPosts {
    _id
    postText
    username
    createdAt
  }
}`
