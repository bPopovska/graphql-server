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
  
  type AddItem {
    addItem(name: String!, duration: String!, status: String!): Item
  }
  
  type Mutation {
    removeItem(id: Int!): Item
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve items from the "items" array above.
const resolvers = {
  Query: {
    items: () => fetch('http://localhost:3004/items').then(res => res.json()),
  },
  Mutation: {
    addItem: (_, {name, duration, status}) => {
      fetch('http://localhost:3004/items', {
        method: 'POST',
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({name, duration, status})
      }).then(res => res.json())
    }
  },
  Mutation: {
    removeItem: (_, {id}) => {
      fetch(`http://localhost:3004/items/${id}`, {
        method: 'DELETE',
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow",
        referrer: "no-referrer",
      }).then(res => res.json())
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
