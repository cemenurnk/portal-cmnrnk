import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { IoMdSearch, IoMdShare, IoMdCopy } from "react-icons/io";

//import http from '../helpers/http';
import { formatDateTime } from '../helpers/date';
import { SessionContext } from '../context/SessionContext';
import { getOneSysMedi10 } from '../services/sysMedi10';
import Navbar from "../components/Navbar"
import Loader from '../components/Loader';
import Alert from '../components/Alert'
import PatientCard from '../components/PatientCard';

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

  const { 
    session: { 
      token, 
      guest, 
      loading, 
      sysMedi10Selected 
    }, 
    setAlert, 
    setLoading, 
    setSysMedi01, 
    setSysMedi10Selected
  } = useContext(SessionContext)

  const params = useParams()

  const copyToClipboard = async (text, sysMedi30Codigo) => {
    navigator.clipboard.writeText(text)

    //guardar log de las actividades
    const response = await http.post('sys_medi_29/', token, {sysMedi10Uuid: sysMedi10Selected.sysMedi10Uuid, sysMedi30Codigo})

    if(response.resultid === "success"){
      setAlert({text: "Copiado en portapapeles.", type: "success"})
    }else{
      setAlert({text: "Ha ocurrido un error. Consulte con el administrador.", type: "danger"})
    }

    setTimeout(()=> setAlert(null), 5000)
  }

  // useEffect(()=>{
  //   const getStudy = async () => {

  //     setLoading(true)

  //     const sysMedi10Response = await getOneSysMedi10(params.sysMedi10Uuid, token)

  //     if(sysMedi10Response.resultid === "error"){
  //       setAlert({text: "Ha ocurrido un error. Consulte con el Administrador.", type: "danger"})
  //       setLoading(false)
  //       return
  //     }

  //     setSysMedi10Selected(sysMedi10Response.sysMedi10)
  //     setSysMedi01(sysMedi10Response.sysMedi01)

  //     setLoading(false)
  //   }

  //   if(!token) return
    
  //   if(sysMedi10Selected) return
    
  //   getStudy()

  // }, [token])

  return (
    <>
      <Navbar title="Detalle" color="cemenurnk-primary" backButtonPath="/estudios"/>
        <div className='container mx-auto px-3'>
          {loading &&
            <div className='flex justify-center min-h-screen'>
              <Loader color='black' size={50}/>
            </div> 
          }
          {sysMedi10Selected &&
            <div className='pt-20'>
              {guest && <PatientCard />}
              <div className='flex flex-col gap-5'>
                <div className='flex text-4xl font-bold items-center'>
                  <p className=''>{sysMedi10Selected.sysMedi09Descripcion}</p>
                  {!guest &&
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
                  <p className='text-xl'>{formatDateTime(sysMedi10Selected.sysMedi10Fecha)}</p>
                </div>
                <div>
                  <p className='text-base text-sky-500 mb-0'>Médico Responsable</p>
                  <p className='text-xl'>{sysMedi10Selected.sysMedi08Responsable}</p>
                </div>
                <div>
                  <p className='text-base text-sky-500 mb-0'>Informes</p>
                  <ul className='flex flex-col gap-2'>
                    {
                      sysMedi10Selected.sysMedi11List.map((sysMedi11, index) => (
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
                      sysMedi10Selected.sysMedi16List.map((sysMedi16, index) => (
                        <LinkListItem 
                        key={index} 
                        title={`${sysMedi16.sysMedi15Descripcion} - ${formatDateTime(sysMedi16.sysMedi14StudyDate)}`} 
                        link={sysMedi16.sysMedi16Enlace}
                        onClick={()=>copyToClipboard(sysMedi16.sysMedi16Enlace, "ACT4")}
                        />))
                      }
                  </ul>
                </div>
                <Alert />
              </div>
            </div>
          } 
      </div>
    </>
  )
}

export default StudyDetail     