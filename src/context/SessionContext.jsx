import { useState, useEffect, createContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getToken } from '../services/login'

export const SessionContext = createContext(null)

const initialSession = {
  guest: false,
  token: null, 
  alert: null, 
  loading: false,
  sysMedi29Latitude: null,
  sysMedi29Longitude: null, 
  sysMedi01: null,
  sysMedi09List: null,
  sysMedi10List: null,
  sysMedi10Selected: null,
  filteredSysMedi10List: null
}

const SessionContextProvider = ({children}) => {
  
  const [session, setSession] = useState(initialSession)
  
  const {pathname} = useLocation()

  const navigate = useNavigate()

  const setGuest = (value) => setSession(prev => ({...prev, guest: value}))
  const setLoading = (value) => setSession(prev => ({...prev, loading: value}))
  const setAlert = (value) => setSession(prev => ({...prev, alert: value}))
  const setToken = (value) => setSession(prev => ({...prev, token: value}))
  const setSysMedi01 = (value) => setSession(prev => ({...prev, sysMedi01: value}))
  const setSysMedi09List = (value) => setSession(prev => ({...prev, sysMedi09List: value})) 
  const setSysMedi10List = (value) => setSession(prev => ({...prev, sysMedi10List: value}))
  const setSysMedi10Selected = (value) => setSession(prev => ({...prev, sysMedi10Selected: value}))
  const setFilteredSysMedi10List = (value) => setSession(prev => ({...prev, filteredSysMedi10List: value}))

  const logout = () => {
    navigate("/login")

    //Eliminar todos los datos de la sesión exceptuando el token
    setSession(prev => ({...initialSession, token: prev.token}))
  }

  useEffect(()=>{
    async function getTokenApi(){
      
      const token = await getToken()

      setLoading(false)

      if(!token){
        setAlert({text: "Ha ocurrido un error. Consulte con el administrador", type: "danger"})
        return
      }

      setToken(token)
    }
    
    if(!session.token) getTokenApi()

    //Obtener ubicación del usuario
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(position => {
        setSession(prev => 
          ({...prev, 
            sysMedi29Latitude: position.coords.latitude.toString(), 
            sysMedi29Longitude: position.coords.longitude.toString()
          })
        )
      })
    }
  }, [])

  useEffect(()=>{
    if(import.meta.env.VITE_ENVIRONMENT === "DESA") console.log("session modificada => ", session)
  }, [session])  

  useEffect(()=>{
    if(pathname.includes("/compartido/estudios/")){
      setGuest(true)
      return
    }
    if(pathname !== "/login" && !session.sysMedi01) navigate("/login")
  }, [pathname])

return( 
    <SessionContext.Provider value={{
        session, 
        setLoading, 
        setAlert, 
        setToken, 
        setSysMedi01, 
        setSysMedi09List, 
        setSysMedi10List, 
        setSysMedi10Selected, 
        setFilteredSysMedi10List,
        setGuest,
        logout
      }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider