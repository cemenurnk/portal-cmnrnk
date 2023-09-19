import React from 'react'

const Input = ({name, id, type, label, ...restOfProps}) => {
  
  let inputClassName = "border border-black p-2"

  if(restOfProps.disabled) inputClassName+=" bg-gray-100"

  if(type === "number") inputClassName+=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input 
        id={id} 
        type={type} 
        name={name} 
        className={inputClassName} 
        {...restOfProps}
      />
    </div>
  )
}

export default Input