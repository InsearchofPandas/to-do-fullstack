import React, { useState, useEffect } from 'react';

export default function Header({ client, setUser, user }) {
  user = user ? user : localStorage.user;
  return (
    <>
      <h1 className='abs-center'>NEW YEAR NEW ME</h1>

      <div className='header-bar'>
        <div className='user-icon'>
          <svg viewBox='0 0 50 62' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M28 13.5C28 18.7467 23.7467 23 18.5 23C13.2533 23 9 18.7467 9 13.5C9 8.25329 13.2533 4 18.5 4C23.7467 4 28 8.25329 28 13.5ZM32 13.5C32 20.9558 25.9558 27 18.5 27C11.0442 27 5 20.9558 5 13.5C5 6.04416 11.0442 0 18.5 0C25.9558 0 32 6.04416 32 13.5ZM0 45.5C0 44.1515 0.147426 42.8103 0.437607 41.5C0.670218 40.4496 0.99456 39.419 1.40823 38.4204C2.33794 36.1758 3.70064 34.1364 5.41852 32.4185C7.1364 30.7006 9.17583 29.3379 11.4204 28.4082C13.6649 27.4785 16.0705 27 18.5 27C20.9295 27 23.3351 27.4785 25.5796 28.4082C27.8242 29.3379 29.8636 30.7006 31.5815 32.4185C33.2994 34.1364 34.6621 36.1758 35.5918 38.4204C36.0054 39.419 36.3298 40.4496 36.5624 41.5C36.8526 42.8103 37 44.1515 37 45.5H33.046C33.046 43.5898 32.6697 41.6983 31.9387 39.9335C31.2077 38.1687 30.1363 36.5652 28.7856 35.2144C27.4348 33.8637 25.8313 32.7923 24.0665 32.0613C22.3017 31.3303 20.4102 30.954 18.5 30.954C16.5898 30.954 14.6983 31.3303 12.9335 32.0613C11.1687 32.7923 9.56516 33.8637 8.21444 35.2144C6.86372 36.5652 5.79227 38.1687 5.06127 39.9335C4.33027 41.6983 3.95402 43.5898 3.95402 45.5L0 45.5Z'
              fill='rgb(210, 188, 244)'
            />
          </svg>
        </div>
        <div className='user-name'>{user}</div>
        <button
          type='button'
          onClick={() => {
            Meteor.logout();
            client.resetStore();
            localStorage.clear();
            setUser(null);
          }}
          className='logout-btn'>
          Logout
        </button>
      </div>

      <div className='header-body'>
        <p className='instructions'>
          An application dedicated to helping you track and complete your goals and resolutions. Utilizing the framework of Apollo to set up a GraphQL
          front end client and back end API your data is stored on mongoDB. It then is easily accessed through any web browser simply by logging in.
        </p>
      </div>
    </>
  );
}
