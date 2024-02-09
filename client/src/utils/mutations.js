import { gql } from '@apollo/client';


export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;
// export const GET_USER = gql 
// `query getUser {
//     _id
//     username
//     email
//     posts {
//       _id
//       content
//       book {
//         _id
//         title
//         author
//         description
//         imageUrl
//         votes
//       }
//       createdAt
//     }
//   }
// }`

// export const GET_POSTS = gql 
// `query GetPost($id: ID!) {
//   getPost(id: $id) {
//     _id
//     author {
//       username
//     }
//   }
// }`



