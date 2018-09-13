import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import ResolutionsList from "./ResolutionsList";
import AddResolution from "./AddResolution";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const App = () => (
  <ApolloProvider client={client}>
    <>
      <h2>My first Apollo app 🚀</h2>
      <ResolutionsList />
      <AddResolution />
    </>
  </ApolloProvider>
);

export default App;
