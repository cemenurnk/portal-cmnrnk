import { useState, useEffect, useContext } from 'react'
import { IoMdDownload, IoMdSearch, IoMdShare, IoMdCopy } from "react-icons/io";
import Navbar from "../components/Navbar"
import { formatDateTime } from '../helpers/date';

import Loader from '../components/Loader';
import Alert from '../components/Alert'
import { SessionContext } from '../context/SessionContext';

const ExternalLinkButton = ({children, text, href}) => {
  return(
    <div className='flex flex-col items-center'>
      <a 
        href={href} 
        target='_blank'
        className='bg-cemenurnk-primary rounded-full p-2 hover:bg-gray-400'
      >
        {children}
      </a>
      <span className='text-lg text-cemenurnk-primary font-bold text-center'>{text}</span>
    </div>
  )
}

const LinkListItem = ({title, link}) => {

  const { setAlert } = useContext(SessionContext)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setAlert({text: "Copiado en portapapeles.", type: "success"})
    setTimeout(()=> setAlert(null), 5000)
  }

  return (
    <li className='flex flex-row bg-gray-100 p-2 rounded gap-2 justify-between items-center'>
      <p className='mb-2 truncate'>{title}</p>
      <div className='flex gap-2'>
        <a href={link} target='_blank' className='bg-sky-500 text-white p-1 rounded flex items-center'>
          <IoMdSearch className='text-3xl text-white'/>
        </a>
        <button 
          type="button" 
          className='bg-sky-500 text-white font-bold p-1 rounded flex items-center'
          onClick={() => copyToClipboard(link)}
        >
          <IoMdCopy className='text-3xl text-white'/>
        </button>
      </div>
    </li>
  )

}

const StudyDetail = () => {

  const { session: { loading, sysMedi10Selected }} = useContext(SessionContext)

  const [alert, setAlert] = useState(null)

  return (
    <>
      <Navbar title="Detalle" color="cemenurnk-primary" backButtonPath="/estudios"/>
        <div className='container mx-auto px-3'>
          {loading &&
            <div className='flex justify-center min-h-screen'>
              <Loader color='black' size={50}/>
            </div> 
          }
          {alert && 
            <div className=''>
            </div>
          }
          {sysMedi10Selected &&
            <div className='pt-20'>
              <div className='flex flex-col gap-5'>
                <p className='text-4xl font-bold'>{sysMedi10Selected.sysMedi09Descripcion}</p>
                <div>
                  <p className='text-base text-sky-500 mb-0'>Fecha y Hora</p>
                  <p className='text-xl'>{formatDateTime(sysMedi10Selected.sysMedi10Fecha)}</p>
                </div>
                {/* <div>
                  <p className='text-base text-sky-500 mb-0'>Máquina Empleada</p>
                  <p className='text-2xl'>{sysMedi10Selected.sysmedi07_descripcion}</p>
                </div> */}
                <div>
                  <p className='text-base text-sky-500 mb-0'>Médico Responsable</p>
                  <p className='text-xl'>{sysMedi10Selected.sysMedi08Responsable}</p>
                </div>
                {/* <div>
                  <p className='text-base text-sky-500 mb-0'>Médico Derivante</p>
                  <p className='text-2xl'>{sysMedi10Selected.sysmedi10_medico_derivante}</p>
                </div> */}
                {/* <div>
                  <p className='text-base text-sky-500 mb-0'>Descripción</p>
                  <p className='text-2xl'>{sysMedi10Selected.sysmedi10_descripcion}</p>
                </div> */}
                <div>
                  <p className='text-base text-sky-500 mb-0'>Informes</p>
                  <ul className='flex flex-col gap-2'>
                    {
                      sysMedi10Selected.sysMedi11List.map((sysMedi11, index) => (
                        <LinkListItem 
                          key={index} 
                          title={sysMedi11.sysMedi11Titulo} 
                          link={sysMedi11.sysMedi11Enlace}
                          setAlert={setAlert}
                          />))
                        }
                  </ul>
                </div>
                <div>
                  <p className='text-base text-sky-500 mb-0'>Imágenes</p>
                  <ul className='flex flex-col gap-2'>
                    {
                      sysMedi10Selected.sysMedi16List.map((sysMedi16, index) => (
                        <LinkListItem 
                        key={index} 
                        title={`${sysMedi16.sysMedi15Descripcion} - ${formatDateTime(sysMedi16.sysMedi14StudyDate)}`} 
                        link={sysMedi16.sysMedi16Enlace}
                        setAlert={setAlert}
                        />))
                      }
                  </ul>
                </div>
                <Alert />
              </div>
              {/* <div className='grid grid-cols-3 mt-10'>
                <ExternalLinkButton 
                text="Descargar Informe"
                href={`https://desasievert.cemenurnk.org.ar/modulos/sys_medi_10/php/ver_sys_medi_11_pdf.php?id=5&idMod=524`}
                >
                <IoMdDownload className='text-3xl text-white'/>  
                </ExternalLinkButton>  
                <ExternalLinkButton 
                text="Ver Estudio"
                  href={`https://portal.cemenurnk.org.ar/viewer?StudyInstanceUIDs=`}  
                >
                  <IoMdSearch className='text-3xl text-white'/>  
                </ExternalLinkButton>  
                <ExternalLinkButton text="Compartir">
                  <IoMdShare className='text-3xl text-white'/>  
                </ExternalLinkButton>
              </div> */}
            </div>
          } 
      </div>
    </>
  )
}

export default StudyDetail     