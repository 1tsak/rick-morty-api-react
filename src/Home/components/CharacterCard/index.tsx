import Header from "../../../components/Header";
import { Character } from "../../../utils/types";

const CharacterCard = ({
  name,
  status,
  species,
  origin,
  location,
  image
}: Character) => {
  return (
    <div className="shadow-md rounded-lg bg-[#3C3E44] flex w-[600px] h-[220px]">
      <img className=" overflow-hidden rounded-lg" src={image} alt="" />
      <div className=" h-full p-5 text-white">
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="text-sm">{status}-{species}</p>
        <h2 className="mt-2 text-sm text-slate-400">Last Known Location:</h2>
        <p className="text-slate-200">{location.name}</p>
        <h2 className="mt-2 text-sm text-slate-400">First Seen In:</h2>
        <p>{origin.name}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
