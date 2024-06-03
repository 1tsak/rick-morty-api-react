import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEpisodeInfo, selectEpisodeInfo } from "../features/episodeSlice";
import { useEffect, useState } from "react";
import { Character } from "../utils/types";
import { AppDispatch } from "../store/store";
import axios from "axios";
import { ALL_CHARACTERS_API } from "../utils/constants";
import CharacterCard from "../Home/components/CharacterCard";
import { PiTelevisionSimpleThin } from "react-icons/pi";
import Loading from "../components/Loading";

const Episode = () => {
  const { episodeID } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const episode = useSelector(selectEpisodeInfo);
  const [characters, setCharacters] = useState<Character[]>([]);
  useEffect(() => {
    dispatch(fetchEpisodeInfo(episodeID!));
  }, [dispatch, episodeID]);
  useEffect(() => {
    if (episode && episode.name) {
      console.log(episode);

      const fetchCharacterData = async () => {
        try {
          const ids = episode.characters.map((url: string) => {
            const splits = url.split("/");
            return splits[splits.length - 1];
          });

          const characterPromises = ids.map((id) =>
            axios.get<Character>(`
              ${ALL_CHARACTERS_API}/${id}`)
          );
          const characterResponses = await Promise.all(characterPromises);
          const characterData = characterResponses.map((response) => {
            return response.data;
          });
          console.log(characterData);

          setCharacters(characterData);
        } catch (err) {
          console.log("Failed to fetch episodes", err);
        }
      };
      fetchCharacterData();
    }
  }, [episode]);
  console.log(episodeID);

  return (
    <div className=" bg-slate-800 h-[90vh] overflow-hidden  px-6 py-20 items-center justify-center">
      {episode && episode.name ? (
        <div className="h-[70vh] flex flex-row gap-5">
          <div>
            <h2 className="text-center text-sm m-2 text-white">
              Episode Info:
            </h2>
            <div className="p-6 shadow min-w-[400px] flex flex-col items-center rounded-xl gap-5 bg-slate-100">
              <PiTelevisionSimpleThin color="#525252" size={150} />
              <div className="p-2 flex flex-col justify-center">
                <p className="text-sm flex items-center">{episode.episode}</p>
                <h2 className="text-2xl text-slate-700">{episode.name}</h2>
                <h2 className="mt-4 text-sm text-slate-400">First Aired:</h2>
                <p>{episode.air_date}</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden h-fit ">
            <h2 className=" text-sm m-2 text-white">Characters Appeared:</h2>
            <div className="max-h-[55vh] overflow-y-auto  flex-grow gap-2 grid grid-cols-2">
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
      ):<Loading/>}
    </div>
  );
};

export default Episode;
