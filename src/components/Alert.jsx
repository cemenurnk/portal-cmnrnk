import React, { useContext } from 'react'
import { SessionContext } from '../context/SessionContext'

const classNames = {
  danger: 'w-full border border-[#EA5652] bg-[#FFE1E0] rounded text-[#EA5652] text-center p-2 font-semibold',
  success: 'w-full border border-green-500 bg-green-200 rounded text-green-500 text-center p-2 font-semibold'
}

const Alert = () => {

  const {session: { alert }} = useContext(SessionContext)

  if(!alert) return null
  
  return (
    <div className = {classNames[alert.type]}>
      {alert.text}
    </div>
  )
}

export default Alert