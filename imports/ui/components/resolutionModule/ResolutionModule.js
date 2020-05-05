import React from 'react';
import ResolutionForm from './ResolutionForm';
import GoalForm from './GoalForm';
import Goal from './resolutions/Goal';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export default function ResolutionModule({ data }) {
  const DELETE_RESOLUTION = gql`
    mutation deleteResolution($_id: String!) {
      deleteResolution(_id: $_id) {
        _id
      }
    }
  `;

  const [deleteResolution] = useMutation(DELETE_RESOLUTION, {
    refetchQueries: ['Resolutions'],
  });

  return (
    <>
      {/* // form to insert new resolutions  */}
      <div className='res-input-container'>
        <ResolutionForm />
      </div>

      <div className='resolutions-layout'>
        <h2>My Resolutions</h2>
        {data.resolutions.length === 0 ? <p style={{ padding: '100px' }}>Enter a New Year's resolution above.</p> : ''}
        <ul>
          {data.resolutions.map((resolution) => (
            <div className='resolutions-container' key={resolution._id}>
              <li className='single-res'>
                <div className='resolution'>
                  <span
                    style={{
                      textDecoration: resolution.completed === true ? 'line-through' : '',
                    }}>
                    {resolution.name}
                  </span>
                  <div className='res-del-btn'>
                    <button className='res-del-btn' onClick={() => deleteResolution({ variables: { _id: resolution._id } })}>
                      <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <line
                          x1='2'
                          y1='-2'
                          x2='29.8277'
                          y2='-2'
                          transform='matrix(0.722642 -0.691223 0.232573 0.972579 1 25)'
                          strokeWidth='5'
                          strokeLinecap='round'
                        />
                        <line
                          x1='2'
                          y1='-2'
                          x2='29.8277'
                          y2='-2'
                          transform='matrix(0.722641 0.691223 -0.232574 0.972579 1 2.99998)'
                          strokeWidth='5'
                          strokeLinecap='round'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <ul>
                  {resolution.goals.map((goal) => (
                    <Goal goal={goal} key={goal._id} />
                  ))}
                </ul>
                <GoalForm resolutionId={resolution._id} />
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
