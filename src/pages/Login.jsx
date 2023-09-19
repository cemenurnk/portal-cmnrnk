import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../assets/logo.png'
import Input from '../components/Input'
import Navbar from '../components/Navbar'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import http from '../helpers/http'

const initalInterface = {
  showLoader: false,
  showAlert: false,
  alertMessage: ''
}

const intialForm = {
  documento: '',
  pin: ''
}

const Login = () => {
  
  const [userInterface, setUserInterface] = useState(initalInterface)
  const [disabledInputs, setDisabledInputs] = useState(false)
  const [form, setForm] = useState(intialForm)
  
  const navigate = useNavigate()

  const handleInterface = (key, value) =>{
    setUserInterface(prev => ({...prev, [key]: value}))
  }

  const handleChange = (e) => {

    const name = e.target.name
    const value = e.target.value

    if(name === "documento" && value.length > 8) return 
    if(name === "documento" && value.length > 0 && !(/[0-9]+$/.test(value))) return

    setForm(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault()

      if(userInterface.showAlert){
        handleInterface('showAlert', false)
        handleInterface('alertMessage', '')
      }

      handleInterface('showLoader', true)

      if(form.documento === ""){
        throw new Error("El número de documento es requerido")
      }

      if(form.pin === ""){
        throw new Error("El pin es requerido")
      }

      //fetching
      setDisabledInputs(true)

      const response = await http.post("/auth/login.php", {documento: form.documento, pin: form.pin})

      handleInterface('showLoader', false)

      if(["invalid", "error"].includes(response.status)){
        setDisabledInputs(false)
        handleInterface('showAlert', true)
        handleInterface('alertMessage', response.message)
        return
      }

      navigate("/")
      // setTimeout(()=>{
      //   navigate("/")
      // }, 2000)

    }catch(error){
      handleInterface('showAlert', true)
      handleInterface('alertMessage', error.message)
      handleInterface('showLoader', false)
    }
  }

  //useEffect(()=>console.log(form), [form])

  return (
    <>
      <Navbar color={"cemenurnk-primary"} title="Portal del paciente" showBackButton={false} showMenuButton={false}/>
      <div className="container mx-auto px-3 flex flex-col items-center min-h-screen gap-4">
        <img src={Logo} alt="Centro de Medicina Nuclear y Radioterapia Nestor Kirchner" className="mt-20 w-2/3 md:w-1/4"/>
        <form action="#" className="flex flex-col w-full md:w-1/3 gap-4" onSubmit={handleSubmit}>
          <Input type={"text"} name={"documento"} id={"documento"} label={"Número de Documento"} onChange={handleChange} value={form.documento} disabled={disabledInputs}/>
          <Input type={"password"} name={"pin"} id={"pin"} label={"PIN"} onChange={handleChange} disabled={disabledInputs}/>
          {
            !userInterface.showLoader ?
            <button type="submit" className='p-2 bg-cemenurnk-primary hover:bg-gray-400 rounded text-white font-bold'>
              Ingresar
            </button> :
            <div className="p-2 bg-cemenurnk-primary rounded flex justify-center cursor-wait">
              <Loader /> 
            </div>}
        </form>
        {userInterface.showAlert && <Alert message={userInterface.alertMessage}/>}
      </div>
    </>
  )
}

export default Login