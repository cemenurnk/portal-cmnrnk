export const setToken = (token) => {
  localStorage.setItem('portal-cemenurnk-token', token)
}

export const getToken = () => (localStorage.getItem('portal-cemenurnk-token'))

export const setUser = ({
  sysPers01Apellido, 
  sysPers01Nombre, 
  sysPers01Dni, 
  sysPers01FNacimiento, 
  sysPers01Edad, 
  sysMedi02Uuid
}) => {

  localStorage.setItem('portal-cemenurnk-user', JSON.stringify({
    sysPers01Apellido, 
    sysPers01Nombre, 
    sysPers01Dni, 
    sysPers01FNacimiento, 
    sysPers01Edad, 
    sysMedi02Uuid
  }))

}

export const getUser = () => (JSON.parse(localStorage.getItem('portal-cemenurnk-user')))

export const removeUser = () => {localStorage.removeItem('portal-cemenurnk-user')}

export const setCoords = ({
  sysMedi29Latitude, 
  sysMedi29Longitude
}) => {
  localStorage.setItem('portal-cemenurnk-coords', JSON.stringify({
    sysMedi29Latitude, 
    sysMedi29Longitude
  }))
}

export const getCoords = () => (JSON.parse(localStorage.getItem('portal-cemenurnk-coords')))