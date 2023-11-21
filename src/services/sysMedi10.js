import http from "../helpers/http"

export const getSysMedi10List = async (sysMedi02Uuid, token) => {
  const response = await http.get(`sys_medi_10/lista/${sysMedi02Uuid}`, token)

  return response
}

export const getOneSysMedi10 = async (sysMedi10Uuid, token) => {
  const response = await http.get(`sys_medi_10/${sysMedi10Uuid}`, token)

  return response
}