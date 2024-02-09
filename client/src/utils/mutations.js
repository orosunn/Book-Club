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
  }
}
`




// export const GET_POSTS = gql 
// `query GetPost($id: ID!) {
//   getPost(id: $id) {
//     _id
//     author {
//       username
//     }
//   }
// }`



