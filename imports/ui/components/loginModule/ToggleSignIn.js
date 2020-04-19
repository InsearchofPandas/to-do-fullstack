import React from 'react';

export default function ToggleSignIn({ register, setRegister }) {
  return (
    <div className='reg-body'>
      <div className='reg-switch'>
        <button
          style={{
            backgroundColor: register ? 'rgb(210, 188, 244)' : '#353a4d',
          }}
          type='button'
          className='switch-btn'
          onClick={() => setRegister(true)}>
          Register
        </button>
        <button
          style={{
            backgroundColor: !register ? 'rgb(210, 188, 244)' : '#353a4d',
          }}
          type='button'
          className='switch-btn'
          onClick={() => setRegister(false)}>
          Login
        </button>
      </div>
      <div className='reg-underline' />
    </div>
  );
}
