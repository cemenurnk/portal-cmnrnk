import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Studies from './pages/Studies'
import StudyDetail from './pages/StudyDetail'
import SessionContextProvider from './context/SessionContext'

function App() {
  return (
    <>
      <BrowserRouter>
        <SessionContextProvider>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/estudios' element={<Studies />}/>
            <Route path='/estudios/:sysMedi10Uuid' element={<StudyDetail />}/>
          </Routes>
        </SessionContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
