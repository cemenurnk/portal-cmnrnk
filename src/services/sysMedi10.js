//import http from "../helpers/http"
import { getApiUrl, getApiHeaders } from "../helpers/api"

export const getSysMedi10List = (sysMedi02Uuid) => {
  
  const response = fetch(getApiUrl(`sys_medi_10/lista/${sysMedi02Uuid}`), { headers: getApiHeaders() })
  .then(response => response.json())
  .then(data => data.sysMedi10List)
  
  return response
}

export const getOneSysMedi10 = async (sysMedi10Uuid, token) => {
  const response = await http.get(`sys_medi_10/${sysMedi10Uuid}`, token)

  return response
}