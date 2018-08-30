const { gql } = require("apollo-server");
import { makeExecutableSchema } from "graphql-tools";

export const schema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      hi: String
    }
  `
});

export const resolvers = {
  Query: {
    hi() {
      return "Hello Level Up";
    }
  }
};
