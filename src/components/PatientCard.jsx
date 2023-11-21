import { useContext } from 'react'
import { IoIosPerson } from "react-icons/io"

import { SessionContext } from '../context/SessionContext'
import { formatDate } from '../helpers/date'

const PatientCard = () => {
  
  const { session: { sysMedi01 } } = useContext(SessionContext)
  
  return (
    <div className="p-5 mb-5 bg-gray-100 rounded flex">
      <div className="self-center">
        <IoIosPerson className="text-5xl"/>
      </div>
      <div className="ml-3">
        <p className="text-2xl">{sysMedi01.sysPers01Apellido}, {sysMedi01.sysPers01Nombre}</p>
        <p className="text-xl text-gray-500">DNI: {sysMedi01.sysPers01Dni}</p>
        <p className="text-xl text-gray-500">Fecha de Nacimiento: {formatDate(sysMedi01.sysPers01FNacimiento)}</p>
        <p className="text-xl text-gray-500">Edad: {sysMedi01.sysPers01Edad}</p>
      </div>
    </div>
  )
}

export default PatientCard