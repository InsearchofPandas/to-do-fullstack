import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

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
  }
`;

const CREATE_RESOLUTION = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
      name
    }
  }
`;

const updateCache = (cache, { data }) => {
  // Fetch the todos from the cache
  const cacheData = cache.readQuery({
    query: RESOLUTIONS_QUERY,
  });

  // Add the new todo to the cache
  const blanks = { completed: null, goals: [] };
  const fills = data.createResolution;
  const newTodo = { ...blanks, ...fills };

  cache.writeQuery({
    query: RESOLUTIONS_QUERY,
    data: {
      resolutions: [...cacheData.resolutions, newTodo],
    },
  });
};

export default function ResolutionForm() {
  const [resolution, setResolution] = useState('');
  const [createResolution] = useMutation(CREATE_RESOLUTION, {
    update: updateCache,
  });
  let input;

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      createResolution({ variables: { name: resolution } });
      setResolution('');
    }
  };

  return (
    <>
      <h2>DEFINE YOUR FUTURE!</h2>
      <div className='res-add'>
        <form>
          <div className='form' style={{ display: 'flex' }}>
            <input
              className='res-input'
              type='text'
              onChange={(e) => setResolution(e.target.value)}
              onKeyDown={handleEnter}
              required
              value={resolution}
            />
            <label className='label-name'>
              <span className='content-name'>Enter Resolution</span>
            </label>
          </div>
        </form>
        <button
          className='add-btn'
          onClick={() => {
            createResolution({ variables: { name: resolution } });
            setResolution('');
          }}
          type='button'>
          +
        </button>
      </div>
    </>
  );
}
