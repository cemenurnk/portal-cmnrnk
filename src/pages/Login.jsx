import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SessionContext } from '../context/SessionContext'

import Logo from '../assets/logo.png'
import Video from '../assets/video_login2.mp4'
import Input from '../components/Input'
import Navbar from '../components/Navbar'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import { loginPatient } from '../services/login'

const intialForm = {
  sysPers01Dni: '',
  sysMedi01Pin: ''
}

const Login = () => {
  
  const [disabledInputs, setDisabledInputs] = useState(false)
  const [form, setForm]                     = useState(intialForm)
  
  const { session: {guest, token, loading}, setLoading, setSysMedi01, setAlert, setGuest } = useContext(SessionContext)

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

      if(alert) setAlert(null)

      setLoading(true)

      if(form.sysPers01Dni === ""){
        throw new Error("El número de DNI es requerido")
      }

      if(form.sysMedi01Pin === ""){
        throw new Error("El PIN es requerido")
      }

      //fetching
      setDisabledInputs(true)

      const response = await loginPatient(form.sysPers01Dni, form.sysMedi01Pin, token)

      setLoading(false)

      if(response.resultid === "error"){
        setDisabledInputs(false)
        setAlert({text: response.resulttext, type: "danger"})
        return
      }

      if(guest) setGuest(false)
      setSysMedi01(response.sysMedi01)

      navigate("/estudios")
    
    }catch(error){
      setLoading(false)
      setAlert({text: error.message, type: "danger"})
    }
  }

  //useEffect(()=>console.log(form), [form])

  return (
    <>
      <Navbar color={"cemenurnk-primary"} title="Portal del paciente" showBackButton={false} showMenuButton={false}/>
      <video className='max-h-screen' loop autoPlay muted src={Video}></video>
      <div className='absolute top-0 right-0 min-h-screen bg-white w-full md:w-1/5 z-10 gap-4'>
        <div className='mx-4'>
          <img src={Logo} alt="Centro de Medicina Nuclear y Radioterapia Nestor Kirchner" className="mt-20"/>
          <form action="#" className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
            <Input type={"text"} name={"sysPers01Dni"} id={"sysPers01Dni"} label={"Número de Documento"} onChange={handleChange} value={form.sysPers01Dni} disabled={disabledInputs}/>
            <Input type={"password"} name={"sysMedi01Pin"} id={"sysMedi01Pin"} label={"PIN"} onChange={handleChange} disabled={disabledInputs}/>
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
          <Alert />
        </div>
      </div>
    </>
  )
}

export default Login