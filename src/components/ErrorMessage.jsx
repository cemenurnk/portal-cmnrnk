import React from 'react'
import { AiFillAlert } from "react-icons/ai"

const ErrorMessage = () => {
  return (
    <div className='flex flex-col'>
      <AiFillAlert className='self-center text-6xl'/>
      <p className='text-2xl text-center'>Ha ocurrido un error. </p> 
      <p className='text-2xl text-center'>Consulte con el administrador.</p>
    </div>
  )
}

export default ErrorMessage