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
  const cacheData = cache.readQuery({
    query: RESOLUTIONS_QUERY,
  });

  // Add the new todo to the cache
  const blanks = { completed: null, goals: [] };
  const fills = data.createResolution;
  const newTodo = { ...blanks, ...fills };
  console.log(data);
  cache.writeQuery({
    query: RESOLUTIONS_QUERY,
    data: {
      resolutions: [...cacheData.resolutions, newTodo],
    },
  });
};

export default function ResolutionForm() {
  const [createResolution] = useMutation(CREATE_RESOLUTION, {
    update: updateCache,
  });
  let input;

  return (
    <div style={{ margin: 100 }}>
      <form>
        <div className="form">
          <input
            type="text"
            ref={(node) => {
              input = node;
            }}
            required
          />
          <label className="label-name">
            <span className="content-name">Enter Resolution</span>
          </label>
        </div>

        <button
          onClick={() => {
            createResolution({ variables: { name: input.value } });
            input.value = "";
          }}
          type="button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
