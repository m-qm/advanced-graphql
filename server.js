const {ApolloServer} = require ('apollo-server');
const gql = require ('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    createdAt: Int!
  }

  type Settings {
    user: User!
    theme: String!
  }

  input NewSettingsInput {
    user: ID!
    theme: String!
  }

  type Query {
    me: User!
    settings(user: ID!): Settings!
  }

  type Mutation {
    settings(input: NewSettingsInput!): Settings!
  }
  `;

const resolvers = {
  Query: {
    me () {
      return {
        id: 1,
        username: 'coder1',
        createdAt: 123123123,
      };
    },
  },
  Settings (_, {user}) {
    return {
      user,
      theme: 'Light',
    };
  },
  Mutation: {
    settings (_, {input}) {
      return input;
    },
  },
  Settings: {
    user () {
      return {
        id: 1,
        username: 'coder1',
        createdAt: 123123123,
      };
    },
  },
};

const server = new ApolloServer ({
  typeDefs,
  resolvers,
});

server.listen (4000).then (url => console.log (`server at ${url.url}`));
