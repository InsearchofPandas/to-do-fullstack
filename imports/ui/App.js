import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';



function App(){
    const {loading, error, data } = useQuery(HI_QUERY)
    if (loading) return <p>Loading…</p>;
if (error) return <p>Error :( {console.log(error)}</p>;

    return(
        <>
    <h1>{data.hi}</h1>
    <ul>
    {data.resolutions.map(resolution => (<li key={resolution._id}>{resolution.name}</li>))}
    </ul>
    </>
    )
};

const HI_QUERY = gql`
{
    hi
    resolutions {
        _id
        name
    }
}
`;


  export default App;
  
