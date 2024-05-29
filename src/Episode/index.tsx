import React from 'react'
import { useParams } from 'react-router-dom'

const Episode = () => {
    const {episodeID} = useParams();
    console.log(episodeID);
    
  return (
    <div>Episode</div>
  )
}

export default Episode