import React from 'react'
import { useParams } from 'react-router-dom'

const Location = () => {
    const {locationID} = useParams();
  return (
    <div>Location {locationID}</div>
  )
}

export default Location