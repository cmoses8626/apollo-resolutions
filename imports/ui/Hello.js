import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Hello = () => (
  <Query
    query={gql`
      {
        hi
        resolutions {
          name
          _id
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      return (
        <div>
          <h2>{data.hi}</h2>
          <ul>
            {data.resolutions.map(resolution => (
              <li key={resolution._id}>{resolution.name}</li>
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);

export default Hello;
