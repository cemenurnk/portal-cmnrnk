import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdDownload } from "react-icons/io";

import { getApiUrl, getApiHeaders } from '../helpers/api'
import { SessionContext } from '../context/SessionContext'

import Loader from '../components/Loader'

const MedicalReport = () => {

  const [pdfUrl, setPdfUrl] = useState(null)
  const params = useParams()
  const { isTokenStored } = useContext(SessionContext)

  useEffect(()=>{

    if(isTokenStored){
      fetch(getApiUrl(`sys_medi_11/pdf/${params.sysMedi11Uuid}`), { headers: getApiHeaders(true) })
      .then(response => response.blob())
      .then(blob => {
        setPdfUrl(URL.createObjectURL(blob))
      })
    }

  }, [isTokenStored])

  return (
    <>
      {
        pdfUrl ?
        (<>
          <div className='md:hidden flex justify-center items-center min-h-screen'>
            <a className='bg-sky-500 text-white font-bold rounded p-2 flex gap-1 items-center' href={pdfUrl} download='informe.pdf'>
              Descargar Informe
              <IoMdDownload />
            </a>
          </div>
          <iframe className='hidden md:block w-full h-screen' src={pdfUrl}/> 
        </>
        ) :
        (<div className='flex justify-center min-h-screen'>
          <Loader color='black' size={50}/>
        </div>)
      }
    </>
  )
}

export default MedicalReport