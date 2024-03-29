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
    items(status: String!): [Item]
  }
  
  type Mutation {
    addItem(name: String!, duration: String!, status: String!): Item
    removeItem(id: Int!): Item,
    modifyItem(id: Int!, name: String!, duration: String!, status: String!): Item
  }
`;

const resolvers = {
  Query: {
    items: (_, {status}) => {
      return fetch('http://localhost:3004/items').
            then(res => res.json()).
            then(json => json.filter(item => {
              console.log(item.status, status)
              return item.status === status
            }))
    }
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
    },
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
    },
    modifyItem: (_, {id, name, status, duration}) => {
      fetch(`http://localhost:3004/items/${id}`, {
        method: 'PUT',
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({name, status, duration})
      }).then(res => res.json())
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
