import { IoIosPerson } from "react-icons/io"

import { formatDate } from '../helpers/date'

const PatientCard = ({patient}) => {

  return (
    <div className="p-5 mb-5 bg-gray-100 rounded flex">
      <div className="self-center">
        <IoIosPerson className="text-5xl"/>
      </div>
      <div className="ml-3">
        <p className="text-2xl">{patient.sysPers01Apellido}, {patient.sysPers01Nombre}</p>
        <p className="text-xl text-gray-500">DNI: {patient.sysPers01Dni}</p>
        <p className="text-xl text-gray-500">Fecha de Nacimiento: {formatDate(patient.sysPers01FNacimiento)}</p>
        <p className="text-xl text-gray-500">Edad: {patient.sysPers01Edad}</p>
      </div>
    </div>
  )
}

export default PatientCard