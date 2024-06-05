import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Character } from "../utils/types";
import { AppDispatch } from "../store/store";
import axios from "axios";
import { ALL_CHARACTERS_API } from "../utils/constants";
import CharacterCard from "../Home/components/CharacterCard";
import { PiTelevisionSimpleThin } from "react-icons/pi";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  fetchLocationInfo,
  selectLocationInfo,
} from "../features/locationSlice";
import Loading from "../components/Loading";

const Location = () => {
  const { locationID } = useParams();
  console.log(locationID);

  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector(selectLocationInfo);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    dispatch(fetchLocationInfo(locationID!));
  }, [dispatch, locationID]);

  useEffect(() => {
    console.log(location);

    if (location && location.name) {
      const fetchCharacterData = async () => {
        try {
          const ids = location.residents.map((url: string) => {
            const splits = url.split("/");
            return splits[splits.length - 1];
          });

          const locationPromises = ids.map((id) =>
            axios.get<Character>(`
              ${ALL_CHARACTERS_API}/${id}`)
          );
          const characterResponses = await Promise.all(locationPromises);
          const episodesData = characterResponses.map((response) => {
            return response.data;
          });
          console.log(episodesData);

          setCharacters(episodesData);
        } catch (err) {
          console.log("Failed to fetch episodes", err);
        }
      };
      fetchCharacterData();
    }
  }, [location]);
  return (
    <div className=" bg-[#272B33] h-screen overflow-hidden flex flex-col  px-6 py-10">
      <Link to={"/"}>
        <IoMdArrowRoundBack
          className="cursor-pointer"
          color="white"
          size={50}
        />
      </Link>
      {location && location.name ? (
        <div className="h-full flex flex-row gap-5">
          <div>
            <h2 className="text-center text-sm m-2 text-white">
              Location Info:
            </h2>
            <div className="p-2 shadow min-w-[350px] flex flex-col items-center rounded-xl gap-5 bg-slate-200">
              <PiTelevisionSimpleThin color="#525252" size={150} />
              <div className="p-2 flex flex-col justify-center">
                <p className="text-sm flex items-center">
                  {location.dimension}
                </p>
                <h2 className="text-2xl text-slate-700">{location.name}</h2>
                <h2 className="mt-4 text-sm text-slate-400">Type:</h2>
                <p>{location.type}</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden h-full ">
            <h2 className=" text-sm m-2 text-white">Residents:</h2>
            <div className="h-full overflow-y-scroll gap-2 grid grid-cols-2 2xl:grid-cols-3">
              {characters && characters.length > 0 ? (
                characters.map((character: Character) => (
                  <CharacterCard {...character} />
                ))
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Location;
