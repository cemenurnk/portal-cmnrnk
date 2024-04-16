import { getToken, getCoords } from "./localstorage"

export const getApiUrl = (endoint) => (import.meta.env.VITE_APIREST + endoint)

export const getApiHeaders = (includeCoordinates = false) => {

  const headers = {
    'flexAgent': 'apirest-sievert',
    'X-Authorization-token': getToken(),
  }

  const coords = getCoords()

  if(includeCoordinates && coords){

    headers['SysMedi29Latitude'] = coords.sysMedi29Latitude
    headers['SysMedi29Longitude'] = coords.sysMedi29Longitude
  }

  return headers
}