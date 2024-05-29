import React from 'react'
import { useParams } from 'react-router-dom'

const Character = () => {
    const {characterID} = useParams();
  return (
    <div>Character {characterID}</div>
  )
}

export default Character