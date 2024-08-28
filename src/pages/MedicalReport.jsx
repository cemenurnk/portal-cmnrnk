import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getApiUrl, getApiHeaders } from '../helpers/api'

const MedicalReport = () => {

  const [pdfUrl, setPdfUrl] = useState(null)
  const params = useParams()

  useEffect(()=>{

    fetch(getApiUrl(`sys_medi_11/pdf/${params.sysMedi11Uuid}`), { headers: getApiHeaders(true) })
    .then(response => response.blob())
    .then(blob => {
      setPdfUrl(URL.createObjectURL(blob))
    })
  }, [])

  return (
    <>
      {pdfUrl && <iframe className='w-full h-screen' src={pdfUrl}/>}
    </>
  )
}

export default MedicalReport