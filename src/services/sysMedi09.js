import http from "../helpers/http"

export const getSysMedi09List = async (token) => {
  const response = await http.get("sys_medi_09/", token)

  return response
}