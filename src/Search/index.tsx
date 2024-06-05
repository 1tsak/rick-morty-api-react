import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CharacterCard from "../Home/components/CharacterCard";
import EpisodeCard from "../Home/components/EpisodeCard";
import LocationCard from "../Home/components/LocationCard";
import Loading from "../components/Loading";

const Search = () => {
  const { results, loading, type } = useSelector(
    (state: RootState) => state.search
  );

  if (loading) {
    return (
      <div className="search-results bg-[#272B33] h-screen overflow-hidden flex flex-col items-center justify-center">
        <h2 className="text-white m-2">Search Results</h2>
        <Loading />
      </div>
    );
  }

  return (
    <div className="search-results bg-[#272B33] h-full overflow-hidden flex flex-col p-2 items-center justify-center">
      <h2 className="text-white m-2">Search Results</h2>
      {results && results.length > 0 ? (
        <div className="h-screen overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 min-w-[1225px] gap-6">
            {type === "character" &&
              results.map((item: any) => <CharacterCard key={item.id} {...item} />)}
            {type === "episode" &&
              results.map((item: any) => <EpisodeCard key={item.id} {...item} />)}
            {type === "location" &&
              results.map((item: any) => <LocationCard key={item.id} {...item} />)}
          </div>
        </div>
      ) : (
        <div className="text-white">No Items</div>
      )}
    </div>
  );
};

export default Search;
