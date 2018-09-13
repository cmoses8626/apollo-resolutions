import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_RESOLUTIONS = gql`
  {
    resolutions {
      name
      _id
    }
  }
`;

const ResolutionsList = () => (
  <Query query={GET_RESOLUTIONS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      return (
        <>
          <h2>{data.hi}</h2>
          <ul>
            {data.resolutions.map(resolution => (
              <li key={resolution._id}>{resolution.name}</li>
            ))}
          </ul>
        </>
      );
    }}
  </Query>
);

export default ResolutionsList;
