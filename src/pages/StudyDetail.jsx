import React from 'react'
import { IoMdDownload, IoMdSearch, IoMdShare } from "react-icons/io";
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom';
import { formatDateTime } from '../helpers/date';

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

const props = {
  sysmedi10_uuid: "00323652-4c01-11ee-a5d3-0050568c9146",
  sysmedi09_descripcion: "Mamografía",
  sysmedi09_codigo: "MG",
  sysmedi10_fapl: "2023-09-05 12:28:16",
  sysmedi10_descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorem vitae laborum beatae nesciunt reiciendis illum velit eveniet modi consequatur officia nulla, tempore nostrum suscipit explicabo voluptatum qui, aut quos!",
  sysmedi14_study_date: "2023-08-23 14:50:22",
  sysmedi14_instances: "4",
  sysmedi10_medico_responsable: "Fernando Trachta",
  sysmedi14_ui: "1.2.840.113619.2.401.148692532694329114042299683197554365165"
}

const StudyDetail = () => {
  return (
    <>
      <Navbar title="Detalle" color="cemenurnk-primary" backButtonPath="/estudios"/>
      <div className='container mx-auto pt-20 px-3'>
        <div className='flex flex-col gap-4'>
          <p className='text-4xl font-bold'>{props.sysmedi09_descripcion}</p>
          <div>
            <p className='text-base text-sky-500 mb-0'>Médico Responsable</p>
            <p className='text-2xl'>{props.sysmedi10_medico_responsable}</p>
          </div>
          <div>
            <p className='text-base text-sky-500 mb-0'>Fecha y Hora</p>
            <p className='text-2xl'>{formatDateTime(props.sysmedi14_study_date)}</p>
          </div>
          <div>
            <p className='text-base text-sky-500 mb-0'>Descripción</p>
            <p className='text-2xl'>{props.sysmedi10_descripcion}</p>
          </div>
        </div>
        <div className='grid grid-cols-3 mt-10'>
          <ExternalLinkButton 
            text="Descargar Informe"
            href={"#"}
          >
            <IoMdDownload className='text-3xl text-white'/>  
          </ExternalLinkButton>  
          <ExternalLinkButton 
            text="Ver Estudio"
            href={`https://portal.cemenurnk.org.ar/viewer?StudyInstanceUIDs=${props.sysmedi14_ui}`}  
          >
            <IoMdSearch className='text-3xl text-white'/>  
          </ExternalLinkButton>  
          <ExternalLinkButton text="Compartir">
            <IoMdShare className='text-3xl text-white'/>  
          </ExternalLinkButton>
        </div>
      </div>
    </>
  )
}

export default StudyDetail