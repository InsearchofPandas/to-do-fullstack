import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const TOGGLE_GOAL = gql`
  mutation toggleGoal($_id: String!) {
    toggleGoal(_id: $_id) {
      _id
    }
  }
`;

export default function Goal({ goal }) {
  console.log(goal);
  const [toggleGoal] = useMutation(TOGGLE_GOAL, {
    refetchQueries: ["Resolutions"],
  });
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => toggleGoal({ variables: { _id: goal._id } })}
        checked={goal.completed}
      />
      {goal.name}
    </li>
  );
}