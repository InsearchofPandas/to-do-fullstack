import React, { useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { RESOLUTIONS_QUERY } from "./App";

const CREATE_RESOLUTION = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
      name
    }
  }
`;

const updateCache = (cache, { data }) => {
  // Fetch the todos from the cache
  const existingTodos = cache.readQuery({
    query: RESOLUTIONS_QUERY,
  });

  // Add the new todo to the cache
  const newTodo = data.createResolution;
  cache.writeQuery({
    query: RESOLUTIONS_QUERY,
    data: {
      resolutions: [...existingTodos.resolutions, newTodo],
    },
  });
};

export default function ResolutionForm() {
  const [createResolution] = useMutation(CREATE_RESOLUTION, {
    update: updateCache,
  });
  let input;

  return (
    <div>
      <input
        type="text"
        ref={(node) => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          createResolution({ variables: { name: input.value } });
          input.value = "";
        }}
        type="button"
      >
        Submit
      </button>
    </div>
  );
}
