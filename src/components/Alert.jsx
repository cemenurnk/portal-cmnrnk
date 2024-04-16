import React from 'react'

const classNames = {
  danger: 'w-full border border-[#EA5652] bg-[#FFE1E0] rounded text-[#EA5652] text-center p-2 font-semibold',
  success: 'w-full border border-lime-600 bg-lime-200 rounded text-lime-600 text-center p-2 font-semibold'
}

const Alert = ({state}) => {

  if(!state) return null
  
  return (
    <div className = {classNames[state.type]}>
      {state.text}
    </div>
  )
}

export default Alert