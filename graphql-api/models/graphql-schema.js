import { gql } from 'apollo-server';

const typeDefs = gql`
  """
  A type representing a message
  """
  type Message {
    id: ID!
    name: String!
    msgText: String!
  }

  """
  Input type for creating a new message
  """
  input MessageInput {
    name: String!
    msgText: String!
  }

  """
  The query type, representing all the entry points into our object graph
  """
  type Query {
    messages: [Message!]!
  }

  """
  The mutation type, representing all updates we can make to our data
  """
  type Mutation {
    addMessage(message: MessageInput!): Message!
  }
`;

const resolvers = {
  Query: {
    messages: (_, __, { dataSources }) => {
      return dataSources.messagesAPI.getMessages();
    },
  },
  Mutation: {
    addMessage: (_, { message }, { dataSources }) => {
      return dataSources.messagesAPI.addMessage(message);
    },
  },
};

export { typeDefs, resolvers };

