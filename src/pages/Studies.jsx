import { useState, useEffect } from "react"
import { IoMdFunnel, IoMdTrash, IoIosSearch, IoIosPerson } from "react-icons/io"
import StudyCard from "../components/StudyCard"
import Navbar from "../components/Navbar"
import Dropdown from "../components/Dropdown"
import Input from "../components/Input"
import Check from "../components/Check"
import { formatDate } from "../helpers/date"
import Loader from "../components/Loader"

import http from "../helpers/http"

const templatePatient = {
  sysmedi02_uuid: "00323652-4c01-11ee-a5d3-0050568c9146",
  syspers01_nombre: "Iván",
  syspers01_apellido: "Vazquez",
  syspers01_dni: "44558441"
}

const templateModalities = [
  {sysmedi09_codigo: "TC", sysmedi09_descripcion: "Tomografía"},
  {sysmedi09_codigo: "MG", sysmedi09_descripcion: "Mamografía"}
]

const templateStudies = [
  {
    sysmedi10_uuid: "00323652-4c01-11ee-a5d3-0050568c9146",
    sysmedi09_descripcion: "Mamografía",
    sysmedi09_codigo: "MG",
    sysmedi10_descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorem vitae laborum beatae nesciunt reiciendis illum velit eveniet modi consequatur officia nulla, tempore nostrum suscipit explicabo voluptatum qui, aut quos!",
    sysmedi14_study_date: "2023-08-23 14:50:22"
  }, 
  {
    sysmedi10_uuid: "00323652-4c01-11ee-a5d3-0050568c9146",
    sysmedi09_descripcion: "Tomografía",
    sysmedi09_codigo: "TC",
    sysmedi10_descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorem vitae laborum beatae nesciunt reiciendis illum velit eveniet modi consequatur officia nulla, tempore nostrum suscipit explicabo voluptatum qui, aut quos!",
    sysmedi14_study_date: "2023-07-23 14:50:22"
  }, 
  {
    sysmedi10_uuid: "00323652-4c01-11ee-a5d3-0050568c9146",
    sysmedi09_descripcion: "Mamografía",
    sysmedi09_codigo: "MG",
    sysmedi10_descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorem vitae laborum beatae nesciunt reiciendis illum velit eveniet modi consequatur officia nulla, tempore nostrum suscipit explicabo voluptatum qui, aut quos!",
    sysmedi14_study_date: "2023-08-03 14:50:22"
  }, 
  {
    sysmedi10_uuid: "00323652-4c01-11ee-a5d3-0050568c9146",
    sysmedi09_descripcion: "Tomografía",
    sysmedi09_codigo: "TC",
    sysmedi10_descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorem vitae laborum beatae nesciunt reiciendis illum velit eveniet modi consequatur officia nulla, tempore nostrum suscipit explicabo voluptatum qui, aut quos!",
    sysmedi14_study_date: "2023-06-23 14:50:22"
  }, 
]

const initialFilters = {
    dateFrom: "",
    dateTo: "",
    modalities: []
}

