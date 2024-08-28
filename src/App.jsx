import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Login from './pages/Login'
//import Home from './pages/Home'
import Studies from './pages/Studies'
import StudyDetail from './pages/StudyDetail'
import SessionContextProvider from './context/SessionContext'
import NotFound from './pages/NotFound'
import MedicalReport from './pages/MedicalReport'

import { getApiUrl } from './helpers/api'
import { setCoords, setToken } from './helpers/localstorage'
import { debugConsole } from './helpers/debug'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  
  const [isTokenStored, setIsTokenStored] = useState(false)

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
      setIsTokenStored(true)
    })
    .catch(error => {
      debugConsole(error)
      setIsTokenStored(false)
    })

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
        <SessionContextProvider isTokenStored={isTokenStored} setIsTokenStored={setIsTokenStored}>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Navigate to="/estudios" replace={true}/>}/>
              <Route path='/estudios' element={<Studies />}/>
              <Route path='/estudios/:sysMedi10Uuid' element={<StudyDetail />}/>
            </Route>
            <Route path='/compartido/estudios/:sysMedi10Uuid' element={<StudyDetail />} />
            <Route path='/informes/:sysMedi11Uuid' element={<MedicalReport />} /> 
            <Route path='*' element={<NotFound />} />
          </Routes>
        </SessionContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
