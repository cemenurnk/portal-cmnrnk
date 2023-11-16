import { useState, useEffect, createContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getToken } from '../services/login'

export const SessionContext = createContext(null)

const initialSession = { 
  token: null, 
  alert: null, 
  loading: true, 
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

  const setLoading = (value) => setSession(prev => ({...prev, loading: value}))
  const setAlert = (value) => setSession(prev => ({...prev, alert: value}))
  const setToken = (value) => setSession(prev => ({...prev, token: value}))
  const setSysMedi01 = (value) => setSession(prev => ({...prev, sysMedi01: value}))
  const setSysMedi09List = (value) => setSession(prev => ({...prev, sysMedi09List: value})) 
  const setSysMedi10List = (value) => setSession(prev => ({...prev, sysMedi10List: value}))
  const setSysMedi10Selected = (value) => setSession(prev => ({...prev, sysMedi10Selected: value}))
  const setFilteredSysMedi10List = (value) => setSession(prev => ({...prev, filteredSysMedi10List: value}))

  const logout = () => {
    setSession(prev => ({...prev, alert: null, sysMedi01: null, loading: false}))
    navigate("/login")
  }

  useEffect(()=>{
    async function getTokenApi(){
      
      const token = await getToken()

      setLoading(false)

      if(!token){
        setAlert("Ha ocurrido un error. Consulte con el administrador")
        return
      }

      setToken(token)
    }
    
    if(!session.token) getTokenApi()
  }, [])

  useEffect(()=>{
    console.log("session modificada => ", session)
  }, [session])

  useEffect(()=>{
    if(pathname !== "/login" && !session.sysMedi01) navigate("/login")
  }, [pathname])

return( 
    <SessionContext.Provider value={{session, setLoading, setAlert, setToken, setSysMedi01, setSysMedi09List, setSysMedi10List, setSysMedi10Selected, setFilteredSysMedi10List, logout}}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider