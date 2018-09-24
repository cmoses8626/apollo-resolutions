import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DELETE_RESOLUTION = gql`
  mutation DeleteResolution($_id: String!) {
    deleteResolution(_id: $_id)
  }
`;

const GET_RESOLUTIONS = gql`
  {
    resolutions {
      name
      _id
    }
  }
`;

export default class DeleteResolution extends Component {
  render() {
    const { _id } = this.props;
    return (
      <Mutation
        mutation={DELETE_RESOLUTION}
        update={(cache, { data: { deleteResolution } }) => {
          let { resolutions } = cache.readQuery({ query: GET_RESOLUTIONS });
          resolutions = resolutions.filter(
            resolution => resolution._id !== _id
          );
          cache.writeQuery({
            query: GET_RESOLUTIONS,
            data: { resolutions: resolutions }
          });
        }}
      >
        {mutate => (
          <button
            onClick={e => {
              e.preventDefault;
              mutate({
                variables: { _id },
                optimisticResponse: {
                  __typename: "Mutation",
                  deleteResolution: {
                    __typename: "Resolution",
                    _id
                  }
                }
              });
            }}
          >
            x
          </button>
        )}
      </Mutation>
    );
  }
}
