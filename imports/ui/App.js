import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import RegisterForm from './components/loginModule/RegisterForm';
import LoginForm from './components/loginModule/LoginForm';
import styles from './style.css';
import Header from './components/Header';
import ToggleSignIn from './components/loginModule/ToggleSignIn';
import ResolutionModule from './components/resolutionModule/ResolutionModule';

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
      <Header client={client} />
      <div className='container'>
        {// Control Login vs  Resolution Display
        data.user === null ? (
          <>
            <ToggleSignIn register={register} setRegister={setRegister} />
            {// Control Register vs Login
            register ? <RegisterForm client={client} /> : <LoginForm client={client} />}
          </>
        ) : (
          <ResolutionModule data={data} />
        )}
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
