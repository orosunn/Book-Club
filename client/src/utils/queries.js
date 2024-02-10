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