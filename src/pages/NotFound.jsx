import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'


const NotFound = () => {
  return (
    <div className='min-w-screen min-h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center'>
        <img src={Logo} alt="Centro de Medicina Nuclear y Radioterapia Nestor Kirchner" className="w-1/2"/>
        <h1 className='font-bold text-2xl'>Página no encontrada</h1>
        <Link to="/login" className='bg-sky-500 rounded-md py-1 px-2 text-white font-bold'>Volver</Link>
      </div>
    </div>
  )
}

export default NotFound