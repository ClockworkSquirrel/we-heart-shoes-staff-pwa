import { useEffect, useState } from "react"

const RestAPI = "https://untitled-bzxwlvj4h4dk.runkit.sh"

const useAPI = (path = "", options = {}) => {
  const [ data, setData ] = useState({})
  const [ loading, setLoading ] = useState(true)
  const [ hasError, setError ] = useState()

  useEffect(() => {
    setLoading(true)

    fetch(`${RestAPI}${path}`, options)
      .then(res => res.json())
      .then(({ result }) => setData(result))
      .catch(err => setError(err.message ?? true))
      .finally(() => setLoading(false))
  }, [ path ])

  return [ data, loading, hasError ]
}

export default useAPI
export { RestAPI }
