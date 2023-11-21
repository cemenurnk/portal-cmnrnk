import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Studies from './pages/Studies'
import StudyDetail from './pages/StudyDetail'
import SessionContextProvider from './context/SessionContext'
import NotFound from './pages/NotFound'

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
            <Route path='/compartido/estudios/:sysMedi10Uuid' element={<StudyDetail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </SessionContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
