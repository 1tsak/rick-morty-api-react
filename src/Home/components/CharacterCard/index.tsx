import { Link } from "react-router-dom";
import { Character } from "../../../utils/types";
import StatusIndicator from "../../../components/StatusIndicator";

const CharacterCard: React.FC<Character> = ({
  id,
  name,
  status,
  species,
  origin,
  location,
  image,
}) => {
  return (
    <div className="shadow-md rounded-lg bg-[#3C3E44] flex w-full  h-[220px] overflow-hidden object-cover animate-slideIn  m-auto">
      <div className="image-wrapper">
        <img className=" overflow-hidden  h-full w-full" src={image} alt="" />
      </div>
      <div className="info-section h-full p-3 text-white">
        <Link to={`/character/${id}`}>
          <h2 className="font-semibold text-2xl">{name}</h2>
        </Link>
        <p className="text-sm flex items-center gap-2">
          <StatusIndicator status={status} />
          {status}-{species}
        </p>
        <h2 className="mt-4 text-sm text-slate-400">Last Known Location:</h2>
        <Link to={`/location/${id}`}>
          <p>{location.name}</p>
        </Link>
        <h2 className="mt-4 text-sm text-slate-400">First Seen In:</h2>
        <Link to={`/episode/${id}`}>
          <p>{origin.name}</p>
        </Link>
      </div>
    </div>
  );
};

export default CharacterCard;
