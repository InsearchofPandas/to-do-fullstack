import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ResolutionForm from "./ResolutionForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import GoalForm from "./GoalForm";
import Goal from "./resolutions/Goal";
import styles from "./style.css";

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
  console.log(data);
  return (
    <>
      <div className="header">
        <h1>NEW YEAR</h1>
        <h1>NEW ME</h1>
      </div>
      <div className="container">
        {data.user === null ? (
          <>
            <RegisterForm client={client} />
            <LoginForm client={client} />
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              Meteor.logout();
              client.resetStore();
            }}
          >
            Logout
          </button>
        )}

        <ResolutionForm />

        <ul>
          {data.resolutions.map((resolution) => (
            <li key={resolution._id}>
              <span
                style={{
                  textDecoration:
                    resolution.completed === true ? "line-through" : "",
                }}
              >
                {resolution.name}
              </span>
              <ul>
                {resolution.goals.map((goal) => (
                  <Goal goal={goal} key={goal._id} />
                ))}
              </ul>
              <GoalForm resolutionId={resolution._id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const RESOLUTIONS_QUERY = gql`
  query Resolutions {
    resolutions {
      _id
      name
      completed
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
