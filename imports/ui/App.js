import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ResolutionForm from "./ResolutionForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import GoalForm from "./GoalForm";
import Goal from "./resolutions/Goal";
import styles from "./style.css";

function App() {
  const [register, setRegister] = useState(true);
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
      <div className="header">
        <h1>NEW YEAR</h1>
        <h1>NEW ME</h1>
        <p className="instructions">
          An application dedicated to helping you track and complete your goals
          and resolutions. Utilizing the framework of Apollo to set up a GraphQL
          front end client and back end API your data is stored on mongoDB. It
          then is easily accessed through any web browser simply by logging in.
        </p>
      </div>
      <div className="container">
        {data.user === null ? (
          <>
            <div className="reg-body">
              <div className="reg-switch">
                <button
                  style={{
                    backgroundColor: register
                      ? "rgb(210, 188, 244)"
                      : "#353a4d",
                  }}
                  type="button"
                  className="switch-btn"
                  onClick={() => setRegister(true)}
                >
                  Register
                </button>
                <button
                  style={{
                    backgroundColor: !register
                      ? "rgb(210, 188, 244)"
                      : "#353a4d",
                  }}
                  type="button"
                  className="switch-btn"
                  onClick={() => setRegister(false)}
                >
                  Login
                </button>
              </div>
              <div className="reg-underline" />
            </div>
            {register ? (
              <RegisterForm client={client} />
            ) : (
              <LoginForm client={client} />
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              Meteor.logout();
              client.resetStore();
            }}
            className="reg-button"
          >
            Logout
          </button>
        )}

        <ResolutionForm />
        <div className="resolutions-layout">
          <ul>
            {data.resolutions.map((resolution) => (
              <li key={resolution._id} className="single-res">
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
