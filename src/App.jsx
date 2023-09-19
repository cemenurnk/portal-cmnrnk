import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Studies from './pages/Studies'
import StudyDetail from './pages/StudyDetail'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/estudios",
    element: <Studies/>,
  },
  {
    path: "/estudio/:id",
    element: <StudyDetail />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
