import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useContext } from 'react'

import { SessionContext } from '../context/SessionContext'

const Home = () => {
  
  const { session: {sysMedi01}} = useContext(SessionContext)

  if(!sysMedi01) return null

  return (
    <>
      <Navbar color="cemenurnk-secondary" title="Mi portal"/>
      <div className='container mx-auto px-3 pt-20'>
        <p className='font-bold text-2xl mb-10'>Paciente: {sysMedi01.sysPers01Nombre} {sysMedi01.sysPers01Apellido}</p>
        <div className="flex flex-col">
          <Link to={'estudios'} className='bg-cemenurnk-secondary hover:drop-shadow-md rounded p-5 text-white font-bold text-center'>Mis estudios</Link>
        </div>
      </div>
    </>
  )
}

export default Home