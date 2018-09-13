const { gql } = require("apollo-server");
import { makeExecutableSchema } from "graphql-tools";
import Resolutions from "./resolutions";

export const schema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      resolutions: [Resolution]
    }
    type Resolution {
      _id: String!
      name: String!
    }
    type Mutation {
      createResolution(name: String!): Resolution
    }
  `
});

export const resolvers = {
  Query: {
    resolutions() {
      return Resolutions.find().fetch();
    }
  },
  Mutation: {
    createResolution(obj, args) {
      const { name } = args;
      const resolutionId = Resolutions.insert({ name });
      return { name, _id: resolutionId };
    }
  }
};
