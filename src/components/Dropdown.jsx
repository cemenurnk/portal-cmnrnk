import { IoIosClose } from "react-icons/io";

const Dropdown = ({children, show, setShow}) => {

  if(!show) return null
  
  return (
    <div className="relative min-w-full">
      <div className='absolute z-10 rounded-3 shadow-xl bg-gray-100 p-3 right-0 min-w-[100px]'>
        {
          setShow && 
          <div className='flex justify-end'>
            <IoIosClose className='text-2xl cursor-pointer hover:text-sky-500' onClick={()=>setShow(false)}/>
          </div>
        }
        {children}
      </div>
    </div>
  )
}

export default Dropdown