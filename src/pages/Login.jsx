import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../components/Input'
import Navbar from '../components/Navbar'
import Alert from '../components/Alert'
import Loader from '../components/Loader'

import { getApiHeaders, getApiUrl } from '../helpers/api'
import { debugConsole } from '../helpers/debug'
import { setUser } from '../helpers/localstorage'

const intialForm = {
  sysPers01Dni: '',
  sysMedi01Pin: ''
}

const Login = () => {
  
  const [disabledInputs, setDisabledInputs] = useState(false)
  const [form, setForm]                     = useState(intialForm)

  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {

    const name = e.target.name
    const value = e.target.value

    if(name === "sysPers01Dni" && value.length > 8) return 
    if(name === "sysPers01Dni" && value.length > 0 && !(/[0-9]+$/.test(value))) return

    setForm(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault()

      setAlert(null)

      if(form.sysPers01Dni === ""){
        throw new Error("El número de DNI es requerido")
      }

      if(form.sysMedi01Pin === ""){
        throw new Error("La contraseña es requerido")
      }

      //fetching
      setDisabledInputs(true)

      setLoading(true)

      const response = await fetch(getApiUrl("sys_medi_01/login/"), {
        method: 'POST',
        headers: getApiHeaders(true),
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if(data.resultid === "error"){
        throw new Error(data.resulttext)
      }

      setUser(data.sysMedi01)
      navigate("/estudios")
    
    }catch(error){
      setAlert({text: error.message, type: "danger"})
      setDisabledInputs(false)
      debugConsole(error)
    }finally{
      setLoading(false)
      setDisabledInputs(false)
    }
  }

  return (
    <>
      <Navbar color={"cemenurnk-primary"} title="Portal del paciente" showBackButton={false} showMenuButton={false}/>
      <video className='max-h-screen' loop autoPlay muted src='/video_login2.mp4'></video>
      <div className='absolute top-0 right-0 min-h-screen bg-white w-full md:w-1/5 z-10 gap-4'>
        <div className='mx-4'>
          <img src="/logo.png" alt="Centro de Medicina Nuclear y Radioterapia Nestor Kirchner" className="mt-20"/>
          <form action="#" className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
            <Input type={"text"} name={"sysPers01Dni"} id={"sysPers01Dni"} label={"Número de Documento"} onChange={handleChange} value={form.sysPers01Dni} disabled={disabledInputs}/>
            <Input type={"password"} name={"sysMedi01Pin"} id={"sysMedi01Pin"} label={"Contraseña"} onChange={handleChange} disabled={disabledInputs}/>
            {
              !loading &&
              <button type="submit" className='p-2 bg-cemenurnk-primary hover:bg-gray-400 rounded text-white font-bold'>
                Ingresar
              </button>
            }
            {loading &&
              <div className="p-2 bg-cemenurnk-primary rounded flex justify-center cursor-wait">
                <Loader /> 
              </div>
            }
          </form>
          <Alert state={alert}/>
        </div>
      </div>
    </>
  )
}

export default Login