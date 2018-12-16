const { ApolloServer, gql } = require('apollo-server')
const fetch = require('node-fetch')

// define the schema
const typeDefs = gql`
  type Person {
    id: Int
    name: String
    role: String
  }
  
  type TimeEntry {
    id: Int
    timestamp: String,
    person: Person
    description: String
    timeLogged: String
  }
  
  type Task {
    id: Int
    name: String
    description: String
    estimate: String
    assignee: Person
    reporter: Person
    status: String
    timeEntries: [TimeEntry]
  }

  type Query {
    tasks: [Task]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve items from the "items" array above.
const resolvers = {
  Query: {
    tasks: () => fetch('http://localhost:3004/tasks').then(res => res.json()),
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
