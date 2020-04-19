import React, { useRef } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { RESOLUTIONS_QUERY } from '../../App';

const CREATE_GOAL = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
      name
    }
  }
`;

// const updateCache = (cache, { data }) => {
//   // Fetch the todos from the cache
//   const existingTodos = cache.readQuery({
//     query: RESOLUTIONS_QUERY,
//   });

//   // Add the new todo to the cache
//   const newTodo = data.createGoal;
//   cache.writeQuery({
//     query: RESOLUTIONS_QUERY,
//     data: {
//       resolutions: [...existingTodos.resolutions, newTodo],
//     },
//   });
// };

export default function GoalForm({ resolutionId }) {
  const [createGoal] = useMutation(
    CREATE_GOAL,
    { refetchQueries: ['Resolutions'] }
    //   {update: updateCache,}
  );
  let input;

  return (
    <div>
      <input
        type='text'
        ref={(node) => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          createGoal({
            variables: {
              name: input.value,
              resolutionId: resolutionId,
            },
          });
          input.value = '';
        }}
        type='button'>
        Submit
      </button>
    </div>
  );
}
