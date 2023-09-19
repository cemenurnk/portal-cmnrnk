import React from 'react'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../helpers/date'

const StudyCard = (props) => {
  return (
    <Link to={`/estudio/${props.sysmedi10_uuid}`} className="p-5 bg-gray-100 rounded">
      <p className="text-2xl font-bold">{props.sysmedi09_descripcion}</p>
      <p className='text-gray-500 truncate'>{props. sysmedi10_descripcion}</p>
      <p>{formatDateTime(props.sysmedi14_study_date)}</p>
    </Link>
  )
}

export default StudyCard