import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../helpers/date'
import { SessionContext } from '../context/SessionContext'

const StudyCard = (props) => {

  const { setSysMedi10Selected } = useContext(SessionContext)

  return (
    <Link 
      to={`/estudios/${props.sysMedi10Uuid}`} 
      className="p-5 bg-gray-100 rounded"
      onClick={ () => setSysMedi10Selected(props)}
    >
      <p className="text-2xl font-bold">{props.sysMedi09Descripcion}</p>
      <p className='text-gray-500'>Dr/a. {props.sysMedi08Responsable}</p>
      <p>{formatDateTime(props.sysMedi10Fecha)}</p>
    </Link>
  )
}

export default StudyCard