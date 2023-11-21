import http from "../helpers/http"

export const getToken = async () => {
  const credentials = {username: import.meta.env.VITE_USERNAME ,password: import.meta.env.VITE_PASSWORD}

  const response = await http.post('login/', null, credentials)

  if(response.resultid === "error") return null

  return response.tokenAuth
}

export const loginPatient = async (sysPers01Dni, sysMedi01Pin, token) => {
  const credentials = {sysPers01Dni, sysMedi01Pin}

  const response = await http.post('sys_medi_01/login/', token, credentials)

  return response
}