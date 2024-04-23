import { useEffect, useContext, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { IoMdSearch, IoMdShare, IoMdCopy } from "react-icons/io";

//import http from '../helpers/http';
import { formatDateTime } from '../helpers/date';
import { SessionContext } from '../context/SessionContext';
import { getOneSysMedi10 } from '../services/sysMedi10';
import Navbar from "../components/Navbar"
import Loader from '../components/Loader';
import Alert from '../components/Alert'
import PatientCard from '../components/PatientCard';
import { getApiHeaders, getApiUrl } from '../helpers/api';
import { debugConsole } from '../helpers/debug';
import { getUser } from '../helpers/localstorage';

// import usePostFetch from '../hooks/usePostFetch';
// import useOnLoadRequests from '../hooks/useOnLoadRequests';

const LinkListItem = ({title, link, onClick}) => {

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
          onClick={onClick}
        >
          <IoMdCopy className='text-3xl text-white'/>
        </button>
      </div>
    </li>
  )
}

const StudyDetail = () => {

  const { state } = useLocation()
  const storedUser = getUser()

  const [ patient, setPatient ] = useState(storedUser)
  const [ study, setStudy ] = useState(state?.selectedStudy)
  const [ loading, setLoading ] = useState(false) 
  const [ alert, setAlert ] = useState(null)
  const { isTokenStored } = useContext(SessionContext)

  const params = useParams()

  const copyToClipboard = async (text, sysMedi30Codigo) => {
    navigator.clipboard.writeText(text)

    //guardar log de las actividades
    const response = await fetch(
      getApiUrl('sys_medi_29/'), 
      {
        method: "POST",
        headers: getApiHeaders(), 
        body: JSON.stringify({sysMedi10Uuid: study.sysMedi10Uuid, sysMedi30Codigo})
      }
    )

    if(response.resultid === "error" || typeof response === "string"){
      setAlert({text: "Ha ocurrido un error. Consulte con el administrador.", type: "danger"})
      debugConsole(response)
    }else{
      setAlert({text: "Copiado en portapapeles.", type: "success"})
    }

    setTimeout(()=> setAlert(null), 5000)
  }

  useEffect(()=>{

    if(!study && isTokenStored){
      
      setLoading(true)
      
      //servicio para obtener el estudio
      getOneSysMedi10(params.sysMedi10Uuid)
      .then(data => {
        setStudy(data.sysMedi10)
        setPatient(data.sysMedi01)
      })
      .finally(setLoading(false))
    }

  }, [isTokenStored])

  return (
    <>
      <Navbar title="Detalle" color="cemenurnk-primary" backButtonPath="/estudios"/>
        <div className='container mx-auto px-3'>
          {loading &&
            <div className='flex justify-center min-h-screen'>
              <Loader color='black' size={50}/>
            </div> 
          }
          {study &&
            <div className='pt-20'>
              <PatientCard patient={patient}/>
              <div className='flex flex-col gap-5'>
                <div className='flex text-4xl font-bold items-center'>
                  <p className=''>{study.sysMedi09Descripcion}</p>
                  {storedUser &&
                    <button 
                      type='button' 
                      title='Compartir' 
                      onClick={()=>copyToClipboard(`${import.meta.env.VITE_DOMINIO_PORTAL}compartido/estudios/${params.sysMedi10Uuid}`, "ACT3")}>
                      <IoMdShare className='text-gray-500'/>
                    </button>
                  }
                </div>
                <div>
                  <p className='text-base text-sky-500 mb-0'>Fecha y Hora</p>
                  <p className='text-xl'>{formatDateTime(study.sysMedi10Fecha)}</p>
                </div>
                <div>
                  <p className='text-base text-sky-500 mb-0'>Médico Responsable</p>
                  <p className='text-xl'>{study.sysMedi08Responsable}</p>
                </div>
                <div>
                  <p className='text-base text-sky-500 mb-0'>Informes</p>
                  <ul className='flex flex-col gap-2'>
                    {
                      study.sysMedi11List.map((sysMedi11, index) => (
                        <LinkListItem 
                          key={index} 
                          title={sysMedi11.sysMedi11Titulo} 
                          link={sysMedi11.sysMedi11Enlace}
                          onClick={()=>copyToClipboard(sysMedi11.sysMedi11Enlace, "ACT5")}
                          />))
                        }
                  </ul>
                </div>
                <div>
                  <p className='text-base text-sky-500 mb-0'>Imágenes</p>
                  <ul className='flex flex-col gap-2'>
                    {
                      study.sysMedi16List.map((sysMedi16, index) => (
                        <LinkListItem 
                        key={index} 
                        title={`${sysMedi16.sysMedi15Descripcion} - ${formatDateTime(sysMedi16.sysMedi14StudyDate)}`} 
                        link={sysMedi16.sysMedi16Enlace}
                        onClick={()=>copyToClipboard(sysMedi16.sysMedi16Enlace, "ACT4")}
                        />))
                      }
                  </ul>
                </div>
                <div>
                  <p className='text-base text-sky-500 mb-0'>Documentos</p>
                  <ul className='flex flex-col gap-2'>
                    {
                      study.sysMedi19List.map((sysMedi19, index) => (
                        <LinkListItem 
                        key={index} 
                        title={`${sysMedi19.sysMedi19Descripcion} - ${formatDateTime(sysMedi19.sysMedi19Fapl)}`} 
                        link={sysMedi19.sysMedi19Enlace}
                        onClick={()=>copyToClipboard(sysMedi19.sysMedi19Enlace, "ACT6")}
                        />))
                      }
                  </ul>
                </div>
                <Alert state={alert}/>
              </div>
            </div>
          } 
      </div>
    </>
  )
}

export default StudyDetail     