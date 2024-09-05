const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Author = require("./models/author");
const Book = require("./models/book");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch((error) => {
    console.log("error connection to mongodb:", error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      let filteredBooks = books;

      if (args.name) {
        const author = authors.find((p) => p.name === args.name);
        filteredBooks = filteredBooks.filter(
          (book) => book.author === author.name
        );
      }

      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.includes(args.genre)
        );
      }

      return filteredBooks;
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: (author) => {
      return books.filter((book) => book.author === author.name).length;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      // jos lisätyn kirjan authoria ei ole authorseissa lisätään kirjan author authorseissiin, jämpti
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({
          name: args.author,
          id: uuid(),
          born: null
        });
        await author.save();
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id
      });

      await book.save();
      return Book.findById(book._id).populate("author");
    },
    editAuthor: (root, args) => {
      const author = authors.find((p) => p.name === args.name);
      if (!author) {
        return null;
      }
      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((p) => (p.name === args.name ? updatedAuthor : p));
      return updatedAuthor;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
