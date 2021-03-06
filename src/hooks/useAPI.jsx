import { useEffect, useState } from "react"
import config from "../config.json"

const useAPI = (path = "", options = {}) => {
  const [ data, setData ] = useState({})
  const [ loading, setLoading ] = useState(true)
  const [ hasError, setError ] = useState()

  useEffect(() => {
    (() => {
      setLoading(true)

      return fetch(`${config.endpoints.api}/api${path}`, options)
        .then(res => res.json())
        .then(({ result }) => setData(result))
        .catch(err => setError(err.message ?? true))
        .finally(() => setLoading(false))
    })()

    /*
      If I add "options" to the dependency array, it'll just continue
      to be in a "loading" state forever; therefore, I'm ignoring the
      warning.
    */

    // eslint-disable-next-line
  }, [ path ])

  return [ data, loading, hasError ]
}

export default useAPI
