import http from "../helpers/http"

export const getSysMedi10List = async (sysMedi02Uuid, token) => {
  const response = await http.get(`sys_medi_10/?sysmedi02_uuid=${sysMedi02Uuid}`, token)

  return response
}