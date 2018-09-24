import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import DeleteResolution from "./DeleteResolution";

const GET_RESOLUTIONS = gql`
  {
    resolutions {
      name
      _id
    }
  }
`;

export default class ResolutionsList extends Component {
  render() {
    return (
      <Query query={GET_RESOLUTIONS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          return (
            <>
              <ul>
                {data.resolutions.map(resolution => (
                  <li key={resolution._id}>
                    {resolution.name}
                    <DeleteResolution _id={resolution._id} />
                  </li>
                ))}
              </ul>
            </>
          );
        }}
      </Query>
    );
  }
}
