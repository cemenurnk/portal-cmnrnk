import React from 'react'

const Check = ({name, id, label, ...restOfProps}) => {
  return (
    <div>
      <input type="checkbox" name={name} id={id} className="w-5 h-5" {...restOfProps}/>
      <label htmlFor="check" className='ml-2'>{label}</label>
    </div>
  )
}

export default Check