import React from "react";
import { Episode } from "../../../utils/types";
import { PiTelevisionSimpleThin } from "react-icons/pi";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const EpisodeCard: React.FC<Episode> = ({ id, name, episode, air_date }) => {
  return (
    <div className="shadow-md rounded-lg bg-[#3C3E44] flex items-center p-5 gap-5 w-full  h-[220px] overflow-hidden object-cover animate-slideIn m-auto">
      <PiTelevisionSimpleThin color="#525252" size={100} />
      <div className="text-white flex flex-col flex-1">
        <h2 className="text-slate-400 text-sm">{episode}</h2>
        <Link to={`/episode/${id}`}>
          <h2 className="text-xl">{name}</h2>
        </Link>
        <h2 className="mt-2 text-sm text-slate-400">First Aired:</h2>
        <h2>{air_date}</h2>
      </div>
      <Link to={`/episode/${id}`}>
        <FaChevronRight size={35} color="#cdcdcd" />
      </Link>
    </div>
  );
};

export default EpisodeCard;
