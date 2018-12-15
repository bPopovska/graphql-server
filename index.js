const { ApolloServer, gql } = require('apollo-server')
const fetch = require('node-fetch')

// define the schema
const typeDefs = gql`
  type Item {
    id: Int
    name: String
    duration: String
    status: String
  }

  type Query {
    items: [Item]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve items from the "items" array above.
const resolvers = {
  Query: {
    items: () => fetch('http://localhost:3004/items').then(res => res.json()),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
