const http = {
  host: import.meta.env.VITE_APIREST,
  get: async (endpoint, token) =>{
    try{
      
      const headers = {
        'flexAgent': 'apirest-sievert'
      }

      if(token){
        headers['X-Authorization-token'] = token
      }
      
      const response = await fetch(http.host + endpoint, {headers: headers})
      const data = await response.json()
  
      return data
    }catch(error){
      console.log(error)
      return {status: "error", message: "Ha ocurrido un error. Consulte con el administrador."}
    }
  },
  post: async (endpoint, token, body) => {
    try{

      const headers = {
        'Content-Type': 'application/json',
        'flexAgent': 'apirest-sievert'
      }

      if(token){
        headers['X-Authorization-token'] = token
      }

      const response = await fetch(http.host + endpoint, {
        method: 'POST',
        headers: headers,
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