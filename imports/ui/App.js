import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import GoalForm from './GoalForm';
import Goal from './resolutions/Goal';
import styles from './style.css';
import Header from './components/Header';
import ToggleSignIn from './components/login/ToggleSignIn';

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
      <Header />
      <div className='container'>
        {data.user === null && (
          <>
            <ToggleSignIn register={register} setRegister={setRegister} />
            {register ? <RegisterForm client={client} /> : <LoginForm client={client} />}
          </>
        )}

        <ResolutionForm />
        <div className='resolutions-layout'>
          <ul>
            {data.resolutions.map((resolution) => (
              <li key={resolution._id} className='single-res'>
                <span
                  style={{
                    textDecoration: resolution.completed === true ? 'line-through' : '',
                  }}>
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
