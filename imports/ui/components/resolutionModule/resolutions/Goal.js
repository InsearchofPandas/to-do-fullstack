import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const TOGGLE_GOAL = gql`
  mutation toggleGoal($_id: String!) {
    toggleGoal(_id: $_id) {
      _id
    }
  }
`;

const DELETE_GOAL = gql`
  mutation deleteGoal($_id: String!) {
    deleteGoal(_id: $_id) {
      _id
    }
  }
`;

export default function Goal({ goal }) {
  const [toggleGoal] = useMutation(TOGGLE_GOAL, {
    refetchQueries: ['Resolutions'],
  });
  const [deleteGoal] = useMutation(DELETE_GOAL, {
    refetchQueries: ['Resolutions'],
  });
  return (
    <li className='single-goal'>
      <div className='toggle'>
        <label
          className='container2'
          style={{
            textDecoration: goal.completed === true ? 'line-through' : '',
          }}>
          {goal.name}
          <input id='toggler' type='checkbox' onChange={() => toggleGoal({ variables: { _id: goal._id } })} checked={goal.completed} />
          <span className='checkmark'></span>
        </label>
      </div>
      <button className='del-btn' onClick={() => deleteGoal({ variables: { _id: goal._id } })}>
        <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <line
            x1='2'
            y1='-2'
            x2='29.8277'
            y2='-2'
            transform='matrix(0.722642 -0.691223 0.232573 0.972579 1 25)'
            strokeWidth='5'
            strokeLinecap='round'
          />
          <line
            x1='2'
            y1='-2'
            x2='29.8277'
            y2='-2'
            transform='matrix(0.722641 0.691223 -0.232574 0.972579 1 2.99998)'
            strokeWidth='5'
            strokeLinecap='round'
          />
        </svg>
      </button>
    </li>
  );
}
