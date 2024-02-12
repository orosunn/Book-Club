
const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    posts: [Post]
  }

type Comment {
  text: String!
  author: String!
  date: String
}

  type Book {
    _id: ID!
    title: String!
    author: String!
    imageUrl: String
    genre: String
    upvoteCount: Int
    users: [User]
    # votes: Int # Number of votes this book has received
    # comments: [Post]! # Assuming comments on books are captured as Posts
  }

type Post {
    _id: ID!
    postText: String!
    username: String!
    createdAt: String # Consider using a DateTime scalar
    comments: [Comment] 
}

 #type Vote  {
  #upvote: Number!
   #downvote: Number!
   #rating: Number!
# }

                 
type Query {
    getBooks: [Book]
    book(id: ID!): Book 
   # getComments(bookId: ID!): [Comment]
   getUser: User

   getPost(postId: ID!): Post
   me: User


   #getVote: [Votes]
}

type Auth {
    token: ID!
    user: User
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!, createdAt: String, username:String! ): Post
    upVote(_id:ID!): Book
    addComment(postId: ID!, text: String!, author: String!): Post
    removePost(postId: ID!): Post
   # removeComment(postId: ID!, commentId: ID!): Post
   # addVote(upvote: Number, downvote: Number, rating: Number)
   # removeVote(voteId: ID!, upvote: Number, downvote: Number, rating: Number)
  }
`
module.exports = typeDefs;
