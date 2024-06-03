import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../store/store";
import {
  fetchCharacterInfo,
  selectCharacterInfo,
} from "../features/characterSlice";
import StatusIndicator from "../components/StatusIndicator";
import { Episode } from "../utils/types";
import axios from "axios";
import { ALL_EPISODES_API } from "../utils/constants";
import EpisodeCard from "../Home/components/EpisodeCard";
import Loading from "../components/Loading";

const Character = () => {
  const { characterID } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const character = useSelector(selectCharacterInfo);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  useEffect(() => {
    dispatch(fetchCharacterInfo(characterID!));
  }, [dispatch, characterID]);
  useEffect(() => {
    if (character && character.name) {
      console.log(character);

      const fetchEpisodesData = async () => {
        try {
          const ids = character.episode.map((url: string) => {
            const splits = url.split("/");
            return splits[splits.length - 1];
          });

          const episodePromises = ids.map((id) =>
            axios.get<Episode>(`
            ${ALL_EPISODES_API}/${id}`)
          );
          const episodeResponses = await Promise.all(episodePromises);
          const episodesData = episodeResponses.map((response) => {
            return response.data;
          });
          console.log(episodesData);

          setEpisodes(episodesData);
        } catch (err) {
          console.log("Failed to fetch episodes", err);
        }
      };
      fetchEpisodesData();
    }
  }, [character]);

  return (
    <div className=" bg-slate-800 h-[90vh] overflow-hidden  px-6 py-20 items-center justify-center">
      {character && character.name ? (
        <div className="h-[70vh] flex flex-row gap-5">
          <div>
            <h2 className="text-center text-sm m-2 text-white">
              Character Info:
            </h2>
            <div className="p-6 shadow min-w-[400px] flex flex-col items-center rounded-xl gap-5 bg-slate-100">
              <img
                src={character.image}
                className="rounded-md h-32 w-32 object-cover"
                alt=""
              />
              <div className="p-5 flex flex-col justify-center">
                <h2 className="text-xl text-slate-700">{character.name}</h2>

                <p className="text-sm flex items-center gap-2">
                  <StatusIndicator status={character.status} />
                  {character.status}-{character.species}
                </p>
                <h2 className="mt-4 text-sm text-slate-400">
                  Last Known Location:
                </h2>
                <p>{character.location.name}</p>
                <h2 className="mt-4 text-sm text-slate-400">First Seen In:</h2>
                <p>{character.origin.name}</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden h-fit ">
            <h2 className=" text-sm m-2 text-white">
              Episodes Appeared In:
            </h2>
            <div className="max-h-[55vh] overflow-y-auto  flex-grow gap-2 grid grid-cols-2">
              {episodes && episodes.length >0 ? episodes.map((episode: Episode) => (
                <EpisodeCard {...episode} />
              )):<Loading/>}
            </div>
          </div>
        </div>
      ):<Loading/>}
    </div>
  );
};

export default Character;
