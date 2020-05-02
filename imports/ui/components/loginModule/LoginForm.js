import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default function LoginForm({ client, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (error) => {
      if (!error) {
        client.resetStore();
        setUser(email);
        localStorage.setItem('user', email);
      }
      console.log(error);
    });
  };

  return (
    <div className='reg-log'>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div className='form'>
          <input type='email' onChange={(e) => setEmail(e.target.value)} required />
          <label className='label-name'>
            <span className='content-name'>Email</span>
          </label>
        </div>

        <div className='form'>
          <input type='password' onChange={(e) => setPassword(e.target.value)} required />
          <label className='label-name'>
            <span className='content-name'>Password</span>
          </label>
        </div>

        <button className='reg-button' type='submit'>
          Login User
        </button>
      </form>
    </div>
  );
}
