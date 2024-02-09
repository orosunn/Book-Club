
const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    posts: [Post]!
  }

  type Book {
    _id: ID!
    title: String!
    author: String!
    description: String
    imageUrl: String
    genre: Genre
    votes: Int # Number of votes this book has received
    # comments: [Post]! # Assuming comments on books are captured as Posts
  }

type Post {
    _id: ID!
    content: String!
    author: User!
    book: Book!
    createdAt: String # Consider using a DateTime scalar
}

    type Genre {
        _id: ID!
        name: String!
        books: [Book]!
    }
          
        
type Query {
    getBooks: [Book]
    getBook(id: ID!): Book 
   # getComments(bookId: ID!): [Comment]
   getUser: User

 
}



type Auth {
    token: ID!
    user: User
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!): Post
    #addPost(postId: ID!, commentText: String!): Post
    removePost(posttId: ID!): Post
   # removePost(postId: ID!, commentId: ID!): Post
  }
`
module.exports = typeDefs;
