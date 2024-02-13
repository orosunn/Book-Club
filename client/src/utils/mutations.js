import { gql } from '@apollo/client';


export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;
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
    comments
  }
}
`

export const LOGIN = gql `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}`

export const UPVOTE = gql `
mutation upVote($id: ID!) {
  upVote(_id: $id) {
    _id
    title
    likes
   
  }
}`

export const ADD_POST = gql `
mutation Mutation($postText: String!, $username: String!) {
  addPost(postText: $postText, username: $username) {
    postText
    username
    _id
  }
}
`






