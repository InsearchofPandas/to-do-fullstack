import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default function RegisterForm({ client, setUser, setError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const validateClient = (e) => {
    e.preventDefault();

    // Check Email

    const ere = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!ere.test(String(email).toLowerCase())) {
      setError('Please enter a valid email address');
      return;
    }

    // Check password length

    if (password.length < 4) {
      setError(`password requires a minimum of 4 characters`);
      return;
    } else if (password.length > 8) {
      setError(`password requires a maximum of 8 characters.`);
      return;
    }

    //Check password match

    if (password !== password2) {
      setError('Both passwords must match.');
      return;
    }

    // call server to register new user
    registerUser();
  };

  const registerUser = () => {
    Accounts.createUser(
      {
        email,
        password,
      },
      (error) => {
        if (!error) {
          client.resetStore();
          setUser(email);
          localStorage.setItem('user', email);
        }
        setError(error.reason);
        console.log(error);
      }
    );
  };

  return (
    <div className='reg-log'>
      <h2>Register</h2>
      <form onSubmit={validateClient}>
        <div className='form'>
          <input type='email' onChange={(e) => setEmail(e.target.value)} required />
          <label className='label-name'>
            <span className='content-name'>Enter Email</span>
          </label>
        </div>
        <div className='form'>
          <input type='password' onChange={(e) => setPassword(e.target.value)} required />
          <label className='label-name'>
            <span className='content-name'>Set Password</span>
          </label>
        </div>
        <div className='form'>
          <input type='password' onChange={(e) => setPassword2(e.target.value)} required />
          <label className='label-name'>
            <span className='content-name'>Re-enter Password</span>
          </label>
        </div>

        <button className='reg-button' type='submit'>
          Register User
        </button>
      </form>
    </div>
  );
}
