import { useEffect, useState } from "react"

const useAPI = (path = "", options = {}) => {
  const [ data, setData ] = useState({})
  const [ loading, setLoading ] = useState(true)
  const [ hasError, setError ] = useState()

  useEffect(() => {
    setLoading(true)

    return fetch(`${process.env.REACT_APP_API_URL}/api${path}`, options)
        .then(res => res.json())
        .then(({ result }) => setData(result))
        .catch(err => setError(err.message ?? true))
        .finally(() => setLoading(false))
  }, [ path ])

  return [ data, loading, hasError ]
}

export default useAPI
