export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[]; 
    url: string;
    created: string;
  }
  export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];  
    url: string;
    created: string;
  }  
  export interface Character {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin: Pick<Location, 'name' | 'url'>;  
    location: Pick<Location, 'name' | 'url'>;  
    image: string;
    episode: string[];  
    url: string;
    created: string;
  }
  