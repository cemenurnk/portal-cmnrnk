import { Navigate, Outlet } from "react-router-dom"
import { getUser } from "../helpers/localstorage"

const ProtectedRoute = () => {

  const user = getUser()

  
  if(!user){
    return <Navigate to="/login" replace={true}/>
  }

  return <Outlet />

}

export default ProtectedRoute