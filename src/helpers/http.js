const http = {
  host: 'https://www.cemenurnk.org.ar/modulos/api',
  get: async (endpoint) =>{
    try{
      const response = await fetch(http.host + endpoint)
      const data = await response.json()
  
      return data
    }catch(error){
      console.log(error)
      return {status: "error", message: "Ha ocurrido un error. Consulte con el administrador."}
    }
  },
  post: async (endpoint, body) => {
    try{
      const response = await fetch(http.host + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
  
      const data = await response.json()
      return data
    }catch(error){
      console.log(error)
      return {status: "error", message: "Ha ocurrido un error. Consulte con el administrador."}
    }
  }
}

export default http