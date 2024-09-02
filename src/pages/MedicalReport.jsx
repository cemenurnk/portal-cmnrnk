import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdDownload } from "react-icons/io";

import { SessionContext } from '../context/SessionContext'

import Loader from '../components/Loader'
import { getOneSysMedi11, getOneSysMedi11Pdf } from '../services/sysMedi11';

const MedicalReport = () => {

  const [reportData, setReportData] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)
  const params = useParams()
  const { isTokenStored } = useContext(SessionContext)

  useEffect(()=>{

    if(isTokenStored){

      Promise.all([getOneSysMedi11(params.sysMedi11Uuid), getOneSysMedi11Pdf(params.sysMedi11Uuid)])
      .then(([data, pdf]) => {
        
        //console.log(data)
        //return
        
        const tempPdfUrl = URL.createObjectURL(pdf)
        
        setPdfUrl(tempPdfUrl)
        setReportData(data)

        const dowloadTimeout = setTimeout(()=>{
          const dowloadLink = document.querySelector('#downloadLink')
          dowloadLink.href = tempPdfUrl
          dowloadLink.download = data.sysMedi11Titulo
          dowloadLink.click()
        }, 1000)

        document.title = data.sysMedi11Titulo

        return () => {clearTimeout(dowloadTimeout)}
      })
    }
  }, [isTokenStored])

  return (
    <>
      {
        (pdfUrl && reportData) ?
        (<>
          <div className='md:hidden flex flex-col gap-2 justify-center items-center min-h-screen'>  
            <div className='p-4 bg-gray-200 rounded'>
              <ul className='mb-2'>
                <li className='text-2xl font-bold'>Informe {reportData.sysMedi12DescripcionText}</li>
                <li className='text-xl text-gray-700'>{reportData.sysPers01Apellido} {reportData.sysPers01Nombre}</li>
                <li className='text-xl text-gray-700'>{reportData.sysMedi10Fecha}</li>
              </ul>
              <a 
                id='downloadLink'
                className='bg-sky-500 text-white font-bold rounded p-2 flex gap-1 items-center justify-center' 
              >
                Descargar Informe
                <IoMdDownload />
              </a>
            </div>
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