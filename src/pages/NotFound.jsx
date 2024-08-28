import React from 'react'
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className='min-w-screen min-h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center gap-5 bg-gray-100 p-3 rounded shadow'>
        <img src='/IsoLogoTipoCMNRNK.png' alt="Centro de Medicina Nuclear y Radioterapia Nestor Kirchner" width={"300px"} />
        <h1 className='font-bold text-2xl'>Página no encontrada</h1>
        <Link to="/login" className='bg-sky-500 rounded-md py-1 px-2 text-white font-bold'>Volver</Link>
      </div>
    </div>
  )
}

export default NotFound