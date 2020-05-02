import React from 'react';
import ResolutionForm from './ResolutionForm';
import GoalForm from './GoalForm';
import Goal from './resolutions/Goal';

export default function ResolutionModule({ data }) {
  return (
    <>
      {/* // form to insert new resolutions  */}
      <div className='res-input-container'>
        <ResolutionForm />
      </div>

      <div className='resolutions-layout'>
        <h2>My Resolutions</h2>
        <ul>
          {data.resolutions.map((resolution) => (
            <div className='resolutions-container' key={resolution._id}>
              <li className='single-res'>
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
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
