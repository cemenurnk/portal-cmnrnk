import React from 'react'

const Alert = ({message}) => {
  return (
    <div className="w-full md:w-1/3 border border-[#EA5652] bg-[#FFE1E0] rounded text-[#EA5652] text-center p-2 font-semibold">
      {message}
    </div>
  )
}

export default Alert