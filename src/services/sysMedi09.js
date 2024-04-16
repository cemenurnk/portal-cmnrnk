import { getApiHeaders, getApiUrl } from "../helpers/api"

export const getSysMedi09List = () => {
  
  const response = fetch(getApiUrl("sys_medi_09/"), { headers: getApiHeaders() })
  .then(response => response.json())
  .then(data => data.sysMedi09List)
  
  return response 
}