import { useState, useEffect } from "react"
import { IoMdFunnel, IoMdTrash, IoIosSearch, IoIosPerson } from "react-icons/io"

import StudyCard from "../components/StudyCard"
import Navbar from "../components/Navbar"
import Dropdown from "../components/Dropdown"
import Input from "../components/Input"
import Check from "../components/Check"
import Loader from "../components/Loader"

import { formatDate } from "../helpers/date"

import PatientCard from "../components/PatientCard"

import { getSysMedi10List } from "../services/sysMedi10"
import { getSysMedi09List } from "../services/sysMedi09"
import { getUser } from "../helpers/localstorage"
 
const initialFilters = {
  sysMedi10FechaFrom: "",
  sysMedi10FechaTo: "",
  sysMedi09List: []
}

const Studies = () => {

  const patient = getUser()

  const [ loading, setLoading ] = useState(false)
  const [ sysMedi09List, setSysMedi09List ] = useState(null)
  const [ sysMedi10List, setSysMedi10List ] = useState(null)
  const [ filteredSysMedi10List, setFilteredSysMedi10List ] = useState(null)

  const [showDropdown, setShowDropdown] = useState(false)
  const [filters, setFilters]           = useState(initialFilters)
  const [filtersText, setFiltersText]   = useState("")

  const handleClickFilters = () => setShowDropdown(prev => !prev)

  const handleChangeDates = (e) => setFilters(prev => ({...prev, [e.target.name]: e.target.value}))

  const handleChangeSysMedi09 = (e) => {
    const name = e.target.name
    //console.log(e.target.value)

    const sysMedi09ListLocal = [...filters.sysMedi09List]

    if(sysMedi09ListLocal.includes(name)){
      
      const index = sysMedi09ListLocal.indexOf(name)
      
      sysMedi09ListLocal.splice(index, 1)
    }else{
      sysMedi09ListLocal.push(name)
    }

    setFilters(prev => ({...prev, sysMedi09List: sysMedi09ListLocal}))
  }

  const clearFilters = () => {
    setFiltersText("Todos")
    setFilters(initialFilters)
  }

  const buildFiltersText = () =>{
    let text = "Todos"

    if(filters.sysMedi10FechaFrom !== "" && filters.sysMedi10FechaTo !== ""){
      
      text = `Entre el ${formatDate(filters.sysMedi10FechaFrom)} y el ${formatDate(filters.sysMedi10FechaTo)}`
    }

    if(filters.sysMedi10FechaFrom !== "" && filters.sysMedi10FechaTo === ""){
      text = `Desde el ${formatDate(filters.sysMedi10FechaFrom)}`
    }

    if(filters.sysMedi10FechaFrom === "" && filters.sysMedi10FechaTo !== ""){
      text = `Hasta el ${formatDate(filters.sysMedi10FechaTo)}`
    }

    if((filters.sysMedi10FechaFrom !== "" || filters.sysMedi10FechaTo !== "") && filters.sysMedi09List.length > 0){
      
      text += " | Modalidades: " + sysMedi09List.filter(modality => filters.sysMedi09List.includes(modality.sysMedi09Codigo)).map(modality => modality.sysMedi09Descripcion).join("/")
    }

    if(filters.sysMedi10FechaFrom === "" && filters.sysMedi10FechaTo === "" && filters.sysMedi09List.length > 0){
      
      text = "Modalidades: " + sysMedi09List.filter(modality => filters.sysMedi09List.includes(modality.sysMedi09Codigo)).map(modality => modality.sysMedi09Descripcion).join("/")
    }

    setFiltersText(text)
  }

  const filterSysMedi10List = () =>{

    if(!sysMedi10List) return

    let filteredSysMedi10ListLocal = [...sysMedi10List]

    if(filters.sysMedi10FechaFrom !== ""){
      filteredSysMedi10ListLocal = filteredSysMedi10ListLocal.filter(sysMedi10 => {
        const sysMedi10FechaObject = new Date(sysMedi10.sysMedi10Fecha)
        const sysMedi10FechaFromObject = new Date(filters.sysMedi10FechaFrom)

        return sysMedi10FechaObject.getTime() >= sysMedi10FechaFromObject.getTime()
      })
    }

    if(filters.sysMedi10FechaTo !== ""){
      filteredSysMedi10ListLocal = filteredSysMedi10ListLocal.filter(sysMedi10 => {
        const sysMedi10FechaObject = new Date(sysMedi10.sysMedi10Fecha)
        const sysMedi10FechaToObject = new Date(filters.sysMedi10FechaTo)

        return sysMedi10FechaObject.getTime() <= sysMedi10FechaToObject.getTime()
      })
    }

    if(filters.sysMedi09List.length > 0){
      filteredSysMedi10ListLocal = filteredSysMedi10ListLocal.filter(sysMedi10 => filters.sysMedi09List.includes(sysMedi10.sysMedi09Codigo))
    }

    setFilteredSysMedi10List(filteredSysMedi10ListLocal)
  }
  
  // if(!session) return null

  useEffect(() => {

    setLoading(true)

    Promise.all([
      getSysMedi09List(),
      getSysMedi10List(patient.sysMedi02Uuid)
    ]).then(([sysMedi09List, sysMedi10List]) => {
      setSysMedi09List(sysMedi09List)
      setSysMedi10List(sysMedi10List)
      setFilteredSysMedi10List(sysMedi10List)
    })
    .catch(error => setAlert({text: error.message, type: "danger"}))
    .finally(() => setLoading(false))

  }, [])

  // useEffect(()=>{
  //   setFilteredSysMedi10List(sysMedi10List)
  // }, [sysMedi10List])

  useEffect(()=>{
    buildFiltersText()
    filterSysMedi10List()
  }, [filters])

  return (
    <>
      <Navbar color="cemenurnk-secondary" title="Estudios y Tratamientos"/>
      <div className='container mx-auto pt-20 px-3'>
        <PatientCard patient={patient}/>
        {loading && (
            <div className="flex flex-col justify-center items-center mt-20">
              <Loader color="dark" size={50}/>
            </div>
          )
        }
        {
          !loading && sysMedi09List && (
            <>
              <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col md:flex-row">
                  <p className="text-xl font-bold">{filtersText}</p>
                  {
                    filtersText !== "Todos" && 
                    <span className="flex items-center text-red-500 text-xl font-bold hover:text-sky-500 cursor-pointer" onClick={clearFilters}>
                      <IoMdTrash className="text-xl"/>
                      Limpiar
                    </span>
                  }
                </div>
                <span className="text-xl font-bold hover:text-sky-500 cursor-pointer flex items-center gap-1 self-end" onClick={handleClickFilters}>
                  Filtros
                  <IoMdFunnel/>
                </span>
              </div>
              <Dropdown show={showDropdown} setShow={setShowDropdown}>
                <div className="flex flex-col gap-2">
                  <p className="text-center font-bold">Fecha del estudio</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Input name="sysMedi10FechaFrom" id="sysMedi10FechaFrom" type="date" label="Desde" onChange={handleChangeDates} value={filters.sysMedi10FechaFrom}/>
                    <Input name="sysMedi10FechaTo" id="sysMedi10FechaTo" type="date" label="Hasta" onChange={handleChangeDates} value={filters.sysMedi10FechaTo}/>
                  </div>
                  <p className="text-center font-bold">Modalidades</p>
                  <div className="grid grid-cols-2 gap-2">
                    {
                      sysMedi09List.map((sysMedi09, index) => 
                      <Check 
                        key={index} 
                        name={sysMedi09.sysMedi09Codigo} 
                        id={sysMedi09.sysMedi09Codigo} 
                        label={sysMedi09.sysMedi09Descripcion} 
                        onChange={handleChangeSysMedi09}
                        checked={filters.sysMedi09List.includes(sysMedi09.sysMedi09Codigo)}
                      />)
                    }
                  </div>
                </div>
              </Dropdown>
              {filteredSysMedi10List?.length>0 &&
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredSysMedi10List.map((sysMedi10, index) => <StudyCard key={index} {...sysMedi10} />)}
                </div>
              }
              </>
          )
        }
        {
          !loading && !filteredSysMedi10List?.length>0 && (
            <div className="flex flex-col justify-center items-center mt-20">
              <IoIosSearch className="text-7xl font-bold"/>
              <p className="text-lg font-bold">No se encontraron estudios.</p>
              <p className="text-lg font-bold">Consulte con el administrador.</p>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Studies