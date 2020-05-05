import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import RegisterForm from './components/loginModule/RegisterForm';
import LoginForm from './components/loginModule/LoginForm';
import styles from './style.css';
import Header from './components/Header';
import ToggleSignIn from './components/loginModule/ToggleSignIn';
import ResolutionModule from './components/resolutionModule/ResolutionModule';
import Footer from './components/Footer';
function App() {
  const [register, setRegister] = useState(true);
  const { client, loading, error, data } = useQuery(RESOLUTIONS_QUERY);
  const [user, setUser] = useState(null);
  const [errorDisplay, setError] = useState(null);

  if (loading) return <p>Loading…</p>;
  if (error)
    return (
      <p>
        Error :(
        {console.log(error)}
      </p>
    );

  return (
    <div>
      <Header client={client} setUser={setUser} user={user} />

      <div className='container'>
        {// Control Login vs  Resolution Display
        data.user === null ? (
          <>
            <ToggleSignIn register={register} setRegister={setRegister} />
            {errorDisplay && <p className='error-message'>{errorDisplay}</p>}
            {// Control Register vs Login
            register ? (
              <RegisterForm client={client} setUser={setUser} setError={setError} />
            ) : (
              <LoginForm client={client} setUser={setUser} setError={setError} />
            )}
          </>
        ) : (
          <ResolutionModule data={data} />
        )}
      </div>
      <Footer />
    </div>
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
