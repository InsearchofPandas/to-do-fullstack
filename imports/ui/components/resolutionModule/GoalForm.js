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
    <div className='res-add'>
      <form>
        <div className='form goal-form'>
          <input
            className='res-input goal-input'
            type='text'
            ref={(node) => {
              input = node;
            }}
            required
          />
          <label className='label-name'>
            <span className='content-name goal-content'>add sub goals to your resolutions...</span>
          </label>
        </div>
      </form>
      <button
        className='add-btn goal-btn'
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
        +
      </button>
    </div>
  );
}
