import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const CREATE_RESOLUTION = gql`
  mutation CreateResolution($name: String!) {
    createResolution(name: $name) {
      name
      _id
    }
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

export default class AddResolution extends Component {
  render() {
    let input;

    return (
      <Mutation
        mutation={CREATE_RESOLUTION}
        update={(cache, { data: { createResolution } }) => {
          const { resolutions } = cache.readQuery({ query: GET_RESOLUTIONS });
          cache.writeQuery({
            query: GET_RESOLUTIONS,
            data: { resolutions: resolutions.concat([createResolution]) }
          });
        }}
      >
        {mutate => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (input.value) {
                  mutate({
                    variables: { name: input.value },
                    optimisticResponse: {
                      __typename: "Mutation",
                      createResolution: {
                        __typename: "Resolution",
                        name: input.value,
                        _id: null
                      }
                    }
                  });
                  input.value = "";
                }
              }}
            >
              <input
                placeholder="Add resolution"
                ref={node => {
                  input = node;
                }}
              />
              <button type="submit">Add</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
