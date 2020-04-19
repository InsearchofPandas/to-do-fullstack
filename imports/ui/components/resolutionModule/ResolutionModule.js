import React from 'react';
import ResolutionForm from './ResolutionForm';
import GoalForm from './GoalForm';
import Goal from './resolutions/Goal';

export default function ResolutionModule({ data }) {
  return (
    <>
      <ResolutionForm />
      <div className='resolutions-layout'>
        <ul>
          {data.resolutions.map((resolution) => (
            <li key={resolution._id} className='single-res'>
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
          ))}
        </ul>
      </div>
    </>
  );
}
