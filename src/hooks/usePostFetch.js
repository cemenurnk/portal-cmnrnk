import { useState } from "react";

export default function usePostFetch({url, headers, body}){

  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)
  const [ data, setData ] = useState(null)

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    if(data.resultid == "error") throw new Error(data.resulttext)
    setData(data)
  })
  .catch(error => setError(error))
  .finally(()=>setLoading(false))

  return { loading, error, data}
}