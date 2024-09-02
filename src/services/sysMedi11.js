import { getApiUrl, getApiHeaders } from "../helpers/api"

export const getOneSysMedi11 = (sysMedi11Uuid) => {
  
  const response = fetch(getApiUrl(`sys_medi_11/${sysMedi11Uuid}`), { headers: getApiHeaders(true) })
  .then(response => response.json())
  //.then(data => ({}))

  return response
}

export const getOneSysMedi11Pdf = (sysMedi11Uuid) => {

  const response = fetch(getApiUrl(`sys_medi_11/pdf/${sysMedi11Uuid}`), { headers: getApiHeaders(true) })
  .then(response => response.blob())


  return response
}