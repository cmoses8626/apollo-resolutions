const { gql } = require("apollo-server");
import { makeExecutableSchema } from "graphql-tools";
import Resolutions from "./resolutions";

// Resolutions.insert({
//   name: "Test your revenue model!"
// });

export const schema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      resolutions: [Resolution]
    }
    type Resolution {
      _id: String!
      name: String!
    }
  `
});

export const resolvers = {
  Query: {
    resolutions() {
      return Resolutions.find().fetch();
    }
  }
};
