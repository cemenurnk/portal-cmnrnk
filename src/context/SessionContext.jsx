import { useState, useEffect, createContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { debugConsole } from "../helpers/debug"

export const SessionContext = createContext(null)

// const initialSession = {
//   guest: false,
//   alert: null, 
//   loading: false,
//   sysMedi01: null,
//   sysMedi09List: null,
//   sysMedi10List: null,
//   sysMedi10Selected: null,
//   filteredSysMedi10List: null
// }

const SessionContextProvider = ({children}) => {
  
  const [session, setSession] = useState(null)
  
  const {pathname} = useLocation()

  const navigate = useNavigate()

  // const setGuest = (value) => setSession(prev => ({...prev, guest: value}))
  // const setSysMedi01 = (value) => setSession(prev => ({...prev, sysMedi01: value}))
  // const setSysMedi09List = (value) => setSession(prev => ({...prev, sysMedi09List: value})) 
  // const setSysMedi10List = (value) => setSession(prev => ({...prev, sysMedi10List: value}))
  // const setSysMedi10Selected = (value) => setSession(prev => ({...prev, sysMedi10Selected: value}))
  // const setFilteredSysMedi10List = (value) => setSession(prev => ({...prev, filteredSysMedi10List: value}))

  const logout = () => {
    navigate("/login")

    //Eliminar todos los datos de la sesión exceptuando el token
    //setSession(prev => ({...initialSession, token: prev.token}))
    setSession(null)
  }

  useEffect(()=>{

    const sysMedi01 = localStorage.getItem("sysMedi01")

    if(!sysMedi01){
      navigate("/login")
      return
    }

    setSession(JSON.parse(sysMedi01))

  }, [])

  useEffect(()=>{
    console.log("session modificada => ", session)
  }, [session])  

  // useEffect(()=>{
  //   if(pathname.includes("/compartido/estudios/")){
  //     setGuest(true)
  //     return
  //   }
  //   if(pathname !== "/login" && !session.sysMedi01) navigate("/login")
  // }, [pathname])

return( 
    <SessionContext.Provider value={{
        session, 
        // setSysMedi01, 
        // setSysMedi09List, 
        // setSysMedi10List, 
        // setSysMedi10Selected, 
        // setFilteredSysMedi10List,
        // setGuest,
        setSession,
        logout
      }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider