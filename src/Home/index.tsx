import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchCharacters, selectCharacters } from "../features/characterSlice";
import { fetchEpisodes, selectEpisodes } from "../features/episodeSlice";
import { fetchLocations, selectLocations } from "../features/locationSlice";
import Hero from "./components/Hero";
import CharacterCard from "./components/CharacterCard";
import ItemList from "./components/ItemList";
import { ItemComponentProps, ItemListType } from "../utils/types";
import EpisodeCard from "./components/EpisodeCard";
import LocationCard from "./components/LocationCard";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const characters = useSelector(selectCharacters);
  const episodes = useSelector(selectEpisodes);
  const locations = useSelector(selectLocations);
  const [listConfig, setListConfig] = useState<ItemListType>({
    itemList: characters,
    itemComponent: CharacterCard as React.ComponentType<ItemComponentProps>,
  });
  const [selectedType, setSelectedType] = useState<
    "characters" | "episodes" | "locations"
  >("characters");

  useEffect(() => {
    dispatch(fetchCharacters());
    dispatch(fetchEpisodes());
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    switch (selectedType) {
      case "characters":
        setListConfig({
          itemList: characters,
          itemComponent:
            CharacterCard as React.ComponentType<ItemComponentProps>,
        });
        break;
      case "episodes":
        setListConfig({
          itemList: episodes,
          itemComponent: EpisodeCard as React.ComponentType<ItemComponentProps>,
        });
        break;
      case "locations":
        setListConfig({
          itemList: locations,
          itemComponent:
            LocationCard as React.ComponentType<ItemComponentProps>,
        });
        break;
      default:
        break;
    }
  }, [selectedType, characters, episodes, locations]);
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(
      event.target.value as "characters" | "episodes" | "locations"
    );
  };
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-8 flex-wrap bg-[#272B33] px-6 py-14 items-center justify-center">
        <select
          className="bg-slate-400 px-4 py-2 rounded-xl border-r-[16px] border-transparent text-sm outline-none cursor-pointer"
          title="Select Type"
          name="type"
          id="select-type"
          onChange={handleSelectChange}
        >
          <option value="character">Characters</option>
          <option value="character">Episodes</option>
          <option value="character">Locations</option>
        </select>
        <ItemList {...listConfig} />
      </div>
    </>
  );
};

export default Home;
