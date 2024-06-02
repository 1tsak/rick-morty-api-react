import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { 
  fetchCharacters, 
  selectCharacters, 
  selectCurrentPage as selectCurrentCharacterPage, 
  setCurrentPage as setCharacterPage 
} from "../features/characterSlice";
import { 
  fetchEpisodes, 
  selectEpisodes, 
  selectCurrentEpisodePage, 
  setEpisodePage 
} from "../features/episodeSlice";
import { 
  fetchLocations, 
  selectLocations, 
  selectCurrentLocationPage, 
  setLocationPage 
} from "../features/locationSlice";
import Hero from "./components/Hero";
import CharacterCard from "./components/CharacterCard";
import ItemList from "./components/ItemList";
import { ItemComponentProps, ItemListType } from "../utils/types";
import EpisodeCard from "./components/EpisodeCard";
import LocationCard from "./components/LocationCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const characters = useSelector(selectCharacters);
  const currentCharacterPage = useSelector(selectCurrentCharacterPage);
  const episodes = useSelector(selectEpisodes);
  const currentEpisodePage = useSelector(selectCurrentEpisodePage);
  const locations = useSelector(selectLocations);
  const currentLocationPage = useSelector(selectCurrentLocationPage);
  
  const [listConfig, setListConfig] = useState<ItemListType>({
    itemList: characters[currentCharacterPage] || [],
    itemComponent: CharacterCard as React.ComponentType<ItemComponentProps>,
  });
  
  const [selectedType, setSelectedType] = useState<
    "characters" | "episodes" | "locations"
  >("characters");

  useEffect(() => {
    dispatch(fetchCharacters({ page: currentCharacterPage }));
    dispatch(fetchEpisodes({ page: currentEpisodePage }));
    dispatch(fetchLocations({ page: currentLocationPage }));
  }, [dispatch, currentCharacterPage, currentEpisodePage, currentLocationPage]);

  useEffect(() => {
    switch (selectedType) {
      case "characters":
        setListConfig({
          itemList: characters[currentCharacterPage] || [],
          itemComponent:
            CharacterCard as React.ComponentType<ItemComponentProps>,
        });
        break;
      case "episodes":
        setListConfig({
          itemList: episodes[currentEpisodePage] || [],
          itemComponent: EpisodeCard as React.ComponentType<ItemComponentProps>,
        });
        break;
      case "locations":
        setListConfig({
          itemList: locations[currentLocationPage] || [],
          itemComponent:
            LocationCard as React.ComponentType<ItemComponentProps>,
        });
        break;
      default:
        break;
    }
  }, [selectedType, characters, episodes, locations, currentCharacterPage, currentEpisodePage, currentLocationPage]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(
      event.target.value as "characters" | "episodes" | "locations"
    );
  };

  const handlePageChange = (page: number) => {
    switch (selectedType) {
      case "characters":
        dispatch(setCharacterPage(page));
        break;
      case "episodes":
        dispatch(setEpisodePage(page));
        break;
      case "locations":
        dispatch(setLocationPage(page));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Hero />
      <div className="flex flex-col gap-4 flex-wrap bg-[#272B33] pt-4 pb-6 py-14 items-center justify-center">
        <div className="w-full flex justify-between px-24">
          <select
            className="bg-slate-700 text-slate-200 px-4 py-2 rounded-xl border-r-[16px] border-transparent text-sm outline-none cursor-pointer"
            title="Select Type"
            name="type"
            id="select-type"
            onChange={handleSelectChange}
          >
            <option value="characters">Characters</option>
            <option value="episodes">Episodes</option>
            <option value="locations">Locations</option>
          </select>
          <Pagination currentPage={selectedType === "characters" ? currentCharacterPage : selectedType === "episodes" ? currentEpisodePage : currentLocationPage} handlePageChange={handlePageChange} />
        </div>
        <ItemList {...listConfig} />
      </div>
    </>
  );
};

export default Home;
