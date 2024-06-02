import React from 'react'
import { Location } from '../../../utils/types'

const LocationCard:React.FC<Location> = ({id,name,created,dimension,type}) => {
  return (
    <div className="shadow-md rounded-lg bg-[#3C3E44] flex w-[600px] h-[220px] overflow-hidden object-cover m-auto">
      {name}
    </div>
  )
}

export default LocationCard