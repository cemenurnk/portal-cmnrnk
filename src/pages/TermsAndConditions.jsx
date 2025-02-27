import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { Outlet } from 'react-router-dom'
import { HiArrowSmDown } from "react-icons/hi";

import Navbar from '../components/Navbar'
import { getUser, updateSysMedi01AceptaTyC } from "../helpers/localstorage"
import { getApiUrl, getApiHeaders } from '../helpers/api'
import Loader from '../components/Loader'

// const terms = `<p style="text-align: center;">Términos y Condiciones de Uso del Portal del Paciente&nbsp;</p><p>1. Introducción</p><p>El presente documento establece los términos y condiciones de uso del Portal del Paciente (en adelante, "el Portal"), una plataforma digital que permite a los pacientes acceder y compartir sus informes médicos. Al registrarse y utilizar el Portal, el usuario acepta estos términos en su totalidad.&nbsp;</p><p>2. Uso del Portal</p><p>El Portal está diseñado para proporcionar acceso seguro a la información médica del paciente. El usuario es el único responsable del uso adecuado de su cuenta y de la confidencialidad de sus credenciales de acceso. Se prohíbe el uso indebido del Portal, incluyendo la manipulación de datos o el acceso no autorizado a la información de otros pacientes.&nbsp;</p><p>3. Responsabilidad del Paciente</p><p>El usuario es el único responsable de cualquier acción realizada en su cuenta, incluyendo el acceso, descarga, almacenamiento y difusión de sus informes médicos. Se recomienda encarecidamente no compartir las credenciales de acceso ni divulgar información confidencial con terceros no autorizados.&nbsp;</p><p>4. Exclusión de Responsabilidad de la Institución</p><p>La institución provee el Portal como un servicio para facilitar el acceso del paciente a su información médica, pero no se hace responsable por la divulgación, uso indebido o acceso no autorizado de la información del paciente derivado de su negligencia, de brechas de seguridad externas o de cualquier uso que haga el propio usuario al compartir sus datos. Asimismo, la institución no garantiza la disponibilidad continua del Portal ni la ausencia de errores en su funcionamiento.&nbsp;</p><p>5. Protección de Datos y Seguridad</p><p>La institución implementa medidas de seguridad para proteger la información contenida en el Portal, conforme a la normativa vigente en protección de datos. No obstante, el usuario acepta que ninguna plataforma digital es completamente inmune a riesgos de seguridad y que el uso del Portal implica ciertos riesgos inherentes.&nbsp;</p><p>6. Modificaciones de los Términos y Condiciones</p><p>La institución se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será notificado a los usuarios mediante el Portal o por los medios de comunicación disponibles.&nbsp;</p><p>7. Aceptación de los Términos</p><p>El uso del Portal implica la aceptación expresa de estos términos y condiciones. Si el usuario no está de acuerdo con ellos, deberá abstenerse de utilizar el servicio.
// Para más información o consultas, el usuario puede contactar a la institución a través de los canales de atención disponibles. <br></p><p>8. Datos de menores de edad:</p>`

const TermsAndConditions = () => {
  
  const user = getUser()
  
  const [continueBrowsing, setContinueBrowsing] = useState(user.sysMedi01AceptaTyC)
  const [disabledButton, setDisabledButton] = useState(true)
  const [sysTerm01Response, setSysTerm01Response] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  
  const handleSubmit = (event) =>{
    event.preventDefault()

    fetch( 
      getApiUrl("sys_term_01/aceptar/"),
      {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({
          relaSysTerm01: sysTerm01Response?.idSysTerm01,
          sysMedi02Uuid: user.sysMedi02Uuid
        })
      }
    )
    .then(response => response.json())
    .then(data => {
      if(data.resultid === "success"){
        updateSysMedi01AceptaTyC()
        setContinueBrowsing(true)
      }
    })
  }

  useEffect(()=>{
    window.onscroll = () => {setScrolled((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight)}

    fetch(getApiUrl("sys_term_01/"), { headers: getApiHeaders() })
    .then(response => response.json())
    .then(data => setSysTerm01Response(data))
  
    return () => {
      window.onscroll = null
    }
  }, [])

  useEffect(()=>{
    setDisabledButton(!scrolled)
  }, [scrolled])

  //hacer el get aquí con un use effect

  return continueBrowsing ? <Outlet /> : (
    <div className='relative'>
      <Navbar color="cemenurnk-primary" title="Términos y Condiciones" showBackButton={false} showMenuButton={false}/>
      <div className='container mx-auto px-3 pt-20 py-40'>
        {sysTerm01Response?.resultid === "success" ? 
        <>
          {parse(sysTerm01Response.sysTerm01Contenido)} 
          {!scrolled && <HiArrowSmDown className='fixed top-[50%] right-2 text-6xl text-cemenurnk-primary animate-bounce'/>}
          <form action="#" className='py-5 fixed min-w-full bg-white bottom-0' onSubmit={handleSubmit}>
            <div className='flex gap-2 items-center mb-5'>
              <input 
                type="checkbox" 
                name="sysmedi01_acepta_tyc" 
                id="sysmedi01_acepta_tyc" 
                className='w-5 h-5' 
                onChange={() => {setDisabledButton(prev => !prev)}}
                checked={!disabledButton}
              />
              <label htmlFor="sysmedi01_acepta_tyc">He leído y acepto los términos y condiciones.</label>
            </div>
            <button 
              type="submit" 
              className='bg-sky-500 text-white text-bold font-semibold p-2 rounded-md md:w-fit disabled:bg-gray-200 disabled:text-black'
              disabled={disabledButton}
            >
              Continuar
            </button>
          </form>
        </> : <Loader />}
      </div>
    </div>
  )
}

export default TermsAndConditions