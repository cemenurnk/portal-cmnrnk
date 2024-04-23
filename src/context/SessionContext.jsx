import { createContext } from "react"

export const SessionContext = createContext(null)

const SessionContextProvider = ({isTokenStored, setIsTokenStored, children}) => {

return( 
    <SessionContext.Provider value={{
        isTokenStored,
        setIsTokenStored
      }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider