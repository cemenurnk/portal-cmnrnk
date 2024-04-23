import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack, IoIosPerson } from "react-icons/io";
import Dropdown from "./Dropdown";

import { getUser, removeUser } from "../helpers/localstorage";

const Navbar = ({title, color, backButtonPath, showMenuButton = true}) => {
  
  const [showDropdown, setShowDropdown] = useState(false)

  const storedUser = getUser() 

  const navigate = useNavigate()

  const handleClickMenu = () => setShowDropdown(prev => !prev)

  const handleLogout = () => {
    removeUser()
    navigate("/login")
  }

  return (
    <>
      <div className={`absolute min-w-full py-2 bg-${color} z-20`}>
        <div className='container mx-auto px-3'>
          <div className="flex justify-between items-center">
            {backButtonPath && storedUser && 
              <Link to={backButtonPath}>
                <IoMdArrowRoundBack className="text-white text-3xl hover:text-sky-500 cursor-pointer"/>
              </Link>
            }
            <span className="text-2xl text-white font-bold">{title}</span>
            {showMenuButton &&
              <button 
                type="button" 
                className="bg-gray-200 rounded-full p-1 w-8 h-8 flex justify-center items-center hover:bg-white cursor-pointer"
                onClick={handleClickMenu}
              >
                <IoIosPerson />
              </button> 
            }
          </div>
          <Dropdown show={showDropdown} setShow={setShowDropdown}>
            <div className="flex flex-col gap-2">
            {storedUser ? 
              <>
                <p className="font-semibold">Paciente: {storedUser.sysPers01Apellido}, {storedUser.sysPers01Nombre}</p>
                <p className="text-gray-500 font-semibold">DNI: {storedUser.sysPers01Dni}</p>
                <button type="button" className="font-bold cursor-pointer bg-sky-500 text-white rounded p-1" onClick={handleLogout}>Salir</button>
              </> :
              <>
                <p className="font-semibold">Invitado</p>
                <button type="button" className="font-bold cursor-pointer bg-sky-500 text-white rounded py-1 px-2" onClick={()=>navigate("/login")}>Iniciar sesión</button>
              </>
            }
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  )
}

export default Navbar