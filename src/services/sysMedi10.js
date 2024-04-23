import { getApiUrl, getApiHeaders } from "../helpers/api"

export const getSysMedi10List = (sysMedi02Uuid) => {
  
  const response = fetch(getApiUrl(`sys_medi_10/lista/${sysMedi02Uuid}`), { headers: getApiHeaders() })
  .then(response => response.json())
  .then(data => data.sysMedi10List)
  
  return response
}

export const getOneSysMedi10 = (sysMedi10Uuid) => {
  
  const response = fetch(getApiUrl(`sys_medi_10/${sysMedi10Uuid}`), { headers: getApiHeaders(true) })
  .then(response => response.json())
  .then(data => ({sysMedi01: data.sysMedi01, sysMedi10: data.sysMedi10}))

  return response
}