const Studies = () => {

  const [showDropdown, setShowDropdown] = useState(false)
  const [filters, setFilters]           = useState(initialFilters)
  const [filtersText, setFiltersText]   = useState("")

  const [modalities, setModalities]     = useState([]) 
  const [studies, setStudies]           = useState([])
  const [patient, setPatient]           = useState(null)

  const [filteredStudies, setFilteredStudies] = useState([])

  const [loading, setLoading] = useState(true);

  const handleClickFilters = () => setShowDropdown(prev => !prev)

  const handleChangeDates = (e) => setFilters(prev => ({...prev, [e.target.name]: e.target.value}))

  const handleChangeModality = (e) => {
    const name = e.target.name
    //console.log(e.target.value)

    const modalities = [...filters.modalities]

    if(modalities.includes(name)){
      
      const index = modalities.indexOf(name)
      
      modalities.splice(index, 1)
    }else{
      modalities.push(name)
    }

    setFilters(prev => ({...prev, modalities}))
  }

  const clearFilters = () => {
    setFiltersText("Todos")
    setFilters(initialFilters)
  }
  const buildFiltersText = () =>{
    let text = "Todos"

    if(filters.dateFrom !== "" && filters.dateTo !== ""){
      
      text = `Entre el ${formatDate(filters.dateFrom)} y el ${formatDate(filters.dateTo)}`
    }

    if(filters.dateFrom !== "" && filters.dateTo === ""){
      text = `Desde el ${formatDate(filters.dateFrom)}`
    }

    if(filters.dateFrom === "" && filters.dateTo !== ""){
      text = `Hasta el ${formatDate(filters.dateTo)}`
    }

    if((filters.dateFrom !== "" || filters.dateTo !== "") && filters.modalities.length > 0){
      
      text += " | Modalidades: " + modalities.filter(modality => filters.modalities.includes(modality.sysmedi09_codigo)).map(modality => modality.sysmedi09_descripcion).join("/")
    }

    if(filters.dateFrom === "" && filters.dateTo === "" && filters.modalities.length > 0){
      
      text = "Modalidades: " + modalities.filter(modality => filters.modalities.includes(modality.sysmedi09_codigo)).map(modality => modality.sysmedi09_descripcion).join("/")
    }

    setFiltersText(text)
  }

  const filterStudies = () =>{

    let filteredStudiesLocal = studies

    if(filters.dateFrom !== ""){
      filteredStudiesLocal = filteredStudiesLocal.filter(study => {
        const studyDateObject = new Date(study.sysmedi14_study_date) 
        const dateFromObject = new Date(filters.dateFrom)

        return studyDateObject.getTime() >= dateFromObject.getTime()
      })
    }

    if(filters.dateTo !== ""){
      filteredStudiesLocal = filteredStudiesLocal.filter(study => {
        const studyDateObject = new Date(study.sysmedi14_study_date)
        const dateToObject = new Date(filters.dateTo)

        return studyDateObject.getTime() <= dateToObject.getTime()
      })
    }

    if(filters.modalities.length > 0){
      filteredStudiesLocal = filteredStudiesLocal.filter(study => filters.modalities.includes(study.sysmedi09_codigo))
    }

    setFilteredStudies(filteredStudiesLocal)
  }

  useEffect(()=>{
    //fetching

    // const responseStudies = await http.get('/sys_medi_10/get_estudios.php')
    
    // if(responseStudies.status === "error"){

    //   return
    // }
    
    // setFilteredStudies(responseStudies.studies)
    
    // const responseModalities = await http.get('/sys_medi_09/get_modalidades.php')
    
    // if(responseModalities.status === "error"){
      
    //   return
    // }
    

    //setLoading(false)


    setTimeout(()=>{
      setLoading(false)
      setModalities(templateModalities)
      setStudies(templateStudies)
      setFilteredStudies(templateStudies)
      setPatient(templatePatient)
    }, 500)
  }, [])

  useEffect(()=>{
    buildFiltersText()
    filterStudies()
  }, [filters])

  return (
    <>
      <Navbar color="cemenurnk-secondary" title="Estudios"/>
      <div className='container mx-auto pt-20 px-3'>
        {patient && 
          <div className="p-5 mb-5 bg-gray-100 rounded flex">
            <div className="self-center">
              <IoIosPerson className="text-5xl"/>
            </div>
            <div className="ml-3">
              <p className="text-2xl">{patient.syspers01_apellido}, {patient.syspers01_nombre}</p>
              <p className="text-xl text-gray-500">DNI: {patient.syspers01_dni}</p>
            </div>
          </div>
        }
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
              <Input name="dateFrom" id="dateFrom" type="date" label="Desde" onChange={handleChangeDates} value={filters.dateFrom}/>
              <Input name="dateTo" id="dateTo" type="date" label="Hasta" onChange={handleChangeDates} value={filters.dateTo}/>
            </div>
            <p className="text-center font-bold">Modalidades</p>
            <div className="grid grid-cols-2">
              {
                modalities.map((modality, index) => 
                <Check 
                  key={index} 
                  name={modality.sysmedi09_codigo} 
                  id={modality.sysmedi09_codigo} 
                  label={modality.sysmedi09_descripcion} 
                  onChange={handleChangeModality}
                  checked={filters.modalities.includes(modality.sysmedi09_codigo)}
                />)
              }
            </div>
          </div>
        </Dropdown>
        {
          loading && (
            <div className="flex flex-col justify-center items-center mt-20">
              <Loader color="dark" size={50}/>
            </div>
          )
        }
        {
          !loading && filteredStudies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredStudies.map((study, index) => <StudyCard key={index} {...study} />)}
            </div>
          )
        }
        {
          !loading && filteredStudies.length < 1 && (
            <div className="flex flex-col justify-center items-center mt-20">
              <IoIosSearch className="text-7xl font-bold"/>
              <p className="text-lg font-bold">No se encontraron estudios</p>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Studies