import axios from "axios";
import { useEffect, useState } from "react";
import { ALL_CHARACTERS_API } from "../utils/constants";
import CharacterCard from "./components/CharacterCard";
import { Character } from "../utils/types";

const Home = () => {
  const [characterData, setCharacterData] = useState<Character[]>([]);

  const fetchAllCharacters = async () => {
    try {
      const response = await axios.get(ALL_CHARACTERS_API);
      setCharacterData(response.data.results);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center gap-5 bg-[#272B33]">
      {characterData && characterData.length > 0 ? (
        characterData.map((character: any) => (
          <CharacterCard {...character} key={character.id} />
        ))
      ) : (
        <>No Characters</>
      )}
    </div>
  );
};

export default Home;
