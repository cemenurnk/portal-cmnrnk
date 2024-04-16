import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import Login from './pages/Login'
import Home from './pages/Home'
import Studies from './pages/Studies'
import StudyDetail from './pages/StudyDetail'
import SessionContextProvider from './context/SessionContext'
import NotFound from './pages/NotFound'

import { getApiUrl } from './helpers/api'
import { setCoords, setToken } from './helpers/localstorage'
import { debugConsole } from './helpers/debug'

function App() {
 
  useEffect(() => {

    // Obtener token de la apirest de sievert
    fetch(getApiUrl('login/'), {
      method: 'POST',
      headers: {
        'flexAgent': 'apirest-sievert'
      },
      body: JSON.stringify({
        username: import.meta.env.VITE_USERNAME,
        password: import.meta.env.VITE_PASSWORD
      })
    })
    .then(response => response.json())
    .then(data => {
  
      if(data.resultid === "error"){
        throw new Error(data)
      }
  
      setToken(data.tokenAuth)
    })
    .catch(error => debugConsole(error))

    // Obtener ubicación del usuario

    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(position => {
        setCoords({
          sysMedi29Latitude: position.coords.latitude.toString(),
          sysMedi29Longitude: position.coords.longitude.toString()
        })
      })
    }
  
  }, [])
  
  return (
    <>
      <BrowserRouter>
        <SessionContextProvider>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/estudios' element={<Studies />}/>
            {/* <Route path='/estudios/:sysMedi10Uuid' element={<StudyDetail />}/>
            <Route path='/compartido/estudios/:sysMedi10Uuid' element={<StudyDetail />} /> */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </SessionContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
