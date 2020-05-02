import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default function RegisterForm({ client, setUser, user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = (e) => {
    e.preventDefault();
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
        console.log(error);
      }
    );
  };

  return (
    <div className='reg-log'>
      <h2>Register</h2>
      <form onSubmit={registerUser}>
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

        <button className='reg-button' type='submit'>
          Register User
        </button>
      </form>
    </div>
  );
}
