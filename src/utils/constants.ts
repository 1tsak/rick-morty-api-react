//////////// API URLs ////////////////////

// BASE API URL
export const BASE_URL:string = import.meta.env.VITE_BASE_API_URL

// Endpoints
export const ALL_CHARACTERS_API:string = `${BASE_URL}/character`
export const ALL_EPISODES_API:string = `${BASE_URL}/episode`
export const ALL_LOCATIONS_API:string = `${BASE_URL}/location`
export const EPISODE_DETAILS_API:string = `${BASE_URL}/episode`
export const LOCATION_DETAILS_API:string = `${BASE_URL}/location`
export const SEARCH_CHARACTER_API:string = `${BASE_URL}/character/?name=`