import { ApolloServer, gql } from "apollo-server"; // removed -express
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
// Resolutions
import {
  schema as resolutionSchema,
  resolvers as resolutionResolvers
} from "../../api/resolutions/schema";
// Test
import {
  schema as testSchema,
  resolvers as testResolvers
} from "../../api/testapi/schema";

const schema = mergeSchemas({
  schemas: [resolutionSchema, testSchema],
  resolvers: [testResolvers, resolutionResolvers]
});

const server = new ApolloServer({
  schema,
  playground: {
    settings: {
      "editor.cursorShape": "line"
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// server.applyMiddleware({ app }); // app is from an existing express app
//
// app.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
// )
