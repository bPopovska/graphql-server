const { ApolloServer, gql } = require('apollo-server');

// Hard code the items to start with, in future will be fetched via a REST call
const items = [
    {
      "id": 1,
      "name": "Item 1",
      "duration": "10:00",
      "status": "pending",
    },
    {
      "id": 2,
      "name": "Item 2",
      "duration": "20:00",
      "status": "pending",
    },
    {
      "id": 3,
      "name": "Item 3",
      "duration": "34:10",
      "status": "pending",
    }
];

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
    items: () => items,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
