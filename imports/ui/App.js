import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ResolutionForm from "./ResolutionForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import GoalForm from "./GoalForm";
import Goal from "./resolutions/Goal";

function App() {
  const { client, loading, error, data } = useQuery(RESOLUTIONS_QUERY);
  if (loading) return <p>Loading…</p>;
  if (error)
    return (
      <p>
        Error :(
        {console.log(error)}
      </p>
    );

  return (
    <>
      <h1>To Do App</h1>
      {data.user._id ? (
        <button
          type="button"
          onClick={() => {
            Meteor.logout();
            client.resetStore();
          }}
        >
          Logout
        </button>
      ) : (
        <>
          <RegisterForm client={client} />
          <LoginForm client={client} />
        </>
      )}

      <ResolutionForm />

      <ul>
        {data.resolutions.map((resolution) => (
          <li key={resolution._id}>
            {resolution.name}
            <ul>
              {resolution.goals.map((goal) => (
                <Goal goal={goal} key={goal._id} />
              ))}
            </ul>
            <GoalForm resolutionId={resolution._id} />
          </li>
        ))}
      </ul>
    </>
  );
}

const RESOLUTIONS_QUERY = gql`
  query Resolutions {
    resolutions {
      _id
      name
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
      email
    }
  }
`;

export default App;
export { RESOLUTIONS_QUERY };
