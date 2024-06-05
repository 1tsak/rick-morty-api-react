import React from 'react'
import { Location } from '../../../utils/types'
import { IoLocationSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

const LocationCard:React.FC<Location> = ({id,name,type,dimension}) => {
  return (
    <div className="shadow-md rounded-lg bg-[#3C3E44] flex items-center p-5 gap-5 w-full h-[220px] overflow-hidden object-cover animate-slideIn m-auto">
      <IoLocationSharp  color="#2e2e2e" size={100} />
      <div className="text-white flex flex-col flex-1">
        <h2 className="text-slate-400 text-sm">{dimension}</h2>
        <Link to={`/location/${id}`}>
          <h2 className="text-xl">{name}</h2>
        </Link>
        <h2 className="mt-2 text-sm text-slate-400">Type:</h2>
        <h2>{type}</h2>
      </div>
      <Link to={`/location/${id}`}>
        <FaChevronRight size={35} color="#cdcdcd" />
      </Link>
    </div>
  )
}

export default LocationCard