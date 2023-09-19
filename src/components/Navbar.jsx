import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdMenu } from "react-icons/io";
import Dropdown from "./Dropdown";

const Navbar = ({title, color, backButtonPath, showMenuButton = true}) => {
  
  const [showDropdown, setShowDropdown] = useState(false)
  
  const handleClickMenu = () => setShowDropdown(prev => !prev)

  return (
    <>
      <div className={`absolute min-w-full py-2 bg-${color}`}>
        <div className='container mx-auto px-3'>
          <div className="flex justify-between items-center">
            {backButtonPath && 
              <Link to={backButtonPath}>
                <IoMdArrowRoundBack className="text-white text-3xl hover:text-sky-500 cursor-pointer"/>
              </Link>
            }
            <span className="text-2xl text-white font-bold">{title}</span>
            {showMenuButton && <IoMdMenu className="text-white text-3xl hover:text-sky-500 cursor-pointer" onClick={handleClickMenu}/>}
          </div>
          <Dropdown show={showDropdown} setShow={setShowDropdown}>
            <div className="flex justify-center">
              <span className="font-bold underline cursor-pointer hover:text-sky-500">Salir</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  )
}

export default Navbar